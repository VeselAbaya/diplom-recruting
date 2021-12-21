import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from '@env';
import { AppComponent } from './app.component';
import { MESSAGES_SOCKET } from '@shared/components/messages/messages-socket.interfacte';
import { APP_DOMAIN } from '@shared/tokens/app-domain.token';
import { API_BASE_URL } from '@shared/tokens/api-base-url.token';


@NgModule({
  imports: [
    AppModule,
    // SocketIoModule must instantiate only in browser, because on server it causes to infinite rendering
    SocketIoModule.forRoot({ url: environment.baseApiUrl })
  ],
  providers: [
    { provide: API_BASE_URL, useValue: environment.baseApiUrl },
    { provide: APP_DOMAIN, useValue: '' },
    { provide: MESSAGES_SOCKET, useExisting: Socket }
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
