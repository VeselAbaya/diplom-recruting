import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyComponent } from './hourly.component';
import { ThinInputFieldModule } from '@shared/components/thin-input-field/thin-input-field.module';



@NgModule({
  declarations: [HourlyComponent],
  exports: [
    HourlyComponent
  ],
  imports: [
    CommonModule,
    ThinInputFieldModule
  ]
})
export class HourlyModule { }
