import { TestBed } from '@angular/core/testing';

import { VirtualEmergencyService } from './virtual-emergency.service';

describe('VirtualEmergencyService', () => {
  let service: VirtualEmergencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualEmergencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
