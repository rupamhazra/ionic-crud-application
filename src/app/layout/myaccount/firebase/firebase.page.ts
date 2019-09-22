import { Component, OnInit } from '@angular/core';
import { FCM } from '@ionic-native/fcm/ngx';
import { Platform } from '@ionic/angular';
import { FcmService } from '../../../core/services/fcm.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.page.html',
  styleUrls: ['./firebase.page.scss'],
})
export class FirebasePage implements OnInit {
  pushes: any = [];
  token:any;
  result_fcm:any;
  constructor(
    private fcm: FCM,
    public plt: Platform,
    private fcmService:FcmService,
    private route: ActivatedRoute
  ) { 
   
  }

  ngOnInit() {
    this.pushes = JSON.parse(this.route.snapshot.params['pushes']);
    console.log('this.pushes',this.pushes)
   
  }
  // subscribeToTopic() {
  //   this.fcm.subscribeToTopic('enappd');
  // }
  // getToken() {
  //   this.fcm.getToken().then(token => {
  //    console.log('tone',token)
  //    this.token = token
  //   });
  // }
  // unsubscribeFromTopic() {
  //   this.fcm.unsubscribeFromTopic('enappd');
  // }

  sendMessage(){
    let data = {
      "notification":{
        "title":"Notification title",
        "body":"Notification body",
        "sound":"default",
        "click_action":"FCM_PLUGIN_ACTIVITY",
        "icon":"fcm_push_icon"
      },
      "data":{
        "param1":"value1",
        "param2":"value2"
      },
        "to":this.token,
        "priority":"high",
        "restricted_package_name":""
    }
    this.fcmService.sendMessage(data).subscribe( 
      res => {
        //this.result = res.result;
        this.result_fcm = res.result;
        console.log("result_fcm",this.result_fcm);
        // this.loadingService.dismiss();
        // console.log("afterrrrrrrrrrrr");
        // this.visibleKey = true;
      },
    error => {
      console.log("error::::"+error);
      // this.loadingService.dismiss();
      // this.visibleKey = true;
      //this.toasterService.showToast(error.error.msg,2000)

    });
  }

}
