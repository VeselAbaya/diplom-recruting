import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { SearchService } from '@modules/search/search.service';
import { GRAPH, Layout } from '@modules/search/search-result/search-result-graph/layout';
import { DEFAULT_AVATAR_URL } from '@monorepo/constants';
import { MatDialog } from '@angular/material/dialog';
import { RelationsService } from '@modules/search/relations.service';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined';
import { filter, map, pluck, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';
import { IGraphDto } from '@monorepo/types/relations/graph.dto.interface';
import { Edge, Node } from '@swimlane/ngx-graph';
import { IGraphSearchParamsDto } from '@monorepo/types/relations/graph-search-params.dto.interface';
import { RelationsListDialogComponent } from '@modules/search/search-result/search-result-list/user-card/relations-list-dialog/relations-list-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUserListItem } from '@monorepo/types/with-notification.interface';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

interface INgxGraph extends IGraphDto {
  nodes: (IUserListItem & Node)[];
  edges: (IRelationshipDto & Edge)[];
}

@Component({
  selector: 'app-search-result-graph',
  templateUrl: './search-result-graph.component.html',
  styleUrls: ['./search-result-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultGraphComponent extends OnDestroyMixin {
  layout = new Layout();
  NODE_SIZE = GRAPH.NODE_SIZE;
  DEFAULT_AVATAR_URL = DEFAULT_AVATAR_URL;
  selectedNode: IUserListItem | null = null;

  @ViewChild('nodeContextMenu', {static: true, read: TemplateRef}) nodeContextMenuRef!: TemplateRef<void>;

  mouseMoveStartPoint = {x: 0, y: 0};
  private mouseMovedDistance = 0;

  graph$ = this.search.params$.pipe(
    untilComponentDestroyed(this),
    filter(params => !!params.fromUserId),
    switchMap(params => this.relations.getGraph(params as IGraphSearchParamsDto)),
    map(graph => {
      graph.edges = graph.edges.map(edge => ({
        ...edge,
        source: edge.fromUserId,
        target: edge.toUserId
      }));

      return graph as INgxGraph;
    }),
    shareReplay(1)
  );

  selectedUserId$ = this.search.selectedUser$.pipe(isNotNullOrUndefined(), pluck('id'));

  constructor(private readonly search: SearchService,
              private readonly dialog: MatDialog,
              private readonly snackbar: MatSnackBar,
              private readonly relations: RelationsService) {
    super();
  }

  onNodeClick(event: MouseEvent, selectedNode: IUserListItem): void {
    if (this.mouseMovedDistance <= 15) {
      this.selectedNode = selectedNode;
      this.dialog.open(this.nodeContextMenuRef, {
        backdropClass: 'cdk-overlay-transparent-backdrop',
        position: {top: `${event.clientY}px`, left: `${event.clientX}px`}
      }).afterClosed().subscribe(() => this.selectedNode = null);
    }
    this.mouseMovedDistance = 0;
    this.mouseMoveStartPoint = {x: 0, y: 0};
  }

  onNodeMousemove(event: MouseEvent): void {
    const dx = this.mouseMoveStartPoint.x || event.x - event.x;
    const dy = this.mouseMoveStartPoint.y || event.y - event.y;
    this.mouseMovedDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }

  onEdgeClick(selectedEdge: IRelationshipDto): void {
    this.graph$.pipe(
      take(1),
      map(({nodes, edges}) => {
        const [fromUser, toUser] = this.findFromAndToNodesByEdge(nodes, selectedEdge);
        const relations = this.findEdgeWithSameUsers(edges, selectedEdge);
        return {fromUser, toUser, relations};
      })
    ).subscribe(({fromUser, toUser, relations}) => {
      if (!fromUser || !toUser || !relations.length) {
        this.snackbar.open(
          'Something went wrong: Can not open relations list', 'Close',
          {panelClass: 'pn-warn'}
        );
        return;
      }

      this.dialog.open(RelationsListDialogComponent, {
        data: {fromUser, toUser, relations, selectedRelation: selectedEdge}
      });
    });
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
