import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';
import { Firestore } from '@angular/fire/firestore';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        Firestore
      ]
    });
    service = TestBed.inject(ReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
