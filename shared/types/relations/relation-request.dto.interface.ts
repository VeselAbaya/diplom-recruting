import { IRelationBase } from './relation.base.interface';

export interface IRelationRequestDto extends IRelationBase {
  id: string;
  declined: boolean;
  createdAt: number;
  declinedBy?: string;
  toUserId: string;
  fromUserId: string;
}
