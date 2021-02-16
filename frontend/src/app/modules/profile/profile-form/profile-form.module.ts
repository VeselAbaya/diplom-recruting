import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileFormComponent } from './profile-form.component';
import { MatCardModule } from '@angular/material/card';
import { ProfileInfoModule } from '@shared/components/profile-info/profile-info.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChipListControlModule } from '@shared/components/chip-list-control/chip-list-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [ProfileFormComponent],
  exports: [
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ProfileInfoModule,
    MatFormFieldModule,
    MatInputModule,
    ChipListControlModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSliderModule,
    MatSelectModule
  ]
})
export class ProfileFormModule { }
