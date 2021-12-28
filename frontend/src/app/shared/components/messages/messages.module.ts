import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './messages.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { HiddenScrollWrapperModule } from '@shared/components/hidden-scroll-wrapper/hidden-scroll-wrapper.module';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';
import { FullNameModule } from '@shared/pipes/full-name/full-name.module';


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
    MatProgressSpinnerModule,
    AvatarModule,
    HiddenScrollWrapperModule,
    CdkScrollableModule,
    FormsModule,
    FullNameModule
  ]
})
export class MessagesModule {
}
