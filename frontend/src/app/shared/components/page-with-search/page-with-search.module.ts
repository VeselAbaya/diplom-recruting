import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageWithSearchComponent } from './page-with-search.component';
import { SearchFormModule } from '@modules/search/search-form/search-form.module';
import { MessagesModule } from '@shared/components/messages/messages.module';



@NgModule({
  declarations: [PageWithSearchComponent],
  exports: [
    PageWithSearchComponent
  ],
  imports: [
    CommonModule,
    SearchFormModule,
    MessagesModule
  ]
})
export class PageWithSearchModule { }
