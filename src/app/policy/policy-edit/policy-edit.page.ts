import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToasterService } from '../../commonservices/toaster.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../commonservices/loading.service';


@Component({
  selector: 'app-policy-edit',
  templateUrl: './policy-edit.page.html',
  styleUrls: ['./policy-edit.page.scss'],
})
export class PolicyEditPage implements OnInit {
  form: FormGroup;
  visibleKey: boolean;
  policies:any;
  selectedPolicy:  {};
  policyId: number;
  policyDetails: any;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService : LoadingService,
    ) {}
  ngOnInit() {

    //this.policyDetails = [{ 'amount':null}]
    this.form = this.formBuilder.group({
      number: ['', Validators.required],
      amount: ['', Validators.required],
    });
    
    this.policyId = this.route.snapshot.params['id']
    this.readPolicy();
    
  }

  readPolicy()
  {
    this.loadingService.presentLoadingWithOptions();
    this.apiService.getPolicy(this.policyId).subscribe( 
      res => {
      this.policyDetails = res.result;
      console.log(this.policyDetails);
      },
      error => {
        console.log("error::::"+error);
        this.toasterService.showToast(error.error.msg,2000)
      }
    )
  }

 

  UpdatePolicy(){
    console.log('update....')
    this.apiService.createPolicy(this.form.value).subscribe(res=>{
      console.log("Policy created, ", res);
      //this.readPolicies();
    },
    error => {
      console.log("error::::"+error);
      this.toasterService.showToast(error.error.msg,2000)
    }
    );
    

  }


}
