import { ResettableButtonToggleGroupDirective } from '../resettable-button-toggle-group.directive';
import { TestBed } from '@angular/core/testing';
import {
  ResettableButtonToggleGroupSpecHostComponent
} from '@shared/directives/resettable-button-toggle-group/spec/resettable-button-toggle-group-spec-host.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonToggleGroupHarness, MatButtonToggleHarness } from '@angular/material/button-toggle/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { FormsModule } from '@angular/forms';

describe('ResettableButtonToggleGroupDirective', () => {
  let buttonToggle1: MatButtonToggleHarness;
  let buttonToggle2: MatButtonToggleHarness;
  let buttonToggle1El: HTMLButtonElement;
  let buttonToggle2El: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResettableButtonToggleGroupSpecHostComponent, ResettableButtonToggleGroupDirective],
      imports: [MatButtonToggleModule, FormsModule]
    }).compileComponents();

    const fixture = TestBed.createComponent(ResettableButtonToggleGroupSpecHostComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const buttonToggleGroup = await loader.getHarness(MatButtonToggleGroupHarness);
    [buttonToggle1, buttonToggle2] = await buttonToggleGroup.getToggles();
    buttonToggle1El = fixture.nativeElement.querySelector('mat-button-toggle:first-child button');
    buttonToggle2El = fixture.nativeElement.querySelector('mat-button-toggle:last-child button');
  });

  // we cannot use harness in tests below because it's check() method works only if toggle is unchecked
  // this behaviour differs from direct user click

  it('toggles should be unchecked initially', async () => {
    expect(await buttonToggle1.isChecked()).toBe(false, 'toggles must be unchecked initially');
    expect(await buttonToggle2.isChecked()).toBe(false, 'toggles must be unchecked initially');
  });

  it('should toggles as regular mat-button-toggle-group', async () => {
    buttonToggle1El.click();
    expect(await buttonToggle1.isChecked()).toBe(true, 'toggle1 must be checked');

    buttonToggle2El.click();
    expect(await buttonToggle2.isChecked()).toBe(true, 'toggle2 must be checked');

    buttonToggle1El.click();
    expect(await buttonToggle1.isChecked()).toBe(true, 'toggle1 must be checked');
  });

  it('should uncheck mat-button-toggle on second click at same toggle', async () => {
    buttonToggle1El.click();
    buttonToggle1El.click();

    expect(await buttonToggle1.isChecked()).toBeFalse();
  });

  it('should check mat-button-toggle on third click at same toggle', async () => {
    buttonToggle2El.click();
    buttonToggle2El.click();
    buttonToggle2El.click();

    expect(await buttonToggle2.isChecked()).toBeTrue();
  });

  it('should work correctly after first reset', async () => {
    buttonToggle1El.click();
    buttonToggle2El.click();
    buttonToggle2El.click();
    buttonToggle1El.click();
    buttonToggle2El.click();
    buttonToggle2El.click();

    expect(await buttonToggle1.isChecked()).toBeFalse();
    expect(await buttonToggle2.isChecked()).toBeFalse();
  });
});
