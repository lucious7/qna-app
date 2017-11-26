import { Component, Pipe } from '@angular/core';

import { PipeTransform } from '@angular/core/src/change_detection/pipe_transform';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { NavParams } from 'ionic-angular/navigation/nav-params';


@Component({
  selector: 'app-pollview',
  templateUrl: 'pollView.html',
  pipes: [KeysPipe]
})
export class PollView {

  question:Object = {
    description: 'What is the best pizza made in somewhere?',
    answers: {
      A: 'Pizza A',
      B: 'Pizza B',
      C: 'Pizza C'
    }
  }

  votedKey:Object = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  vote(event){
    console.log("Vote", this.votedKey);
    this.dismiss(event);
    
  }

  closePoll(event){
    console.log('closing poll');
  }

  dismiss(event){
    this.navCtrl.pop();
  }
}
@Pipe({ name: 'KeysPipe',  pure: false })
export class KeysPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        return Object.keys(value)//.map(key => value[key]);
    }
}