import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { ProductService } from '../../../core/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.page.html',
  styleUrls: ['./product-single.page.scss','../../layout.page.scss'],
})
export class ProductSinglePage implements OnInit {
  productId: number;
  productDetails: any;
  visibleKey: boolean = false;
  medie_url:any = environment.imageURL
  constructor(
    private productService: ProductService,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingService : LoadingService,
  ) { }

  ngOnInit() {
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
}
