import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, filter } from 'rxjs';

import { MovieData } from 'src/lib/types/MovieData';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies !: Observable<MovieData[]>;
  singleMovies = new Map();


  constructor(private http: HttpClient) {
    this.getAllMovies();
  }

  getAllMovies(): Observable<MovieData[]> {
    if (this.movies !== undefined) {
      return this.movies;
    }
    const movieData = this.http.get<any>('assets/data/movies.json', { responseType: "json"})
    this.movies = movieData.pipe(
      map(movies => movies.results.map((m: any) => this.mapToMovie(m)))
    )
    return this.movies;
   }

   private mapToMovie(m: any): MovieData {
    const movie: MovieData = {
      id: m.id,
      title: m.title,
      overview: m.overview,
      imagePath:`https://image.tmdb.org/t/p/w220_and_h330_face${m.poster_path}`,
      releaseDate: m.release_date,
      genreIds: m.genre_ids
    }
    return movie
   } 

   getMovieById(id: number): Observable<MovieData> {
    if (this.singleMovies.has(id)) {
      return this.singleMovies.get(id)
    }
    const movieMatch = this.getAllMovies().pipe(
      map(results => {
        const filteredResults = results.filter((m: MovieData) => m.id === id)[0]
        return filteredResults
      })
    )
    this.singleMovies.set(id, movieMatch)
    return movieMatch
   }
}
