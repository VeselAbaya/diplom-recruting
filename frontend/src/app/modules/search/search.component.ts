import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from '@modules/header/header.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  constructor(private readonly header: HeaderService) {
    header.setTitle('Search');
  }
}
