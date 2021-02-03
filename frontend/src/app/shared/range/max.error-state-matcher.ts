import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, NgForm } from '@angular/forms';

export class MaxErrorStateMatcher extends ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: NgForm | null): boolean {
    return !!(control && form && form.dirty) && control.value !== null && control.value < form.value.min;
  }
}
