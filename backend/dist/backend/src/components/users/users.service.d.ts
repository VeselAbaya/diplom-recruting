/// <reference types="node" />
import { PatchUserDto } from './dto/patch-user.dto';
import { UserEntity } from './user/user.entity';
import { UserRepository } from './user/user.repository';
import { SearchParamsDto } from './dto/search-params.dto';
import { UserListItemDto } from '@components/users/dto/user-list-item.dto';
import { PaginationDto } from '@shared/pagination.dto';
export declare class UsersService {
    private readonly users;
    constructor(users: UserRepository);
    patchUser(user: UserEntity, patchUserDto: PatchUserDto): Promise<UserEntity>;
    getUserById(id: string): Promise<UserEntity>;
    search(searcherUserId: string, searchParamsDto: SearchParamsDto): Promise<PaginationDto<UserListItemDto>>;
    uploadAvatar(file: NodeJS.ReadableStream, user: UserEntity): Promise<void>;
}
