import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PatchUserDto } from './dto/patch-user.dto';
import { UserEntity } from './user/user.entity';
import { UserRepository } from './user/user.repository';
import { SearchParamsDto } from './dto/search-params.dto';
import { IPagination } from '@monorepo/types/pagination/pagination.interface';
import { promisify } from 'util';
import * as stream from 'stream';
import { createWriteStream } from 'fs';
import { AVATAR_EXT } from '@monorepo/constants';
import { join } from 'path';
import { UserListItemDto } from '@components/users/dto/user-list-item.dto';
import { PaginationDto } from '@shared/pagination.dto';

@Injectable()
export class UsersService {
  constructor(private readonly users: UserRepository) {}

  patchUser(user: UserEntity, patchUserDto: PatchUserDto): Promise<UserEntity> {
    return this.users.save(Object.assign(user, patchUserDto));
  }

  async getUserById(id: string): Promise<UserEntity> {
    const user = await this.users.findBy('id', id);
    if (!user) {
      throw new InternalServerErrorException();
    }
    return user;
  }

  search(searcherUserId: string, searchParamsDto: SearchParamsDto): Promise<PaginationDto<UserListItemDto>> {
    return this.users.find(searcherUserId, searchParamsDto);
  }

  async uploadAvatar(file: NodeJS.ReadableStream, user: UserEntity): Promise<void> {
    const avatarLocation = join('public', 'uploads', `avatar-${user.id}.${AVATAR_EXT}`);
    const pipeline = promisify(stream.pipeline);
    const writeStream = createWriteStream(avatarLocation);
    await pipeline(file, writeStream);
    user.avatarSrc = avatarLocation;
    await this.users.save(user);
  }
}
