import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../app/auth.service';

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

  items: Observable<any[]>;

  constructor(private afDB: AngularFireDatabase, private authService: AuthService) {
    this.items = this.afDB.list('respondents/' + this.authService.getUser().uid, ref => ref.orderByChild('status').equalTo('closed'))
      .snapshotChanges()
      .map(pollActions => {
        return pollActions.map(pollAction => ({ key: pollAction.key, ...pollAction.payload.val() }));
      });
  }

}
