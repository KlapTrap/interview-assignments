import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'project',
    loadChildren: () => import('./project/project-routing').then((m) => m.routes)
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  }
];
