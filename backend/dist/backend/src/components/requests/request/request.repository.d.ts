import { Neo4j } from '@db/neo4j/neo4j.service';
import { RequestEntity } from './request.entity';
import { ICreateRelationDto } from '@monorepo/types/relations/create-relation.dto.interface';
import { UserRepository } from '@components/users/user/user.repository';
import { UserEntity } from '@components/users/user/user.entity';
import { GetRequestsParamsDto } from '@components/requests/dto/get-requests-params.dto';
import { GetRequestsDto } from '@components/requests/dto/get-requests.dto';
import { UpdateRequestDto } from '@components/requests/dto/update-request.dto';
import { RelationshipEntity } from '@components/relationships/relationship/relationship.entity';
export declare class RequestRepository {
    private readonly db;
    private readonly users;
    constructor(db: Neo4j, users: UserRepository);
    save(fromUser: UserEntity, createRelationDto: ICreateRelationDto): Promise<RequestEntity>;
    get(params: GetRequestsParamsDto): Promise<GetRequestsDto[]>;
    update(requestId: string, updateRequestDto: UpdateRequestDto): Promise<RequestEntity>;
    userIsSenderOfRequest(user: UserEntity, requestId: string): Promise<boolean>;
    userIsReceiverOfRequest(user: UserEntity, requestId: string): Promise<boolean>;
    userIsDeclinerOfRequest(user: UserEntity, requestId: string): Promise<boolean>;
    decline(requestId: string, declinerId: string): Promise<RequestEntity>;
    reopen(requestId: string): Promise<RequestEntity>;
    accept(requestId: string): Promise<RelationshipEntity>;
}
