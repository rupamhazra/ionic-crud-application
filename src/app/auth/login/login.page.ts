import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ApiService } from '../../api.service';
import { ToasterService } from '../../commonservices/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor(
    private  apiService:  ApiService, 
    private  router:  Router,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService

  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginUser(){
    this.apiService.loginService(this.form.value).subscribe(
      res=> {
      console.log("res:::"+res.msg);
      localStorage.setItem('userDetails',JSON.stringify(res.result));

      this.toasterService.showToast(res.msg,2000)
      this.router.navigateByUrl('home');
    },
    error => {
      console.log("error::::"+error.error.msg);
      this.toasterService.showToast(error.error.msg,2000)
    }
    );
  }
}
