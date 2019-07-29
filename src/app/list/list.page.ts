import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToasterService } from '../commonservices/toaster.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  form: FormGroup;
  visibleKey: boolean;
  policies:any;
  selectedPolicy:  {};
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toasterService: ToasterService
    ) {}
  ngOnInit() {
    this.form = this.formBuilder.group({
      number: ['', Validators.required],
      amount: ['', Validators.required],
    });
    this.readPolicies();
    
  }

  readPolicies()
  {
    this.apiService.readPolicies().subscribe( res => {
      this.policies = res.result;
      console.log(this.policies);
    },
    error => {
      console.log("error::::"+error);
      this.toasterService.showToast(error.error.msg,2000)
    }
    )
  }

  createOrUpdatePolicy(){
    console.log('check')
    this.apiService.createPolicy(this.form.value).subscribe(res=>{
      console.log("Policy created, ", res);
      this.readPolicies();
    },
    error => {
      console.log("error::::"+error);
      this.toasterService.showToast(error.error.msg,2000)
    }
    );
    

  }

  UpdatePolicy(){
    console.log('update....')
    this.apiService.createPolicy(this.form.value).subscribe(res=>{
      console.log("Policy created, ", res);
      this.readPolicies();
    },
    error => {
      console.log("error::::"+error);
      this.toasterService.showToast(error.error.msg,2000)
    }
    );
    

  }

  selectPolicy(policy){
    this.selectedPolicy = policy;
  }

  deletePolicy(id){
    this.apiService.deletePolicy(id,null).subscribe(
      res=>{
      console.log("Policy deleted, ", res);
      this.toasterService.showToast(res.msg,2000)
      this.readPolicies();
    },
    error => {
      console.log("error::::"+error);
      this.toasterService.showToast(error.error.msg,2000)
    }
    );
  }
}
