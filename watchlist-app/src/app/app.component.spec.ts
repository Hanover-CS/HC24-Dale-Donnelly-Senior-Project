import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('MyComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent], // Include your component in the testing module
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });
});

