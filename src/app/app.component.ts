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

import { Device } from '@ionic-native/device/ngx';

// import {
//   BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents,
//   BackgroundGeolocationResponse
// } from '@ionic-native/background-geolocation/ngx';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';

declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  arr: any;
  pushes: any;
  token: any;
  result_fcm_add: any;
  public onlineOffline: boolean = navigator.onLine;
  logout_visible: boolean = false
  login_visible: boolean = false
  public name: any
  public profile_img: any
  medie_url: any = environment.imageURL
  visibility: any
  public appPages = [
    {
      title: 'Categories',
      url: '/categories',
      icon: 'ios-list-box',
      chileMenu: []
    },
    {
      title: 'Products',
      class: 'child-active',
      chileMenu: [
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
      chileMenu: []
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
    private navCtrl: NavController,
    private fcm: FCM,
    public fcmService: FcmService,
    private device: Device,
    private backgroundMode: BackgroundMode
    //private backgroundGeolocation: BackgroundGeolocation
  ) {
    this.arr = [];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.fcm.getToken().then(token => {
        console.log('tone', token)
        this.token = token
      });


      this.storage.get('firstTime').then((val) => {
        console.log('val', val)
        if (typeof val === 'undefined' || val === null) {
          // Execute some code for the installation
          let data = {
            "token": this.token,
            "device_details": {
              "uuid": this.device.uuid,
              "model": this.device.model,
              "platform": this.device.platform,
              "serial": this.device.serial,
              "version": this.device.version,
              "manufacturer": this.device.manufacturer
            },


          }
          this.fcmService.addDeviceDetailsWithDeviceToken(data).subscribe(
            res => {
              //this.result = res.result;
              //this.result_fcm = res.result;
              console.log("result_devive_token", res);
              // this.loadingService.dismiss();
              // console.log("afterrrrrrrrrrrr");
              // this.visibleKey = true;
            },
            error => {
              console.log("error::::" + error);
              // this.loadingService.dismiss();
              // this.visibleKey = true;
              //this.toasterService.showToast(error.error.msg,2000)

            });
          //console.log('val',val)
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
          //console.log(data)
          console.log("Received in foreground");
          //console.log(JSON.parse(this.pushes))
          this.router.navigate(['/myaccount/firebase', { pushes: JSON.stringify(data) }]);
        };
      });

      this.fcm.onTokenRefresh().subscribe(token => {
        // Register your new token in your back-end if you want
        // backend.registerToken(token);
      });




      this.networkService.checkNetworkDisconnect();
      window.addEventListener('offline', () => {
        this.networkService.checkNetworkDisconnect();
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backgroundMode.enable();
      
      if(this.backgroundMode.isActive()){
        let data = {
          'data':"test"
        }
        console.log('backgroundMode activate');
        // this.backgroundMode.on("activate").subscribe(()=>{
          
        
        // this.fcmService.addDemoData(data).subscribe(
        //   res => {
        //     console.log("result_devive_token", res);
        //   },
        //   error => {
        //     console.log("error::::" + error);
        //   });
        // });
        
      }
        
      
      


      // const config: BackgroundGeolocationConfig = {
      //   desiredAccuracy: 10,
      //   stationaryRadius: 20,
      //   distanceFilter: 30,
      //   debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      //   stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      // };
      // this.backgroundGeolocation.configure(config).then(() => {

      //   this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe(
      //     (location: BackgroundGeolocationResponse) => {
      //       console.log(location);
      //       var locationstr = localStorage.getItem("location");
      //       if (locationstr == null) {
      //         this.arr.push(location);
      //       } else {
      //         var locationarr = JSON.parse(locationstr);
      //         this.arr = locationstr
      //       }
      //       localStorage.setItem("location", JSON.stringify(this.arr));
      //       // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      //       // and the background-task may be completed.  You must do this regardless if your operations are successful or not.
      //       // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      //       //this.backgroundGeolocation.finish(); // FOR IOS ONLY
      //     });

      // });
      //window.app = this

      // this.authenticationService.authState.subscribe(state => {
      //   if (state) {
      //     this.menuCtrl.enable(true);
      //     this.logout_visible = true;
      //     this.login_visible = false;
      //     this.storage.get('USER_INFO').then((val) => {
      //       this.name = val.name
      //       this.profile_img = val.img
      //     });
      //     
      //   } else {
      //     this.logout_visible = false;
      //     this.login_visible = true;
      //     this.router.navigateByUrl('/home');
      //   }
      // });
    });
  }
  logoutUser() {
    this.menuCtrl.enable(false);
    this.authenticationService.logout();
  }
  logIn() {
    //this.menuCtrl.enable(false);
    this.router.navigateByUrl('/login');
  }

}
