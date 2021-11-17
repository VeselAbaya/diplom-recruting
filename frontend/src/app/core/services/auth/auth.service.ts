import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStoreService } from './token-store.service';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, distinctUntilChanged, filter, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { ITokensDto } from '@monorepo/types/auth/tokens.dto.interface';
import { ISigninDto } from '@monorepo/types/auth/signin.dto.interface';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';
import { Path } from '@monorepo/routes';
import { ISignupDto } from '@monorepo/types/auth/signup.dto.interface';

const defaultRedirectUrl = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly redirectUrl$ = new BehaviorSubject<string>(defaultRedirectUrl);
  readonly user$: Observable<IUserDto | null>;
  readonly token$: Observable<ITokensDto | null>;

  readonly _currentUser = new ReplaySubject<IUserDto | null>(1);
  private readonly token = new BehaviorSubject<ITokensDto | null>(this.storage.userToken);

  constructor(private readonly http: HttpClient,
              private readonly router: Router,
              private readonly storage: TokenStoreService) {
    this.user$ = this._currentUser.pipe(distinctUntilChanged());
    this.token$ = this.token.pipe(distinctUntilChanged());
  }

  loadUser(): Observable<IUserDto | null> {
    return this.http.get<IUserDto>(Path.users.me())
      .pipe(
        catchError(() => of(null)),
        tap(user => this._currentUser.next(user))
      );
  }

  signin(data: ISigninDto): Observable<IUserDto | null> {
    return this.http.post<ITokensDto>(Path.auth.signin(), data).pipe(this.onAfterLogin.bind(this));
  }

  signup(data: ISignupDto): Observable<IUserDto> {
    return this.http.post<IUserDto>(Path.auth.signup(), data);
  }

  onAfterLogin(obs$: Observable<ITokensDto>): Observable<IUserDto | null> {
    return obs$.pipe(
      tap(tokens => {
        this.storage.initUserToken(tokens);
        this.token.next(tokens);
      }),
      switchMap(() => this.loadUser()),
      tap(() => this.router.navigateByUrl(this.redirectUrl$.value))
    );
  }

  updateToken(): Observable<ITokensDto | null> {
    const refresh = (refreshToken: string) => this.http.post<ITokensDto>(Path.auth.refresh(), {refreshToken});

    return this.token$.pipe(
      take(1),
      switchMap(token => token ? refresh(token.refreshToken) : of(null)),
      tap(token => this.token.next(token)),
      tap(token => this.storage.userToken = token),
      tap(token => !token && this.logout()),
      switchMapTo(this.token$)
    );
  }

  logout(): void {
    this.token$.pipe(
      take(1),
      switchMap(token => token
        ? this.http.delete(Path.auth.logout())
        : of(null)
      ),
      tap(() => {
        this.storage.userToken = null;
        this._currentUser.next(null);
        this.token.next(null);
      }),
      filter(() => this.router.navigated) // prevent reload if it is first (startup) navigation
    ).subscribe(() => {
      // save current url in case of token expiration to navigate to last route after retry sign in
      this.redirectUrl$.next(this.router.url);
      // navigate to same url to restart guards (to prevent unauthorized access to protected routes)
      this.router.navigate([this.router.url]);
    });
  }
}
