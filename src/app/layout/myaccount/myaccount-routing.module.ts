import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { 
  //   path: 'login',
  //   loadChildren: './myaccount/login.module#LoginPageModule' 
  // },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MyaccountRoutingModule {}
