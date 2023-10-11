import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query, addDoc } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Review } from 'src/lib/types/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviews !: Observable<Review[]>
  reviewCollection = collection(this.firestore, 'reviews')

  constructor(private firestore: Firestore) {}

  getAllReviews() {
    // const reviewCollection = collection(this.firestore, 'reviews');
    const q = query(this.reviewCollection)
    this.reviews = collectionData(q).pipe(
      map(reviews => reviews.map((r: any) => this.mapToReview(r)))
    )
    return this.reviews;
  }

  getReviewsForMovie(movieId: number) {
    this.getAllReviews();
    return this.reviews.pipe(
      map(reviews => reviews.filter((r: Review) => r.movieId === movieId))
    )
  }

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
