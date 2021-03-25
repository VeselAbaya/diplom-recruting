import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessagesService } from '@shared/components/messages/messages.service';

@Component({
  selector: 'app-page-with-search',
  templateUrl: './page-with-search.component.html',
  styleUrls: ['./page-with-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageWithSearchComponent {
  constructor(public readonly messages: MessagesService) {}
}
