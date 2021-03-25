import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { RequestEntity } from '@components/requests/request/request.entity';
import { UserEntity } from '@components/users/user/user.entity';
import { GetRequestsParamsDto } from '@components/requests/dto/get-requests-params.dto';
import { IGetRelationRequestsDto } from '@monorepo/types/relations/get-relation-requests.dto.interface';
import { UpdateRequestDto } from '@components/requests/dto/update-request.dto';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
export declare class RequestsController {
    private readonly requests;
    constructor(requests: RequestsService);
    create(user: UserEntity, createRequestDto: CreateRequestDto): Promise<RequestEntity>;
    getRequestsFromOneUserToAnother(params: GetRequestsParamsDto): Promise<IGetRelationRequestsDto[]>;
    update(id: string, updateRequestDto: UpdateRequestDto): Promise<RequestEntity>;
    decline(id: string, userId: string): Promise<RequestEntity>;
    reopen(id: string, userId: string): Promise<RequestEntity>;
    accept(id: string): Promise<RelationshipEntity>;
}
