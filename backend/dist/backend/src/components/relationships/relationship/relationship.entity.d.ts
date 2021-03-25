import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { ExcludeFunctions } from '@shared/utils';
export declare class RelationshipEntity implements IRelationshipDto {
    constructor(requestProps: ExcludeFunctions<RelationshipEntity>);
    createdAt: number;
    description: string;
    endAt: string | null;
    fromUserId: string;
    id: string;
    startAt: string;
    toUserId: string;
    type: RelationType;
}
