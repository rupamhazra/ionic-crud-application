import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'myaccount-login',
    loadChildren: './myaccount/login.module#LoginPageModule' 
  },
  { 
    path: 'myaccount-register', 
    loadChildren: './myaccount/register.module#RegisterPageModule' 
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MyaccountRoutingModule {}
