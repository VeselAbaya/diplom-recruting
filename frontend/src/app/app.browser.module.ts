import { inject, NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from '@env';
import { AppComponent } from './app.component';
import { APP_PORT } from '@shared/tokens/app-port.token';
import { LOCATION } from '@ng-web-apis/common';
import { MESSAGES_SOCKET } from '@shared/components/messages/messages-socket.interfacte';

@NgModule({
  imports: [
    AppModule,
    // SocketIoModule must instantiates only in browser, because on server it causes to infinite rendering
    SocketIoModule.forRoot({url: environment.baseUrl}),
  ],
  providers: [
    { provide: APP_PORT, useFactory: () => inject(LOCATION).port },
    { provide: MESSAGES_SOCKET, useExisting: Socket }
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {}
