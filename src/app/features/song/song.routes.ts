import { Routes } from '@angular/router';

export const songRoutes: Routes = [
  {
    path: 'search',
    loadComponent: () =>
      import('./presentation/pages/search-song/search-song').then((m) => m.SearchSong),
  },
  {
    path: 'add/:spotifyId',
    loadComponent: () =>
      import('./presentation/pages/add-song/add-song').then((m) => m.AddSong),
  },
];
