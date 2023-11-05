import { Component, OnInit, Input } from '@angular/core';

import { MovieData } from 'src/lib/types/MovieData';
import { MovieService } from 'src/app/services/movie.service';
import { GenreIdToGenre, GenreIds } from 'src/lib/types/Genre';

/**
 * Generates a MovieList components. Movies are retrieved according to the provided Genre ID.
 * Calls on the Movie components to create individual thumbnails in the lists.
 * 
 * Movie lists are presented on the homepage of the app, separated by genre.
 */
@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  @Input() genreId !: number
  movies !: MovieData[]
  genreIds = GenreIds
  genreIdToGenre = GenreIdToGenre

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMoviesByGenre(this.genreId).subscribe((movies) => {
      this.movies = movies
    })
  }
}
