import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchService } from '@modules/search/search.service';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultListComponent {
  constructor(public readonly search: SearchService) {}
}
