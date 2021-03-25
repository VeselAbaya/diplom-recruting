import { UserEntity } from '@components/users/user/user.entity';
import { IUserListItem } from '@monorepo/types/with-notification.interface';
import { ExcludeFunctions } from '@shared/utils';

export class UserListItemDto extends UserEntity implements IUserListItem {
  constructor(userProps: ExcludeFunctions<UserEntity>,
              public notifications: number,
              public relationsCount: number) {
    super(userProps);
  }
}
