import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from '@modules/search/search-routing.module';
import { SearchResultModule } from '@modules/search/search-result/search-result.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { PageWithSearchModule } from '@shared/components/page-with-search/page-with-search.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SearchResultModule,
    MatTabsModule,
    MatIconModule,
    PageWithSearchModule
  ]
})
export class SearchModule { }
