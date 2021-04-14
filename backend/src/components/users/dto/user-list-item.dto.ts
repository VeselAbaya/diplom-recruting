import { UserEntity } from '@components/users/user/user.entity';
import { IUserListItem } from '@monorepo/types/user/user-list-item.dto.interface';
import { ExcludeFunctions } from '@shared/utils';

export class UserListItemDto extends UserEntity implements IUserListItem {
  constructor(userProps: ExcludeFunctions<UserEntity>,
              public notifications: number,
              public relationsCount: number,
              public networkSize: number,
              public intermediate: boolean) {
    super(userProps);
  }
}
