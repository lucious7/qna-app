import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'poll-form',
  templateUrl: 'poll.html',
})
export class PollPage {
  question: String = '';
  answers: String[] = []
  answer: String = null;
  privacy: String = null;
  transparency: String = null;
  open: boolean = false;
  replyOnce: boolean = false;
  immutable: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PollPage');
  }

  addAnswer(){
    if(this.answer && this.answer.trim() !== ''){
      this.answers.push(this.answer.trim());
      this.answer = null;
    }
  }

  removeAnswer(element){
    var index = this.answers.indexOf(element, 0);
    if (index > -1) {
      this.answers.splice(index, 1);
    }
  }

  save(){
    console.log('Save Poll into database:', this);
    this.close();
  }

  close() {
    this.navCtrl.pop();
  }



}
