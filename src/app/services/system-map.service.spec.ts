import { TestBed } from '@angular/core/testing';

import { SystemMapService } from './system-map.service';

describe('SystemMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemMapService = TestBed.get(SystemMapService);
    expect(service).toBeTruthy();
  });
});
