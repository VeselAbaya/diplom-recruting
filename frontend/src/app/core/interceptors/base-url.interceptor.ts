import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env';
import { Observable } from 'rxjs';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('assets') || req.url.includes('shared')) {
      return next.handle(req);
    }

    return next.handle(req.clone({url: `${env.baseUrl}/${req.url}`}));
  }
}
