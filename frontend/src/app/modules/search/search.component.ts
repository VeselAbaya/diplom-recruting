import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderService } from '@modules/header/header.service';
import { MessagesService } from '@shared/components/messages/messages.service';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { combineLatest, forkJoin, of } from 'rxjs';
import { SearchService } from '@modules/search/search.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { equals, uncurryN } from 'ramda';
import { DEFAULT_SEARCH_PARAMS } from '@modules/search/search-params/default-search-params';
import { SearchParamsService } from '@modules/search/search-params/search-params.service';
import { ProfileService } from '@modules/profile/profile.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent extends OnDestroyMixin implements OnInit {
  readonly searchForm = new FormControl();

  constructor(readonly messages: MessagesService,
              readonly header: HeaderService,
              readonly router: Router,
              readonly search: SearchService,
              readonly searchParams: SearchParamsService,
              readonly profile: ProfileService) {
    super();
    this.searchForm.setValue(this.searchParams.get());
    router.events.pipe(
      untilComponentDestroyed(this),
      filter(e => e instanceof NavigationEnd && router.url === '/search')
    ).subscribe(() => header.setTitle('Search'));

    const debouncedValidSearchFormValue$ = this.searchForm.valueChanges.pipe(
      debounceTime(500),
      filter(() => this.searchForm.valid),
      distinctUntilChanged(uncurryN(2, equals)),
      tap(formValue => this.searchParams.patch(formValue)),
      startWith(this.searchForm.value)
    );

    const selectedUser$ = this.profile.selectedUser$.pipe(
      map(user => user?.id ?? DEFAULT_SEARCH_PARAMS.fromUserId)
    );

    combineLatest([debouncedValidSearchFormValue$, selectedUser$]).pipe(
      untilComponentDestroyed(this),
      switchMap(([formValue, fromUserId]) => forkJoin([
        of(formValue),
        of(fromUserId),
        this.search.pagination$.pipe(take(1))
      ])),
      map(([formValue, fromUserId, {page, limit}]) => ({
        ...formValue, page, limit, fromUserId
      })),
      switchMap(newParams => this.search.getUsers(newParams))
    ).subscribe();
  }

  ngOnInit(): void {

  }
}
