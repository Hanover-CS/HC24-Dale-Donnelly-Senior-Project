import { TestBed } from '@angular/core/testing';

import { ReviewService } from './review.service';
import { Firestore, FirestoreModule, connectFirestoreEmulator, getFirestore, initializeFirestore, provideFirestore } from '@angular/fire/firestore';
import { FirebaseAppModule, getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

describe('ReviewService', () => {
  let service: ReviewService;

  beforeAll(() => {
    TestBed.configureTestingModule({
      imports: [
        FirebaseAppModule,
        FirestoreModule,
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
      providers: [

      ]
    })
    service = TestBed.inject(ReviewService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
