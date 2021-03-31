import { TestBed } from '@angular/core/testing';

import { RelationsService } from './relations.service';

describe('RelationsService', () => {
  let service: RelationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
