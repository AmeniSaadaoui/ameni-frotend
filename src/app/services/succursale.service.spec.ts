import { TestBed } from '@angular/core/testing';

import { SuccursaleService } from './succursale.service';

describe('SuccursaleService', () => {
  let service: SuccursaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccursaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
