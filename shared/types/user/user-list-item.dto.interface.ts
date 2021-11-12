import { IUserDto } from './user.dto.interface';

export type IUserListItem = IUserDto & {
  notifications: number,
  relationsCount: number,
  relationsWithOriginCount: number,
  networkSize: number,
  intermediate: boolean
};
