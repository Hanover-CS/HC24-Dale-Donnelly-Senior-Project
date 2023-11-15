import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, addDoc, where, getDoc, doc, setDoc } from '@angular/fire/firestore';
import { Observable, map, from } from 'rxjs';
import { Review, ReviewAverage } from 'src/lib/types/Review';

/**
 * ReviewService is responsible for requesting and retrieving review data from the project's Firestore database.
 */
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  allReviews !: Observable<Review[]>
  reviewCollection = collection(this.firestore, 'reviews')
  reviewAvgCollection = collection(this.firestore, 'reviewAverage')

  /**
   * Constructor for creating a shared, injectable instance of the service.
   * Provides a shared firestore instance for database operations.
   * @param firestore 
   */
  constructor(private firestore: Firestore) {}

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
   * Adds the parameter review to the Firestore database.
   * @param review 
   * @returns Doc reference for new review
   */
  async addReview(review: Review) {
    const newReview = await addDoc(this.reviewCollection, review)
    return newReview;
  }

  async getReviewStats(movieId: number) {
    let newDoc;
    const docRef = doc(this.firestore, 'reviewAverage/'+movieId)
    const reviewAverage = await getDoc(docRef)
    if (reviewAverage.data()) return reviewAverage
    else {
      console.log('creating review avg doc')
      const data = this.getRatingStats(movieId)
      data.subscribe(d => {
        newDoc = setDoc(docRef, d)
      })
    }
    return newDoc
  }

  private getRatingStats(movieId: number) {
      const reviews = this.getReviewsForMovie(movieId)
      const data: Observable<ReviewAverage> = reviews.pipe(
        map((reviewArr: Review[]) => {
          let ratingCount = 0
          let totalRating = 0
          let avgRating = 0
          for (let r of reviewArr) {
            ratingCount += 1
            totalRating += r.rating
          }
          if (totalRating > 0 && ratingCount > 0) Math.round(avgRating = totalRating / ratingCount)
          return { totalRating, ratingCount, avgRating }
        })
      )
      return data
  }
}
