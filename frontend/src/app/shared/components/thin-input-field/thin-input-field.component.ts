import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef
} from '@angular/core';
import { ThinInputDirective } from '@shared/components/thin-input-field/thin-input/thin-input.directive';
import { fromEvent } from 'rxjs';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-thin-input-field',
  templateUrl: 'thin-input-field.component.html',
  styleUrls: ['thin-input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThinInputFieldComponent extends OnDestroyMixin implements AfterContentInit {
  @ContentChild(ThinInputDirective, { read: ElementRef })
  private thinInput: ElementRef<HTMLInputElement> | undefined | null;

  constructor(private readonly cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterContentInit(): void {
    if (!this.thinInput) {
      throw new Error('Input element must be inside app-thin-input');
    }

    fromEvent(this.thinInput.nativeElement, 'input').pipe(
      untilComponentDestroyed(this)
    ).subscribe(() => this.cdr.markForCheck());
  }

  get inputValue(): string {
    return this.thinInput ? this.thinInput.nativeElement.value || this.thinInput.nativeElement.placeholder : '';
  }
}
