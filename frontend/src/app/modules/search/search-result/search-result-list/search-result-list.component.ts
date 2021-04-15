import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IUserListItem } from '@monorepo/types/user/user-list-item.dto.interface';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultListComponent {
  @Input() usersList$: Observable<IUserListItem[] | null | undefined> = of(null);
  @Input() isLoading$: Observable<boolean> = of(false);
}
