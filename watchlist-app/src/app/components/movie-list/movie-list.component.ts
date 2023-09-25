import { Component } from '@angular/core';
import { MovieData } from 'src/lib/types/MovieData';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  constructor(private movieService: MovieService) {}

  movies: MovieData[] = this.movieService.getAllMovieData();
}
