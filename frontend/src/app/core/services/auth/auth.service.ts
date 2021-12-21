import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStoreService } from './token-store.service';
import { BehaviorSubject, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, mapTo, pluck, switchMap, tap } from 'rxjs/operators';
import { ISigninDto } from '@monorepo/types/auth/signin.dto.interface';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';
import { Path } from '@monorepo/routes';
import { ISignupDto } from '@monorepo/types/auth/signup.dto.interface';
import { IRefreshTokenDto } from '@monorepo/types/auth/refresh-token.dto.interface';

const defaultRedirectUrl = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly redirectUrl$ = new BehaviorSubject<string>(defaultRedirectUrl);
  readonly user$: Observable<IUserDto | null>;

  readonly _currentUser = new ReplaySubject<IUserDto | null>(1);

  constructor(private readonly http: HttpClient,
              private readonly router: Router,
              private readonly storage: TokenStoreService) {
    this.user$ = this._currentUser.pipe(distinctUntilChanged());
  }

  loadUser(): Observable<IUserDto | null> {
    return this.http.get<IUserDto>(Path.users.me())
      .pipe(
        catchError(() => of(null)),
        tap(user => this._currentUser.next(user))
      );
  }

  signin(data: ISigninDto): Observable<IUserDto | null> {
    return this.http.post<IRefreshTokenDto>(Path.auth.signin(), data).pipe(
      pluck('refreshToken'),
      tap(refreshToken => this.storage.refreshToken = refreshToken),
      switchMap(() => this.loadUser()),
      tap(() => this.router.navigateByUrl(this.redirectUrl$.value))
    );
  }

  signup(data: ISignupDto): Observable<IUserDto> {
    return this.http.post<IUserDto>(Path.auth.signup(), data);
  }

  updateToken(): Observable<void> {
    if (this.storage.refreshToken === null) {
      return throwError(new Error('No saved refresh token'));
    }

    return this.http.post<IRefreshTokenDto>(Path.auth.refresh(), { refreshToken: this.storage.refreshToken }).pipe(
      pluck('refreshToken'),
      tap(refreshToken => this.storage.refreshToken = refreshToken),
      mapTo(undefined)
    );
  }

  logout(): void {
    if (this.storage.refreshToken !== null) {
      this.http.delete(Path.auth.logout()).subscribe();
    }

    this.storage.refreshToken = null;
    this._currentUser.next(null);

    // prevent reload if it is first (startup) navigation
    if (this.router.navigated) {
      // save current url in case of token expiration to navigate to last route after retry sign in
      this.redirectUrl$.next(this.router.url);
      // navigate to same url to restart guards (to prevent unauthorized access to protected routes)
      this.router.navigate([this.router.url]);
    }
  }
}
