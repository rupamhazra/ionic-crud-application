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
  cart_button_visible:boolean;
  title_section_visible:boolean;
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
      this.title_section_visible = true;
      this.cart_button_visible = true;
      this.title = "RSKart";
    }
    if(this.router.url.includes('cart')){
      this.cart_button_visible = false;
      this.menu_button_visible = false;
      this.title_section_visible = true;
      this.title = "My Cart";
    }
    if(this.router.url.includes('categories')){
      this.cart_button_visible = true;
      this.menu_button_visible = false;
      this.title_section_visible = true;
      this.title = "My Categories";
    }
    if(this.router.url.includes('product-single')){
      this.cart_button_visible = true;
      this.menu_button_visible = false;
      this.title_section_visible = false;
      //this.title = "My Categories";
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
        //this.cart_button_visible = true;
        this.product_count_on_cart = val.length
        
      }else{
        //this.cart_button_visible = false;
      }
    });
    
  }

  openCartPage(){
    console.log('opencartPage');
    this.router.navigateByUrl('/cart');
  }
}
