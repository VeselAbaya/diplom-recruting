import { IGetRelationRequestsDto } from '@monorepo/types/relations/get-relation-requests.dto.interface';
import { UserEntity } from '@components/users/user/user.entity';
import { RequestEntity } from '@components/requests/request/request.entity';
import { Transform } from 'class-transformer';
import { IRelationRequestUserDto } from '@monorepo/types/relations/relation-request-user.dto.interface';

export class GetRequestsDto implements IGetRelationRequestsDto {
  requests: RequestEntity[];

  @Transform(({value}) => GetRequestsDto._transformUserToPLain(value), {toPlainOnly: true})
  fromUser: UserEntity;

  @Transform(({value}) => GetRequestsDto._transformUserToPLain(value), {toPlainOnly: true})
  toUser: UserEntity;

  constructor({fromUser, toUser, requests}: Pick<GetRequestsDto, 'fromUser' | 'requests' | 'toUser'>) {
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.requests = requests;
  }

  private static _transformUserToPLain(user: UserEntity): IRelationRequestUserDto {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      id: user.id,
      hourlyRate: user.hourlyRate,
      avatarSrc: user.avatarSrc
    };
  }
}
