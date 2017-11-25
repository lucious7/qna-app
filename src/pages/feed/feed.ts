import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PollPage } from '../poll/poll';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }
  
  openPollForm(event) {
    //this.navCtrl.push(PollPage);
    let pollform = this.modalCtrl.create(PollPage);
    pollform.present();

  }

}
