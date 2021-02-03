import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { TokenStoreHelper } from './token-store';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { ITokensDto } from '@monorepo/dto/auth/tokens.dto.interface';
import { ILoginDto } from '@monorepo/dto/auth/login.dto.interface';
import { IUserDto } from '@monorepo/dto/user.dto.interface';
import { Path } from '@monorepo/routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly redirectUrl$: Observable<UrlTree | string>;
  readonly user$: Observable<IUserDto | null>;
  readonly token$: Observable<ITokensDto | null>;

  private readonly storage = new TokenStoreHelper();
  private readonly currentUser = new ReplaySubject<IUserDto | null>(1);
  private readonly token = new BehaviorSubject<ITokensDto | null>(this.storage.userToken);
  private readonly defaultRedirectUrl = '';
  private readonly redirectUrl = new BehaviorSubject<string>(this.defaultRedirectUrl);

  constructor(private readonly http: HttpClient,
              private readonly router: Router) {
    this.redirectUrl$ = this.redirectUrl.pipe(distinctUntilChanged());
    this.user$ = this.currentUser.pipe(distinctUntilChanged());
    this.token$ = this.token.pipe(distinctUntilChanged());
  }

  redirectTo(url: string): void {
    this.redirectUrl.next(url);
  }

  loadUser(): Observable<IUserDto | null> {
    return this.http.get<IUserDto>(Path.users.me())
      .pipe(
        catchError(() => of(null)),
        tap(user => this.currentUser.next(user))
      );
  }

  login(data: ILoginDto): Observable<IUserDto | null> {
    return this.http.post<ITokensDto>(Path.auth.login(), data).pipe(this.onAfterLogin.bind(this));
  }

  onAfterLogin(obs$: Observable<ITokensDto>): Observable<IUserDto | null> {
    return obs$.pipe(
      tap(tokens => {
        this.storage.initUserToken(tokens);
        this.token.next(tokens);
      }),
      switchMap(() => this.loadUser()),
      tap(() => this.router.navigateByUrl(this.redirectUrl.value))
    );
  }

  updateToken(): Observable<ITokensDto | null> {
    const request = (refreshToken: string) =>
      this.http.post<ITokensDto>(Path.auth.refresh(), {refresh_token: refreshToken}).pipe();

    return this.token$.pipe(
      take(1),
      switchMap(token => token ? request(token.refresh_token) : of(null)),
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
        ? this.http.post(Path.auth.logout(), {})
        : of(null)
      ),
      tap(() => {
        this.storage.userToken = null;
        this.currentUser.next(null);
        this.token.next(null);
      })
    ).subscribe(_ => {
      if (this.router.navigated) {
        this.redirectUrl.next(this.router.url);
        this.router.navigate([this.router.url]);
      }
    });
  }
}
