import { Directive, ElementRef } from '@angular/core';
import { FocusableOption } from '@angular/cdk/a11y';

@Directive({
  selector: 'a[appUserMenuItem]'
})
export class UserMenuItemDirective implements FocusableOption {
  constructor(private readonly elRef: ElementRef<HTMLAnchorElement>) {
  }

  focus(): void {
    this.elRef.nativeElement.focus();
  }

  getLabel(): string {
    return this.elRef.nativeElement.textContent || '';
  }
}
