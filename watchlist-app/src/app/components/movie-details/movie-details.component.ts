import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieService } from 'src/app/services/movie.service';
import { ReviewService } from 'src/app/services/review.service';
import { MovieData } from 'src/lib/types/MovieData';
import { Review } from 'src/lib/types/Review';
import { GenreIdToGenre } from 'src/lib/types/Genre';

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

  postReview(rating: number, content: string) {
    const formattedDate = this.createDate();
    const review: Review = {
      content: content, 
      rating: rating, 
      movieId: this.movieId, 
      date: formattedDate
    };
    this.clearUserInput();
    this.reviewService.addReview(review)
  }

  private createDate() {
    const date = new Date();
    const formattedDate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
    return formattedDate;
  }

  private clearUserInput() {
    const reviewTextArea = document.getElementById('reviewTextInput') as HTMLTextAreaElement;
    if (reviewTextArea) {
      console.log('clearing user input from text area')
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
  }
}
