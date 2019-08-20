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
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule {}
