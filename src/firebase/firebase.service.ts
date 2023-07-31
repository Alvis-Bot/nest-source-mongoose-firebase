import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { firebaseConfig } from "../common/config/firebase.config";

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


  // send to notification to user by token

}
