import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderBarComponent } from '../header-bar/header-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterBarComponent } from '../footer-bar/footer-bar.component';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomepageComponent, MovieListComponent, HeaderBarComponent, FooterBarComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    fixture = TestBed.createComponent(HomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
