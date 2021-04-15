import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SearchService } from '@modules/search/search.service';
import { PageEvent } from '@angular/material/paginator';
import { map, switchMap, take } from 'rxjs/operators';
import { LIMITS } from '@monorepo/types/pagination/limits';
import { RelationsService } from '../relations.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent {
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
              public readonly relations: RelationsService) {}

  onPageChange({pageIndex: page, pageSize: limit}: PageEvent): void {
    this.search.params$.pipe(
      take(1),
      switchMap(params => this.search.getUsers({...params, page, limit}))
    ).subscribe();
  }
}
