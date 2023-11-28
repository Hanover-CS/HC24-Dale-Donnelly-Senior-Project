import { of } from "rxjs"
import { MovieData } from "../types/MovieData"

export const testId = 0

export const testMovie: MovieData = {
  id: testId,
  title: 'title',
  overview: 'desc',
  imagePath: 'http://example.com/',
  releaseDate: '2023-10-16',
  genreIds: [28]
}

export class MovieServiceStub {
  getMovieById() {
    return of(testMovie)
  }
}