import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './core/services/authentication.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  logout_visible:boolean = false
  public appPages = [
    // {
    //   title: 'Register',
    //   url: '/register',
    //   icon: 'list',
    //   chileMenu:[]
    // },
    // {
    //   title: 'Login',
    //   url: '/login',
    //   icon: 'list',
    //   chileMenu:[]
    // },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home',
      chileMenu:[]
    },
    {
      title: 'Policy',
      class: 'child-active',
      chileMenu:[
        {
          title: 'List',
          url: '/policy/policy-list',
          icon: 'list',
        },
        {
          title: 'Add',
          url: '/policy/policy-add',
          icon: 'list',
        },
      ]
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    
    this.platform.ready().then(() => {
      //console.log('window.location==='+window.location);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.authState.subscribe(state => {
        if (state) {
          this.menuCtrl.enable(true);
          this.logout_visible = true;
          this.router.navigateByUrl('/dashboard');
        } else {
          
          this.logout_visible = false;
          this.router.navigateByUrl('/login');
        }
      });
    });
  }
  logoutUser(){
    this.menuCtrl.enable(false);
    this.authenticationService.logout();
  }
  logIn(){
    this.menuCtrl.enable(true);
    this.router.navigateByUrl('/login');
  }
}
