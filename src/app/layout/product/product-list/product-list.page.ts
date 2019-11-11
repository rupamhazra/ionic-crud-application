import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LoadingService } from '../../../core/services/loading.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss', '../../layout.page.scss'],
})
export class ProductListPage implements OnInit {
  medie_url: any = environment.imageURL
  result: [];
  form: FormGroup;
  visibleKey: boolean = false;
  policies: [];
  selectedProduct: {};
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toasterService: ToasterService,
    public loadingService: LoadingService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.loadingService.present();
    this.readProducts();
  }

  readProducts() {
    //this.loadingService.present();
    //this.categories =[];
    this.productService.readProducts().subscribe(
      res => {
        this.result = res.result;
        //this.result_slide = res.result;
        //console.log("result",this.result);
        this.loadingService.dismiss();
        //console.log("afterrrrrrrrrrrr");
        this.visibleKey = true;
      },
      error => {
        console.log("error::::" + error);
        //this.loadingService.dismiss();
        this.visibleKey = true;
        this.toasterService.showToast(error.error.msg, 2000)

      }
    )
  }

  editProduct(id) {
    console.log('id====', id)
    this.router.navigateByUrl('/product/product-edit/' + id);
  }

  deleteProduct(id) {
    this.loadingService.present();
    this.productService.deleteProduct(id, null).subscribe(
      res => {
        console.log("Product deleted, ", res);
        this.loadingService.dismiss();
        this.toasterService.showToast(res.msg, 2000)
        this.readProducts();
      },
      error => {
        console.log("error::::" + error);
        this.loadingService.dismiss();
        this.toasterService.showToast(error.error.msg, 2000)
      }
    );
  }

}
