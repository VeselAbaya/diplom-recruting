import { UserRepository } from '../users/user/user.repository';
import { SignupDto } from './dto/signup.dto';
import { UserEntity } from '../users/user/user.entity';
import { SigninDto } from './dto/signin.dto';
import { ITokensDto } from '@monorepo/types/auth/tokens.dto.interface';
import { TokensService } from './tokens.service';
export declare class AuthService {
    private users;
    private tokens;
    constructor(users: UserRepository, tokens: TokensService);
    signup(signupDto: SignupDto): Promise<UserEntity>;
    signIn(signinDto: SigninDto): Promise<ITokensDto>;
    logout(user: UserEntity): Promise<void>;
    refresh(refreshToken: string): Promise<ITokensDto>;
}
