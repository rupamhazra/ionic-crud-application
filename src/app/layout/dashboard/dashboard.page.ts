import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  name:any;
  title:any;
  constructor(
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('this.router.url', this.router.url);
    this.title = this.router.url;
    this.storage.get('USER_INFO').then((val) => {
      this.name = val.name
    });
  }
  
}
