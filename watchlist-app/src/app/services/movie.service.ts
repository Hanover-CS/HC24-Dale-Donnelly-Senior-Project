import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MovieData } from 'src/lib/types/MovieData';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movieJson: any;
  movieData: MovieData[] = this.retrieveMovies();

  constructor(private http: HttpClient) { }

  private getJSON() {
    return this.http.get<any>('assets/data/movies.json');
  }

  private retrieveMovies(): MovieData[] {
    const movies: MovieData[] = []
    this.getJSON().subscribe(data => {
      this.movieJson = data;
      for (const m of this.movieJson.results) {
        movies.push({
          id: m.id,
          title: m.title,
          overview: m.overview,
          imagePath: `https://image.tmdb.org/t/p/w220_and_h330_face${m.poster_path}`,
          releaseDate: m.release_date,
          genreIds: m.genre_ids
        })
      }
    })
    return movies;
  }

  getAllMovieData(): MovieData[] {
    return this.movieData;
  }

  getMovieById(id: Number): MovieData {
    const movie = this.movieData.filter((m) => m.id === id);
    return movie[0];
  }
}
