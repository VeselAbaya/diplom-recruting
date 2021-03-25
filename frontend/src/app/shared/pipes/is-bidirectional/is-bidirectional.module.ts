import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsBidirectionalPipe } from './is-bidirectional.pipe';



@NgModule({
  declarations: [IsBidirectionalPipe],
  imports: [
    CommonModule
  ],
  exports: [IsBidirectionalPipe]
})
export class IsBidirectionalModule { }
