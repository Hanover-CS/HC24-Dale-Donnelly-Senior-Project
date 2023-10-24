import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore, Firestore } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { StarRatingModule } from 'angular-star-rating';
import { connectFirestoreEmulator, initializeFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    MovieListComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StarRatingModule.forRoot(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => {
      let firestore: Firestore
      if (environment.useEmulators) {
        firestore = initializeFirestore(getApp(), {})
        connectFirestoreEmulator(firestore, 'localhost', 8080)
      } else {
        firestore = getFirestore()
      }
      return firestore
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
