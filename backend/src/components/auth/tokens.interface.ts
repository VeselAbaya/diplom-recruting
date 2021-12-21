import { IRefreshTokenDto } from '@monorepo/types/auth/refresh-token.dto.interface';

export interface ITokens extends IRefreshTokenDto {
  accessToken: string;
}
