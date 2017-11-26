import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/take';

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

  constructor(private afAuth: AngularFireAuth, private afDB: AngularFireDatabase) {
    afAuth.authState.subscribe((user: firebase.User) => {
      console.info(`user = `, user);
      this.user = user;
    });
  }

  getAuth$(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  getUserInfo$(uid?: string): AngularFireObject<any> {
    uid = uid || this.getUser().uid;
    return this.afDB.object(`users/${uid}`);
  }

  getUser(): firebase.User {
    this.checkUserAuth();
    return this.user;
  }

  getFriends(): AngularFireList<any> {
    console.warn('Listing ALL users!! Be careful!');
    return this.afDB.list('users', ref => ref.orderByChild(`name`));
  }

  private checkUserAuth(): void {
    if (!this.user)
      throw new Error(`é necessário estar logado para realizar esta operação`); // TODO better error handling
  }

  facebookLogin(): Promise<void> {
    return this.login(new firebase.auth.FacebookAuthProvider());
  }

  googleLogin(): Promise<void> {
    return this.login(new firebase.auth.GoogleAuthProvider());
  }

  private login(provider: firebase.auth.AuthProvider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(signInResp => {
        return this.getUserInfo$(signInResp.user.uid).snapshotChanges().take(1).toPromise();
      })
      .then(userInfo => {
        if (userInfo.payload.exists())
          return;
 
        return this.getUserInfo$(userInfo.payload.key).set({
          email: this.user.email,
          name: this.user.displayName,
          createdOn: firebase.database.ServerValue.TIMESTAMP,
        }).then(p => {
          this.createDefaultFriends();
        });
      });
  };

  createDefaultFriends(){
      console.log("create default friends")
      let friendshipRef = this.afDB.object('friends/' + this.user.uid);
      
      let friends = {
        Cq1z3ZIFHdb5A50NpolurvzNey72 : "Thiago Almeida", 
        Unx1C2hOGWh7Xir0z3vfiMkGLkF3 : "Lucivaldo Costa",
        Ik9ah46crKhyxXiEjEGrwTbwrJf2 : "Renato Silva"
      }
      friendshipRef.set(friends);
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

}
