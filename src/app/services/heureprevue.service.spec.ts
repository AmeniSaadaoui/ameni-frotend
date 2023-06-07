import { TestBed } from '@angular/core/testing';

import { HeureprevueService } from './heureprevue.service';

describe('HeureprevueService', () => {
  let service: HeureprevueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeureprevueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
