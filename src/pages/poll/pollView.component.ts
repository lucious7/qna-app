import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
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
    this.poll = pollService.getPoll$(this.pollKey).valueChanges().map((poll: any) => {
      this.userIsInitiator = poll.initiatorId === this.authService.getUser().uid;
      this.userIsRepondent = !!poll.respondents[this.authService.getUser().uid] && !this.userIsInitiator;
      this.answers = poll.answers;
      if(this.userIsRepondent){
        this.votedKey = poll.respondents[this.authService.getUser().uid].vote;
      }

      return poll;
    });
  }



  vote(event) {

    return this.pollService.vote(this.pollKey, this.votedKey)
      .then(() => {
        this.dismiss(event);
      });
  }

  closePoll(event) {
    this.pollService.closePoll(this.pollKey);
    this.dismiss({});
  }

  dismiss(event) {
    this.navCtrl.pop();
  }

  withdraw() {
    console.log('removing the user from the list of respondents');
  }

}
