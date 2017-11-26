import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { AuthService } from '../../app/auth.service';

@Injectable()
export class PollService {

  constructor(private afDB: AngularFireDatabase, private authService: AuthService) { }

  addPoll(poll: any): firebase.database.ThenableReference {
    const user = this.authService.getUser();

    poll.initiatorId = user.uid;
    poll.initiatorName = user.displayName;

    return this.afDB.list('polls').push(poll);
  }

}
