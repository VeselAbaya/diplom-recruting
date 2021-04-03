import { Injectable } from '@nestjs/common';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
import { RelationshipRepository } from '@components/relationships/relationship/relationship.repository';
import { GraphDto } from '@components/relationships/dto/graph.dto';
import { GraphSearchParamsDto } from '@components/relationships/dto/graph-search-params.dto';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { UpdateRelationshipDto } from '@components/relationships/dto/update-relationship.dto';
import { MessagesService } from '@components/messages/messages.service';
import { CreateMessageDto } from '@components/messages/dto/create-message.dto';

@Injectable()
export class RelationshipsService {
  constructor(private readonly relationships: RelationshipRepository, private readonly messages: MessagesService) {}

  get(fromUserId: string, toUserId: string): Promise<RelationshipEntity[]> {
    return this.relationships.getRelationships(fromUserId, toUserId);
  }

  getGraph(searcherUserId: string, params: GraphSearchParamsDto): Promise<GraphDto> {
    return this.relationships.getGraph(searcherUserId, params);
  }

  getUserRelationTypes(userId: string): Promise<RelationType[]> {
    return this.relationships.getUserRelationTypes(userId);
  }

  async update(id: string, patchDto: UpdateRelationshipDto): Promise<RelationshipEntity> {
    const updatedRelation = await this.relationships.update(id, patchDto);
    if (updatedRelation) {
      this.messages.save(new CreateMessageDto(updatedRelation.fromUserId, updatedRelation.toUserId, patchDto.comment));
    }
    return this.relationships.update(id, patchDto);
  }
}
