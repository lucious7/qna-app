import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController, ModalController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';
import { PollPage } from '../pages/poll/poll';

import { AuthService } from './auth.service';

import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  @ViewChild('mainContent') nav: NavController;

  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    private authService: AuthService, private menuCtrl: MenuController, private modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      this.enableMenu( false );      
      
      this.authService.getAuth$().take(1).subscribe((user: firebase.User) => {
        if (!!user) {
          this.nav.setRoot(TabsPage).then(() => splashScreen.hide());
          this.enableMenu( true );      
        } else {
          splashScreen.hide();
        }
      });
    });
  }

  ngOnInit(): void {
    this.setAuthHandler();
  }

  setAuthHandler(): Subscription {
    // skips the first authState change since it's done at the platform ready to handle splashscreen
    return this.authService.getAuth$().skip(1).subscribe((user: firebase.User) => {
      this.nav.popToRoot().then(() => {
        if(!!user){
          this.nav.setRoot(TabsPage);
          this.enableMenu( true );        
        } else {
          this.nav.setRoot(LoginPage);
          this.enableMenu( false );        
        }
      });
    });
  }

  logout() {
    this.closeMenu();
    this.enableMenu(false);
    this.authService.logout();
  }

  openPollForm(event) {
    let pollform = this.modalCtrl.create(PollPage);
    pollform.present(); 
    this.closeMenu();
  }

  private enableMenu(enable: boolean) {
    this.menuCtrl.swipeEnable(enable);
  }

  private closeMenu() {
    this.menuCtrl.close();
  }
}
