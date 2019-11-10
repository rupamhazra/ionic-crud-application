import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { SliderService } from '../../core/services/slider.service';
import { environment } from 'src/environments/environment';
import { LoadingService } from '../../core/services/loading.service';
import { ToasterService } from '../../core/services/toaster.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss', '../layout.page.scss'],
})
export class HomePage implements OnInit {
  isItemAvailable: boolean;
  search_items: any = ["Ram", "gopi", "dravid"];
  color: string = 'green';
  name: any;
  title: any;
  medie_url: any = environment.imageURL
  visibleKey: boolean = false;
  result: [];
  result_cat: [];
  result_slide: [];
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    autoplay: true
  };
  slideOpts1 = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 4,


  };

  constructor(
    private storage: Storage,
    private router: Router,
    public loadingService: LoadingService,
    private productService: ProductService,
    private toasterService: ToasterService,
    private categoryService: CategoryService,
    private sliderService: SliderService,
    private speechRecognition: SpeechRecognition

  ) { }

  ngOnInit() {

    /**
     * Speech recoganisation
     */
    // Check feature available
    this.speechRecognition.isRecognitionAvailable().then((available: boolean) => console.log(available))

    this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {

        if (!hasPermission) {
          this.speechRecognition.requestPermission()
            .then(
              () => console.log('Granted'),
              () => console.log('Denied')
            )
        }

      });


    //console.log('this.router.url', this.router.url);
    this.title = this.router.url;
    this.storage.get('USER_INFO').then((val) => {

      if (val) this.name = val.name

    });
    //this.loadingService.present();
    this.readSliders();
    this.readCategories();
    this.readProducts();
    //this.loadingService.dismiss();
  }

  readSliders() {
    this.loadingService.present();
    //this.categories =[];
    this.sliderService.readSliders().subscribe(
      res => {
        //this.result = res.result;
        this.result_slide = res.result;
        //console.log("result_slide",this.result_slide);
        this.loadingService.dismiss();
        //console.log("afterrrrrrrrrrrr");
        this.visibleKey = true;
      },
      error => {
        console.log("error::::" + error);
        this.loadingService.dismiss();
        this.visibleKey = true;
        this.toasterService.showToast(error.error.msg, 2000)

      }
    )
  }
  readCategories() {
    //this.loadingService.present();
    //this.categories =[];
    this.categoryService.readCategories().subscribe(
      res => {
        this.result_cat = res.result;
        //console.log("result_cat",this.result_cat);
        // this.loadingService.dismiss();
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
  readProducts() {
    //this.loadingService.present();
    //this.categories =[];
    this.productService.readProducts().subscribe(
      res => {
        this.result = res.result;
        //this.result_slide = res.result;
        //console.log("result",this.result);
        //this.loadingService.dismiss();
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
  getProduct(id) {
    //console.log('id====',id)
    this.router.navigateByUrl('/products/product-single/' + id);
  }
  getItems(ev: any) {
    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      this.search_items = this.search_items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  start() {
    console.log('sdsdsdsdds')

    this.speechRecognition.startListening()
      .subscribe(

        (matches: Array<string>) => {
          console.log('matches', matches)
          this.isItemAvailable = true;
          this.search_items = this.search_items.filter((item) => {
            console.log('item', item)
            return (item.toLowerCase().indexOf(matches[0].toLowerCase()) > -1);
          })

          //this.color = matches[0];
        },
        (onerror) => console.log('error:', onerror)
      )
  }
}
