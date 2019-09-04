import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu_button_visible:boolean;
  title:any;
  constructor(
    private router : Router
  ) { }

  ngOnInit() {
    console.log("current Link",this.router.url);
    if(this.router.url.includes('home')){
      this.menu_button_visible = true;
      this.title = "RSKart";
    }
  }

}
