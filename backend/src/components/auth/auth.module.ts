import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { Config } from '@config';
import { TokensService } from './tokens.service';
import { UsersModule } from '../users/users.module';


@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_SECRET || Config.JWT.secret,
      signOptions: {
        expiresIn: Config.JWT.accessExpiresIn
      }
    }),
    UsersModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokensService],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
