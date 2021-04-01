import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { RangeModule } from '@shared/components/range/range.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { ResettableButtonToggleGroupModule } from '@shared/directives/resettable-button-toggle-group/resettable-button-toggle-group.module';
import { RelationTypeModule } from '@shared/pipes/relation-type/relation-type.module';


@NgModule({
  declarations: [SearchFormComponent], imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    RangeModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatButtonModule,
    ResettableButtonToggleGroupModule,
    RelationTypeModule
  ],
  exports: [SearchFormComponent]
})
export class SearchFormModule { }
