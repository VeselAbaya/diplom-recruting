import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { GRAPH, Layout } from '@modules/search/search-result/search-result-graph/layout';
import { DEFAULT_AVATAR_URL } from '@monorepo/constants';
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
import { animate, style, transition, trigger } from '@angular/animations';
import { NodeHTMLIdPipe } from '@modules/search/search-result/search-result-graph/node-html-id.pipe';
import { ProfileService } from '@modules/profile/profile.service';
import { clone } from 'ramda';

interface INgxGraph extends IGraphDto {
  nodes: (IUserListItem & Node)[];
  edges: (IRelationshipDto & Edge)[];
}

@Component({
  selector: 'app-search-result-graph',
  templateUrl: './search-result-graph.component.html',
  styleUrls: ['./search-result-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('nodeOverlayFade', [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.1)' }),
      animate('150ms cubic-bezier(0, 0, 0.2, 1)', style({ transform: 'none', opacity: 1 }))
    ]),
    transition(':leave',
      animate('75ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ opacity: 0, transform: 'scale(0.7)' }))
    ),
  ])],
  providers: [NodeHTMLIdPipe]
})
export class SearchResultGraphComponent extends OnDestroyMixin {
  readonly layout = new Layout();
  readonly NODE_SIZE = GRAPH.NODE_SIZE;
  readonly DEFAULT_AVATAR_URL = DEFAULT_AVATAR_URL;
  nodeWithOverlay: IUserListItem | null = null;

  @ViewChild('nodeContextMenu', { static: true, read: TemplateRef }) nodeContextMenuRef!: TemplateRef<void>;

  mouseMoveStartPoint = { x: 0, y: 0 };
  private mouseMovedDistance = 0;

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
    tap(() => this.nodeWithOverlay = null),
    isNotNullOrUndefined(),
    pluck('id')
  );

  constructor(private readonly dialog: MatDialog,
              private readonly snackbar: MatSnackBar,
              private readonly nodeHTMLId: NodeHTMLIdPipe,
              private readonly profile: ProfileService) {
    super();
  }

  onNodeClick(event: MouseEvent, selectedNode: IUserListItem): void {
    if (this.mouseMovedDistance <= 15 && this.nodeWithOverlay !== selectedNode) {
      this.nodeWithOverlay = selectedNode;
    }
    this.mouseMovedDistance = 0;
    this.mouseMoveStartPoint = { x: 0, y: 0 };
  }

  onNodeMousemove(event: MouseEvent): void {
    const dx = this.mouseMoveStartPoint.x || event.x - event.x;
    const dy = this.mouseMoveStartPoint.y || event.y - event.y;
    this.mouseMovedDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  onEdgeClick(selectedEdge: IRelationshipDto): void {
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

  hideNodeUserCardIfClickedOutsideNodeOrUserCard(event: MouseEvent): void {
    const nodeWithOverlayElement = event.composedPath().find(target => this.nodeWithOverlay !== null
      ? (target as Element).id === this.nodeHTMLId.transform(this.nodeWithOverlay.id)
      : false
    );

    if (!nodeWithOverlayElement) {
      this.nodeWithOverlay = null;
    }
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
