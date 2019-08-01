import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { PolicyRoutingModule } from './policy-routing.module';
import { PolicyPage } from './policy.page';
import { PolicyAddPage } from './policy-add/policy-add.page';
import { PolicyListPage } from './policy-list/policy-list.page';
import { PolicyEditPage } from './policy-edit/policy-edit.page';

import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PolicyRoutingModule,

  ],
  declarations: [PolicyPage]
})
export class PolicyPageModule {}
