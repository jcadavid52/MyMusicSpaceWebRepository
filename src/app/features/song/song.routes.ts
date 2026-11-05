import { Routes } from '@angular/router';

export const songRoutes: Routes = [
  {
    path: 'search',
    loadComponent: () =>
      import('./presentation/pages/search-song/search-song').then((m) => m.SearchSong),
  },
];
