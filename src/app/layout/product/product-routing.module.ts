import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'product-list',
    loadChildren: './product-list/product-list.module#ProductListPageModule' 
  },
  { 
    path: 'product-add', 
    loadChildren: './product-add/product-add.module#ProductAddPageModule' 
  },
  { 
    path: 'product-edit/:id',
    loadChildren: './product-edit/product-edit.module#ProductEditPageModule' 
  },
  { path: 'product-single/:id',
    loadChildren: './product-single/product-single.module#ProductSinglePageModule' 
  },
  { 
    path: 'product-details',
    loadChildren: './product-details/product-details.module#ProductDetailsPageModule' 
  },
  { 
    path: 'product-single-zoom/:id', 
    loadChildren: './product-single-zoom/product-single-zoom.module#ProductSingleZoomPageModule' 
  },
 

  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
