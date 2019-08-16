import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PolicyAddPage } from './policy-add.page';


const routes: Routes = [
  {
    path: '',
    component: PolicyAddPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IonicModule,
  ],
  declarations: [PolicyAddPage]
})
export class PolicyAddPageModule {}
