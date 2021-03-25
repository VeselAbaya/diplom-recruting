import { UserEntity } from './user/user.entity';
import { PatchUserDto } from './dto/patch-user.dto';
import { UsersService } from './users.service';
import { SearchParamsDto } from './dto/search-params.dto';
import { IPagination } from '@monorepo/types/pagination/pagination.interface';
import { FastifyRequest } from 'fastify';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    getUserByToken(user: UserEntity): UserEntity;
    patchUser(user: UserEntity, patchUserDto: PatchUserDto): Promise<UserEntity>;
    getUsers(searchParamsDto: SearchParamsDto): Promise<IPagination<UserEntity>>;
    uploadAvatar(req: FastifyRequest, user: UserEntity): void;
}
