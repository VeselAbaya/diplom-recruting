import { UserEntity } from './user/user.entity';
import { PatchUserDto } from './dto/patch-user.dto';
import { UsersService } from './users.service';
import { SearchParamsDto } from './dto/search-params.dto';
import { FastifyRequest } from 'fastify';
import { UserListItemDto } from '@components/users/dto/user-list-item.dto';
import { PaginationDto } from '@shared/pagination.dto';
export declare class UsersController {
    private readonly users;
    constructor(users: UsersService);
    getUserByToken(user: UserEntity): UserEntity;
    getUserById(id: string, user: UserEntity): Promise<UserEntity>;
    patchUser(user: UserEntity, patchUserDto: PatchUserDto): Promise<UserEntity>;
    getUsers(searchParamsDto: SearchParamsDto, userId: string): Promise<PaginationDto<UserListItemDto>>;
    uploadAvatar(req: FastifyRequest, user: UserEntity): void;
}
