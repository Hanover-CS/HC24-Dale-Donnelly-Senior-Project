import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovieData() {
    return [
      {
        id: 0,
        title: "Movie",
        overview: "Description",
        imagePath: "img",
        releaseDate: "9/22/2023",
        genreIds: [0, 1]
      }
    ];
  }

}
