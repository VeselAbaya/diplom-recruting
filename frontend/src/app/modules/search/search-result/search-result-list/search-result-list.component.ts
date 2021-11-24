import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IUserListItem } from '@monorepo/types/user/user-list-item.dto.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// export class SearchResultListComponent implements OnInit {
export class SearchResultListComponent {
  @Input() usersList$: Observable<IUserListItem[] | null | undefined> = of(null);
  @Input() isLoading$: Observable<boolean> = of(false);

  // constructor(private readonly router: Router) {
  // }
  // ngOnInit() {
  //   console.log('Search Result List is initialized')
  //   console.log('current url is ', this.router.url)
  // }
}
