import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { PollService } from './poll.service';
import { AuthService } from './../../app/auth.service';

@Component({
  selector: 'app-pollview',
  templateUrl: 'pollView.html',
})
export class PollView {

  pollKey: string;
  poll: Observable<any>;
  userIsInitiator: boolean
  userIsRepondent: boolean;

  answers: Array<any> = [];

  votedKey: number = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private pollService: PollService, private authService: AuthService) {
    this.pollKey = navParams.get('pollKey');
    this.poll = pollService.getPoll$(this.pollKey).valueChanges().map( (poll) => {
      this.userIsInitiator = poll.initiatorId === this.authService.getUser().uid;
      this.userIsRepondent = !!poll.respondents[this.authService.getUser().uid];
      this.answers = poll.answers;

      console.info(`selectedPoll = `, poll);
      return poll;
    } );
  }



  vote(event) {
    console.log('Vote', this.votedKey);

    return this.pollService.vote(this.pollKey, this.votedKey)
      .then(() => {
        this.dismiss(event);
      });
  }

  closePoll(event) {
    console.log('closing poll');
  }

  dismiss(event) {
    this.navCtrl.pop();
  }

  withdraw(){
    console.log('removing the user from the list of respondents');
  }

}
