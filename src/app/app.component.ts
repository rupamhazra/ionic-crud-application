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

import { FCM } from '@ionic-native/fcm/ngx';
import { NavigationExtras } from '@angular/router';

import { FcmService } from './core/services/fcm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  pushes: any;
  token:any;
  result_fcm_add:any;
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
    private navCtrl:NavController,
    private fcm: FCM,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.get('firstTime').then((val) => {
        console.log('val',val)
        if (typeof val === 'undefined' || val === null)
        {
            // Execute some code for the installation
            // ...
            console.log('val',val)
            this.storage.set('firstTime', 1);
        }
              
       });
      


      /**
       * Firebase used
       */

      this.fcm.onNotification().subscribe(data => {
        if (data.wasTapped) {
         
          console.log("Received in background");
          //console.log(JSON.parse(this.pushes))
          this.router.navigate(['/myaccount/firebase', { pushes: JSON.stringify(data) }]);
          
        } else {
          console.log(data)
          console.log("Received in foreground");
          //console.log(JSON.parse(this.pushes))
          this.router.navigate(['/myaccount/firebase', { pushes: JSON.stringify(data) }]);
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        // Register your new token in your back-end if you want
        // backend.registerToken(token);
      });

      this.fcm.getToken().then(token => {
        console.log('tone',token)
        this.token = token
        // let data = {
        //   'fcm_token':this.token,
        //   'device_details':''
        // }
        // this.fcmService.sendMessage(data).subscribe( 
        //   res => {
           
        //     this.result_fcm_add = res.result;
        //     console.log("result_fcm",this.result_fcm_add);
        //   },
        // error => {
        //   console.log("error::::"+error);
        // });
       });


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
