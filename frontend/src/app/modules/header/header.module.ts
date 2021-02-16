import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, UserMenuComponent],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule
  ]
})
export class HeaderModule { }
