import { UserEntity } from '@components/users/user/user.entity';
import { IUserListItem } from '@monorepo/types/with-notification.interface';
import { ExcludeFunctions } from '@shared/utils';
export declare class UserListItemDto extends UserEntity implements IUserListItem {
    notifications: number;
    relationsCount: number;
    constructor(userProps: ExcludeFunctions<UserEntity>, notifications: number, relationsCount: number);
}
