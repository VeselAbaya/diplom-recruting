import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThinInputFieldComponent } from '@shared/components/thin-input-field/thin-input-field.component';
import {
  ThinInputFieldSpecHostComponent
} from '@shared/components/thin-input-field/spec/thin-input-field-spec-host.component';
import { ThinInputDirective } from '@shared/components/thin-input-field/thin-input/thin-input.directive';
import { DebugElement } from '@angular/core';

describe('ThinInputFieldComponent', () => {
  let fixture: ComponentFixture<ThinInputFieldSpecHostComponent>;
  let thinInputComponentDebugEl: DebugElement;
  let inputEl: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThinInputFieldComponent, ThinInputFieldSpecHostComponent, ThinInputDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(ThinInputFieldSpecHostComponent);
    thinInputComponentDebugEl = fixture.debugElement.query(
      value => value.componentInstance instanceof ThinInputFieldComponent
    );
    fixture.detectChanges();
    inputEl = fixture.nativeElement.querySelector('input');
  });

  it('should increase it\'s width on input', () => {
    const initialWidth = parseFloat(getComputedStyle(thinInputComponentDebugEl.nativeElement).width);
    inputEl.value = 'qwerty';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const newWidth = parseFloat(getComputedStyle(thinInputComponentDebugEl.nativeElement).width);
    expect(newWidth).toBeGreaterThan(initialWidth);
  });

  it('should decrease it\'s width on delete', () => {
    inputEl.value = 'qwerty';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const initialWidth = parseFloat(getComputedStyle(thinInputComponentDebugEl.nativeElement).width);

    inputEl.value = 'qwe';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const newWidth = parseFloat(getComputedStyle(thinInputComponentDebugEl.nativeElement).width);
    expect(newWidth).toBeLessThan(initialWidth);
  });
});
