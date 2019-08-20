import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './core/services/authentication.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  logout_visible:boolean = false
  login_visible:boolean = false
  public name:any
  public appPages = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home',
      chileMenu:[]
    },
    {
      title: 'Categories',
      url: '/categories',
      icon: 'ios-list-box',
      chileMenu:[]
    },
    {
      title: 'Products',
      class: 'child-active',
      chileMenu:[
        {
          title: 'List',
          url: '/products/product-list',
          icon: 'list',
        },
        {
          title: 'Add',
          url: '/products/product-add',
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
    private menuCtrl: MenuController,
    private storage: Storage
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
          this.login_visible = false;
          this.storage.get('USER_INFO').then((val) => {
            this.name = val.name
          });
          this.router.navigateByUrl('/dashboard');
        } else {
          
          this.logout_visible = false;
          this.login_visible = true;
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
