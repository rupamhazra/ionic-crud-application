import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';
import { ToasterService } from '../../../core/services/toaster.service';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.page.html',
  styleUrls: ['./product-edit.page.scss'],
})
export class ProductEditPage implements OnInit {
  form: FormGroup;
  visibleKey: boolean = false;
  policies:any;
  selectedProduct:  {};
  productId: number;
  productDetails: any;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingService : LoadingService,
    ) {}
  ngOnInit() {

    //this.productDetails = [{ 'amount':null}]
    this.form = this.formBuilder.group({
      number: ['', Validators.required],
      amount: ['', Validators.required],
    });
    
    this.productId = this.route.snapshot.params['id']
    this.readProduct();
    
  }

  readProduct()
  {
    //console.log("visibleKey ====="+this.visibleKey);
    this.loadingService.present();
    this.productService.getProduct(this.productId).subscribe( 
      res => {
      this.productDetails = res.result;
      //console.log(this.productDetails);
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

 

  updateProduct(){
    console.log('update....')
    this.productService.updateProductService(this.productId,this.form.value).subscribe(
      res=>{
      console.log("Product updated, ", res);
      this.toasterService.showToast(res.msg,2000);
      this.router.navigateByUrl('/product/product-list');
      //this.readPolicies();
      },
      error => {
        console.log("error::::"+error);
        this.toasterService.showToast(error.error.msg,2000)
      }
    );
    

  }


}
