import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductSingleZoomPage } from './product-single-zoom.page';

const routes: Routes = [
  {
    path: '',
    component: ProductSingleZoomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductSingleZoomPage]
})
export class ProductSingleZoomPageModule {}
