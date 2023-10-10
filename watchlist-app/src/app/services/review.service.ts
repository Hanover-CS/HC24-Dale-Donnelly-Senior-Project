import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, query } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { Review } from 'src/lib/types/Review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  reviews !: Observable<Review[]>

  constructor(private firestore: Firestore) { 
    console.log(this.firestore)
    console.log(this.firestore.type);
  }

  getAllReviews() {
    let reviewCollection = collection(this.firestore, 'reviews');
    let q = query(reviewCollection)
    this.reviews = collectionData(q).pipe(
      map(reviews => reviews.map((r: any) => this.mapToReview(r)))
    )
    return this.reviews;
  }

  getReviewsForMovie(movieId: number) {
    this.getAllReviews();
    return this.reviews.pipe(
      map(reviews => reviews.filter((r: Review) => r.programId === movieId))
    )
  }

  private mapToReview(r: any) {
    return new Review(r.content, r.rating, r.movieId, r.date)
  }
}
