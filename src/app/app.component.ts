import { Component, OnInit, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase/app';

import { LoginPage } from './../pages/login/login';
import { TabsPage } from './../pages/tabs/tabs';

import { AuthService } from './auth.service';

import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/take';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {

  @ViewChild('mainContent') nav: NavController;

  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      this.authService.getAuth$().take(1).subscribe((user: firebase.User) => {
        if (!!user) {
          this.nav.setRoot(TabsPage).then(() => splashScreen.hide());
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
      this.nav.popToRoot().then(() => this.nav.setRoot(!!user ? TabsPage : LoginPage));
    });
  }

  logout() {
    this.authService.logout();
  }

}
