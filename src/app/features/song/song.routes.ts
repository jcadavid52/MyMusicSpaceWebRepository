import { Routes } from '@angular/router';

export const songRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./presentation/pages/add-song/add-song').then((m) => m.AddSong),
  },
];
