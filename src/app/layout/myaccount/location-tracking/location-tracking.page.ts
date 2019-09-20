import { Component, OnInit  } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { NavController, Platform } from '@ionic/angular';
import { NativeGeocoder,NativeGeocoderOptions,NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';

declare var google;
@Component({
  selector: 'app-location-tracking',
  templateUrl: './location-tracking.page.html',
  styleUrls: ['./location-tracking.page.scss','../../layout.page.scss'],
})
export class LocationTrackingPage implements OnInit {
  //@ViewChild('map') mapElement: ElementRef;
  map: any;
  currentMapTrack = null;
  markers: any;
  isTracking = false;
  trackedRoute = [];
  previousTracks = [];
  positionSubscription: Subscription;
  geoAddress: string;
  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  constructor(
    public navCtrl: NavController, 
    private plt: Platform, 
    private geolocation: Geolocation, 
    private storage: Storage,
    private nativeGeocoder: NativeGeocoder
  ) { 
    this.markers = [];
  }

  ngOnInit() {
  }
  
  ionViewDidEnter() {
    
    this.plt.ready().then(() => {
      this.loadHistoricRoutes();
 
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.9011, lng: -56.1645},
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true
      });
 
      this.geolocation.getCurrentPosition().then(resp => {
        
        //let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        let pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        let marker = new google.maps.Marker({
          position: pos,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 18,
            strokeColor: '#fff',
            fillColor: '#7044ff',
            strokeWeight: 15,
            fillOpacity: 1.0,
            //anchor: new google.maps.Point(12, 24),
            
          },
          map: this.map,
          title: 'you are here!',
          animation: google.maps.Animation.DROP,
        });
        //marker.setAnimation(google.maps.Animation.BOUNCE);
        this.markers.push(marker);
        this.map.setCenter(pos);
        this.map.setZoom(16);

      }).catch((error) => {
        console.log('Error getting location', error);
      });
    });
  }
  loadHistoricRoutes() {
    this.storage.get('routes').then(data => {
      if (data) {
        this.previousTracks = data;
      }
    });
  }
  
startTracking() {
    this.map.setZoom(18);
    this.isTracking = true;
    this.trackedRoute = [];
    this.positionSubscription = this.geolocation.watchPosition()
      .pipe(
        filter((p) => p.coords !== undefined) //Filter Out Errors
      )
      .subscribe(data => {
        setTimeout(() => {
          this.getGeoencoder(data.coords.latitude,data.coords.longitude);
          this.trackedRoute.push({ lat: data.coords.latitude, lng: data.coords.longitude, address: this.geoAddress});
          this.redrawPath(this.trackedRoute);
        }, 0);
      });
 
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude,longitude){
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderResult[]) => {
       this.geoAddress = this.generateAddress(result[0]);
       console.log('this.geoAddress',this.geoAddress)
       
    })
    .catch((error: any) => {
      alert('Error getting location'+ JSON.stringify(error));
    });
  }

  //Return Comma saperated address
  generateAddress(addressObj){
      let obj = [];
      let address = "";
      for (let key in addressObj) {
        obj.push(addressObj[key]);
      }
      obj.reverse();
      for (let val in obj) {
        if(obj[val].length)
        address += obj[val]+', ';
      }
    return address.slice(0, -2);
  }

  redrawPath(path) {
    if (this.currentMapTrack) {
      this.currentMapTrack.setMap(null);
    }
 
    if (path.length > 1) {
      var lineSymbol = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: '#7044ff'
      };
      this.currentMapTrack = new google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: '#7044ff',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        icons: [{
          icon: lineSymbol,
          offset: '100%'
        }],
      });
      this.currentMapTrack.setMap(this.map);
    }
  }
  stopTracking() {
    let newRoute = { finished: new Date().getTime(), path: this.trackedRoute };
    this.previousTracks.push(newRoute);
    this.storage.set('routes', this.previousTracks);
   
    this.isTracking = false;
    this.positionSubscription.unsubscribe();
    this.currentMapTrack.setMap(null);
  }
   
  showHistoryRoute(route) {
    console.log(route)
    this.redrawPath(route);
  }
}
