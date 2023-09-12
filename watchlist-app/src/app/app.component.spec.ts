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

  it('should have a hello world!', () => {
    fixture.detectChanges();
    const h1Element = fixture.debugElement.nativeElement.querySelector('h1');
    expect(h1Element.textContent).toContain('Hello World!');
  })
});

