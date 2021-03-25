import { IRelationRequestDto } from '@monorepo/types/relations/relation-request.dto.interface';
import { RelationType } from '@monorepo/types/relations/relation-type.enum';
import { ExcludeFunctions } from '@shared/utils';

export class RequestEntity implements IRelationRequestDto {
  constructor(requestProps: ExcludeFunctions<RequestEntity>) {
    for (const [key, val] of Object.entries(requestProps)) {
      // @ts-ignore
      this[key] = val;
    }
  }

  comment!: string;
  declined!: boolean;
  description!: string;
  endAt: string | null = null;
  id!: string;
  startAt!: string;
  type!: RelationType;
  createdAt!: number;
  toUserId!: string;
  fromUserId!: string;

  static dummy(): Pick<ExcludeFunctions<RequestEntity>, 'comment' | 'declined' | 'description' | 'endAt'> {
    return {
      comment: '',
      declined: false,
      description: '',
      endAt: null
    };
  }
}
