import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DEFAULT_AVATAR_URL } from '@monorepo/constants';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() alt = 'Some avatar';
  @Input() src = DEFAULT_AVATAR_URL;
}
