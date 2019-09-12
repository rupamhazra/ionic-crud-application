import { Component, OnInit,NgZone  } from '@angular/core';

@Component({
  selector: 'app-customeraddress',
  templateUrl: './customeraddress.page.html',
  styleUrls: ['./customeraddress.page.scss'],
})
export class CustomeraddressPage implements OnInit {

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;

  constructor(
    public zone: NgZone,
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }
  ngOnInit() {
  }
  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }
  selectSearchResult(item) {
    console.log(item)
    this.location = item
    this.placeid = this.location.place_id
    console.log('placeid'+ this.placeid)
  }
  GoTo(){
    return window.location.href = 'https://www.google.com/maps/place/?q=place_id:'+this.placeid;
  }


}
