import { AuthService } from './auth.service';
import { UserEntity } from '../users/user/user.entity';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ITokensDto } from '@monorepo/types/auth/tokens.dto.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(signupDto: SignupDto): Promise<UserEntity>;
    signIn(signinDto: SigninDto): Promise<ITokensDto>;
    logout(user: UserEntity): void;
    refresh({ refreshToken }: {
        refreshToken: string;
    }): Promise<ITokensDto>;
}
