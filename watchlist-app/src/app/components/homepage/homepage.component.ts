import { Component } from '@angular/core';
import { GenreIds } from 'src/lib/types/Genre';
/**
 * Homepage Component populates the landing page with movie lists.
 * Iterates over the list of GenreIds to create a list of movies for each one.
 */
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  genreIds = GenreIds
}
