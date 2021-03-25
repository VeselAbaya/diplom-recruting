import { UserEntity } from '@components/users/user/user.entity';
import { IUserListItem } from '@monorepo/types/with-notification.interface';
import { ExcludeFunctions } from '@shared/utils';
export declare class UserWithNotificationDto extends UserEntity implements IUserListItem<UserEntity> {
    notifications: number;
    constructor(userProps: ExcludeFunctions<UserEntity>, notifications: number);
}
