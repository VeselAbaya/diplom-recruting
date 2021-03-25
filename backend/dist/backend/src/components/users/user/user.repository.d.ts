import { UserEntity } from './user.entity';
import { Neo4j } from '@db/neo4j/neo4j.service';
import { ISignupDto } from '@monorepo/types/auth/signup.dto.interface';
import { SigninDto } from '../../auth/dto/signin.dto';
import { SearchParamsDto } from '../dto/search-params.dto';
import { UserListItemDto } from '@components/users/dto/user-list-item.dto';
import { PaginationDto } from '@shared/pagination.dto';
export declare class UserRepository {
    private db;
    constructor(db: Neo4j);
    create(signUpDto: ISignupDto): Promise<UserEntity | null>;
    save(user: UserEntity): Promise<UserEntity>;
    findBy(key: keyof Exclude<UserEntity, () => void>, value: unknown): Promise<UserEntity | null>;
    find(searcherUserId: string, params: SearchParamsDto): Promise<PaginationDto<UserListItemDto>>;
    validateUserPassword({ email, password }: SigninDto): Promise<UserEntity | null>;
    getUserOrThrowError(userId: string): Promise<UserEntity>;
}
