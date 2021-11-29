import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { UniversalModule } from '@ng-web-apis/universal';
import { MESSAGES_SOCKET } from '@shared/components/messages/messages-socket.interfacte';
import { MessagesSocket } from './universal/messages-socket';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    UniversalModule
  ],
  providers: [
    { provide: MESSAGES_SOCKET, useClass: MessagesSocket }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
