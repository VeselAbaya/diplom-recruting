import { ITokensDto } from '@monorepo/types/auth/tokens.dto.interface';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@ng-web-apis/common';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {
  private readonly storageKey: string = 'currentUser';

  constructor(@Inject(LOCAL_STORAGE) private localStorage: Storage) {
  }

  get userToken(): ITokensDto | null {
    const val = this.localStorage.getItem(this.storageKey);
    if (val) {
      return JSON.parse(val);
    }
    else {
      return null;
    }
  }

  set userToken(token: ITokensDto | null) {
    if (token) {
      this.localStorage.setItem(this.storageKey, JSON.stringify(token));
    } else {
      this.clear();
    }
  }

  initUserToken(token: ITokensDto): void {
    this.clear();
    this.localStorage.setItem(this.storageKey, JSON.stringify(token));
  }

  private clear(): void {
    this.localStorage.removeItem(this.storageKey);
  }
}
