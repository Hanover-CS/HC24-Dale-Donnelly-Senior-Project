import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';
import { Firestore, FirestoreModule, connectFirestoreEmulator, getFirestore, initializeFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseAppModule, getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';
import { Review, ReviewAverage } from 'src/lib/types/Review';
import { from } from 'rxjs';

const testReview: Review = {
  content: 'test',
  rating: 3,
  movieId: 0,
  date: '10/26/2023'
}

const testReviewStats: ReviewAverage = {ratingCount: 1, totalRating: 3, avgRating: 3}

const testReview_2: Review = {
  content: 'test',
  rating: 3,
  movieId: 1,
  date: '10/26/2023'
}

const testReviews = [testReview, testReview_2]

describe('ReviewService', () => {

  let service: ReviewService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [
        FirebaseAppModule,
        FirestoreModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => {
          let firestore: Firestore
          if (environment.useEmulators) {
            firestore = initializeFirestore(getApp(), {})
            connectFirestoreEmulator(firestore, 'localhost', 8080)
          } else {
            firestore = getFirestore()
          }
          return firestore
        })
      ]
    })
    service = TestBed.inject(ReviewService);
    service.addReview(testReview)
    service.addReview(testReview_2)
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // using $ to denote observable variables
  it('should add and retrieve all reviews', (done) => {
    const $allReviews = service.getAllReviews()
    $allReviews.subscribe(reviews => {
      // The order the reviews are retrieved in is unreliable,
      // reviews are sorted by id for ease of comparison
      reviews.sort((a, b) => {
        return a.movieId - b.movieId
      })
      for (let i = 0; i < reviews.length; i++) {
        expect(reviews[i]).toEqual(testReviews[i])
      }
      done()
    })
  })

  it('should add and retrieve reviews for single movie', (done) => {
    const $movieReviews = service.getReviewsForMovie(0)
    $movieReviews.subscribe(reviews => {
      expect(reviews[0]).toEqual(testReview)
      done()
    })
  })

  // The following tests are disabled and will have no effect when running tests or viewing coverage.
  // They are disabled because of some issue preventing the offline emulator from retrieving individual
  // database documents. The tests listed above perform operations and retrieve from whole collections,
  // so the issue does not seem to affect them.

  xit('should update stat doc when adding a new review', async () => {
    console.log('test start')
    const oldStats = await service.getReviewStats(0)
    console.log('got old stats') 
    const newReview: Review = {
      content: 'test',
      rating: 5,
      movieId: 0,
      date: 'date'
    } 
    service.addReview(newReview)
    console.log('added new review')
    const newStats = await service.getReviewStats(0)
    console.log('got new stats')

    expect(newStats.ratingCount).toEqual(oldStats.ratingCount+1)
    expect(newStats.totalRating).toEqual(oldStats.totalRating+5)
    expect(newStats.avgRating).toEqual(newStats.totalRating/newStats.ratingCount)
  })

  xit('should retrieve review stats for a movie', (done) => {
    from(service.getReviewStats(0)).subscribe( stats => {
      expect(stats).toEqual({ratingCount: 1, totalRating: 3, avgRating: 3})
      done()
    })
  })
});
