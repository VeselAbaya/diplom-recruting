import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UniversalModule } from '@ng-web-apis/universal';
import { MESSAGES_SOCKET } from '@shared/components/messages/messages-socket.interfacte';
import { MessagesSocket } from './universal/messages-socket';
import { API_BASE_URL } from '@shared/tokens/api-base-url.token';
import { APP_DOMAIN } from '@shared/tokens/app-domain.token';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccessCookieInterceptor } from './universal/access-cookie.interceptor';
import { IS_BROWSER } from '@shared/tokens/is-browser.token';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    UniversalModule,
    ServerTransferStateModule
  ],
  providers: [
    { provide: API_BASE_URL, useValue: 'http://backend:3000' },
    { provide: APP_DOMAIN, useValue: `http://localhost:4200` },
    { provide: MESSAGES_SOCKET, useClass: MessagesSocket },
    { provide: HTTP_INTERCEPTORS, multi: true, useClass: AccessCookieInterceptor },
    { provide: IS_BROWSER, useValue: false }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {
}
