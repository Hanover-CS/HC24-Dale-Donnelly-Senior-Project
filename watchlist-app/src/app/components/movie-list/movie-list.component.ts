import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'; 

import { MovieData } from 'src/lib/types/MovieData';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies !: Observable<MovieData[]>

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movies = this.movieService.getAllMovies()
  }
}
