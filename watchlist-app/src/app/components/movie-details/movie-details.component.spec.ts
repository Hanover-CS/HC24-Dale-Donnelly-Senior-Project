import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReviewService } from 'src/app/services/review.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MovieData } from 'src/lib/types/MovieData';
import { MovieService } from 'src/app/services/movie.service';
import { Review } from 'src/lib/types/Review';

const testId = 0

const movie: MovieData = {
  id: testId,
  title: 'title',
  overview: 'desc',
  imagePath: 'http://example.com/',
  releaseDate: '2023-10-16',
  genreIds: [28]
}

class MovieServiceStub {
  getMovieById() {
    return of(movie)
  }
}

const reviews: Review[] = [
  {
    content: 'Example',
    rating: 5,
    movieId: 0,
    date: '10/22/2023'
  }
]

class ReviewServiceStub {
  getReviewsForMovie() {
    return of(reviews)
  }

  addReview() {
    return reviews
  }
}

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        { provide: MovieService, useClass: MovieServiceStub},
        { provide: ReviewService, useClass: ReviewServiceStub },
        { provide: ActivatedRoute, useValue: {
          snapshot: {
            params: {id: testId}
          }
        }}
      ]
    });
    TestBed.inject(ActivatedRoute)
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have movie id from route', () => {
    expect(component.movieId).toEqual(testId)
  })

  it('should get movie from MovieService', () => {
    expect(component.movie).toEqual(movie)
    expect()
  })

  it('should display movie info', () => {
    const img = document.getElementById('movieImg') as HTMLImageElement
    const title = document.getElementById('title')?.textContent
    const overview = document.getElementById('overview')?.textContent
    const releaseDate = document.getElementById('releaseDate')?.textContent
    // TODO: Figure out how to test that the genre ids are displaying as genres
    // const genres = document.querySelectorAll('genre')
    expect(img.src).withContext('img has correct image path').toEqual(`${movie.imagePath}`)
    expect(title).withContext('title matches').toEqual(movie.title)
    expect(overview).withContext('overview matches').toEqual(movie.overview)
    expect(releaseDate).withContext('releaseDate matches').toEqual(movie.releaseDate)
  })

  it('should get reviews from ReviewService', () => {
    component.reviews.subscribe((r) => {
      expect(r).toEqual(reviews)
    })
  })

  it('should call review service to post review', () => {
    const service = TestBed.inject(ReviewService)
    const spy = spyOn(service, 'addReview')
    component.postReview('test', '1');
    expect(spy).toHaveBeenCalled()
  })
});