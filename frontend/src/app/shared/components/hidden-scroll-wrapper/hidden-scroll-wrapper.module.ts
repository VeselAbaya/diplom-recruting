import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiddenScrollWrapperComponent } from './hidden-scroll-wrapper.component';



@NgModule({
  declarations: [HiddenScrollWrapperComponent],
  exports: [
    HiddenScrollWrapperComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HiddenScrollWrapperModule { }
