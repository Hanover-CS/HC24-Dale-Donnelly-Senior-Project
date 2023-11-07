import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { HomepageComponent } from './components/homepage/homepage.component';

/**
 * Declares routes for accessing different pages on the app. Routes inludes a path that modifies the URL and the component
 * to be displayed. Any URL parameters needed are included in the path.
 */

const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Watchlist Homepage'},
  { path: 'movie-details/:id', component: MovieDetailsComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes,
      { useHash: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
