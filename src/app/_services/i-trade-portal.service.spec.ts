import { TestBed, inject } from '@angular/core/testing';

import { ITradePortalService } from './i-trade-portal.service';

describe('ITradePortalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ITradePortalService]
    });
  });

  it('should be created', inject([ITradePortalService], (service: ITradePortalService) => {
    expect(service).toBeTruthy();
  }));
});
