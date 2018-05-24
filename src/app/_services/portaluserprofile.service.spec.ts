import { TestBed, inject } from '@angular/core/testing';

import { PortaluserprofileService } from './portaluserprofile.service';

describe('PortaluserprofileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PortaluserprofileService]
    });
  });

  it('should be created', inject([PortaluserprofileService], (service: PortaluserprofileService) => {
    expect(service).toBeTruthy();
  }));
});
