import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestingUrl } from 'src/lib/types/urls';
import { MovieData } from 'src/lib/types/MovieData';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize movies observable', () => {
    service.url = TestingUrl
    const m = service.getAllMovies()
    expect(m).toBeTruthy();
  })

  xit('should get all movies', (done) => {
    const testMovies: MovieData[] = []
    service.url = TestingUrl
    const m = service.getAllMovies()
    m.subscribe(results => {
      expect(results).toEqual(testMovies)
      done()
    })
  })
});
