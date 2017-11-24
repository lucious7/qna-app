import { Component } from '@angular/core';

import { FeedPage } from '../feed/feed';
import { ActivePage } from './../active/active';
import { CompletedPage } from './../completed/completed';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FeedPage;
  tab2Root = ActivePage;
  tab3Root = CompletedPage;

  constructor() {

  }
}