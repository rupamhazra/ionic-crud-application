import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { SliderService } from '../../core/services/slider.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../../core/services/loading.service';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  name:any;
  title:any;
  medie_url:any = environment.imageURL
  visibleKey: boolean = false;
  result:[];
  result_cat:[];
  result_slide:[];
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay:true
  };
  slideOpts1 = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 4,
    
  };
  constructor(
    private storage: Storage,
    private router: Router,
    public loadingService : LoadingService,
    private productService: ProductService,
    private toasterService: ToasterService,
    private categoryService: CategoryService,
    private sliderService: SliderService,
  ) { }

  ngOnInit() {
    console.log('this.router.url', this.router.url);
    this.title = this.router.url;
    this.storage.get('USER_INFO').then((val) => {
      this.name = val.name
    });
    this.loadingService.present();
    this.readSliders();
    this.readCategories();
    this.readProducts();
  }
  readSliders()
  {

    //this.categories =[];
    this.sliderService.readSliders().subscribe( 
      res => {
        //this.result = res.result;
        this.result_slide = res.result;
        console.log("result_slide",this.result_slide);
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
  readCategories()
  {

    //this.categories =[];
    this.categoryService.readCategories().subscribe( 
      res => {
        this.result_cat = res.result;
        console.log("result_cat",this.result_cat);
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
  readProducts()
  {

    //this.categories =[];
    this.productService.readProducts().subscribe( 
      res => {
        this.result = res.result;
        //this.result_slide = res.result;
        console.log("result",this.result);
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
  
}
