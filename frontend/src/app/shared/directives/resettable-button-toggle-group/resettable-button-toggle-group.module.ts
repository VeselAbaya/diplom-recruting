import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResettableButtonToggleGroupDirective } from '@shared/directives/resettable-button-toggle-group/resettable-button-toggle-group.directive';


@NgModule({
  declarations: [ResettableButtonToggleGroupDirective],
  imports: [
    CommonModule
  ],
  exports: [ResettableButtonToggleGroupDirective]
})
export class ResettableButtonToggleGroupModule { }
