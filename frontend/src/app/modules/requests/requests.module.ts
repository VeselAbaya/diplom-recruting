import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsComponent } from './requests.component';
import { RequestsRoutingModule } from '@modules/requests/requests-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { HiddenScrollWrapperModule } from '@shared/components/hidden-scroll-wrapper/hidden-scroll-wrapper.module';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { RequestsTabComponent } from './requests-tab/requests-tab.component';
import { MessagesModule } from '@shared/components/messages/messages.module';
import { RelationsModule } from '@shared/components/relations/relations.module';



@NgModule({
  declarations: [RequestsComponent, RequestsTabComponent],
  imports: [
    CommonModule,
    RequestsRoutingModule,
    RelationsModule,
    MatButtonModule,
    MatTabsModule,
    HiddenScrollWrapperModule,
    CdkScrollableModule,
    MatIconModule,
    MatExpansionModule,
    MessagesModule
  ]
})
export class RequestsModule { }
