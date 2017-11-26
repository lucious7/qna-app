import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PollView } from './pollView.component';

@Component({
  selector: 'app-pollcard',
  templateUrl: 'pollCard.html',
})
export class PollCard {
  @Input() poll:String = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
      console.log('card poll', this.poll);
  }

  openPollView(event) {
    console.log('Open poll view');
    let modal = this.modalCtrl.create(PollView);
    modal.present();
  }

}
