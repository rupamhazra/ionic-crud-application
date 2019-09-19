import { Component, OnInit,NgZone  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingService } from '../../../core/services/loading.service';
declare var google

@Component({
  selector: 'app-customeraddress',
  templateUrl: './customeraddress.page.html',
  styleUrls: ['./customeraddress.page.scss'],
})
export class CustomeraddressPage implements OnInit {

  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  loading: any;



  constructor(
    public zone: NgZone,
    public geolocation: Geolocation,
    public loadingService : LoadingService,
  ) {
    // this.geocoder = new google.maps.Geocoder;
    // let elem = document.createElement("div")
    // this.GooglePlaces = new google.maps.places.PlacesService(elem);
    // this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    // this.autocomplete = {
    //   input: ''
    // };
    // this.autocompleteItems = [];
    // this.markers = [];
    //this.loading = this.loadingCtrl.create();
  }
  ngOnInit() {
  }
  ionViewDidEnter(){
    // let infoWindow = new google.maps.InfoWindow({map: map});
    //Set latitude and longitude of some place
  this.map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.9011, lng: -56.1645},
    zoom: 15
  });
}



}
