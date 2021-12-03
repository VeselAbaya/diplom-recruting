import { Inject, Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map, mapTo,
  pluck,
  switchMap,
  switchMapTo,
  take,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isNotNullOrUndefined, isNotNullOrUndefinedArray } from '@shared/utils/is-not-null-or-undefined';
import { IMessageDto } from '@monorepo/types/message/message.dto.interface';
import { Path } from '@monorepo/routes';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { IMessagesSocket, MESSAGES_SOCKET } from '@shared/components/messages/messages-socket.interfacte';

export type IReceiverUser = Pick<IUserDto, 'id' | 'avatarSrc'>;

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends OnDestroyMixin {
  private receiverUser = new BehaviorSubject<IReceiverUser | null>(null);
  receiverUser$ = this.receiverUser.pipe(distinctUntilChanged());

  private list = new BehaviorSubject<IMessageDto[]>([]);
  list$ = this.list.pipe(distinctUntilChanged());

  newMessage$ = this.socket.fromEvent<IMessageDto>('newMessageNotify').pipe(
    withLatestFrom(this.receiverUser),
    filter(([message, receiverUser]) => !receiverUser || receiverUser.id !== message.fromUserId),
    map(([message]) => message)
  );

  constructor(private readonly http: HttpClient,
              private readonly auth: AuthService,
              @Inject(MESSAGES_SOCKET) private readonly socket: IMessagesSocket) {
    super();
    auth.user$.pipe(
      untilComponentDestroyed(this),
      filter(user => !user)
    ).subscribe(() => {
      this.receiverUser.next(null);
      this.list.next([]);
    });

    socket.fromEvent('connect').pipe(
      untilComponentDestroyed(this),
      switchMapTo(auth.user$),
      isNotNullOrUndefined(),
      pluck('id')
    ).subscribe(userId => socket.emit('userIsOnline', {userId}));

    socket.fromEvent<IMessageDto>('message').pipe(
      untilComponentDestroyed(this)
    ).subscribe(message => {
      this.socket.emit('messageRead', message.id);
      this.list.next(this.list.getValue().concat(message));
    });
  }

  send(message: string, toUserId = this.receiverUser.getValue()?.id): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      withLatestFrom(of(toUserId)),
      isNotNullOrUndefinedArray(),
      tap(([currentUserId, receiverUserId]) => {
        this.socket.emit('message', {fromUserId: currentUserId, toUserId: receiverUserId, text: message});
      }),
      mapTo(true),
      catchError(() => of(false))
    );
  }

  openChatWithUser(receiverUser: IReceiverUser): void {
    if (this.receiverUser.getValue()?.id === receiverUser.id) {
      return;
    }

    this.receiverUser.next(receiverUser);
    this.auth.user$.pipe(
      take(1),
      isNotNullOrUndefined(),
      tap(user => this.socket.emit('messagesOpen', {fromUserId: user.id, toUserId: receiverUser.id})),
      switchMap(user => this.http.get<IMessageDto[]>(Path.messages(user.id, receiverUser.id))),
    ).subscribe(res => this.list.next(res));
  }
}
