import { IUserDto } from './user.dto.interface';

export type IUserListItem = IUserDto & {
  notifications: number,
  relationsCount: number,
  networkSize: number,
  intermediate: boolean
};
