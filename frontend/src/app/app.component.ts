import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '@core/services/loading.service';
import { HeaderService } from '@modules/header/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(public readonly loading: LoadingService, public readonly header: HeaderService) {}
}
