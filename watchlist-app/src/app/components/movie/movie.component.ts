import { Component, Input } from '@angular/core';
import { MovieData } from 'src/lib/types/MovieData';
/**
 * Generates a movie component, generated from the provided MovieData parameter.
 * Movie component consists of a poster and a title, which are presented in
 * the homepage lists.
 */
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input() movie !: MovieData;
}
