import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Navbar } from '../../app/navbar.component';

/**
 * Generated class for the CompletedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completed',
  templateUrl: 'completed.html',
})
export class CompletedPage {

  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompletedPage');
  }

}
