import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchService } from '@modules/search/search.service';
import { RelationsService } from '@modules/search/relations.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultListComponent {
  usersList$ = this.search.selectedUser$.pipe(
    switchMap(selectedUser => selectedUser !== null
      ? this.relations.result$.pipe(map(graph => graph?.nodes.filter(user => user.id !== selectedUser.id)))
      : this.search.result$
    )
  );

  constructor(public readonly search: SearchService,
              private readonly relations: RelationsService) {}
}
