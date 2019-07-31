import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToasterService } from '../../../commonservices/toaster.service';
import { LoadingService } from '../../../commonservices/loading.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.page.html',
  styleUrls: ['./policy-list.page.scss'],
})
export class PolicyListPage implements OnInit {

  form: FormGroup;
  visibleKey: boolean = false;
  policies:[];
  selectedPolicy:  {};
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toasterService: ToasterService,
    public loadingService : LoadingService,
    private router: Router
    ) {}
    
  ngOnInit() {
    this.loadingService.present();
    this.readPolicies();
  }

  readPolicies()
  {
    this.policies =[];
    this.apiService.readPolicies().subscribe( 
      res => {
      this.policies = res.result;
      console.log(this.policies);
      this.loadingService.dismiss();
      console.log("afterrrrrrrrrrrr");
      this.visibleKey = true;
      },
    error => {
      console.log("error::::"+error);
      this.loadingService.dismiss();
      this.visibleKey = true;
      this.toasterService.showToast(error.error.msg,2000)

    }
    )
  }

  editPolicy(id){
    console.log('id====',id)
    this.router.navigateByUrl('/policy/policy-edit/' + id);
  }

  deletePolicy(id){
    this.loadingService.present();
    this.apiService.deletePolicy(id,null).subscribe(
      res=>{
      console.log("Policy deleted, ", res);
      this.loadingService.dismiss();
      this.toasterService.showToast(res.msg,2000)
      this.readPolicies();
    },
    error => {
      console.log("error::::"+error);
      this.loadingService.dismiss();
      this.toasterService.showToast(error.error.msg,2000)
    }
    );
  }

}
