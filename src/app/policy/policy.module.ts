import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyAddPage } from './policy-add/policy-add.page';


import { IonicModule } from '@ionic/angular';

import { PolicyPage } from './policy.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicyRoutingModule,
    //RouterModule.forChild(routes)
  ],
  declarations: [PolicyPage,PolicyAddPage]
})
export class PolicyPageModule {}
