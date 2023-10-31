import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { MovieData } from 'src/lib/types/MovieData';
import { ImageUrl } from 'src/lib/types/urls';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies !: Observable<MovieData[]>;
  singleMovies = new Map();
  url = 'assets/data/movies.json'


  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<MovieData[]> {
    if (this.movies !== undefined) {
      return this.movies;
    }
    // eslint-disable-next-line
    const movieData = this.http.get<any>(this.url, { responseType: "json"})
    this.movies = movieData.pipe(
      // eslint-disable-next-line
      map(movies => movies.results.map((m: any) => this.mapToMovie(m)))
    )
    return this.movies;
   }

   // eslint-disable-next-line
   private mapToMovie(m: any): MovieData {
    const movie: MovieData = {
      id: m.id,
      title: m.title,
      overview: m.overview,
      imagePath:`${ImageUrl}${m.poster_path}`,
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

   getMoviesByGenre(genreId: number): Observable<MovieData[]> {
    let genreMovies: Observable<MovieData[]>
    genreMovies = this.getAllMovies().pipe(
      map(results => {
        return results.filter((m: MovieData) => m.genreIds.includes(genreId))
      })
    )
    return genreMovies
   }
}
