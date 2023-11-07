import { Component } from '@angular/core';

/**
 * The default angular component. HTML includes a router outlet for displaying other components.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'watchlist-app';
}
