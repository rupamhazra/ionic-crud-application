import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../core/services/modal.service';
import { LoginPage } from './login/login.page';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss','../layout.page.scss'],
})
export class MyaccountPage implements OnInit {
  visible_myaccount_details_div:boolean;
  name:any = '';
  constructor(
    public modalService: ModalService,
    private storage: Storage,
    private router: Router,
  ) { 
    //this.modalService.closeModal();
    //this.modalService.openModal(LoginPage,null);
  }

  ngOnInit() {
    //this.modalService.closeModal();
    console.log('openmodal')
    //this.visible_register = false;
    //this.modalService.openModal(LoginPage,null);
    this.storage.get('USER_INFO').then((val) => {
      if (val) {
        this.name = val.name
        console.log('this.name',this.name)
        this.visible_myaccount_details_div = true
      }
      else{
        this.visible_myaccount_details_div = false
      }
    });
   
  }
  openLoginModal(){
    this.modalService.openModal(LoginPage,null);
  }
  goToMyaddress(){
    console.log('ssss')
    this.router.navigateByUrl('/myaccount/address');
  }
  locateMe(){
    console.log('ssss')
    this.router.navigateByUrl('/myaccount/location-tracking');
  }
}
