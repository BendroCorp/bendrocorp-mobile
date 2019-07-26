import { TestBed } from '@angular/core/testing';

import { PushRegistarService } from './push-registar.service';

describe('PushRegistarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PushRegistarService = TestBed.get(PushRegistarService);
    expect(service).toBeTruthy();
  });
});
