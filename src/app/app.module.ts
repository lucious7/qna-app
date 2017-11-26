import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';

import { AuthService, firebaseConfig } from './auth.service';
import { ToastService } from './toast.service';
import { PollService } from "./../pages/poll/poll.service";

import { Navbar } from './navbar.component';

import { PollCard } from '../pages/poll/pollCard.component';
import { PollPage } from '../pages/poll/poll';
import { FeedPage } from './../pages/feed/feed';
import { ActivePage } from './../pages/active/active';
import { CompletedPage } from './../pages/completed/completed';
import { LoginPage } from './../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PollView } from '../pages/poll/pollView.component';
import { KeysPipe } from '../pages/poll/keys.pipe';

@NgModule({
  declarations: [
    MyApp,
    Navbar,
    KeysPipe,
    PollCard,
    PollView,
    PollPage,
    ActivePage,
    CompletedPage,
    FeedPage,
    LoginPage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Navbar,
    PollCard,
    PollView,
    PollPage,
    ActivePage,
    CompletedPage,
    FeedPage,
    LoginPage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    AuthService,
    ToastService,
    PollService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
