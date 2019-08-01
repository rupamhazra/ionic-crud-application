import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout.page';

const routes: Routes = [
    {
      path: '',
      component: LayoutPage,   
      children: [
        { path: '', redirectTo: 'dashboard' },
        { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
        { path: 'policy', loadChildren: './policy/policy.module#PolicyPageModule' },
      ]
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LayoutRoutingModule { }
