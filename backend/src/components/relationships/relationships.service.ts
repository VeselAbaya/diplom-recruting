import { Injectable } from '@nestjs/common';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
import { RelationshipRepository } from '@components/relationships/relationship/relationship.repository';
import { GraphDto } from '@components/relationships/dto/graph.dto';
import { GraphSearchParamsDto } from '@components/relationships/dto/graph-search-params.dto';

@Injectable()
export class RelationshipsService {
  constructor(private readonly relationships: RelationshipRepository) {}

  get(fromUserId: string, toUserId: string): Promise<RelationshipEntity[]> {
    return this.relationships.getRelationships(fromUserId, toUserId);
  }

  getGraph(searcherUserId: string, params: GraphSearchParamsDto): Promise<GraphDto> {
    return this.relationships.getGraph(searcherUserId, params);
  }
}
