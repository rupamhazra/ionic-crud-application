import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolicyAddPage } from './policy-add.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyAddPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [PolicyAddPage]
})
export class PolicyAddPageModule {}
