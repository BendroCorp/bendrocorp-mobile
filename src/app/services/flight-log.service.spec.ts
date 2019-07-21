import { TestBed } from '@angular/core/testing';

import { FlightLogService } from './flight-log.service';

describe('FlightLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlightLogService = TestBed.get(FlightLogService);
    expect(service).toBeTruthy();
  });
});
