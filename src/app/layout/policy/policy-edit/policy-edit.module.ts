import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    IonicModule
  ],
  declarations: [PolicyEditPage]
})
export class PolicyEditPageModule {}
