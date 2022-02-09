import { Component } from '@angular/core';

@Component({
  template: `
    <ng-container *appOnlyInBrowser>Text only for browser</ng-container>
  `
})
export class OnlyInBrowserSpecHostComponent {
}
