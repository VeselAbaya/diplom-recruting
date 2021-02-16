import { AbstractControl, ValidationErrors } from '@angular/forms';

export const StartDateRequiredIfHasEndDate: (c: AbstractControl) => ValidationErrors | null = (c: AbstractControl) => {
  if (!c.value || !c.value.end) {
    return null;
  }

  return c.value.start ? null : {startDateRequiredIfHasEndDate: true};
};
