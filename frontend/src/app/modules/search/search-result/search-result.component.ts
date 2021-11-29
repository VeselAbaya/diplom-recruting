import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { SearchService } from '@modules/search/search.service';
import { PageEvent } from '@angular/material/paginator';
import { LIMITS } from '@monorepo/types/pagination/limits';
import { RelationsService } from '../relations.service';

// TODO SearchResultList and SearchResultGraph accepts user data in different ways
//      *SearchResultGraph fetching it by itself
//      *SearchResultList accepts it via @Input
//      IT SEEMS LIKE SHIT
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

  // TODO check if we can configure material paginator to default limits
  LIMITS = LIMITS;

  constructor(public readonly search: SearchService,
              public readonly relations: RelationsService) {
  }

  onPageChange({pageIndex: page, pageSize: limit}: PageEvent): void {
    const params = this.search.getParams();
    this.search.setParams({...params, page, limit});
  }
}
