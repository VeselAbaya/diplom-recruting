import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { SearchService } from '@modules/search/search.service';
import { map } from 'rxjs/operators';
import { GRAPH, Layout } from '@modules/search/search-result/search-result-graph/layout';
import { DEFAULT_AVATAR_URL } from '@monorepo/constants';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-search-result-graph',
  templateUrl: './search-result-graph.component.html',
  styleUrls: ['./search-result-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultGraphComponent {
  layout = new Layout();
  NODE_SIZE = GRAPH.NODE_SIZE;
  DEFAULT_AVATAR_URL = DEFAULT_AVATAR_URL;

  @ViewChild('nodeContextMenu', {static: true, read: TemplateRef}) nodeContextMenuRef!: TemplateRef<void>;

  mouseMoveStartPoint = {x: 0, y: 0};
  private mouseMovedDistance = 0;

  nodes = [
    {
      id: 'first',
      label: 'A'
    }, {
      id: 'second',
      label: 'B'
    }, {
      id: 'third',
      label: 'C'
    }, {
      id: 'fourth',
      label: 'D'
    }, {
      id: 'fifth',
      label: 'E'
    }
  ];

  links = [
    {
      id: 'a',
      source: 'first',
      target: 'second',
      label: 'A is parent of'
    }, {
      id: 'b',
      source: 'first',
      target: 'third',
      label: 'B custom label'
    }, {
      id: 'c',
      source: 'fourth',
      target: 'fifth',
      label: 'C custom label'
    }, {
      id: 'd',
      source: 'fifth',
      target: 'first',
      label: 'D custom label'
    }, {
      id: 'e',
      source: 'second',
      target: 'first',
      label: 'E is child of'
    }, {
      id: 'f',
      source: 'second',
      target: 'first',
      label: 'F is child of'
    }, {
      id: 'g',
      source: 'first',
      target: 'second',
      label: 'G is child of'
    }, {
      id: 'h',
      source: 'second',
      target: 'first',
      label: 'H is child of'
    }, {
      id: 'I',
      source: 'first',
      target: 'fourth',
      label: 'I is child of'
    }
  ];

  selectedUserId$ = this.search.selectedUser$.pipe(map(user => 'second'));

  constructor(private readonly search: SearchService, private readonly dialog: MatDialog) {}

  onNodeClick(event: MouseEvent): void {
    if (this.mouseMovedDistance <= 15) {
      this.dialog.open(this.nodeContextMenuRef, {
        backdropClass: 'cdk-overlay-transparent-backdrop',
        position: {top: `${event.clientY}px`, left: `${event.clientX}px`}
      });
    }
    this.mouseMovedDistance = 0;
    this.mouseMoveStartPoint = {x: 0, y: 0};
  }

  onNodeMousemove(event: MouseEvent): void {
    const dx = this.mouseMoveStartPoint.x || event.x - event.x;
    const dy = this.mouseMoveStartPoint.y || event.y - event.y;
    this.mouseMovedDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
}
