import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AuthService } from '../../app/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the ActivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-active',
  templateUrl: 'active.html',
})
export class ActivePage {
  items: Observable<any[]>;
  constructor(private afDB: AngularFireDatabase, private authService: AuthService) { 
    this.items = this.afDB.list('respondents/' + this.authService.getUser().uid).valueChanges();
    console.log('itens ativos', this.items)
  }

  ionViewDidLoad() {
    
  }

}
