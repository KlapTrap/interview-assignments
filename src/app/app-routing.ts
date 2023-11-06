import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule)
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full'
  }
];
