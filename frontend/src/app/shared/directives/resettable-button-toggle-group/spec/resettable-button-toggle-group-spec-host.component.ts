import { Component } from '@angular/core';

@Component({
  template: `
    <mat-button-toggle-group appResettableButtonToggleGroup
                             ngModel>
      <mat-button-toggle [value]="1">1</mat-button-toggle>
      <mat-button-toggle [value]="2">2</mat-button-toggle>
    </mat-button-toggle-group>
  `
})
export class ResettableButtonToggleGroupSpecHostComponent {
}
