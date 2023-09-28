import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { MovieService } from 'src/app/services/movie.service';
import { MovieData } from 'src/lib/types/MovieData';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  constructor(private movieService: MovieService) {}

  route: ActivatedRoute = inject(ActivatedRoute);
  movieId = Number(this.route.snapshot.params['id']);
  movie !: MovieData

  ngOnInit() {
    this.movieService.getMovieById(this.movieId).subscribe(
      (movie=> {
          this.movie = movie
        })
    )
  }
}
