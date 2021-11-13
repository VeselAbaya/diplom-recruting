import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderService } from '@modules/header/header.service';
import { ErrorsService } from '@core/services/errors.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.pattern(
        '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$'
      ),
      Validators.required
    ]),
    password: new FormControl('', Validators.required)
  });

  constructor(private readonly auth: AuthService,
              private readonly snackBar: MatSnackBar,
              private readonly errors: ErrorsService,
              private readonly header: HeaderService,
              private readonly route: ActivatedRoute,
              private readonly router: Router) {
    header.setTitle('Sign up');
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.auth.signup(this.form.value).subscribe({
        next: () => {
          this.snackBar.open(
            `Check your ${this.form.value.email} for Verification Link`,
            'Yeah!',
            {duration: undefined}
          );
          this.router.navigate(['../signin'], {relativeTo: this.route});
        },
        error: this.errors.handle
      });
    }
  }
}
