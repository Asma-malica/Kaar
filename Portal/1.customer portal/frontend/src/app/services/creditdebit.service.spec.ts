import { TestBed } from '@angular/core/testing';

import { CreditdebitService } from './creditdebit.service';

describe('CreditdebitService', () => {
  let service: CreditdebitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditdebitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
