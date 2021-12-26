import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from '@modules/header/header.service';
import { MessagesService } from '@shared/components/messages/messages.service';
import { filter } from 'rxjs/operators';
import { SearchService } from '@modules/search/search.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { NavigationEnd, Router } from '@angular/router';
import { ProfileService } from '@modules/profile/profile.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent extends OnDestroyMixin {
  constructor(readonly messages: MessagesService,
              readonly header: HeaderService,
              readonly router: Router,
              readonly search: SearchService,
              readonly profile: ProfileService) {
    super();
    router.events.pipe(
      filter(e => e instanceof NavigationEnd && router.url === '/search'),
      untilComponentDestroyed(this)
    ).subscribe(() => header.setTitle('Search'));
  }
}
