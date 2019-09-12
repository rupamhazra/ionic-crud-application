import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyaccountPage } from './myaccount.page';
import { ComponentsModule } from "../../core/components/components.module";
import { MyaccountRoutingModule } from './myaccount-routing.module';

const routes: Routes = [
  {
    path: '',
    component: MyaccountPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MyaccountRoutingModule
  ],
  declarations: [MyaccountPage]
})
export class MyaccountPageModule {}
