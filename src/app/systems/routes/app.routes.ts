import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../pages/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'business-realtime',
    loadComponent: () =>
      import('../../pages/business-realtime/business-realtime').then(
        (m) => m.BusinessRealtime,
      ),
  },
  {
    path: 'connected-process',
    loadComponent: () =>
      import('../../pages/connected-process/connected-process').then(
        (m) => m.ConnectedProcess,
      ),
  },
];
