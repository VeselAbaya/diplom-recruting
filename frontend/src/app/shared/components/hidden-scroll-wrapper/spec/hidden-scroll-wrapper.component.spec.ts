import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenScrollWrapperComponent } from '../hidden-scroll-wrapper.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  HiddenScrollWrapperSpecHostComponent,
  WITH_SCROLL
} from '@shared/components/hidden-scroll-wrapper/spec/hidden-scroll-wrapper-spec-host.component';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

describe('HiddenScrollWrapperComponent', () => {
  let fixture: ComponentFixture<HiddenScrollWrapperSpecHostComponent>;
  let scrollWrapper: HTMLDivElement;

  const configureTestingModule = async (withScroll: boolean) => {
    await TestBed.configureTestingModule({
      declarations: [HiddenScrollWrapperComponent, HiddenScrollWrapperSpecHostComponent],
      imports: [MatSnackBarModule, NoopAnimationsModule, CdkScrollableModule],
      providers: [{ provide: WITH_SCROLL, useValue: withScroll }]
    }).compileComponents();

    fixture = TestBed.createComponent(HiddenScrollWrapperSpecHostComponent);
    scrollWrapper = fixture.nativeElement.querySelector('.scroll-wrapper');
    fixture.detectChanges();
  };

  it('should look like regular div if there is no scroll', async () => {
    await configureTestingModule(false);
    fixture.detectChanges();
    expect(scrollWrapper.classList.contains('scroll-wrapper--with-scroll')).toBeFalse();
  });

  it('should initially hide top shadow and show bottom if scroll visible', async () => {
    await configureTestingModule(true);
    expect(scrollWrapper.classList.contains('scroll-wrapper--with-scroll')).toBeTrue();
    expect(scrollWrapper.classList.contains('scroll-wrapper--scrolled-close-to-begin')).toBeTrue();
    expect(scrollWrapper.classList.contains('scroll-wrapper--scrolled-close-to-end')).toBeFalse();
  });

  it('should show top and bottom shadow if scrolled to center', async () => {
    await configureTestingModule(true);
    const scrollableEl = fixture.componentInstance.scrollable.getElementRef().nativeElement;

    fixture.componentInstance.scrollable.scrollTo({ top: scrollableEl.scrollHeight / 2 });
    scrollableEl.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(scrollWrapper.classList.contains('scroll-wrapper--scrolled-close-to-begin')).toBeFalse();
    expect(scrollWrapper.classList.contains('scroll-wrapper--scrolled-close-to-end')).toBeFalse();
  });
});
