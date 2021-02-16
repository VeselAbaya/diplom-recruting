import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderService } from '@modules/header/header.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  constructor(private readonly header: HeaderService) {
    header.setTitle('Profile');
  }
}
