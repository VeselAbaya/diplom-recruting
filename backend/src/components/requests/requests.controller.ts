import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors, ClassSerializerInterceptor, Query, Patch
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { SubPath } from '@monorepo/routes';
import { RequestEntity } from '@components/requests/request/request.entity';
import { User } from '@components/users/user/user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '@components/users/user/user.entity';
import { GetRequestsParamsDto } from '@components/requests/dto/get-requests-params.dto';
import { IGetRelationRequestsDto } from '@monorepo/types/relations/get-relation-requests.dto.interface';
import { UpdateRequestDto } from '@components/requests/dto/update-request.dto';
import { RequestSenderGuard } from '@components/requests/guards/request-sender.guard';
import { RequestSenderOrReceiverGuard } from '@components/requests/guards/request-sender-or-receiver-guard.service';
import { RequestReceiverGuard } from '@components/requests/guards/request-receiver.guard';
import { RequestDeclinerGuard } from '@components/requests/guards/request-decliner.guard';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';

@Controller(SubPath.relationRequests())
export class RequestsController {
  constructor(private readonly requests: RequestsService) {}

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  create(@User() user: UserEntity, @Body() createRequestDto: CreateRequestDto): Promise<RequestEntity> {
    return this.requests.create(user, createRequestDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({transform: true}))
  @UseInterceptors(ClassSerializerInterceptor)
  getRequestsFromOneUserToAnother(@Query() params: GetRequestsParamsDto): Promise<IGetRelationRequestsDto[]> {
    return this.requests.getRequestsFromOneUserToAnother(params);
  }

  @Patch(SubPath.relationRequests.request())
  @UseGuards(AuthGuard(), RequestSenderGuard)
  @UsePipes(ValidationPipe)
  update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto): Promise<RequestEntity> {
    return this.requests.update(id, updateRequestDto);
  }

  @Patch(SubPath.relationRequests.decline())
  @UseGuards(AuthGuard(), RequestSenderOrReceiverGuard)
  decline(@Param('id') id: string, @User('id') userId: string): Promise<RequestEntity> {
    return this.requests.decline(id, userId);
  }

  @Patch(SubPath.relationRequests.reopen())
  @UseGuards(AuthGuard(), RequestDeclinerGuard)
  reopen(@Param('id') id: string, @User('id') userId: string): Promise<RequestEntity> {
    return this.requests.reopen(id);
  }

  @Delete(SubPath.relationRequests.accept())
  @UseGuards(AuthGuard(), RequestReceiverGuard)
  accept(@Param('id') id: string): Promise<RelationshipEntity> {
    return this.requests.accept(id);
  }

  // @Get()
  // findAll() {
  //   return this.requestsService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.requestsService.findOne(+id);
  // }
  //
  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
  //   return this.requestsService.update(+id, updateRequestDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.requestsService.remove(+id);
  // }
}
