import { Injectable, ErrorHandler } from '@angular/core';
import { Firestore, collectionData, collection, query, addDoc, where, getDoc, doc, setDoc, DocumentSnapshot } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Review, ReviewAverage } from 'src/lib/types/Review';
import { reviewAveragePath, reviewCollectionPath } from 'src/lib/types/urls';

/**
 * ReviewService is responsible for requesting and retrieving review data from the project's Firestore database.
 */
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  allReviews !: Observable<Review[]>
  reviewCollection = collection(this.firestore, reviewCollectionPath)

  /**
   * Constructor for creating a shared, injectable instance of the service.
   * Provides a shared firestore instance for database operations.
   * @param firestore 
   */
  constructor(private firestore: Firestore, private errorHandler: ErrorHandler) {}

  /**
   * Queries the Firestore database for all reviews. 
   * Utilizes the mapToReview() helper function to organize the data.
   * @returns Observable array of reviews
   */
  getAllReviews(): Observable<Review[]> {
    const q = query(this.reviewCollection)
    this.allReviews = collectionData(q).pipe(
      // eslint-disable-next-line
      map(reviews => reviews.map((r: any) => this.mapToReview(r)))
    )
    return this.allReviews;
  }

  /**
   * Queries the Firestore databse for all reviews that contain a specfic movie ID.
   * Utilizes the mapToReview() helpfer function to organize the data.
   * @param movieId 
   * @returns Observable array of reviews
   */
  getReviewsForMovie(movieId: number): Observable<Review[]> {
    const q = query(this.reviewCollection, where('movieId', '==', movieId))
    const movieReviews = collectionData(q).pipe(
      // eslint-disable-next-line
      map(reviews => reviews.map((r: any) => this.mapToReview(r)))
    )
    return movieReviews
  }

  /**
   * Helper function that transforms retrieved Firestore document data to be instances of the Review interface.
   * @param r 
   * @returns Review interface instance
   */
  // eslint-disable-next-line
  private mapToReview(r: any) {
    return { content: r.content, rating: r.rating, movieId: r.movieId, date: r.date }
  }

  /**
   * Adds the parameter review to the Firestore database and updates associated review stats.
   * @param review 
   * @returns Doc reference for new review
   */
  async addReview(review: Review) {
    const newReview = await addDoc(this.reviewCollection, review)
    .catch((err: Error) => {
      this.errorHandler.handleError(err)
    })
    const avgDocRef = doc(this.firestore, reviewAveragePath+review.movieId)
    this.getRatingStats(review.movieId).subscribe(
      stats => {
        setDoc(avgDocRef, stats)
        .catch((err) => {
          this.errorHandler.handleError(err)
        })
      }
    )
    return newReview;
  }

  /**
   * Retrieves the stat document for a given movie ID or calls a helper to generate a new stats document if
   * one does not exist.
   * @param movieId 
   * @returns 
   */
  async getReviewStats(movieId: number): Promise<ReviewAverage> {
    const docRef = doc(this.firestore, reviewAveragePath+movieId)
    const reviewAverage = await getDoc(docRef)
    .catch((err: Error) => {
      this.handleError(err);
    })
    if (reviewAverage instanceof DocumentSnapshot && reviewAverage.data()) {
       return this.mapToReviewAverage(reviewAverage.data())
    }
    else {
      return new Promise(() => {
          const data = this.getRatingStats(movieId)
          data.subscribe(d => {
            setDoc(docRef, d)
            .catch((err: Error) => {
              this.handleError(err)
            })
          })
      })
    }
  }

  /**
   * A helper function that calculates the number of ratings, total rating score, and average rating score 
   * for a given title.
   * @param movieId 
   * @returns 
   */
  private getRatingStats(movieId: number): Observable<ReviewAverage> {
      const reviews = this.getReviewsForMovie(movieId)
      const data: Observable<ReviewAverage> = reviews.pipe(
        map((reviewArr: Review[]) => {
          let ratingCount = 0
          let totalRating = 0
          let avgRating = 0
          for (const r of reviewArr) {
            ratingCount += 1
            totalRating += r.rating
          }
          if (totalRating > 0 && ratingCount > 0) {
            avgRating = totalRating / ratingCount
            avgRating = Math.round(avgRating * 10) / 10
          }
          return { totalRating, ratingCount, avgRating }
        })
      )
      return data
  }

  // eslint-disable-next-line
  private mapToReviewAverage(d: any): ReviewAverage {
    return {
      ratingCount: d.ratingCount,
      totalRating: d.totalRating,
      avgRating: d.avgRating
    }
  }

  /**
   * A helper function that calls the ErrorHandler's handleError method with any caught errors.
   * The ErrorHandler's handlerError function console logs errors.
   * @param err 
   */
  private handleError(err: Error) {
    this.errorHandler.handleError(err);
  }
}
