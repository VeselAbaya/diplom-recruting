import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchFormModule } from '@modules/search/search-form/search-form.module';
import { SearchRoutingModule } from '@modules/search/search-routing.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SearchFormModule
  ]
})
export class SearchModule { }
