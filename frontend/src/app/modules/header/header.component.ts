import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(public readonly auth: AuthService,
              private readonly router: Router) {}

  saveCurrentUrlToRedirectAfterLogin(): void {
    this.auth.redirectUrl$.next(this.router.url);
  }
}
