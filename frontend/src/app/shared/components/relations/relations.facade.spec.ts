import { TestBed } from '@angular/core/testing';

import { RelationsFacade } from './relations.facade';

describe('RelationsFacade', () => {
  let service: RelationsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelationsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
