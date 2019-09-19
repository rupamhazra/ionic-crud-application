import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'address',
    loadChildren: './customeraddress/customeraddress.module#CustomeraddressPageModule' ,
  },
  { 
    path: 'location-tracking', 
    loadChildren: './location-tracking/location-tracking.module#LocationTrackingPageModule' 
  },
  

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MyaccountRoutingModule {}
