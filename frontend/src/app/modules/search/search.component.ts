import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from '@modules/header/header.service';
import { MessagesService } from '@shared/components/messages/messages.service';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { combineLatest, forkJoin, of } from 'rxjs';
import { DEFAULT_SEARCH_PARAMS, SearchService } from '@modules/search/search.service';
import { SearchFormComponent } from '@modules/search/search-form/search-form.component';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent extends OnDestroyMixin implements OnInit {
  @ViewChild(SearchFormComponent, {static: true}) searchForm!: SearchFormComponent;

  constructor(public readonly messages: MessagesService,
              public readonly search: SearchService,
              private readonly header: HeaderService,
              private readonly router: Router) {
    super();
    this.router.events.pipe(
      untilComponentDestroyed(this),
      filter(e => e instanceof NavigationEnd && this.router.url === '/search')
    ).subscribe(() => this.header.setTitle('Search'));

    this.search.params$.pipe(
      untilComponentDestroyed(this),
      filter(params => this.router.url === '/search' && !params.fromUserId),
      switchMap(() => this.search.getUsers())
    ).subscribe();
  }

  ngOnInit(): void {
    combineLatest([
      this.searchForm.valueChanges,
      this.search.selectedUser$.pipe(map(user => user?.id ?? DEFAULT_SEARCH_PARAMS.fromUserId))
    ]).pipe(
      untilComponentDestroyed(this),
      switchMap(([formValue, fromUserId]) => forkJoin([
        of(formValue),
        of(fromUserId),
        this.search.pagination$.pipe(take(1)),
        this.search.params$.pipe(take(1))
      ])),
      tap(([formValue, fromUserId, {page, limit}, params]) => {
        const newParams = {
          ...params, page, limit,
          ...formValue, fromUserId
        };

        this.search.setParams(newParams);
      })
    ).subscribe();
  }
}
