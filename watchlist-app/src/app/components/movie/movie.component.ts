import { Component, Input } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { MovieData } from 'src/lib/types/MovieData';
import { ReviewAverage } from 'src/lib/types/Review';
/**
 * Generates a movie component, generated from the provided MovieData parameter.
 * Movie component consists of a poster and a title, which are presented in
 * the homepage lists.
 */
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input() movie !: MovieData;
  reviewStats !: ReviewAverage

  constructor(private reviewService: ReviewService) { }

  async ngOnInit() {
    this.reviewStats = await this.reviewService.getReviewStats(this.movie.id)
  }
}
