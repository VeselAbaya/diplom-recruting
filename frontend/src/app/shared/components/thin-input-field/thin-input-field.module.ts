import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThinInputFieldComponent } from './thin-input-field.component';
import { ThinInputDirective } from './thin-input/thin-input.directive';



@NgModule({
  declarations: [ThinInputFieldComponent, ThinInputDirective],
  exports: [
    ThinInputFieldComponent,
    ThinInputDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ThinInputFieldModule { }
