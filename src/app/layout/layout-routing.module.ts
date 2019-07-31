import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPage } from './layout.page';

const routes: Routes = [
    {
      path: '',
      component: LayoutPage,   
      children: [
        { path: '', redirectTo: 'policy' },
        { path: 'policy', loadChildren: './policy/policy.module#PolicyPageModule' },
      ]
    },
//   { path: 'policy', loadChildren: './policy/policy.module#PolicyPageModule' },
//   { path: 'policy-add', loadChildren: './policy/policy-add/policy-add.module#PolicyAddPageModule' },
//   { path: 'policy-edit', loadChildren: './policy/policy-edit/policy-edit.module#PolicyEditPageModule' },
//   { path: 'policy-list', loadChildren: './policy/policy-list/policy-list.module#PolicyListPageModule' }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LayoutRoutingModule { }
