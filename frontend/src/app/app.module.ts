import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '@core/services/auth/auth.service';
import { MatIconService } from '@core/services/maticon.service';
import { HeaderModule } from '@modules/header/header.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingInterceptor } from '@core/interceptors/loading.interceptor';
import { BaseUrlInterceptor } from '@core/interceptors/base-url.interceptor';
import { AuthInterceptor } from '@core/interceptors/auth.interceptor';
import { FullNamePipe } from '@shared/pipes/full-name/full-name.pipe';
import { MAT_PAGINATOR_DEFAULT_OPTIONS } from '@angular/material/paginator';
import { LIMITS } from '@monorepo/types/pagination/limits';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        horizontalPosition: 'start',
        verticalPosition: 'top',
        duration: 5000
      }
    },
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {
        pageSizeOptions: LIMITS
      }
    },
    FullNamePipe
  ]
})
export class AppModule {
}
