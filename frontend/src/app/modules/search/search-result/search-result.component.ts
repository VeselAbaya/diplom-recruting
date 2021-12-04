import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { SearchService } from '@modules/search/search.service';
import { PageEvent } from '@angular/material/paginator';
import { RelationsService } from '../relations.service';
import { ProfileService } from '@modules/profile/profile.service';
import { SearchParamsService } from '@modules/search/search-params/search-params.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent extends OnDestroyMixin {
  @Input() withGraphView = false;

  readonly usersList$ = this.profile.selectedUser$.pipe(
    switchMap(selectedUser => selectedUser !== null
      ? this.relations.result$.pipe(map(graph => graph?.nodes.filter(user => user.id !== selectedUser.id)))
      : this.search.result$
    )
  );

  readonly isLoading$ = this.profile.selectedUser$.pipe(
    switchMap(selectedUser => selectedUser !== null
      ? this.relations.isLoading$
      : this.search.usersLoading$
    )
  );

  constructor(readonly search: SearchService,
              readonly relations: RelationsService,
              readonly profile: ProfileService,
              private readonly searchParams: SearchParamsService) {
    super();
    combineLatest([
      this.searchParams.params$,
      this.profile.selectedUser$
    ]).pipe(
      debounceTime(0),
      untilComponentDestroyed(this),
      switchMap(([params, selectedUsed]) => selectedUsed !== null
        ? this.relations.getGraph({ ...params, fromUserId: selectedUsed.id })
        : this.search.getUsers(params)
      )
    ).subscribe();
  }

  onPageChange({ pageIndex: page, pageSize: limit }: PageEvent): void {
    this.searchParams.patch({ page, limit });
  }
}
