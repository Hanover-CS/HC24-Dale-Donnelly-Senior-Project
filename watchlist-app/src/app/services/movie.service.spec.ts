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

  it('should initialize movies observable', () => {
    const m = service.getAllMovies()
    expect(m).toBeTruthy();
  });

  it('should get all movies as movie data', (done) => {
    const m = service.getAllMovies()
    m.subscribe(results => {
      expect(results).toEqual(testMovies)
      done()
    })
  });

  it('should retrieve single movie by id', (done) => {
    const m = service.getMovieById(0)
    m.subscribe(movie => {
      expect(movie).toEqual(testMovies[0])
      done()
    })
  })
});
