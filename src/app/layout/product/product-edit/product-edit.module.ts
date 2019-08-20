import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductEditPage } from './product-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ProductEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IonicModule
  ],
  declarations: [ProductEditPage]
})
export class ProductEditPageModule {}
