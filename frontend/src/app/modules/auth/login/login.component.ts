import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth/auth.service';
import { HeaderService } from '@modules/header/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.pattern(
        '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$'
      ),
      Validators.required
    ]),
    password: new FormControl('', Validators.required)
  });

  constructor(private readonly auth: AuthService, private readonly header: HeaderService) {
    header.setTitle('Sign in');
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe();
    }
  }
}
