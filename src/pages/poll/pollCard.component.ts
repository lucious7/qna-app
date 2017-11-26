import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PollView } from './pollView.component';

@Component({
  selector: 'app-pollcard',
  templateUrl: 'pollCard.html',
})
export class PollCard {
  @Input() poll:Object = null;
  @Input() pollkey:String = null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController) {
  }

  openPollView(event) {
    console.log('Open poll view');
    console.log('card poll', this.poll);
    console.log('card poll key', this.pollkey);
    let modal = this.modalCtrl.create(PollView,{pollKey: this.pollkey });
    modal.present();
  }

}
