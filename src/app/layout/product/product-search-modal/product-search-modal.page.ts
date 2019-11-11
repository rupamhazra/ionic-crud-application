import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Component({
  selector: 'app-product-search-modal',
  templateUrl: './product-search-modal.page.html',
  styleUrls: ['./product-search-modal.page.scss'],
})
export class ProductSearchModalPage implements OnInit {
  item_s: any;
  isItemAvailable: boolean;
  search_items: any = ["Ram", "gopi", "dravid"];
  constructor(
    public modalService: ModalService,
    private speechRecognition: SpeechRecognition
  ) { }

  ngOnInit() {
  }
  closeLoginModal() {
    this.modalService.closeModal()
    //this.router.navigateByUrl('/home');
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
            console.log('item_s', this.item_s)

            //this.item_s = item.toLowerCase().indexOf(matches[0].toLowerCase()) > -1;
            return (item.toLowerCase().indexOf(matches[0].toLowerCase()) > -1);

          })
          console.log('this.search_items', this.search_items)
          //this.color = matches[0];
        },
        (onerror) => console.log('error:', onerror)
      )
  }

}
