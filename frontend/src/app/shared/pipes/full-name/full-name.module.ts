import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from '@shared/pipes/full-name/full-name.pipe';



@NgModule({
  declarations: [FullNamePipe],
  imports: [
    CommonModule
  ],
  exports: [FullNamePipe]
})
export class FullNameModule { }
