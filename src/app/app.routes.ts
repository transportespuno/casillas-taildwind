import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'',
    loadComponent:()=> import('./shared/layout/layout.component'),
    children:[
      {
        path: 'dashboard',
        loadComponent:()=>import('./pages/dashboard/dashboard.component')
      },
      {
        path: 'profile',
        loadComponent:()=>import('./pages/profile/profile.component')
      },
      {
        path: 'tables',
        loadComponent:()=>import('./pages/tables/tables.component')
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'

      }
    ]
  },
  {
    path: 'login',
    loadComponent:()=>import('./auth/login/login.component')
  },
  {
    path: 'upload',
    loadComponent:()=>import('./components/upload1/upload1.component')
  },
  {
    path:'**',
    redirectTo:'dashboard'
  }
];
