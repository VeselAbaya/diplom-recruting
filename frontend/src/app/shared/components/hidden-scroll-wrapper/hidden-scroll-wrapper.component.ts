import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input
} from '@angular/core';
import { merge, Subject } from 'rxjs';
import { CdkScrollable, ViewportRuler } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { distinctUntilChanged, startWith, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-hidden-scroll-wrapper',
  templateUrl: './hidden-scroll-wrapper.component.html',
  styleUrls: ['./hidden-scroll-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HiddenScrollWrapperComponent extends OnDestroyMixin implements AfterViewInit {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @ContentChild(CdkScrollable) scrollable: CdkScrollable | null = null;
  private readonly hasScroll = new Subject<boolean>();
  readonly hasScroll$ = this.hasScroll.pipe(distinctUntilChanged());
  private readonly scrolledCloseToBegin = new Subject<boolean>();
  readonly scrolledCloseToBegin$ = this.scrolledCloseToBegin.pipe(distinctUntilChanged());
  private readonly scrolledCloseToEnd = new Subject<boolean>();
  readonly scrolledCloseToEnd$ = this.scrolledCloseToEnd.pipe(distinctUntilChanged());

  constructor(private readonly snackbar: MatSnackBar,
              private readonly viewportRuler: ViewportRuler,
              private cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    // todo: FIX IT! Wait for component renders;
    setTimeout(() => {
      if (!this.scrollable) {
        console.error('app-hidden-scroll-wrapper expects cdkScrollable inside ng-content');
        this.snackbar.open('Something went wrong: Hidden horizontal scrolling isn\'t working', 'Close');
        return;
      }

      merge(this.scrollable.elementScrolled(), this.viewportRuler.change(80)).pipe(
        untilComponentDestroyed(this),
        startWith(null)
      ).subscribe(() => {
        this.hasScroll.next(this.scrollSize > this.offsetSize);
        this.scrolledCloseToBegin.next(Math.floor(this.scrollOffsetFromBegin) === 0);
        this.scrolledCloseToEnd.next(Math.floor(this.scrollOffsetFromEnd) === 0);
        // TODO: Don't understand why it is needed here (and if it is really needed, why .markForCheck() doesn't help)
        this.cdr.detectChanges();
      });
    });
  }

  get scrollSize(): number {
    return this.scrollable?.getElementRef().nativeElement[
      this.orientation === 'vertical' ? 'scrollHeight' : 'scrollWidth'
    ] || 0;
  }

  get offsetSize(): number {
    return this.scrollable?.getElementRef().nativeElement[
      this.orientation === 'vertical' ? 'offsetHeight' : 'offsetWidth'
    ] || 0;
  }

  get scrollOffsetFromBegin(): number {
    return this.scrollable?.measureScrollOffset(
      this.orientation === 'vertical' ? 'top' : 'left'
    ) || 0;
  }

  get scrollOffsetFromEnd(): number {
    return this.scrollable?.measureScrollOffset(
      this.orientation === 'vertical' ? 'bottom' : 'right'
    ) || 0;
  }
}
