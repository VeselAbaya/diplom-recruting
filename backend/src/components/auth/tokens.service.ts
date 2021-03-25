import { Injectable } from '@nestjs/common';
import { ITokensDto } from '@monorepo/types/auth/tokens.dto.interface';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt/jwt-payload.interface';
import { Config } from '@config';
import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { AuthException } from './auth.exceptions';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class TokensService {
  constructor(private readonly jwt: JwtService) {
  }

  async generate(payload: IJwtPayload): Promise<ITokensDto> {
    const accessToken = await this.jwt.sign(payload, {expiresIn: Config.JWT.accessExpiresIn});
    const refreshToken = await this.jwt.sign({...payload, accessToken}, {expiresIn: Config.JWT.refreshExpiresIn});
    return {accessToken, refreshToken};
  }

  verify(token: string, options?: JwtVerifyOptions): IJwtPayload {
    try {
      return this.jwt.verify(token, options);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw AuthException.tokenExpired();
      }
      throw AuthException.tokenInvalid();
    }
  }
}
