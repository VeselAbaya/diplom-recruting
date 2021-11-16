import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '@core/services/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loading: LoadingService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.includes('assets')) {
      return next.handle(req);
    }

    // TODO but what is it? Fix this or write more informative comment :)
    // this is not a bug
    setTimeout(() => this.loading.on());
    return next.handle(req).pipe(
        finalize(() => setTimeout(() => this.loading.off(), 100))
    );
  }
}
