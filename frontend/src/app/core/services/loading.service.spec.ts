import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';
import { take } from 'rxjs/operators';
import { cold } from 'jasmine-marbles';

describe('LoadingService', () => {
  let service: LoadingService;
  const assertActive$ = (assert: (isLoading: boolean) => unknown) => service.active$.pipe(take(1)).subscribe(assert);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should turns on and turns off', () => {
    service.on();
    assertActive$(isLoading => expect(isLoading).toBeTrue());
    service.off();
    assertActive$(isLoading => expect(isLoading).toBeFalse());
  });

  it('should be pending if some of observables pending', () => {
    const short = cold('-x|');
    const long = cold('--x|');

    service.on();
    short.subscribe(() => {
      service.off();
      assertActive$(isLoading => expect(isLoading).toBeTrue());
    });

    service.on();
    long.subscribe(() => {
      service.off();
      assertActive$(isLoading => expect(isLoading).toBeFalse());
    });
  });
});
