import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { A11yModule } from '@angular/cdk/a11y';
import { UserMenuItemDirective } from './user-menu/user-menu-item.directive';

@NgModule({
  declarations: [HeaderComponent, UserMenuComponent, UserMenuItemDirective],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    MatBadgeModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    OverlayModule,
    MatListModule,
    MatMenuModule,
    A11yModule
  ]
})
export class HeaderModule {
}
