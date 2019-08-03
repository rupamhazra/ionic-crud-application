import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'policy-list',
    loadChildren: './policy-list/policy-list.module#PolicyListPageModule' 
  },
  { 
    path: 'policy-add', 
    loadChildren: './policy-add/policy-add.module#PolicyAddPageModule' 
  },
  { 
    path: 'policy-edit/:id', 
    loadChildren: './policy-edit/policy-edit.module#PolicyEditPageModule' 
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PolicyRoutingModule {}
