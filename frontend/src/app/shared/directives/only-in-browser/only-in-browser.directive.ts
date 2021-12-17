import { Directive, Inject, Input, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[appOnlyInBrowser]'
})
export class OnlyInBrowserDirective implements OnInit {
  private _onlyInBrowser: boolean | undefined;
  @Input('appOnlyInBrowser') set onlyInBrowser(mustBeRenderedOnlyInBrowser: unknown) {
    this._onlyInBrowser = coerceBooleanProperty(mustBeRenderedOnlyInBrowser);
    if (this._onlyInBrowser && isPlatformServer(this.platformId)) {
      this.vc.clear();
    } else if (isPlatformBrowser(this.platformId)) {
      this.vc.createEmbeddedView(this.t);
    }
  }

  constructor(private readonly vc: ViewContainerRef,
              private readonly t: TemplateRef<unknown>,
              // tslint:disable-next-line:ban-types
              @Inject(PLATFORM_ID) private readonly platformId: Object) {
  }

  ngOnInit(): void {
    if (this._onlyInBrowser === undefined) {
      this.onlyInBrowser = true;
    }
  }
}
