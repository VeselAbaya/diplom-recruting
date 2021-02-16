import { RelationType } from './relation-type.enum';

export interface IRelationBase {
  type: RelationType;
  start: number;
  end: number | null;
  comment: string;
  description: string;
}
