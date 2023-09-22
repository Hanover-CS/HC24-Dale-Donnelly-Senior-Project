import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MovieData } from 'src/lib/types/MovieData';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movieJson: any;
  movieData: MovieData[] = [];

  constructor(private http: HttpClient) { }

  private getJSON() {
    return this.http.get<any>('../../assets/data/movies.json');
  }

  private populateMovieData() {
    this.getJSON().subscribe(data => {
      this.movieJson = data;
      for (const m of this.movieJson.results) {
        this.movieData.push({
          id: m.id,
          title: m.title,
          overview: m.overview,
          imagePath: m.poster_path,
          releaseDate: m.release_date,
          genreIds: m.genre_ids
        })
      }
    })
  }

  getMovieData(): MovieData[] {
    this.populateMovieData()
    return this.movieData;
  }

}
