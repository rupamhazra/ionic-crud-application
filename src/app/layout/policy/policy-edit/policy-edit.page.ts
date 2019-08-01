import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../../../core/services/policy.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { ToasterService } from '../../../core/services/toaster.service';


@Component({
  selector: 'app-policy-edit',
  templateUrl: './policy-edit.page.html',
  styleUrls: ['./policy-edit.page.scss'],
})
export class PolicyEditPage implements OnInit {
  form: FormGroup;
  visibleKey: boolean = false;
  policies:any;
  selectedPolicy:  {};
  policyId: number;
  policyDetails: any;
  constructor(
    private formBuilder: FormBuilder,
    private policyService: PolicyService,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingService : LoadingService,
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
    //console.log("visibleKey ====="+this.visibleKey);
    this.loadingService.present();
    this.policyService.getPolicy(this.policyId).subscribe( 
      res => {
      this.policyDetails = res.result;
      //console.log(this.policyDetails);
      //console.log("visibleKey ====="+this.visibleKey);
      this.loadingService.dismiss();
      this.visibleKey = true;
      },
      error => {
        console.log("error::::"+error);
        //this.loadingService.hideLoader();
        this.loadingService.dismiss();
        this.visibleKey = true;
        this.toasterService.showToast(error.error.msg,2000);
        
      }
    )
  }

 

  updatePolicy(){
    console.log('update....')
    this.policyService.updatePolicyService(this.policyId,this.form.value).subscribe(
      res=>{
      console.log("Policy updated, ", res);
      this.toasterService.showToast(res.msg,2000);
      this.router.navigateByUrl('/policy/policy-list');
      //this.readPolicies();
      },
      error => {
        console.log("error::::"+error);
        this.toasterService.showToast(error.error.msg,2000)
      }
    );
    

  }


}
