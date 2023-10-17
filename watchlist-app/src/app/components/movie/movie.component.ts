import { Component, Input } from '@angular/core';
import { MovieData } from 'src/lib/types/MovieData';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input() movie !: MovieData;
}
