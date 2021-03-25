import { IUserDto } from './user/user.dto.interface';
export declare type IUserListItem = IUserDto & {
    notifications: number;
    relationsCount: number;
};
