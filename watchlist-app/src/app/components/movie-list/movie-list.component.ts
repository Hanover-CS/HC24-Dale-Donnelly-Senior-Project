import { Component } from '@angular/core';
import { Observable, of, from } from 'rxjs'; 

import { MovieData } from 'src/lib/types/MovieData';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies !: MovieData[]

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getAllMovies().subscribe(
      (movies => this.movies = movies)
    )
  }
}
