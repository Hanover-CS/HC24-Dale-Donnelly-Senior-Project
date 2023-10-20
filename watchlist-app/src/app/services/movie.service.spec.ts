import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ImageUrl, TestingUrl } from 'src/lib/types/urls';
import { MovieData } from 'src/lib/types/MovieData';
import { HttpClientModule } from '@angular/common/http';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
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
  });

  it('should get all movies as movie data', (done) => {
    const testMovies: MovieData[] = [
      {
        id: 0, 
        title: 'Title', 
        imagePath: ImageUrl+'/kdPMUMJzyYAc4roD52qavX0nLIC.jpg', 
        overview: 'Description', 
        releaseDate: '2023-10-19', 
        genreIds: [27, 53]
      },
      {
        id: 1,
        title: 'Title 1',
        imagePath: ImageUrl+'/fiVW06jE7z9YnO4trhaMEdclSiC.jpg',
        overview: 'Description 1',
        releaseDate: '2023-10-19',
        genreIds: [28, 80, 53]
      }
    ]
    service.url = TestingUrl
    const m = service.getAllMovies()
    m.subscribe(results => {
      expect(results).toEqual(testMovies)
      done()
    })
  });
});
