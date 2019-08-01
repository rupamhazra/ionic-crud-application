import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastController: ToastController) { }
  showToast(msg='',duration=0,animated=true,showCloseButton=true,closeButtonText='OK') {
        this.toastController.create({
          message: msg,
          duration: duration,
          animated: animated,
          showCloseButton: showCloseButton,
          closeButtonText: closeButtonText,
          cssClass: "my-toast",
          position: "top"
        }).then((obj) => {
          obj.present();
        });
      }
}