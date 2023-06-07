import { TestBed } from '@angular/core/testing';

import { AutorisationSortieService } from './autorisation-sortie.service';

describe('AutorisationSortieService', () => {
  let service: AutorisationSortieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorisationSortieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
