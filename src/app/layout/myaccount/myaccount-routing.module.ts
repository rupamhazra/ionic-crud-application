import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'address',
    loadChildren: './customeraddress/customeraddress.module#CustomeraddressPageModule' ,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MyaccountRoutingModule {}
