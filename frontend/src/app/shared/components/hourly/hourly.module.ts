import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HourlyComponent } from './hourly.component';
import { ThinInputModule } from '@shared/components/thin-input/thin-input.module';



@NgModule({
  declarations: [HourlyComponent],
  exports: [
    HourlyComponent
  ],
  imports: [
    CommonModule,
    ThinInputModule
  ]
})
export class HourlyModule { }
