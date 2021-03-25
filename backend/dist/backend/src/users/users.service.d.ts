/// <reference types="node" />
import { PatchUserDto } from './dto/patch-user.dto';
import { UserEntity } from './user/user.entity';
import { UserRepository } from './user/user.repository';
import { SearchParamsDto } from './dto/search-params.dto';
import { IPagination } from '@monorepo/types/pagination/pagination.interface';
export declare class UsersService {
    private readonly users;
    constructor(users: UserRepository);
    patchUser(user: UserEntity, patchUserDto: PatchUserDto): Promise<UserEntity>;
    search(searchParamsDto: SearchParamsDto): Promise<IPagination<UserEntity>>;
    uploadAvatar(file: NodeJS.ReadableStream, user: UserEntity): Promise<void>;
}
