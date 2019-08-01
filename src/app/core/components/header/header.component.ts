import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title : any
  public appPages = [
    {
      title: 'Register',
      url: '/register',
      icon: 'list',
      chileMenu:[]
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'list',
      chileMenu:[]
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'home',
      chileMenu:[]
    },
    {
      title: 'Policy',
      class: 'child-active',
      chileMenu:[
        {
          title: 'List',
          url: '/policy/policy-list',
          icon: 'list',
        },
        {
          title: 'Add',
          url: '/policy/policy-add',
          icon: 'list',
        },
      ]
    },
  ];

  constructor(
    private authService: AuthenticationService,
    
  ) { }

  ngOnInit() {
    this.title = 'Dashboard';
  }
  logoutUser(){
    this.authService.logout();
  }
}
