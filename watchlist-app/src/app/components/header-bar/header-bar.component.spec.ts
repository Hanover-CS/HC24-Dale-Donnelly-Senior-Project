import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarComponent } from './header-bar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderBarComponent', () => {
  let component: HeaderBarComponent;
  let fixture: ComponentFixture<HeaderBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderBarComponent],
      imports: [RouterTestingModule]
    });
    fixture = TestBed.createComponent(HeaderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
