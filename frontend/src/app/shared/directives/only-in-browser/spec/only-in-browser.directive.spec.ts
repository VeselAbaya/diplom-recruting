import { OnlyInBrowserDirective } from '../only-in-browser.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  OnlyInBrowserSpecHostComponent
} from '@shared/directives/only-in-browser/spec/only-in-browser-spec-host.component';
import { IS_BROWSER } from '@shared/tokens/is-browser.token';

describe('OnlyInBrowserDirective', () => {
  let fixture: ComponentFixture<OnlyInBrowserSpecHostComponent>;

  const configureTestingModule = async (isBrowser: boolean) => {
    await TestBed.configureTestingModule({
      declarations: [OnlyInBrowserSpecHostComponent, OnlyInBrowserDirective],
      providers: [{ provide: IS_BROWSER, useValue: isBrowser }]
    }).compileComponents();

    fixture = TestBed.createComponent(OnlyInBrowserSpecHostComponent);
    fixture.detectChanges();
  };

  it('should hides host if platform is not browser', async () => {
    await configureTestingModule(false);
    expect(fixture.nativeElement.textContent).toBe('');
  });

  it('should shows host if platform is browser', async () => {
    await configureTestingModule(true);
    expect(fixture.nativeElement.textContent).toContain('Text only for browser');
  });
});
