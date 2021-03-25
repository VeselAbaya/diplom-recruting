import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SearchService } from '@modules/search/search.service';
import { PageEvent } from '@angular/material/paginator';
import { switchMap, take } from 'rxjs/operators';
import { LIMITS } from '@monorepo/types/pagination/limits';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent {
  @Input() withGraphView = false;

  LIMITS = LIMITS;

  constructor(public readonly search: SearchService) {}

  onPageChange({pageIndex: page, pageSize: limit}: PageEvent): void {
    this.search.params$.pipe(
      take(1),
      switchMap(params => this.search.getUsers({...params, page, limit}))
    ).subscribe();
  }
}
