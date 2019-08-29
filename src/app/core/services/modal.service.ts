import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  dataReturned:any;
  constructor(
    public modalController: ModalController
  ) { }

  async openModal(page_name,modalData) {
    console.log('modalData',modalData)
    const modal = await this.modalController.create({
      component: page_name,
      componentProps: modalData
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned.data);
      }
    });
 
    return await modal.present();
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
