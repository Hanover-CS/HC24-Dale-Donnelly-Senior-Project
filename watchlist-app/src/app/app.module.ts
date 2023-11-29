import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment.prod';
import { StarRatingModule } from 'angular-star-rating';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderBarComponent } from './components/header-bar/header-bar.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
/**
 * AppModule describes how to construct the app for Angular.
 * 
 * Declarations: Declares components that belong to the app. Includes all components founds in the 'components' directory.
 * 
 * Imports: Lists all required Angular modules.
 * 
 * Bootstrap: Declares which component will act as the index page.
 */
@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieListComponent,
    MovieDetailsComponent,
    HomepageComponent,
    HeaderBarComponent,
    FooterBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
