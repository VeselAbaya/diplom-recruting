import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserMenuComponent {
  @Input() user!: IUserDto;
  constructor(public readonly auth: AuthService) {}
}
