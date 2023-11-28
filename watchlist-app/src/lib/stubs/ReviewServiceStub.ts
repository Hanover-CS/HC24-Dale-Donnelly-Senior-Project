import { of } from "rxjs"
import { Review, ReviewAverage } from "../types/Review"

export const testReviews: Review[] = [
  {
    content: 'Example',
    rating: 5,
    movieId: 0,
    date: '10/22/2023'
  }
]

const stats: ReviewAverage = {
  ratingCount: 1,
  totalRating: 1,
  avgRating: 1
}

export class ReviewServiceStub {
  constructor() {
    console.log('stub made for movie details')
  }
  getReviewsForMovie() {
    return of(testReviews)
  }

  addReview() {
    return testReviews
  }

  getReviewStats() {
    return new Promise((res) => res(stats))
  }
}