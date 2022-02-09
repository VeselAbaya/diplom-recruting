import { Directive, Inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { IS_BROWSER } from '@shared/tokens/is-browser.token';

@Directive({
  selector: '[appOnlyInBrowser]',
})
export class OnlyInBrowserDirective implements OnInit {
  private _onlyInBrowser: boolean | undefined;
  @Input('appOnlyInBrowser') set onlyInBrowser(mustBeRenderedOnlyInBrowser: unknown) {
    this._onlyInBrowser = coerceBooleanProperty(mustBeRenderedOnlyInBrowser);
    if (this._onlyInBrowser && !this.isBrowser) {
      this.vc.clear();
    } else if (this.isBrowser) {
      this.vc.createEmbeddedView(this.t);
    }
  }

  constructor(private readonly vc: ViewContainerRef,
              private readonly t: TemplateRef<unknown>,
              // tslint:disable-next-line:ban-types
              @Inject(IS_BROWSER) private readonly isBrowser: boolean) {
  }

  ngOnInit(): void {
    if (this._onlyInBrowser === undefined) {
      this.onlyInBrowser = true;
    }
  }
}
