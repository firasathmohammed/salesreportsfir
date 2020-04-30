import { TestBed } from '@angular/core/testing';

import { JobrequirementService } from './jobrequirement.service';

describe('JobrequirementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobrequirementService = TestBed.get(JobrequirementService);
    expect(service).toBeTruthy();
  });
});
