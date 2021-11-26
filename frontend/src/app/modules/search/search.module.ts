import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from '@modules/search/search-routing.module';
import { SearchResultModule } from '@modules/search/search-result/search-result.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { SearchFormModule } from '@modules/search/search-form/search-form.module';
import { MessagesModule } from '@shared/components/messages/messages.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SearchResultModule,
    MatTabsModule,
    MatIconModule,
    SearchFormModule,
    MessagesModule,
    ReactiveFormsModule
  ]
})
export class SearchModule { }
