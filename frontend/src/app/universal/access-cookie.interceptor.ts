import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN } from '@shared/tokens/access.token';
import { API_BASE_URL } from '@shared/tokens/api-base-url.token';

@Injectable()
export class AccessCookieInterceptor implements HttpInterceptor {
  constructor(@Inject(ACCESS_TOKEN) private readonly token: string,
              @Inject(API_BASE_URL) private readonly apiBaseUrl: string) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // we do not want to add cookie to requests for static files or to third-party services
    if (req.url.includes('assets') || !req.url.startsWith(this.apiBaseUrl)) {
      return next.handle(req);
    }

    return next.handle(req.clone({
      withCredentials: true,
      setHeaders: {
        Cookie: `access=${this.token}`
      }
    }));
  }
}
