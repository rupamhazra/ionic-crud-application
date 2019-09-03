import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title : any;
  current_route:any;
  header_common_toolbar:boolean = false;
  header_product_single:boolean = false;
  buttonText:any;
  buttonIcon:any;
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
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) {
    
   }

  ngOnInit() {
    //console.log("current route",this.activatedRoute.snapshot.url)
    console.log("current route",this.router.url)
    this.current_route = this.router.url
    if(this.current_route.includes('/product-single')){
      //console.log('yessssssssssssssssssssss')
      this.header_product_single = true;
      this.buttonText = 'Back';
      this.buttonIcon = 'back';
    }
    else{
      this.title = 'Home';
      
      this.header_common_toolbar = true;
    }
  }
  logoutUser(){
    this.authService.logout();
  }
}
