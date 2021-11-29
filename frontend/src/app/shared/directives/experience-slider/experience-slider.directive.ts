import { Directive } from '@angular/core';
import { MatSlider } from '@angular/material/slider';

@Directive({
  selector: 'mat-slider[appExperienceSlider]'
})
export class ExperienceSliderDirective {
  constructor(readonly matSlider: MatSlider) {
    matSlider.min = -1;
    matSlider.max = 10;
    matSlider.thumbLabel = true;
    matSlider.tickInterval = 1;
    matSlider.displayWith = (value: number) => {
      switch (value) {
        case -1: return '<1';
        default: return `≥${value.toString()}`;
      }
    };
  }
}
