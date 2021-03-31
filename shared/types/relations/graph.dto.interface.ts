import { IRelationshipDto } from '../relationships/relationship.dto.interface';
import { IUserListItem } from '../with-notification.interface';

export interface IGraphDto {
  nodes: IUserListItem[];
  edges: IRelationshipDto[];
}
