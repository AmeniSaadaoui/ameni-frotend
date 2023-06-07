import { TestBed } from '@angular/core/testing';

import { SexeService } from './sexe.service';

describe('SexeService', () => {
  let service: SexeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SexeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
