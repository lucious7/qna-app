import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PollService } from './poll.service';

@IonicPage()
@Component({
  selector: 'poll-form',
  templateUrl: 'poll.html',
})
export class PollPage {

  answer: String = null;

  question: String = '';
  answers: String[] = [];
  privacy: String = 'public';
  transparency: String = 'opaque';
  editability: String = 'immutable';
  open: boolean = false;
  replyOnce: boolean = false;
  respondents: Object[] = [];

  friends: Object[] = [
    { id: 1, name: 'Friend 1' },
    { id: 2, name: 'Friend 2' },
    { id: 3, name: 'Friend 3' },
    { id: 4, name: 'Friend 4' },
    { id: 5, name: 'Friend 5' },
    { id: 6, name: 'Friend 6' },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private pollService: PollService) { }

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
    })
      .then(() => {
        this.close();
      });
  }

  close() {
    this.navCtrl.pop();
  }

}
