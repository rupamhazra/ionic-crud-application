import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  product_count_on_cart:number;
  menu_button_visible:boolean;
  title:any;
  constructor(
    private router : Router,
    public events2: Events,
    private storage: Storage,
  ) { 
   
  }

  ngOnInit() {
    console.log("current Link",this.router.url);
    if(this.router.url.includes('home')){
      this.menu_button_visible = true;
      this.title = "RSKart";
    }
    

    /**
     * Thease event fire from product-single-page.ts file to show product count on badge.
     */
    this.events2.subscribe('showProductCountOnCart', (data) =>{
      console.log(data); // 👋 Hello from page1!
      this.product_count_on_cart = data
    });

    this.storage.get('allProductDetailsInCart').then((val) => {
      if(val) 
      {
        this.product_count_on_cart = val.length
      }
    });
    
  }
}
