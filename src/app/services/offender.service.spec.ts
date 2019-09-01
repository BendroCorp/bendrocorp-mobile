import { TestBed } from '@angular/core/testing';

import { OffenderService } from './offender.service';

describe('OffenderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OffenderService = TestBed.get(OffenderService);
    expect(service).toBeTruthy();
  });
});
