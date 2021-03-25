import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { RequestRepository } from '@components/requests/request/request.repository';
import { UserEntity } from '@components/users/user/user.entity';
import { RequestEntity } from '@components/requests/request/request.entity';
import { GetRequestsParamsDto } from '@components/requests/dto/get-requests-params.dto';
import { GetRequestsDto } from '@components/requests/dto/get-requests.dto';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
import { MessagesService } from '@components/messages/messages.service';
export declare class RequestsService {
    private readonly requests;
    private readonly messages;
    constructor(requests: RequestRepository, messages: MessagesService);
    create(user: UserEntity, createRequestDto: CreateRequestDto): Promise<RequestEntity>;
    getRequestsFromOneUserToAnother(getRequestsParamsDto: GetRequestsParamsDto): Promise<GetRequestsDto[]>;
    update(requestId: string, updateRequestDto: UpdateRequestDto): Promise<RequestEntity>;
    decline(requestId: string, declinerId: string): Promise<RequestEntity>;
    reopen(requestId: string): Promise<RequestEntity>;
    accept(requestId: string): Promise<RelationshipEntity>;
}
