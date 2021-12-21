import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '@shared/tokens/api-base-url.token';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(API_BASE_URL) private readonly apiBaseUrl: string) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('assets') || req.url.includes('shared')) {
      return next.handle(req);
    }

    return next.handle(req.clone({ url: `${this.apiBaseUrl}/${req.url}` }));
  }
}
