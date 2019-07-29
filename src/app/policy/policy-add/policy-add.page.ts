import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToasterService } from '../../commonservices/toaster.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-policy-add',
  templateUrl: './policy-add.page.html',
  styleUrls: ['./policy-add.page.scss'],
})
export class PolicyAddPage implements OnInit {
  form: FormGroup;
  visibleKey: boolean;
  policies:any;
  selectedPolicy:  {};
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toasterService: ToasterService,
    private  router:  Router
    ) {}
  ngOnInit() {
    this.form = this.formBuilder.group({
      number: ['', Validators.required],
      amount: ['', Validators.required],
    });
    
    
  }
  addPolicy(){
    console.log('check')
    this.apiService.createPolicy(this.form.value).subscribe(res=>{
      console.log("Policy created, ", res);
      this.toasterService.showToast(res.msg,2000)
      this.router.navigateByUrl('/policy/policy-list');
    },
    error => {
      console.log("error::::"+error);
      this.toasterService.showToast(error.error.msg,2000)
    }
    );
  }







}
