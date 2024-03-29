import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../users/user/user.repository';
import { SignupDto } from './dto/signup.dto';
import { UserEntity } from '../users/user/user.entity';
import { SigninDto } from './dto/signin.dto';
import { TokensService } from './tokens.service';
import { AuthException } from './auth.exceptions';
import { ITokens } from '@components/auth/tokens.interface';

@Injectable()
export class AuthService {
  constructor(private users: UserRepository,
              private tokens: TokensService) {
  }

  async signup(signupDto: SignupDto): Promise<UserEntity> {
    const newUser = await this.users.create(signupDto);
    if (!newUser) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: ['Something went wrong during user creation'],
        error: 'user-creation-error'
      });
    }

    return newUser;
  }

  async signIn(signinDto: SigninDto): Promise<ITokens> {
    const user = await this.users.validateUserPassword(signinDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.tokens.generate({ id: user.id });
    user.accessToken = tokens.accessToken;
    user.refreshToken = tokens.refreshToken;
    await this.users.save(user);
    return tokens;
  }

  async logout(user: UserEntity): Promise<void> {
    user.accessToken = null;
    user.refreshToken = null;
    await this.users.save(user);
  }

  async refresh(refreshToken: string): Promise<ITokens> {
    const { id: userId } = this.tokens.verify(refreshToken);
    const user = await this.users.findBy('id', userId);
    if (!user) {
      throw AuthException.userNotFound();
    }

    const tokens = await this.tokens.generate({ id: user.id });
    user.accessToken = tokens.accessToken;
    user.refreshToken = tokens.refreshToken;
    await this.users.save(user);
    return tokens;
  }
}
