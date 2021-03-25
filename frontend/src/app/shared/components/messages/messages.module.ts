import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { HiddenScrollWrapperModule } from '@shared/components/hidden-scroll-wrapper/hidden-scroll-wrapper.module';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MessagesComponent],
  exports: [
    MessagesComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    AvatarModule,
    HiddenScrollWrapperModule,
    CdkScrollableModule,
    FormsModule
  ]
})
export class MessagesModule { }
