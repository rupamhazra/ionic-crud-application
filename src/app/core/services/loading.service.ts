import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;
  constructor(public loadingController: LoadingController) { }
  present() {
    this.isLoading = true;
    return this.loadingController.create({
      //duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
    
  }

  dismiss() {
    this.isLoading = false;
    return this.loadingController.dismiss();
  }
}