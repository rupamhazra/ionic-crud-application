import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout.page';

const routes: Routes = [
    {
      path: '',
      component: LayoutPage,   
      children: [
        { path: '', redirectTo: 'dashboard' },
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
        { path: 'products', loadChildren: './product/product.module#ProductPageModule' },
        { path: 'categories', loadChildren: './category/category.module#CategoryPageModule' },
      ]
    },
  

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LayoutRoutingModule { }
