import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { identity } from 'rxjs';
import { MaxErrorStateMatcher } from '@shared/components/range/max.error-state-matcher';
import { IRateRangeDto } from '@monorepo/types/search/search-params.dto.interface';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RangeComponent),
    multi: true
  }]
})
export class RangeComponent implements ControlValueAccessor {
  public _min = 0;
  public _max: number | null = null;
  public _maxErrorStateMatcher = new MaxErrorStateMatcher();

  _onChange: (val?: unknown) => unknown = identity;
  _onTouch: (val?: unknown) => unknown = identity;
  registerOnChange(fn: (val?: unknown) => unknown): void { this._onChange = fn; }
  registerOnTouched(fn: (val?: unknown) => unknown): void { this._onTouch = fn; }

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(val: IRateRangeDto | null): void {
    if (val) {
      this.min = val.min;
      this.max = val.max;
      this.cdr.markForCheck();
    }
  }

  get value(): IRateRangeDto {
    return {
      min: this._min,
      max: this._max
    };
  }

  set min(val: number) {
    this._min = val;
    this._onChange(this.value);
    this._onTouch(this.value);
  }

  set max(val: number | null) {
    this._max = val;
    this._onChange(this.value);
    this._onTouch(this.value);
  }

  onMaxChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const max = parseInt(inputEl.value, 10);
    if (isNaN(max)) {
      this.max = null;
    }
    else {
      this.max = max;
      inputEl.value = this._max ? this._max.toString() : '';
    }
  }

  onMinChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    const min = parseInt(inputEl.value, 10);
    if (isNaN(min)) {
      this.min = 0;
    }
    else if (min < 0) {
      event.preventDefault();
      event.stopPropagation();
      setTimeout(() => inputEl.value = this._min.toString());
    }
    else {
      this.min = min;
      inputEl.value = this._min.toString();
    }
  }
}