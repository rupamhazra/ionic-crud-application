import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToasterService } from '../../commonservices/toaster.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.page.html',
  styleUrls: ['./policy-list.page.scss'],
})
export class PolicyListPage implements OnInit {

  form: FormGroup;
  visibleKey: boolean;
  policies:any;
  selectedPolicy:  {};
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toasterService: ToasterService,
    private router: Router
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

 

  editPolicy(id){
    console.log('id====',id)
    this.router.navigateByUrl('/policy/policy-edit/' + id);
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
