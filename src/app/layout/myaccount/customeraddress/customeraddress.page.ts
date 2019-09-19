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
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    };
    this.autocompleteItems = [];
    this.markers = [];
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

tryGeolocation(){
  this.loadingService.present();
  this.clearMarkers();//remove previous markers

  this.geolocation.getCurrentPosition().then((resp) => {
    let pos = {
      lat: resp.coords.latitude,
      lng: resp.coords.longitude
    };
    let marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      title: 'I am here!'
    });
    this.markers.push(marker);
    this.map.setCenter(pos);
    this.loadingService.dismiss();

  }).catch((error) => {
    console.log('Error getting location', error);
    this.loadingService.dismiss();
  });
}

updateSearchResults(){
  if (this.autocomplete.input == '') {
    this.autocompleteItems = [];
    return;
  }
  this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      if(predictions){
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      }
  });
}

selectSearchResult(item){
  console.log('item',item.description)
  this.autocomplete.input = item.description
  this.clearMarkers();
  this.autocompleteItems = [];

  this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
    if(status === 'OK' && results[0]){
      // let position = {
      //     lat: results[0].geometry.location.lat,
      //     lng: results[0].geometry.location.lng
      // };
      let marker = new google.maps.Marker({
        position: results[0].geometry.location,
        map: this.map
      });
      this.markers.push(marker);
      this.map.setCenter(results[0].geometry.location);
    }
  })
}

clearMarkers(){
  for (var i = 0; i < this.markers.length; i++) {
    console.log(this.markers[i])
    this.markers[i].setMap(null);
  }
  this.markers = [];
}


}
