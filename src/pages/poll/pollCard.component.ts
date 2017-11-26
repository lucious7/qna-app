import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PollView } from './pollView.component';


@Component({
  selector: 'app-pollcard',
  templateUrl: 'pollCard.html',
})
export class PollCard {
    
    constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        public modalCtrl: ModalController) {
}

  openPollView(event) {
    console.log('Open poll view');
    let modal = this.modalCtrl.create(PollView);
    modal.present();
  }


}
