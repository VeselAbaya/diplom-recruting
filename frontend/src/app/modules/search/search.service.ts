import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import {
  EnglishLevel,
  ISearchParamsDto
} from '@monorepo/types/search/search-params.dto.interface';
import { distinctUntilChanged, finalize, map, tap, withLatestFrom } from 'rxjs/operators';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';
import { HttpClient } from '@angular/common/http';
import { Path } from '@monorepo/routes';
import { IPagination, IPaginationMeta } from '@monorepo/types/pagination/pagination.interface';
import { LIMITS } from '@monorepo/types/pagination/limits';
import { prepareGetParams } from '@shared/utils/prepare-get-params.util';
import { IUserListItem } from '@monorepo/types/user/user-list-item.dto.interface';
import { MessagesService } from '@shared/components/messages/messages.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { isNotNullOrUndefined } from '@shared/utils/is-not-null-or-undefined';
import { clone } from 'ramda';

export const DEFAULT_SEARCH_PARAMS: Required<ISearchParamsDto> = {
  search: '',
  hourlyRateMin: 0,
  hourlyRateMax: null,
  networkSize: 1,
  relationTypes: [],
  experience: 0,
  english: EnglishLevel.A1,
  workSchedule: null,
  workType: null,
  page: 0,
  limit: LIMITS[0],
  fromUserId: ''
};

@Injectable({
  providedIn: 'root'
})
export class SearchService extends OnDestroyMixin {
  private readonly result = new BehaviorSubject<IUserListItem[] | null>(null);
  readonly result$ = this.result.pipe(distinctUntilChanged());

  private readonly selectedUser = new BehaviorSubject<IUserDto | null>(null);
  readonly selectedUser$ = this.selectedUser.pipe(distinctUntilChanged());

  private readonly pagination = new BehaviorSubject<IPaginationMeta>({
    page: DEFAULT_SEARCH_PARAMS.page,
    limit: DEFAULT_SEARCH_PARAMS.limit,
    total: 0
  });
  readonly pagination$ = this.pagination.pipe(distinctUntilChanged());

  private readonly params = new BehaviorSubject<ISearchParamsDto>(DEFAULT_SEARCH_PARAMS);
  readonly params$ = this.params.pipe(distinctUntilChanged());

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

  setParams(newParams: ISearchParamsDto = DEFAULT_SEARCH_PARAMS): void {
    this.params.next(newParams);
  }

  getUsers(newParams: ISearchParamsDto = DEFAULT_SEARCH_PARAMS): Observable<IPagination<IUserListItem>> {
    this.usersLoading.next(true);
    this.params.next(newParams);
    return this.http.get<IPagination<IUserListItem>>(Path.users(), {params: prepareGetParams(this.params.value)}).pipe(
      tap(({items, ...pagination}) => {
        this.result.next(items);
        this.pagination.next(pagination);
      }),
      finalize(() => this.usersLoading.next(false))
    );
  }

  getUserAndSetAsSelected(id: string): Observable<IUserDto> {
    this.usersLoading.next(true);
    return this.http.get<IUserDto>(Path.users.user(id)).pipe(
      tap(user => this.setSelectedUser(user)),
      finalize(() => this.usersLoading.next(false))
    );
  }

  setSelectedUser(user: IUserDto | null): void {
    this.selectedUser.next(user);
  }
}
