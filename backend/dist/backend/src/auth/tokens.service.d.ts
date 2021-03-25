import { ITokensDto } from '@monorepo/types/auth/tokens.dto.interface';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from './jwt/jwt-payload.interface';
import { JwtVerifyOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
export declare class TokensService {
    private readonly jwt;
    constructor(jwt: JwtService);
    generate(payload: IJwtPayload): Promise<ITokensDto>;
    verify(token: string, options?: JwtVerifyOptions): IJwtPayload;
}
