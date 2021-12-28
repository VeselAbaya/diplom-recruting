import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IUserListItem } from '@monorepo/types/user/user-list-item.dto.interface';
import { DEFAULT_AVATAR_URL } from '@monorepo/constants';
import { Node } from '@swimlane/ngx-graph';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-user-node]',
  templateUrl: './user-node.component.html',
  styleUrls: ['./user-node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserNodeComponent {
  @Input() node!: IUserListItem & Node;
  @Input() isSelected = false;
  @Input('aria-label') ariaLabel = '';
  @Input('aria-haspopup') ariaHasPopup = '';

  mouseMoveStartPoint = { x: 0, y: 0 };
  private mouseMovedDistance = 0;
  readonly DEFAULT_AVATAR_URL = DEFAULT_AVATAR_URL;

  @Output() readonly nodeClick = new EventEmitter<IUserListItem & Node>();

  emitNodeClickIfMouseNotMovedSoFar(selectedNode: IUserListItem & Node): void {
    if (this.mouseMovedDistance <= 15) {
      this.nodeClick.emit(selectedNode);
    }
    this.mouseMovedDistance = 0;
    this.mouseMoveStartPoint = { x: 0, y: 0 };
  }

  onNodeMousemove(event: MouseEvent): void {
    const dx = this.mouseMoveStartPoint.x || event.x - event.x;
    const dy = this.mouseMoveStartPoint.y || event.y - event.y;
    this.mouseMovedDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  }
}
