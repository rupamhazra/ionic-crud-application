import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    IonicModule,
    PolicyRoutingModule,
  ],
  declarations: [PolicyPage,PolicyAddPage,PolicyListPage,PolicyEditPage]
})
export class PolicyPageModule {}
