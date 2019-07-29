import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'register',
    loadChildren: './auth/register/register.module#RegisterPageModule' 
  },
  {
    path: 'login',
    loadChildren: './auth/login/login.module#LoginPageModule' 
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { 
    path: 'policy', 
    loadChildren: './policy/policy.module#PolicyPageModule' 
  },
  // { path: 'policy-add', loadChildren: './policy/policy-add/policy-add.module#PolicyAddPageModule' },
  // { path: 'policy-list', loadChildren: './policy/policy-list/policy-list.module#PolicyListPageModule' },
  // { path: 'policy-edit', loadChildren: './policy/policy-edit/policy-edit.module#PolicyEditPageModule' },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
