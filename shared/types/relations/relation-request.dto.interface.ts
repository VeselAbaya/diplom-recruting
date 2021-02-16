import { IRelationBase } from './relation.base.interface';
import { IUserDtoInterface } from '../auth/user.dto.interface';

export interface IRelationRequestDto extends IRelationBase {
  id: number;
  declined: boolean;
  fromUser: IUserDtoInterface;
  toUser: IUserDtoInterface;
}
