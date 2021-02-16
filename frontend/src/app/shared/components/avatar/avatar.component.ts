import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';

export const DEFAULT_AVATAR_SRC = 'assets/default-user-avatar.svg';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() src = DEFAULT_AVATAR_SRC;
  @Input() set rounded(_: string) {
    this.renderer.setAttribute(this.elRef.nativeElement, 'rounded', 'true');
  }

  constructor(private readonly elRef: ElementRef, private readonly renderer: Renderer2) {}
}
