import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Navbar } from '../../app/navbar.component';

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

  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
  }
  


}
