import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { firebaseConfig } from "./firebase.config";

@Injectable()
export class FirebaseService {
  private firebaseApp: firebase.app.App;

  constructor() {
    this.firebaseApp = firebase.initializeApp({
      credential: firebase.credential.cert({
        ...firebaseConfig,
      }),
    });
  }


  getAuth = () => this.firebaseApp.auth();


  getFirestore = () => this.firebaseApp.firestore();

  getStorage = () => this.firebaseApp.storage();

  getMessaging = () => this.firebaseApp.messaging();


  // send to notification to user by token

}
