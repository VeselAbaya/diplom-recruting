import {
  ClassSerializerInterceptor, Controller, Get, Param, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe
} from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { SubPath } from '@monorepo/routes';
import { AuthGuard } from '@nestjs/passport';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
import { GraphSearchParamsDto } from '@components/relationships/dto/graph-search-params.dto';
import { GraphDto } from '@components/relationships/dto/graph.dto';
import { User } from '@components/users/user/user.decorator';

@Controller(SubPath.relationships())
export class RelationshipsController {
  constructor(private readonly relationships: RelationshipsService) {}

  @Get(SubPath.relationships.ofUsers())
  @UseGuards(AuthGuard())
  findAll(@Param('fromUser') fromUserId: string,
          @Param('toUser') toUserId: string): Promise<RelationshipEntity[]> {
    return this.relationships.get(fromUserId, toUserId);
  }

  @Get(SubPath.relationships.graph())
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({transform: true, transformOptions: {enableImplicitConversion: true}}))
  @UseInterceptors(ClassSerializerInterceptor)
  getUsers(@Query() searchParamsDto: GraphSearchParamsDto, @User('id') userId: string): Promise<GraphDto> {
    return this.relationships.getGraph(userId, searchParamsDto);
  }
}
