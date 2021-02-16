import { IRelationBase } from './relation.base.interface';

export interface ICreateRelationDto extends IRelationBase {
  toUserId: number;
}
