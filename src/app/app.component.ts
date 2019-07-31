import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Register',
      url: '/register',
      icon: 'list',
      chileMenu:[]
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'list',
      chileMenu:[]
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
      chileMenu:[]
    },
    {
      title: 'Policy',
      class: 'child-active',
      chileMenu:[
        {
          title: 'List',
          url: '/layout/policy/policy-list',
          icon: 'list',
        },
        {
          title: 'Add',
          url: '/layout/policy/policy-add',
          icon: 'list',
        },
      ]
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //console.log('window.location==='+window.location);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
