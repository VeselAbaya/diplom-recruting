import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { GRAPH, Layout } from '@modules/search/search-result/search-result-graph/layout';
import { MatDialog } from '@angular/material/dialog';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined';
import { pluck, tap } from 'rxjs/operators';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';
import { IGraphDto } from '@monorepo/types/relations/graph.dto.interface';
import { Edge, Node } from '@swimlane/ngx-graph';
import {
  RelationsListDialogComponent
} from '@modules/search/search-result/search-result-list/user-card/relations-list-dialog/relations-list-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUserListItem } from '@monorepo/types/user/user-list-item.dto.interface';
import { OnDestroyMixin } from '@w11k/ngx-componentdestroyed';
import { ProfileService } from '@modules/profile/profile.service';
import { clone } from 'ramda';
import { NodeHTMLIdPipe } from '@modules/search/search-result/search-result-graph/node-html-id.pipe';
import { ESCAPE } from '@angular/cdk/keycodes';
import { nodeOverlayFade } from '@modules/search/search-result/search-result-graph/node-overlay-fade.animation';

interface INgxGraph extends IGraphDto {
  nodes: (IUserListItem & Node)[];
  edges: (IRelationshipDto & Edge)[];
}

@Component({
  selector: 'app-search-result-graph',
  templateUrl: './search-result-graph.component.html',
  styleUrls: ['./search-result-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NodeHTMLIdPipe],
  animations: [nodeOverlayFade]
})
export class SearchResultGraphComponent extends OnDestroyMixin {
  readonly layout = new Layout();
  readonly NODE_SIZE = GRAPH.NODE_SIZE;
  nodeWithOverlay: IUserListItem | null = null;
  private _ngxGraph: INgxGraph | null = null;

  @Input() set graph(newGraph: IGraphDto | null) {
    if (!newGraph) {
      this._ngxGraph = null;
      return;
    }

    const ngxGraph = clone(newGraph);
    ngxGraph.edges = newGraph.edges.map(edge => ({
      ...edge,
      source: edge.fromUserId,
      target: edge.toUserId
    }));
    this._ngxGraph = ngxGraph as INgxGraph;
  }

  get ngxGraph(): INgxGraph | null {
    return this._ngxGraph;
  }

  selectedUserId$ = this.profile.selectedUser$.pipe(
    tap(() => this.closeNodeOverlay()),
    isNotNullOrUndefined(),
    pluck('id')
  );

  constructor(private readonly dialog: MatDialog,
              private readonly snackbar: MatSnackBar,
              private readonly nodeHTMLId: NodeHTMLIdPipe,
              private readonly profile: ProfileService) {
    super();
  }

  openRelations(selectedEdge: IRelationshipDto): void {
    if (!this.ngxGraph) {
      this.showRelationsListOpeningErrorInSnackbar();
      return;
    }

    const [fromUser, toUser] = this.findFromAndToNodesByEdge(this.ngxGraph.nodes, selectedEdge);
    const relations = this.findEdgeWithSameUsers(this.ngxGraph.edges, selectedEdge);
    if (!fromUser || !toUser || !relations.length) {
      this.showRelationsListOpeningErrorInSnackbar();
      return;
    }

    this.dialog.open(RelationsListDialogComponent, {
      data: { fromUser, toUser, relations, selectedRelation: selectedEdge }
    });
  }

  @HostListener('document:keydown', ['$event.keyCode'])
  hideNodeInfoOverlayOnEscapeOrTab(keyCode: number): void {
    if (keyCode === ESCAPE) {
      this.closeNodeOverlay();
    }
  }

  hideNodeUserCardIfClickedOutsideNodeOrUserCard(event: MouseEvent): void {
    const nodeWithOverlayElement = event.composedPath().find(target =>
      this.nodeWithOverlay !== null
        ? (target as Element).id === this.nodeHTMLId.transform(this.nodeWithOverlay.id)
        : false
    );

    if (!nodeWithOverlayElement) {
      this.closeNodeOverlay();
    }
  }

  openNodeOverlay(node: IUserListItem): void {
    this.nodeWithOverlay = node;
  }

  closeNodeOverlay(): void {
    this.nodeWithOverlay = null;
  }

  private showRelationsListOpeningErrorInSnackbar(): void {
    this.snackbar.open(
      'Something went wrong: Can not open relations list', 'Close',
      { panelClass: 'pn-warn' }
    );
  }

  private findFromAndToNodesByEdge = (nodes: IUserListItem[], edge: IRelationshipDto): [IUserListItem | null, IUserListItem | null] => {
    let fromUser: IUserListItem | null = null;
    let toUser: IUserListItem | null = null;
    for (const node of nodes) {
      if (fromUser && toUser) {
        break;
      }

      if (node.id === edge.fromUserId) {
        fromUser = node;
      } else if (node.id === edge.toUserId) {
        toUser = node;
      }
    }

    return [fromUser, toUser];
  }

  private findEdgeWithSameUsers(edges: IRelationshipDto[], selectedEdge: IRelationshipDto): IRelationshipDto[] {
    return edges.filter(edge => edge.toUserId === selectedEdge.toUserId &&
      edge.fromUserId === selectedEdge.fromUserId ||
      edge.toUserId === selectedEdge.fromUserId &&
      edge.fromUserId === selectedEdge.toUserId);
  }
}
