import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SearchService } from '@modules/search/search.service';
import { PageEvent } from '@angular/material/paginator';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { LIMITS } from '@monorepo/types/pagination/limits';
import { RelationsService } from '../relations.service';
import { Router } from '@angular/router';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { combineLatest, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent extends OnDestroyMixin implements OnInit {
  @Input() withGraphView = false;

  usersList$ = this.search.selectedUser$.pipe(
    switchMap(selectedUser => selectedUser !== null
      ? this.relations.result$.pipe(map(graph => graph?.nodes.filter(user => user.id !== selectedUser.id)))
      : this.search.result$
    )
  );

  isLoading$ = this.search.selectedUser$.pipe(
    switchMap(selectedUser => selectedUser !== null ? this.relations.isLoading$ : this.search.usersLoading$)
  );

  LIMITS = LIMITS;

  constructor(public readonly search: SearchService,
              public readonly relations: RelationsService,
              private readonly router: Router) {
    super();
  }

  ngOnInit(): void {
    console.log('search result is initialized')
    combineLatest([
      // this.search.selectedUser$.pipe(map(user => user?.id)),
      this.search.params$
    ]).pipe(
      untilComponentDestroyed(this),
      // switchMap(([fromUserId, params]) => forkJoin([
      switchMap(([params]) => forkJoin([
        // of(fromUserId),
        of(params)
        // this.search.params$.pipe(take(1))
      ])),
      // switchMap(([user, params]) => {
      switchMap(([params]) => {
        console.log({userId: params.fromUserId, params})
        // console.log({userId: user?.id, params})
        if (this.router.url === '/search' && !params.fromUserId) {
          return this.search.getUsers(params);
        }
        return of();
      })
    ).subscribe()
  }

  onPageChange({pageIndex: page, pageSize: limit}: PageEvent): void {
    this.search.params$.pipe(
      take(1),
      switchMap(params => this.search.getUsers({...params, page, limit}))
    ).subscribe();
  }
}
