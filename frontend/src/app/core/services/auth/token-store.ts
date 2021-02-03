import { ITokensDto } from '@monorepo/dto/auth/tokens.dto.interface';

export class TokenStoreHelper {
  private readonly storageKey: string = 'currentUser';

  get userToken(): ITokensDto | null {
    const val = localStorage.getItem(this.storageKey);
    if (val) {
      return JSON.parse(val);
    }
    else {
      return null;
    }
  }

  set userToken(token: ITokensDto | null) {
    if (token) {
      localStorage.setItem(this.storageKey, JSON.stringify(token));
    } else {
      this.clear();
    }
  }

  initUserToken(token: ITokensDto): void {
    this.clear();
    localStorage.setItem(this.storageKey, JSON.stringify(token));
  }

  private clear(): void {
    localStorage.removeItem(this.storageKey);
  }
}
