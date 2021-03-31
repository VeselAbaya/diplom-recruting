import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
import { IGraphDto } from '@monorepo/types/relations/graph.dto.interface';
import { UserListItemDto } from '@components/users/dto/user-list-item.dto';

export class GraphDto implements IGraphDto {
  constructor(public nodes: UserListItemDto[] = [],
              public edges: RelationshipEntity[] = []) {}
}
