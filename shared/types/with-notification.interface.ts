import { IUserDto } from './user/user.dto.interface';

export type IUserListItem = IUserDto & { notifications: number, relationsCount: number };
