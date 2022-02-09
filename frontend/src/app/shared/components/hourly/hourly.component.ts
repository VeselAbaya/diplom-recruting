import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HourlyComponent {
  @Input() rate: number | null = null;
  @Output() rateChange = new EventEmitter<number | null>();

  constructor(private cdr: ChangeDetectorRef) {
  }

  _editable = false;
  @Input() set editable(_: string) {
    this._editable = true;
  }

  setNewRateAndEmitRateChange(rateStr: string): void {
    const newRate = rateStr === '' ? null : +rateStr;
    this.rate = newRate;
    this.rateChange.emit(newRate);
  }

  filterNonNumericInput(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const value = parseInt(inputEl.value, 10);
    if (value < 0) {
      setTimeout(() => {
        inputEl.value = this.rate === null ? '' : this.rate.toString();
        this.cdr.markForCheck();
      });
    }
  }
}
