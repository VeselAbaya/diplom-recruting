import { AfterViewInit, Directive } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { merge } from 'rxjs';
import { pairwise, pluck, startWith } from 'rxjs/operators';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appResettableButtonToggleGroup]'
})
export class ResettableButtonToggleGroupDirective extends OnDestroyMixin implements AfterViewInit {
  constructor(private readonly buttonToggleGroup: MatButtonToggleGroup,
              private readonly ngControl: NgControl) {
    super();
  }

  ngAfterViewInit(): void {
    let isReset = false;

    merge(...this.buttonToggleGroup._buttonToggles.map(
      buttonToggle => buttonToggle.change.pipe(pluck('value'))
    )).pipe(
      untilComponentDestroyed(this),
      startWith(this.buttonToggleGroup.value),
      pairwise()
    ).subscribe(([prevValue, curValue]) => {
      if (prevValue === curValue) {
        if (isReset) {
          this.ngControl.control?.setValue(curValue);
          isReset = false;
        } else {
          this.ngControl.control?.setValue(null);
          isReset = true;
        }
      }
    });
  }
}
