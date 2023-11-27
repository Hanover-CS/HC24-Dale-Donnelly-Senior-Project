import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';

import { MovieService } from 'src/app/services/movie.service';
import { ReviewService } from 'src/app/services/review.service';
import { MovieData } from 'src/lib/types/MovieData';
import { Review, ReviewAverage } from 'src/lib/types/Review';
import { GenreIdToGenre } from 'src/lib/types/Genre';

/**
 * Generates a MovieDetails component which displays title info and facilitates user interaction for reviewing the titles.
 * 
 * Displayed info includes the title, overview, poster, and genres.
 * 
 * Component page route is generated from the title's ID, which is then used to retrieve title data.
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  constructor(private movieService: MovieService, private reviewService: ReviewService, private route: ActivatedRoute) {}

  movieId = Number(this.route.snapshot.params['id']);
  movie !: MovieData
  reviews !: Observable<Review[]>;
  genreIdToGenre = GenreIdToGenre
  reviewStats !: ReviewAverage

  /**
   * Constructs a Review interface object and calls Firestore to post the review to the database.
   * @param rating Number, score of the review to be posted to Firestore.
   * @param content String, text content of the review to be posted to Firestore.
   */
  postReview(rating: number, content: string) {
    const formattedDate = this.createDate();
    const review: Review = {
      content, 
      rating, 
      movieId: this.movieId, 
      date: formattedDate
    };
    this.clearUserInput();
    this.reviewService.addReview(review)
    this.getReviewStats()
  }

  /**
   * Helper function to create a string for a date from a template in the MM/DD/YYYY format.
   * @returns String, date in MM/DD/YYYY format.
   */
  private createDate() {
    const date = new Date();
    const formattedDate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
    return formattedDate;
  }

  /**
   * Helper function to clear user input after they have posted a review. 
   * Input area for review content returns to placeholder text.
   */
  private clearUserInput() {
    const reviewTextArea = document.getElementById('reviewTextInput') as HTMLTextAreaElement;
    if (reviewTextArea) {
      reviewTextArea.value = "";
    }
  }

  ngOnInit() {
    this.movieService.getMovieById(this.movieId).subscribe(
      (movie=> {
          this.movie = movie
        })
    )
    this.reviews = this.reviewService.getReviewsForMovie(this.movieId);
    this.getReviewStats();
  }

  private getReviewStats() {
    from(this.reviewService.getReviewStats(this.movieId)).subscribe(
      stats => {
        this.reviewStats = stats;
      }
    );
  }
}
