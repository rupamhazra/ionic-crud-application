import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { ProductService } from '../../../core/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
//import { ModalController } from '@ionic/angular';
import { ModalService } from '../../../core/services/modal.service';
import { ProductDetailsPage } from '../product-details/product-details.page';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.page.html',
  styleUrls: ['./product-single.page.scss','../../layout.page.scss'],
})
export class ProductSinglePage implements OnInit {
  productId: number;
  productDetails: any;
  visibleKey: boolean = false;
  medie_url:any = environment.imageURL;
  mainImage:any;
  subImageClass:any;
  //modalData:any;
  constructor(
    private productService: ProductService,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingService : LoadingService,
    public modalService: ModalService,

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
      this.mainImage = this.productDetails.img
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

  getProductDetails()
  {
    //this.loadingService.present();
    this.modalService.openModal(ProductDetailsPage,this.productDetails);
    //this.loadingService.dismiss();
  }  
  chnageProductImage(event:any,image_name){
    console.log('enevt',event)
    //console.log('image_name',image_name)
    //this.mainImageClass += " sddsdsd";
    event.path[0].parent = '_c_img_focus_b';
    //event.path[0].style = "border: 2px solid red;";
    this.mainImage = image_name;
  }

  getProdcutSlider(id:any){
    console.log('id',id)
    this.router.navigateByUrl('/products/product-single-zoom/'+id);
  }

  add_to_cart(){
    
  }
 
}
