import { Component } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  name: any;
  constructor(private apiService: ApiService) {}
 
  ngOnInit() {
    //console.log('user_details',localStorage.getItem('userDetails'));
    var userDetails = JSON.parse(localStorage.getItem('userDetails'));
    //console.log('user_details',userDetails);
    this.name = userDetails.name;
    //console.log('name',this.name);
  }

 
}
