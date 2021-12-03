import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { ISearchParamsDto } from '@monorepo/types/search/search-params.dto.interface';
import { distinctUntilChanged, finalize, map, tap, withLatestFrom } from 'rxjs/operators';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';
import { HttpClient } from '@angular/common/http';
import { Path } from '@monorepo/routes';
import { IPagination, IPaginationMeta } from '@monorepo/types/pagination/pagination.interface';
import { prepareGetParams } from '@shared/utils/prepare-get-params.util';
import { IUserListItem } from '@monorepo/types/user/user-list-item.dto.interface';
import { MessagesService } from '@shared/components/messages/messages.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined';
import { clone } from 'ramda';
import { DEFAULT_SEARCH_PARAMS } from '@modules/search/search-params/default-search-params';

// 1. TODO We are keeping same info (about selectedUser) in two different places
//      1. selectedUser
//      2. params.fromUserId
//      It also seems like shit
// 2. TODO Maybe we can move params to separate service, which will be injected to all
//      entities which use params or modify it
// 3. TODO Method getUsers must accepts that params from p. 2
@Injectable({
  providedIn: 'root'
})
export class SearchService extends OnDestroyMixin {
  private readonly result = new BehaviorSubject<IUserListItem[] | null>(null);
  readonly result$ = this.result.pipe(distinctUntilChanged());

  private readonly pagination = new BehaviorSubject<IPaginationMeta>({
    page: DEFAULT_SEARCH_PARAMS.page,
    limit: DEFAULT_SEARCH_PARAMS.limit,
    total: 0
  });
  readonly pagination$ = this.pagination.pipe(distinctUntilChanged());

  private readonly usersLoading = new BehaviorSubject(false);
  readonly usersLoading$ = this.usersLoading.pipe(distinctUntilChanged());

  constructor(private readonly http: HttpClient, private readonly messages: MessagesService) {
    super();
    merge(
      messages.newMessage$.pipe(
        withLatestFrom(this.result),
        map(([message, users]) => users?.find(u => u.id === message.fromUserId)),
        isNotNullOrUndefined(),
        tap(user => user.notifications += 1)
      ),
      messages.receiverUser$.pipe(
        isNotNullOrUndefined(),
        withLatestFrom(this.result),
        map(([receiverUser, users]) => users?.find(u => u.id === receiverUser.id)),
        isNotNullOrUndefined(),
        tap(user => user.notifications = 0)
      )
    ).pipe(
      untilComponentDestroyed(this)
    ).subscribe(() => this.result.next(clone(this.result.getValue())));
  }

  getUsers(params: ISearchParamsDto): Observable<IPagination<IUserListItem>> {
    this.usersLoading.next(true);
    return this.http.get<IPagination<IUserListItem>>(Path.users(), {params: prepareGetParams(params)}).pipe(
      tap(({items, ...pagination}) => {
        this.result.next(items);
        this.pagination.next(pagination);
      }),
      finalize(() => this.usersLoading.next(false))
    );
  }

  getUser(id: string): Observable<IUserDto> {
    this.usersLoading.next(true);
    return this.http.get<IUserDto>(Path.users.user(id)).pipe(
      finalize(() => this.usersLoading.next(false))
    );
  }
}
