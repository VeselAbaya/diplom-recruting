import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipListControlComponent } from '@shared/components/chip-list-control/chip-list-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ThinInputModule } from '@shared/directives/thin-input/thin-input.module';



@NgModule({
  declarations: [ChipListControlComponent],
  exports: [ChipListControlComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule,
    ThinInputModule
  ]
})
export class ChipListControlModule { }
