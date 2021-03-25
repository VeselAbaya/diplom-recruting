import { RelationType } from './relation-type.enum';

export interface IRelationBase {
  type: RelationType;
  startAt: string;
  endAt: string | null;
  comment: string;
  description: string;
}
