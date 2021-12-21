import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import StatusCode from 'http-status-codes';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment as env } from '@env';
import { Path } from '@monorepo/routes';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly retryBlacklist = [
    `${env.baseApiUrl}/${Path.auth.refresh()}`,
    `${env.baseApiUrl}/${Path.auth.signin()}`
  ];

  constructor(private readonly auth: AuthService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('assets')) {
      return next.handle(req);
    }

    const reqWithCredentials = req.clone({ withCredentials: true });
    return next.handle(reqWithCredentials).pipe(
      catchError((res: HttpResponse<unknown>) => {
        if (res.status === StatusCode.UNAUTHORIZED && res.url && !this.retryBlacklist.includes(res.url)) {
          return this.auth.updateToken().pipe(
            switchMap(() => next.handle(reqWithCredentials))
          );
        }

        return throwError(res);
      })
    );
  }
}
