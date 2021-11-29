import { ChangeDetectionStrategy, Component, ContentChild, ElementRef } from '@angular/core';
import { ThinInputDirective } from '@shared/components/thin-input-field/thin-input/thin-input.directive';

@Component({
  selector: 'app-thin-input-field',
  templateUrl: 'thin-input-field.component.html',
  styleUrls: ['thin-input-field.component.scss']
})
export class ThinInputFieldComponent {
  @ContentChild(ThinInputDirective, { read: ElementRef })
  private thinInput: ElementRef<HTMLInputElement> | undefined | null;

  get inputValue(): string {
    return this.thinInput ? this.thinInput.nativeElement.value || this.thinInput.nativeElement.placeholder : '';
  }
}
