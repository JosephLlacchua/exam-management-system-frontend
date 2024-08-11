import { TestBed } from '@angular/core/testing';

import { ExamApiService } from './exam-api.service';

describe('ExamApiService', () => {
  let service: ExamApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
