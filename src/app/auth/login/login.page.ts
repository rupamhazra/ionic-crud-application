import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LoginRegisterService } from '../../core/services/login-register.service';
import { ToasterService } from '../../core/services/toaster.service';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor(
    private  loginRegisterService:  LoginRegisterService, 
    private  router:  Router,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService,
    private authService: AuthenticationService

  ) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginUser(){
    
    this.loginRegisterService.loginService(this.form.value).subscribe(
      res=> {
      console.log("res:::"+res.msg);
      //localStorage.setItem('isUserLogged','true');
      //localStorage.setItem('userDetails',JSON.stringify(res.result));

      this.toasterService.showToast(res.msg,2000);
      //this.router.navigateByUrl('home');
      this.authService.login(res.result);
    },
    error => {
      console.log("error::::"+error.error.msg);
      this.toasterService.showToast(error.error.msg,2000)
    }
    );
  }
}
