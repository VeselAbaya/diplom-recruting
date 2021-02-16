import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoComponent } from './profile-info.component';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { HourlyModule } from '@shared/components/hourly/hourly.module';
import { MatIconModule } from '@angular/material/icon';
import { ThinInputModule } from '@shared/components/thin-input/thin-input.module';
import { AngularCropperjsModule } from 'angular-cropperjs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ProfileInfoComponent],
  exports: [
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    HourlyModule,
    MatIconModule,
    ThinInputModule,
    AngularCropperjsModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ProfileInfoModule { }
