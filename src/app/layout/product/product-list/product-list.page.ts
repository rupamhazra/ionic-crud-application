import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  form: FormGroup;
  visibleKey: boolean = false;
  policies:[];
  selectedProduct:  {};
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
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
    this.productService.readPolicies().subscribe( 
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

  editProduct(id){
    console.log('id====',id)
    this.router.navigateByUrl('/product/product-edit/' + id);
  }

  deleteProduct(id){
    this.loadingService.present();
    this.productService.deleteProduct(id,null).subscribe(
      res=>{
      console.log("Product deleted, ", res);
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
