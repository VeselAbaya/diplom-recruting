import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '@core/services/auth/auth.service';
import { MatIconService } from '@core/services/maticon.service';
import { HeaderModule } from '@modules/header/header.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    HeaderModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [AuthService, MatIconService],
      useFactory: (auth: AuthService, icons: MatIconService) => () => {
        icons.init();
        auth.loadUser().subscribe();
      },
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {appearance: 'outline'}
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: 5000
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
