import { Component } from '@angular/core';
import { GenreIds } from 'src/lib/types/Genre';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  genreIds = GenreIds
}
