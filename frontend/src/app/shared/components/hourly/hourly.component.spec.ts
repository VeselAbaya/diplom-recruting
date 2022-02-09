import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyComponent } from './hourly.component';
import { take } from 'rxjs/operators';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HourlyComponent', () => {
  let component: HourlyComponent;
  let fixture: ComponentFixture<HourlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HourlyComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set new rate and emit rateChange event', () => {
    let rateChangeEmitted = false;
    component.rateChange.pipe(take(1)).subscribe(() => rateChangeEmitted = true);

    component.setNewRateAndEmitRateChange('124');

    expect(component.rate).toBe(124);
    expect(rateChangeEmitted).toBe(true, 'rateChange event did not emitted');
  });
});
