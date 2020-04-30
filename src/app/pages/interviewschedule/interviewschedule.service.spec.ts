import { TestBed } from '@angular/core/testing';

import { InterviewscheduleService } from './interviewschedule.service';

describe('InterviewscheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InterviewscheduleService = TestBed.get(InterviewscheduleService);
    expect(service).toBeTruthy();
  });
});
