import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  public onlineOffline: boolean = navigator.onLine;
  constructor(
    private alertService: AlertService,
    ) { }

  // watch network for a disconnection
  checkNetworkDisconnect(){
    if (!navigator.onLine) {
      this.alertService.presentAlert("Please check your internet connection!!");
      return true;
    }else{
      return false;
    }
    
  }
}
