import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelationTypePipe } from '@shared/pipes/relation-type/relation-type.pipe';



@NgModule({
  declarations: [RelationTypePipe],
  imports: [
    CommonModule
  ],
  exports: [RelationTypePipe]
})
export class RelationTypeModule { }
