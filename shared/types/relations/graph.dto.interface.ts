import { IRelationshipDto } from '../relationships/relationship.dto.interface';
import { IUserListItem } from '../user/user-list-item.dto.interface';

export interface IGraphDto {
  nodes: IUserListItem[];
  edges: IRelationshipDto[];
}
