import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Input
} from '@angular/core';
import { asyncScheduler, merge, Subject } from 'rxjs';
import { CdkScrollable, ViewportRuler } from '@angular/cdk/overlay';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';
import { ContentObserver } from '@angular/cdk/observers';

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
              private readonly contentObserver: ContentObserver,
              private cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    if (!this.scrollable) {
      console.error('app-hidden-scroll-wrapper expects cdkScrollable inside ng-content');
      this.snackbar.open('Something went wrong: Hidden horizontal scrolling isn\'t working', 'Close');
      return;
    }

    const throttleScroll = throttleTime(100, asyncScheduler, {leading: true, trailing: true});
    merge(
      this.scrollable.elementScrolled().pipe(throttleScroll),
      this.viewportRuler.change().pipe(throttleScroll),
      this.contentObserver.observe(this.scrollable.getElementRef().nativeElement)
    ).pipe(
      untilComponentDestroyed(this)
    ).subscribe(() => {
      this.hasScroll.next(this.scrollSize > this.offsetSize);
      this.scrolledCloseToBegin.next(Math.floor(this.scrollOffsetFromBegin) === 0);
      this.scrolledCloseToEnd.next(Math.floor(this.scrollOffsetFromEnd) === 0);
      // elementScrolled() doesn't trigger change detection 'cause that stream created outside of ngZone
      // https://github.com/angular/components/blob/master/src/cdk/scrolling/scrollable.ts#L51
      this.cdr.detectChanges();
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
