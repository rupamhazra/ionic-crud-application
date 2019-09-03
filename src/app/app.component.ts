import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthenticationService } from './core/services/authentication.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { NetworkService } from './core/services/network.service';

import { NavController } from '@ionic/angular';

//import { AlertService } from './core/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public onlineOffline: boolean = navigator.onLine;
  logout_visible:boolean = false
  login_visible:boolean = false
  public name:any
  public profile_img:any
  medie_url:any = environment.imageURL
  visibility:any
  public appPages = [
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
    {
      title: 'My account',
      url: '/myaccount',
      icon: 'ios-person',
      chileMenu:[]
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private menuCtrl: MenuController,
    private storage: Storage,
    public networkService: NetworkService,
    private navCtrl:NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      
      this.networkService.checkNetworkDisconnect();
      window.addEventListener('offline', () => {
        this.networkService.checkNetworkDisconnect();
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
      // this.authenticationService.authState.subscribe(state => {
      //   if (state) {
      //     this.menuCtrl.enable(true);
      //     this.logout_visible = true;
      //     this.login_visible = false;
      //     this.storage.get('USER_INFO').then((val) => {
      //       this.name = val.name
      //       this.profile_img = val.img
      //     });
      //     this.router.navigateByUrl('/dashboard');
      //   } else {
      //     this.logout_visible = false;
      //     this.login_visible = true;
      //     this.router.navigateByUrl('/home');
      //   }
      // });
    });
  }
  logoutUser(){
    this.menuCtrl.enable(false);
    this.authenticationService.logout();
  }
  logIn(){
    //this.menuCtrl.enable(false);
    this.router.navigateByUrl('/login');
  }
  goHome(){
    
    
    //this.navCtrl.setDirection()    
  }
}
