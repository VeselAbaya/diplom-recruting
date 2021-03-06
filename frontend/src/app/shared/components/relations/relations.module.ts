import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileInfoModule } from '@shared/components/profile-info/profile-info.module';
import { HiddenScrollWrapperModule } from '@shared/components/hidden-scroll-wrapper/hidden-scroll-wrapper.module';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RelationsComponent } from '@shared/components/relations/relations.component';
import { FullNameModule } from '@shared/pipes/full-name/full-name.module';
import { RelationTypeModule } from '@shared/pipes/relation-type/relation-type.module';
import { IsBidirectionalModule } from '@shared/pipes/is-bidirectional/is-bidirectional.module';



@NgModule({
  declarations: [RelationsComponent],
  exports: [
    RelationsComponent
  ],
  imports: [
    CommonModule,
    ProfileInfoModule,
    HiddenScrollWrapperModule,
    CdkScrollableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FullNameModule,
    RelationTypeModule,
    IsBidirectionalModule
  ]
})
export class RelationsModule { }
