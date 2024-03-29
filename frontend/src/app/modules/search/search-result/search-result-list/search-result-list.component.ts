import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { IUserListItem } from '@monorepo/types/user/user-list-item.dto.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultListComponent extends OnDestroyMixin {
  @Input() users: IUserListItem[] | null | undefined = null;
  @Input() isLoading = false;

  @HostBinding('class.not-authenticated-user') isUserUnauthorized = true;

  constructor(private readonly auth: AuthService) {
    super();
    this.auth.user$.pipe(
      untilComponentDestroyed(this)
    ).subscribe(user => this.isUserUnauthorized = !user);
  }
}
