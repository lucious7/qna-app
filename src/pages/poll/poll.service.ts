import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

import { AuthService } from '../../app/auth.service';

@Injectable()
export class PollService {

  constructor(private afDB: AngularFireDatabase, private authService: AuthService) { }

  getPoll$(key: string) {
    return this.afDB.object(`polls/${key}`);
  }

  addPoll(poll: any, respondents: any[]) {
    const user = this.authService.getUser();

    poll.initiatorId = user.uid;
    poll.initiatorName = user.displayName;
    poll.respondents = {}; // initialize respondents

    const newPollRef = this.afDB.database.ref(`polls`).push();
    const newPollKey = newPollRef.key;

    let newPollData = {};

    respondents.forEach(respondent => {
      // respondent list inside poll
      poll.respondents[respondent.key] = { name: respondent.name };

      // initiator is also a respondent
      poll.respondents[poll.initiatorId] = { name: poll.initiatorName };

      // poll list inside respondent
      newPollData[`respondents/${respondent.key}/${newPollKey}`] = false;
    });

    // main poll obj
    newPollData[`polls/${newPollKey}`] = poll;

    return this.afDB.database.ref().update(newPollData);
  }

}
