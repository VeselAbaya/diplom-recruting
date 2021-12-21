import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyInBrowserDirective } from './only-in-browser.directive';


@NgModule({
  declarations: [
    OnlyInBrowserDirective
  ],
  exports: [
    OnlyInBrowserDirective
  ],
  imports: [
    CommonModule
  ]
})
export class OnlyInBrowserModule {
}
