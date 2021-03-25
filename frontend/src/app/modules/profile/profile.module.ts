import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SearchResultModule } from '@modules/search/search-result/search-result.module';
import { ProfileRoutingModule } from '@modules/profile/profile-routing.module';
import { ProfileFormModule } from '@modules/profile/profile-form/profile-form.module';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { HiddenScrollWrapperModule } from '@shared/components/hidden-scroll-wrapper/hidden-scroll-wrapper.module';
import { PageWithSearchModule } from '@shared/components/page-with-search/page-with-search.module';



@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SearchResultModule,
    PageWithSearchModule,
    ProfileFormModule,
    CdkScrollableModule,
    HiddenScrollWrapperModule
  ]
})
export class ProfileModule { }
