import { TestBed } from '@angular/core/testing';

import { JobBoardService } from './job-board.service';

describe('JobBoardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobBoardService = TestBed.get(JobBoardService);
    expect(service).toBeTruthy();
  });
});
