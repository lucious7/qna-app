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
    poll.status = 'open';
    poll.respondents = {}; // initialize respondents

    // initiator is also a respondent
    respondents.push({ key: poll.initiatorId, name: poll.initiatorName });

    const newPollRef = this.afDB.database.ref(`polls`).push();
    const newPollKey = newPollRef.key;

    let newPollData = {};

    respondents.forEach(respondent => {
      // respondent list inside poll
      poll.respondents[respondent.key] = { name: respondent.name };

      // poll list inside respondent
      newPollData[`respondents/${respondent.key}/${newPollKey}`] = {
        question: poll.question,
        initiatorName: poll.initiatorName,
        status: 'open'
      };
    });

    // main poll obj
    newPollData[`polls/${newPollKey}`] = poll;

    return this.afDB.database.ref().update(newPollData);
  }

  vote(pollKey: string, answerKey: number) {
    const user = this.authService.getUser();

    let newVoteData = {};
    newVoteData[`respondents/${user.uid}/${pollKey}/vote`] = answerKey;
    newVoteData[`polls/${pollKey}/respondents/${user.uid}/vote`] = answerKey;

    return this.afDB.database.ref().update(newVoteData);
  }

  // closePoll(pollKey: string){
  //   var closedStatus = { status: 'closed' };

  //   const itemRef = this.afDB.object('polls/' + pollKey);

  //   //updates poll's status
  //   itemRef.update(closedStatus)
  //   .then(p => {
  //       let respondents = this.afDB.list('polls/' + pollKey + '/respondents')
  //       .snapshotChanges()
  //       .map(pollActions => {
  //         return pollActions.map(pollAction => ({ key: pollAction.key, ...pollAction.payload.val() }));
  //       });

  //       respondents.forEach(respondent => {
  //             const respRef = this.afDB.object('respondents/' + respondent.key);
  //             respRef.update(closedStatus)
  //       });


  //   })
  // }

}
