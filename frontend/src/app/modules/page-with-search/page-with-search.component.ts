import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-with-search',
  templateUrl: './page-with-search.component.html',
  styleUrls: ['./page-with-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageWithSearchComponent {}
