import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { ImageUrl, TestingUrl } from 'src/lib/types/urls';
import { HttpClientModule } from '@angular/common/http';

const testMovies = [
  {
    id: 0,
    title: 'Title',
    imagePath: ImageUrl + '/kdPMUMJzyYAc4roD52qavX0nLIC.jpg',
    overview: 'Description',
    releaseDate: '2023-10-19',
    genreIds: [27, 53]
  },
  {
    id: 1,
    title: 'Title 1',
    imagePath: ImageUrl + '/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
    overview: 'Description 1',
    releaseDate: '2023-10-19',
    genreIds: [28, 80, 53]
  }
];

const testId = 0;

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(MovieService);
    service.url = TestingUrl
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get all movies as movie data', (done) => {
    const movies = service.getAllMovies()
    expect(movies).toBeTruthy();
    movies.subscribe(results => {
      expect(results).toEqual(testMovies)
      done()
    })
  });

  it('should retrieve single movie by id', (done) => {
    const movie = service.getMovieById(testId)
    movie.subscribe(m => {
      expect(m).toEqual(testMovies[0])
      done()
    })
  })

  it('should retrieve single movie from map if previously retrieved', () => {
    const mapSpy = spyOn(service.singleMovies, 'get')
    service.getMovieById(testId) // initial retrieval using firestore
    service.getMovieById(testId) // cached map retrieval
    expect(mapSpy).toHaveBeenCalledTimes(1)
    expect(mapSpy).toHaveBeenCalledWith(testId)
  })

  it('should retrieve all movies for a specific genre id', (done) => {
    const movies = service.getMoviesByGenre(27) // first test movie includes 27
    movies.subscribe(m => {
      expect(m.length).toEqual(1)
      expect(m[0]).toEqual(testMovies[0])
      done()
    })
  })
});
