import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { AuthService } from '../../app/auth.service';
import { PollService } from './poll.service';

@IonicPage()
@Component({
  selector: 'poll-form',
  templateUrl: 'poll.html',
})
export class PollPage {

  answer: String = null;
  friends: Observable<any[]>;

  question: String = '';
  answers: String[] = [];
  privacy: String = 'public';
  transparency: String = 'opaque';
  editability: String = 'immutable';
  open: boolean = false;
  replyOnce: boolean = false;
  respondents: Object[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private pollService: PollService, authService: AuthService) {
    this.friends = authService.getFriends().snapshotChanges()
      .map(friendsActions => friendsActions.map(action => ({
        key: action.key,
        name: action.payload.val().name,
      })))
      .take(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollPage');
  }

  addAnswer() {
    if (this.answer && this.answer.trim() !== '') {
      this.answers.push(this.answer.trim());
      this.answer = null;
    }
  }

  removeAnswer(element) {
    var index = this.answers.indexOf(element, 0);
    if (index > -1) {
      this.answers.splice(index, 1);
    }
  }

  addRespondent(respondent) {
    this.respondents.push(respondent);
  }

  removeRespondent(respondent) {
    var index = this.respondents.indexOf(respondent, 0);
    if (index > -1) {
      this.respondents.splice(index, 1);
    }
  }

  save() {
    return this.pollService.addPoll({
      question: this.question,
      answers: this.answers,
      privacy: this.privacy,
      transparency: this.transparency,
      editability: this.editability,
      open: this.open,
      replyOnce: this.replyOnce,
      respondents: this.respondents,
    })
      .then(() => {
        this.close();
      });
  }

  close() {
    this.navCtrl.pop();
  }

}
