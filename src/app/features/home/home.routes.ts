import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/home/home').then((m) => m.Home),
  },
];
