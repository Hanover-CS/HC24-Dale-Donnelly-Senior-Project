import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';

xdescribe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
