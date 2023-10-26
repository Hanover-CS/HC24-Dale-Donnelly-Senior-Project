import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, addDoc, deleteDoc, where, doc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Review } from 'src/lib/types/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  allReviews !: Observable<Review[]>
  reviewCollection = collection(this.firestore, 'reviews')

  constructor(private firestore: Firestore) {}

  getAllReviews(): Observable<Review[]> {
    const q = query(this.reviewCollection)
    this.allReviews = collectionData(q).pipe(
      // eslint-disable-next-line
      map(reviews => reviews.map((r: any) => this.mapToReview(r)))
    )
    return this.allReviews;
  }

  getReviewsForMovie(movieId: number): Observable<Review[]> {
    const q = query(this.reviewCollection, where('movieId', '==', movieId))
    const movieReviews = collectionData(q).pipe(
      // eslint-disable-next-line
      map(reviews => reviews.map((r: any) => this.mapToReview(r)))
    )
    return movieReviews
  }

  // eslint-disable-next-line
  private mapToReview(r: any) {
    return { content: r.content, rating: r.rating, movieId: r.movieId, date: r.date }
  }

  async addReview(review: Review) {
    console.log(`Adding review from: ${review}`)
    const newReview = await addDoc(this.reviewCollection, review)
    console.log(newReview)
    return newReview;
  }
}
