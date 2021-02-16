import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RangeComponent } from './range.component';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [RangeComponent],
  imports: [
    CommonModule,
    MatSliderModule,
    FormsModule,
    MatDividerModule,
    MatInputModule
  ],
  exports: [RangeComponent]
})
export class RangeModule { }
