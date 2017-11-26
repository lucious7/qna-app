import { Component } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';

import { PollService } from './poll.service';

@Component({
  selector: 'app-pollview',
  templateUrl: 'pollView.html',
})
export class PollView {

  pollKey: string;
  poll: Observable<any>;

  question: Object = {
    description: 'What is the best pizza made in somewhere?',
    answers: {
      A: 'Pizza A',
      B: 'Pizza B',
      C: 'Pizza C',
    }
  }

  votedKey: Object = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private pollService: PollService) {
    //this.pollKey = `-Kzts5gLOm6UZ6HyD4Vi`;
    this.pollKey = navParams.get('pollKey');
    this.poll = pollService.getPoll$(this.pollKey).valueChanges();

    pollService.getPoll$(this.pollKey).valueChanges().subscribe(selectedPoll => {
      console.info(`selectedPoll = `, selectedPoll);
    });
  }

  vote(event) {
    console.log('Vote', this.votedKey);

    return this.pollService.vote(this.pollKey, 0)
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

}
