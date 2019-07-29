import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PolicyEditPage } from './policy-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyEditPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [PolicyEditPage]
})
export class PolicyEditPageModule {}
