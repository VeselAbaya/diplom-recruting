import { Inject, Injectable } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import {
  distinctUntilChanged,
  filter,
  finalize,
  map,
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
  private readonly receiverUser = new BehaviorSubject<IReceiverUser | null>(null);
  readonly receiverUser$ = this.receiverUser.pipe(distinctUntilChanged());

  private readonly list = new BehaviorSubject<IMessageDto[]>([]);
  readonly list$ = this.list.pipe(distinctUntilChanged());

  private readonly isSending = new BehaviorSubject(false);
  readonly isSending$ = this.isSending.pipe(distinctUntilChanged());

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
      filter(user => !user),
      untilComponentDestroyed(this)
    ).subscribe(() => {
      this.receiverUser.next(null);
      this.list.next([]);
    });

    socket.fromEvent('connect').pipe(
      switchMapTo(auth.user$),
      isNotNullOrUndefined(),
      pluck('id'),
      untilComponentDestroyed(this)
    ).subscribe(userId => socket.emit('userIsOnline', { userId }));

    socket.fromEvent<IMessageDto>('message').pipe(
      untilComponentDestroyed(this),
    ).subscribe(message => {
      this.socket.emit('messageRead', message.id);
      this.list.next(this.list.getValue().concat(message));
    });
  }

  send(message: string, toUserId = this.receiverUser.getValue()?.id): Observable<IMessageDto> {
    this.isSending.next(true);
    return this.auth.user$.pipe(
      take(1),
      map(user => user?.id),
      withLatestFrom(of(toUserId)),
      isNotNullOrUndefinedArray(),
      tap(([currentUserId, receiverUserId]) =>
        this.socket.emit('message', { fromUserId: currentUserId, toUserId: receiverUserId, text: message })
      ),
      // TODO Figure out why it is not working without this nested pipe
      switchMap(([currentUserId]) => this.socket.fromEvent<IMessageDto>('message').pipe(
        filter(newMessage => newMessage.fromUserId === currentUserId),
        take(1),
        finalize(() => this.isSending.next(false))
      ))
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
      tap(user => this.socket.emit('messagesOpen', { fromUserId: user.id, toUserId: receiverUser.id })),
      switchMap(user => this.http.get<IMessageDto[]>(Path.messages(user.id, receiverUser.id))),
    ).subscribe(res => this.list.next(res));
  }
}
