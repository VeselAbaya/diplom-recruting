import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperienceSliderDirective } from './experience-slider.directive';



@NgModule({
  declarations: [
    ExperienceSliderDirective
  ],
  exports: [
    ExperienceSliderDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ExperienceSliderModule { }
