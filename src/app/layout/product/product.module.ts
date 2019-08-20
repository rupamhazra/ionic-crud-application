import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ProductRoutingModule } from './product-routing.module';
import { ProductPage } from './product.page';
import { ProductAddPage } from './product-add/product-add.page';
import { ProductListPage } from './product-list/product-list.page';
import { ProductEditPage } from './product-edit/product-edit.page';

import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductRoutingModule,

  ],
  declarations: [ProductPage]
})
export class ProductPageModule {}
