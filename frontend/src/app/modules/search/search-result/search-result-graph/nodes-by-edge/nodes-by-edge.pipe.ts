import { Pipe, PipeTransform } from '@angular/core';
import { IUserListItem } from '@monorepo/types/user/user-list-item.dto.interface';
import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';

@Pipe({
  name: 'nodesByEdge'
})
export class NodesByEdgePipe implements PipeTransform {
  transform(edge: IRelationshipDto, nodes: IUserListItem[]): [IUserListItem | null, IUserListItem | null] {
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
}
