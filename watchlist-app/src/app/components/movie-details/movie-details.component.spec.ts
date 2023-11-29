import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReviewService } from 'src/app/services/review.service';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { StarRatingConfigService, StarRatingModule } from 'angular-star-rating';
import { ReviewServiceStub, testReviews } from 'src/lib/stubs/ReviewServiceStub';
import { MovieServiceStub, testMovie, testId } from 'src/lib/stubs/MovieServiceStub';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterBarComponent } from '../footer-bar/footer-bar.component';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieDetailsComponent,
        HeaderBarComponent,
        FooterBarComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        StarRatingModule
      ],
      providers: [
        { provide: MovieService, useClass: MovieServiceStub},
        { provide: ReviewService, useClass: ReviewServiceStub },
        { provide: ActivatedRoute, useValue: {
          snapshot: {
            params: {id: testId}
          }
        }},
        StarRatingConfigService
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
    expect(component.movie).toEqual(testMovie)
    expect()
  })

  it('should display movie info', () => {
    const img = document.getElementById('movieImg') as HTMLImageElement
    const title = document.getElementById('title')?.textContent
    const overview = document.getElementById('overview')?.textContent
    const releaseDate = document.getElementById('releaseDate')?.textContent
    const $genreSpans = document.querySelectorAll('.genre')
    expect(img.src).withContext('img has correct image path').toEqual(`${testMovie.imagePath}`)
    expect(title).withContext('title matches').toEqual(testMovie.title)
    expect(overview).withContext('overview matches').toEqual(testMovie.overview)
    expect(releaseDate).withContext('releaseDate matches').toEqual('Released On: ' + testMovie.releaseDate)
    expect($genreSpans.length).toEqual(1)
    expect($genreSpans[0].textContent).toEqual('Action')
  })

  it('should get reviews from ReviewService', () => {
    component.reviews.subscribe((r) => {
      expect(r).toEqual(testReviews)
    })
  })

  it('should call review service to post review', () => {
    const service = TestBed.inject(ReviewService)
    const spy = spyOn(service, 'addReview')
    component.postReview(1, 'test');
    expect(spy).toHaveBeenCalled()
  })

  it('should clear user input with postReview()', () => {
    const reviewTextArea = document.getElementById('reviewTextInput') as HTMLTextAreaElement
    component.postReview(1, 'test')
    if (reviewTextArea) {
      expect(reviewTextArea.value).toEqual("")
    }
  }) 
});