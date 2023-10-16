import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { MovieData } from 'src/lib/types/MovieData';
import { RouterTestingModule } from '@angular/router/testing'

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  const movie: MovieData = {
    id: 0,
    title: 'title',
    overview: 'desc',
    imagePath: 'img',
    releaseDate: '2023-10-16',
    genreIds: [0]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieComponent],
      imports: [RouterTestingModule]
    });

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
