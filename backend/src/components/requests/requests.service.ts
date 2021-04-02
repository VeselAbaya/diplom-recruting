import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestRepository } from '@components/requests/request/request.repository';
import { UserEntity } from '@components/users/user/user.entity';
import { RequestEntity } from '@components/requests/request/request.entity';
import { GetRequestsParamsDto } from '@components/requests/dto/get-requests-params.dto';
import { GetRequestsDto } from '@components/requests/dto/get-requests.dto';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
import { MessagesService } from '@components/messages/messages.service';

@Injectable()
export class RequestsService {
  constructor(private readonly requests: RequestRepository, private readonly messages: MessagesService) {}

  async create(user: UserEntity, createRequestDto: CreateRequestDto): Promise<RequestEntity> {
    const request = await this.requests.save(user, createRequestDto);
    if (createRequestDto.comment) {
      this.messages.save({
        fromUserId: createRequestDto.fromUserId,
        toUserId: createRequestDto.toUserId,
        text: createRequestDto.comment
      });
    }
    return request;
  }

  getRequestsFromOneUserToAnother(getRequestsParamsDto: GetRequestsParamsDto): Promise<GetRequestsDto[]> {
    return this.requests.get(getRequestsParamsDto);
  }

  update(requestId: string, updateRequestDto: UpdateRequestDto): Promise<RequestEntity> {
    return this.requests.update(requestId, updateRequestDto);
  }

  decline(requestId: string, declinerId: string): Promise<RequestEntity> {
    return this.requests.decline(requestId, declinerId);
  }

  reopen(requestId: string): Promise<RequestEntity> {
    return this.requests.reopen(requestId);
  }

  accept(requestId: string): Promise<RelationshipEntity> {
    return this.requests.accept(requestId);
  }
}
