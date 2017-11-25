import { Component, Input } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { PollPage } from '../pages/poll/poll';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.html',
})
export class Navbar {
    @Input() title:String = null;
    constructor(public navCtrl: NavController, 
        public navParams: NavParams,
        public modalCtrl: ModalController) {
}

  openPollForm(event) {
    let pollform = this.modalCtrl.create(PollPage);
    pollform.present(); 

  }


}
