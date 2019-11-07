import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';
import { AuthGuardService } from './core/services/auth-guard.service';
import { AuthenticationService } from './core/services/authentication.service';

/** 
 * Get Camera 
*/

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

/** 
 * Get Current Address and tracking
*/
//import { BackgroundGeolocation} from '@ionic-native/background-geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

/**
 * For modal purpose
 */
import { ProductDetailsPageModule } from './layout/product/product-details/product-details.module';
import { LoginPageModule } from './layout/myaccount/login/login.module';


/**
 * For Network conection
 */
import { Network } from '@ionic-native/network/ngx';

/**
 * For Firebae Notification
 */
import { FCM } from '@ionic-native/fcm/ngx';

import { Device } from '@ionic-native/device/ngx';

//import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ProductDetailsPageModule,
    LoginPageModule,
    
    
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuardService,
    AuthenticationService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    File,
    WebView,
    FilePath,
    //BackgroundGeolocation,
    Geolocation,
    NativeGeocoder,
    Network,
    FCM,
    Device,
    //BackgroundMode,
    SpeechRecognition
    
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
