import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../core/services/modal.service';
import { LoginPage } from './login/login.page';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.page.html',
  styleUrls: ['./myaccount.page.scss'],
})
export class MyaccountPage implements OnInit {
  visible_register:boolean;
  constructor(
    public modalService: ModalService,
  ) { 
    //this.modalService.closeModal();
    //this.modalService.openModal(LoginPage,null);
  }

  ngOnInit() {
    //this.modalService.closeModal();
    console.log('openmodal')
    //this.visible_register = false;
    //this.modalService.openModal(LoginPage,null);
    
  }
  openLoginModal(){
    this.modalService.openModal(LoginPage,null);
  }
  openRegisterDiv(){
    this.visible_register = true;
  }
  openLoginDiv(){
    this.visible_register = false;
  }
}
