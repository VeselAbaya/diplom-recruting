import { InjectionToken } from '@angular/core';
import { Socket } from 'ngx-socket-io';

export const MESSAGES_SOCKET = new InjectionToken('Socket responsible for messages events');
export type IMessagesSocket = Pick<Socket, 'emit' | 'fromEvent'>;
