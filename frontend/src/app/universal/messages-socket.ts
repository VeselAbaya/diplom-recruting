import { IMessagesSocket } from '@shared/components/messages/messages-socket.interfacte';
import { EMPTY, Observable } from 'rxjs';

export class MessagesSocket implements IMessagesSocket {
  // tslint:disable-next-line:no-any
  emit(eventName: string, args: any): any {
  }

  fromEvent<T>(eventName: string): Observable<T> {
    return EMPTY;
  }
}
