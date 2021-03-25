import { IGetRelationRequestsDto } from '@monorepo/types/relations/get-relation-requests.dto.interface';
import { UserEntity } from '@components/users/user/user.entity';
import { RequestEntity } from '@components/requests/request/request.entity';
export declare class GetRequestsDto implements IGetRelationRequestsDto {
    requests: RequestEntity[];
    fromUser: UserEntity;
    toUser: UserEntity;
    constructor({ fromUser, toUser, requests }: Pick<GetRequestsDto, 'fromUser' | 'requests' | 'toUser'>);
    private static _transformUserToPLain;
}
