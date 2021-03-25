import { IRelationshipDto } from '@monorepo/types/relationships/relationship.dto.interface';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { ExcludeFunctions } from '@shared/utils';

export class RelationshipEntity implements IRelationshipDto {
  constructor(requestProps: ExcludeFunctions<RelationshipEntity>) {
    for (const [key, val] of Object.entries(requestProps)) {
      // @ts-ignore
      this[key] = val;
    }
  }

  createdAt!: number;
  description!: string;
  endAt!: string | null;
  fromUserId!: string;
  id!: string;
  startAt!: string;
  toUserId!: string;
  type!: RelationType;
}
