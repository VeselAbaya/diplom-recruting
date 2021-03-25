import { UserEntity } from './user.entity';
import { Neo4j } from '@db/neo4j/neo4j.service';
import { ISignupDto } from '@monorepo/types/auth/signup.dto.interface';
import { SigninDto } from '../../auth/dto/signin.dto';
import { SearchParamsDto } from '../dto/search-params.dto';
import { IPagination } from '@monorepo/types/pagination/pagination.interface';
export declare class UserRepository {
    private db;
    constructor(db: Neo4j);
    create(signUpDto: ISignupDto): Promise<UserEntity | null>;
    save(user: UserEntity): Promise<UserEntity>;
    findBy(key: keyof Exclude<UserEntity, () => void>, value: unknown): Promise<UserEntity | null>;
    find(params: SearchParamsDto): Promise<IPagination<UserEntity>>;
    validateUserPassword({ email, password }: SigninDto): Promise<UserEntity | null>;
}
