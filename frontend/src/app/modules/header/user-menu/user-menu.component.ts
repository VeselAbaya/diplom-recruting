import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { IUserDto } from '@monorepo/types/user/user.dto.interface';
import { matMenuAnimations } from '@angular/material/menu';
import { ESCAPE, TAB } from '@angular/cdk/keycodes';
import { FocusKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import { UserMenuItemDirective } from '@modules/header/user-menu/user-menu-item.directive';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [matMenuAnimations.transformMenu]
})
export class UserMenuComponent extends OnDestroyMixin implements AfterViewInit {
  @Input() user!: IUserDto;
  @ViewChildren(UserMenuItemDirective) navigationFocusKeys!: QueryList<UserMenuItemDirective>;
  @ViewChild('triggerOrigin', { read: ElementRef }) triggerButton!: ElementRef<HTMLButtonElement>;
  isNavigationOverlayOpen = false;
  private focusKeyManager!: FocusKeyManager<UserMenuItemDirective>;

  constructor(public readonly auth: AuthService) {
    super();
  }

  ngAfterViewInit(): void {
    this.focusKeyManager = new FocusKeyManager<UserMenuItemDirective>(this.navigationFocusKeys)
      .withWrap()
      .withHomeAndEnd()
      .withTypeAhead(100);
    this.focusKeyManager.tabOut.pipe(
      untilComponentDestroyed(this)
    ).subscribe(() => this.closeNavigationOverlay());
  }

  @HostListener('document:keydown', ['$event'])
  private onDocumentKeyDown(e: KeyboardEvent): void {
    this.focusKeyManager.onKeydown(e);
    if (e.keyCode === ESCAPE || e.keyCode === TAB) {
      this.closeNavigationOverlay();
    }
  }

  openNavigationOverlayIfFocusViaTab(focusOrigin: FocusOrigin): void {
    if (focusOrigin === 'keyboard') {
      this.openNavigationOverlay();
    }
  }

  openNavigationOverlay(): void {
    if (this.isNavigationOverlayOpen) {
      return;
    }

    this.isNavigationOverlayOpen = true;
    this.navigationFocusKeys.changes.pipe(
      take(1)
    ).subscribe(() => this.focusKeyManager.setFirstItemActive());
  }

  closeNavigationOverlay(): void {
    if (!this.isNavigationOverlayOpen) {
      return;
    }

    this.isNavigationOverlayOpen = false;
    // to return default tab focus flow
    this.triggerButton.nativeElement.focus();
  }
}
