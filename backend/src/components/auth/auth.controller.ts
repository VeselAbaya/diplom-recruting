import {
  Body,
  ClassSerializerInterceptor,
  Controller, Delete,
  Post,
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
import { ITokensDto } from '@monorepo/types/auth/tokens.dto.interface';

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
  signIn(@Body(ValidationPipe) signinDto: SigninDto): Promise<ITokensDto> {
    return this.authService.signIn(signinDto);
  }

  @Delete(SubPath.auth.logout())
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  logout(@User() user: UserEntity): void {
    this.authService.logout(user);
  }

  @Post(SubPath.auth.refresh())
  refresh(@Body() {refreshToken}: {refreshToken: string}): Promise<ITokensDto> {
    return this.authService.refresh(refreshToken);
  }
}
