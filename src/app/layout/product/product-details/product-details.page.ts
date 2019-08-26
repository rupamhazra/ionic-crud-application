import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';

import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  modalTitle:string;
  modelId:number;
  constructor(
    private modalService: ModalService,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    console.table(this.navParams);
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }
  
  closeProductDetailsModal(){
    this.modalService.closeModal()
  }
  

}
