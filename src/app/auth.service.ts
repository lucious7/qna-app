import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

export const firebaseConfig = {
  apiKey: 'AIzaSyB6LM0D2wmmrVF70YWWiR_ffrKsao9H31M',
  authDomain: 'qna-app-534a4.firebaseapp.com',
  databaseURL: 'https://qna-app-534a4.firebaseio.com',
  projectId: 'qna-app-534a4',
  storageBucket: 'qna-app-534a4.appspot.com',
  messagingSenderId: '117871189159'
};

@Injectable()
export class AuthService {

  private user: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user: firebase.User) => {
      console.info(`user = `, user);
      this.user = user;
    });
  }

  getAuth$(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  facebookLogin(): Promise<any> {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

}
