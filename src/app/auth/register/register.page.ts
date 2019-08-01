import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { LoginRegisterService } from '../../core/services/login-register.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  constructor(
    private  loginRegisterService:  LoginRegisterService, 
    private  router:  Router,
    private formBuilder: FormBuilder,
    private toasterService: ToasterService
    ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  registerUser() {
    this.loginRegisterService.registerService(this.form.value).subscribe(res => {
      //We use the navigateByUrl() method of the Angular Router to navigate to a page by its URL.
      console.log(res)
      this.router.navigateByUrl('home'); 
    },
    error => {
      console.log("error::::"+error);
      this.toasterService.showToast(error.error.msg,2000)
    }
    );
  }
}
