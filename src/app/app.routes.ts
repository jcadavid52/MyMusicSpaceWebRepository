import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/site-layout/site-layout').then((m) => m.SiteLayout),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/home/home.routes').then((m) => m.homeRoutes),
      },
      {
        path: 'add-song',
        loadChildren: () =>
          import('./features/song/song.routes').then((m) => m.songRoutes),
      },
    ],
  },
];
