import { ICreateRelationDto } from '@monorepo/types/relations/create-relation.dto.interface';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
export declare class CreateRequestDto implements ICreateRelationDto {
    comment: string;
    description: string;
    endAt: string | null;
    startAt: string;
    toUserId: string;
    fromUserId: string;
    type: RelationType;
}
