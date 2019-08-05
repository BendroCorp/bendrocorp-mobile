import { TestBed } from '@angular/core/testing';

import { AppBadgeService } from './app-badge.service';

describe('AppBadgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppBadgeService = TestBed.get(AppBadgeService);
    expect(service).toBeTruthy();
  });
});
