import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout.page';

const routes: Routes = [
    {
      path: '',
      component: LayoutPage,   
      children: [
        { path: '', redirectTo: 'home' },
        { path: 'home', loadChildren: './home/home.module#HomePageModule' },
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
        { path: 'products', loadChildren: './product/product.module#ProductPageModule' },
        { path: 'categories', loadChildren: './category/category.module#CategoryPageModule' },
        { path: 'myaccount', loadChildren: './myaccount/myaccount.module#MyaccountPageModule' },
      ]
    },
  
  

  

  

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LayoutRoutingModule { }
