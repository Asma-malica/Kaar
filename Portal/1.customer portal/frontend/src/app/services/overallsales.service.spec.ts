import { TestBed } from '@angular/core/testing';

import { OverallsalesService } from './overallsales.service';

describe('OverallsalesService', () => {
  let service: OverallsalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverallsalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
