import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderService } from '@modules/header/header.service';
import { MessagesService } from '@shared/components/messages/messages.service';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, take } from 'rxjs/operators';
import { combineLatest, forkJoin, of } from 'rxjs';
import { DEFAULT_SEARCH_PARAMS, SearchService } from '@modules/search/search.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { NavigationEnd, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { equals, uncurryN } from 'ramda';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent extends OnDestroyMixin implements OnInit {
  readonly searchForm = new FormControl();

  constructor(public readonly messages: MessagesService,
              readonly header: HeaderService,
              readonly router: Router,
              readonly search: SearchService) {
    super();
    router.events.pipe(
      untilComponentDestroyed(this),
      filter(e => e instanceof NavigationEnd && router.url === '/search')
    ).subscribe(() => header.setTitle('Search'));

    this.search.params$.pipe(
      untilComponentDestroyed(this),
      switchMap(() => this.search.getUsers())
    ).subscribe();

    this.search.params$.pipe(
      take(1),
      untilComponentDestroyed(this)
    ).subscribe(params => this.searchForm.setValue(params));
  }

  ngOnInit(): void {
    const debouncedValidSearchFormValue$ = this.searchForm.valueChanges.pipe(
      debounceTime(500),
      filter(() => this.searchForm.valid),
      distinctUntilChanged(uncurryN(2, equals))
    );

    const selectedUser$ = this.search.selectedUser$.pipe(
      map(user => user?.id ?? DEFAULT_SEARCH_PARAMS.fromUserId)
    );

    combineLatest([debouncedValidSearchFormValue$, selectedUser$]).pipe(
      untilComponentDestroyed(this),
      switchMap(([formValue, fromUserId]) => forkJoin([
        of(formValue),
        of(fromUserId),
        this.search.pagination$.pipe(take(1)),
        this.search.params$.pipe(take(1))
      ])),
      map(([formValue, fromUserId, {page, limit}, oldParams]) => ({
        ...oldParams, page, limit,
        ...formValue, fromUserId
      }))
    ).subscribe(newParams => this.search.setParams(newParams));
  }
}
