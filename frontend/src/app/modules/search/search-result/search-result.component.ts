import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { SearchService } from '@modules/search/search.service';
import { PageEvent } from '@angular/material/paginator';
import { LIMITS } from '@monorepo/types/pagination/limits';
import { RelationsService } from '../relations.service';

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
    this.search.params$.pipe(
      untilComponentDestroyed(this),
      filter(params => this.router.url === '/search' && !params.fromUserId),
      switchMap(() => this.search.getUsers())
    ).subscribe();
  }

  onPageChange({pageIndex: page, pageSize: limit}: PageEvent): void {
    const params = this.search.getParams();
    this.search.setParams({...params, page, limit});
    this.search.getUsers();
  }
}
