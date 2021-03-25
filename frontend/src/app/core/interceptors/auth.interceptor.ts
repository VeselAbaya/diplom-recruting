import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import StatusCode from 'http-status-codes';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { environment as env } from '@env';
import { Path } from '@monorepo/routes';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly retryBlacklist = [
    `${env.baseUrl}/${Path.auth.refresh()}`,
    `${env.baseUrl}/${Path.auth.signin()}`
  ];

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.withAuthHeaders(req, next).pipe(
      catchError((res: HttpResponse<unknown>) => {
        if (res.status === StatusCode.UNAUTHORIZED && res.url && !this.retryBlacklist.includes(res.url)) {
          return this.auth.updateToken().pipe(
            take(1),
            switchMap(token => token ? this.withAuthHeaders(req, next) : throwError(res))
          );
        }

        return throwError(res);
      })
    );
  }

  withAuthHeaders(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('assets')) {
      return next.handle(req);
    }

    return this.auth.token$.pipe(
      take(1),
      switchMap(token => next.handle(
        token ? req.clone({setHeaders: {Authorization: `Bearer ${token.accessToken}`}}) : req
      ))
    );
  }
}
