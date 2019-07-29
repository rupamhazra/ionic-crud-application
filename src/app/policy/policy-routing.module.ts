import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyPage } from './policy.page';
import { PolicyAddPage } from './policy-add/policy-add.page';
import { PolicyListPage } from './policy-list/policy-list.page';
import { PolicyEditPage } from './policy-edit/policy-edit.page';


// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'policy-list',
//     pathMatch: 'full'
//   },
//   { path: 'policy-add', loadChildren: './policy-add/policy-add.module#PolicyAddPageModule' },
//   { path: 'policy-list', loadChildren: '.policy-list/policy-list.module#PolicyListPageModule' },
//   { path: 'policy-edit', loadChildren: './policy-edit/policy-edit.module#PolicyEditPageModule' },
 
// ];

// const routes: Routes = [
//   { path: '', component: PolicyPage },
//   { path: 'policy-add', component: PolicyAddPage },
 
// ];

const routes: Routes = [
   {
    path: '',
    redirectTo: 'policy-list',
    pathMatch: 'full'
  },
  {
    path: 'policy-list',
    component: PolicyListPage
  },
  {
    path: 'policy-add',
    component: PolicyAddPage
  },
  {
    path: 'policy-edit/:id',
    component: PolicyEditPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PolicyRoutingModule {}
