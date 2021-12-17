import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../users/user/user.entity';
import { User } from '../users/user/user.decorator';
import { SignupDto } from './dto/signup.dto';
import { SubPath } from '@monorepo/routes';
import { SigninDto } from './dto/signin.dto';
import { FastifyReply } from 'fastify';
import { Config } from '@config';
import { IRefreshTokenDto } from '@monorepo/types/auth/refresh-token.dto.interface';
import { pick } from 'ramda';
import { ITokens } from '@components/auth/tokens.interface';

@Controller(SubPath.auth())
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post(SubPath.auth.signup())
  @UseInterceptors(ClassSerializerInterceptor)
  signUp(@Body(ValidationPipe) signupDto: SignupDto): Promise<UserEntity> {
    return this.authService.signup(signupDto);
  }

  @Post(SubPath.auth.signin())
  async signIn(@Body(ValidationPipe) signinDto: SigninDto,
               @Res({ passthrough: true }) res: FastifyReply): Promise<IRefreshTokenDto> {
    const tokens = await this.authService.signIn(signinDto);
    return AuthController.setCookieAndReturnRefreshTokenDto(res, tokens);
  }

  @Delete(SubPath.auth.logout())
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  logout(@User() user: UserEntity): void {
    this.authService.logout(user);
  }

  @Post(SubPath.auth.refresh())
  async refresh(@Body() { refreshToken }: { refreshToken: string },
                @Res({ passthrough: true }) res: FastifyReply): Promise<IRefreshTokenDto> {
    const tokens = await this.authService.refresh(refreshToken);
    return AuthController.setCookieAndReturnRefreshTokenDto(res, tokens);
  }

  private static setCookieAndReturnRefreshTokenDto(res: FastifyReply, tokens: ITokens): IRefreshTokenDto {
    res.setCookie('access', tokens.accessToken, {
      httpOnly: true,
      domain: '.pn-graph.com',
      sameSite: 'none',
      secure: true,
      path: '/',
      maxAge: Config.JWT.accessExpiresIn
    });

    return pick(['refreshToken'], tokens);
  }
}
