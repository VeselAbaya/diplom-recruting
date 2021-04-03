import {
  Body, ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { SubPath } from '@monorepo/routes';
import { AuthGuard } from '@nestjs/passport';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
import { GraphSearchParamsDto } from '@components/relationships/dto/graph-search-params.dto';
import { GraphDto } from '@components/relationships/dto/graph.dto';
import { User } from '@components/users/user/user.decorator';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { RelationParticipantGuard } from '@components/relationships/guards/relation-participant.guard';
import { UpdateRelationshipDto } from '@components/relationships/dto/update-relationship.dto';

@Controller(SubPath.relationships())
export class RelationshipsController {
  constructor(private readonly relationships: RelationshipsService) {}

  @Get(SubPath.relationships.ofUsers())
  @UseGuards(AuthGuard())
  findAll(@Param('fromUser', ParseUUIDPipe) fromUserId: string,
          @Param('toUser', ParseUUIDPipe) toUserId: string): Promise<RelationshipEntity[]> {
    return this.relationships.get(fromUserId, toUserId);
  }

  @Get(SubPath.relationships.graph())
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({transform: true, transformOptions: {enableImplicitConversion: true}}))
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(@Query() searchParamsDto: GraphSearchParamsDto, @User('id') userId: string): Promise<GraphDto> {
    return this.relationships.getGraph(userId, searchParamsDto);
  }

  @Get(SubPath.relationships.userRelationTypes())
  @UseGuards(AuthGuard())
  getUserRelationTypes(@Param('user', ParseUUIDPipe) userId: string): Promise<RelationType[]> {
    return this.relationships.getUserRelationTypes(userId);
  }

  @Patch(SubPath.relationships.relationship())
  @UseGuards(AuthGuard(), RelationParticipantGuard)
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  updateRelationship(@Param('id', ParseUUIDPipe) id: string,
                     @Body() relationshipPatchDto: UpdateRelationshipDto,
                     @User('id') userId: string): Promise<RelationshipEntity> {
    return this.relationships.update(id, relationshipPatchDto, userId);
  }
}
