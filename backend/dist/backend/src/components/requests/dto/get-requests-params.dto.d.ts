import { IGetRelationRequestsParamsDto } from '@monorepo/types/relations/get-relation-requests-params.dto.interface';
export declare class GetRequestsParamsDto implements IGetRelationRequestsParamsDto {
    toUserId: string;
    fromUserId: string;
    declined: boolean;
}
