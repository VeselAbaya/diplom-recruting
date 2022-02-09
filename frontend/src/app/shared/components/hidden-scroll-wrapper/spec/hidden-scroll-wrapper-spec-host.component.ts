import { Component, Inject, InjectionToken, ViewChild } from '@angular/core';
import { CdkScrollable } from '@angular/cdk/overlay';

export const WITH_SCROLL = new InjectionToken<boolean>('[WITH_SCROLL] Is initially with scroll');

@Component({
  template: `
    <app-hidden-scroll-wrapper orientation="vertical">
      <div style="height: 300px" cdkScrollable>
        <div [ngStyle]="{height: (withScroll ? 1000 : 100) + 'px'}"></div>
      </div>
    </app-hidden-scroll-wrapper>
  `
})
export class HiddenScrollWrapperSpecHostComponent {
  @ViewChild(CdkScrollable, { static: true }) scrollable!: CdkScrollable;

  constructor(@Inject(WITH_SCROLL) public withScroll: boolean) {
  }
}
