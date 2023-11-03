import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { MovieData } from 'src/lib/types/MovieData';
import { ImageUrl } from 'src/lib/types/urls';

/**
 * MovieService is responsible for handling component requests for movie data. It utilizes the TMDB API (currently some data is stored locally).
 */

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies !: Observable<MovieData[]>;
  singleMovies = new Map();
  url = 'assets/data/movies.json'


  /**
   * Constructor that creates an injectable, shared instance of the service.
   * Provides an HttpClient instance for data operations.
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * Requests API for movie data, uses the mapToMovie() helper function to organize the retrieved data.
   * If movie data was retrieved previously, the movies variable is returned immediately to reduce requests.
   * @returns Observable array of movies
   */
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

   /**
    * Helper function that takes JSON movie data from the API and transforms it to be an object of the MovieData interface.
    * @param m 
    * @returns MovieData interface instance
    */
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

   /**
    * Filters all retrieved movies to find a single movie with a matching ID.
    * If the information was retrieved previously in the same session, singleMovies map is accessed
    * and the value is returned from it.
    * @param id 
    * @returns Observable MovieData object
    */
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

   /**
    * Filters all retrieved movies to find those with a specific genre ID 
    * @param genreId 
    * @returns Observable array of movies
    */
   getMoviesByGenre(genreId: number): Observable<MovieData[]> {
    const genreMovies: Observable<MovieData[]> = this.getAllMovies().pipe(
      map(results => {
        return results.filter((m: MovieData) => m.genreIds.includes(genreId))
      })
    )
    return genreMovies
   }
}
