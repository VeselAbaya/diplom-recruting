import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThinInputDirective } from './thin-input.directive';



@NgModule({
  declarations: [ThinInputDirective],
  exports: [
    ThinInputDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ThinInputModule { }
