import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, forwardRef, HostBinding, HostListener,
  Input,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import { ENTER } from '@angular/cdk/keycodes';
import { identity } from 'rxjs';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { matFormFieldAnimations } from '@angular/material/form-field';

@Component({
  selector: 'app-chip-list-control',
  templateUrl: './chip-list-control.component.html',
  styleUrls: ['./chip-list-control.component.scss'],
  animations: [matFormFieldAnimations.transitionMessages],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipListControlComponent implements AfterViewInit, ControlValueAccessor {
  separatorKeysCodes = [ENTER];
  _noSubscript = false;

  // tslint:disable-next-line:no-input-rename
  @Input('items') allItems: string[] = [];
  @Output() readonly added = new EventEmitter<string>();
  @Output() readonly removed = new EventEmitter<number>();

  // @ts-ignore
  @ViewChild('itemInput', {static: true}) itemInput: ElementRef<HTMLInputElement>;

  _value: string[] = [];
  @Input() disabled = false;
  _transitionState = '';

  _onChange: (val?: unknown) => unknown = identity;
  _onTouch: (val?: unknown) => unknown = identity;
  registerOnChange(fn: (val?: unknown) => unknown): void { this._onChange = fn; }
  registerOnTouched(fn: (val?: unknown) => unknown): void { this._onTouch = fn; }

  get value(): string[] {
    return this._value;
  }
  set value(v: string[]) {
    if (v !== this._value) {
      this._value = v;
      this._onChange(v);
    }
  }

  writeValue(value: string[]): void {
    if (value !== this._value) {
      this._value = value;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor(@Optional() public readonly ngControl: NgControl,
              public readonly elRef: ElementRef<HTMLElement>,
              private readonly cdr: ChangeDetectorRef) {
    this._noSubscript = elRef.nativeElement.classList.contains('pn-no-subscript');
    if (ngControl) {
      ngControl.valueAccessor = this;
    }
  }

  ngAfterViewInit(): void {
    // Avoid animations on load.
    this._transitionState = 'enter';
    this.cdr.detectChanges();
  }

  remove(itemIndex: number): void {
    this._value.splice(itemIndex, 1);
    this.value = this._value.slice();
    this.removed.emit(itemIndex);
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.value = this.value ? this.value.concat(value.trim()) : [value.trim()];
      this.added.emit(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this._resetInputValue();
  }

  private _resetInputValue(): void {
    this.itemInput.nativeElement.value = '';
  }
}
