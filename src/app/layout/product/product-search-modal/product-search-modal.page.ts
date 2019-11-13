import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ProductService } from '../../../core/services/product.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search-modal',
  templateUrl: './product-search-modal.page.html',
  styleUrls: ['./product-search-modal.page.scss'],
})
export class ProductSearchModalPage implements OnInit {
  @ViewChild('input') myInput;
  result: any;
  item_s: any;
  isItemAvailable: boolean;
  search_items: any = ["Ram", "gopi", "dravid"];
  constructor(
    public modalService: ModalService,
    private speechRecognition: SpeechRecognition,
    private productService: ProductService,
    private toasterService: ToasterService,
    private router: Router,
  ) { }

  ngOnInit() {
    /**
     * For pointer focus on input field
     */
    setTimeout(() => {
      this.myInput.setFocus();
    }, 150);
    this.readProducts()
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

      },
      error => {
        console.log("error::::" + error);
        //this.loadingService.dismiss();

        this.toasterService.showToast(error.error.msg, 2000)

      }
    )
  }


  getItems(ev: any, item_val: any) {
    // set val to the value of the searchbar
    var val;
    if (item_val != '') {
      val = item_val;
      console.log('val', val)
      //this.modalService.closeModal();
      //this.router.navigateByUrl('/products/product-list');
    }
    else {
      val = ev.target.value;
    }

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.isItemAvailable = true;
      console.log('val', val)
      console.log('this.result', this.result)
      this.search_items = this.result
      // this.search_items = this.result.filter((item) => {
      //   console.log('item.name', item.name)
      //   return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
      console.log('this.search_items', this.search_items)
    }
  }
  searchProduct(item) {
    console.log('item', item)
    this.modalService.closeModal()
    this.router.navigateByUrl('/products/product-single/' + item.id);

  }
  start() {
    console.log('sdsdsdsdds')
    this.isItemAvailable = true;
    this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          //console.log('matches', matches)
          return this.getItems('', matches[0])

          //return this.router.navigateByUrl('/home');
          //console.log('after', this.search_items)
        },
        (onerror) => console.log('error:', onerror)

      )
  }

  closeLoginModal() {
    this.modalService.closeModal()
    //this.router.navigateByUrl('/home');
  }

}
