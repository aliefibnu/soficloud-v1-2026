import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../pages/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'business-realtime',
    loadComponent: () =>
      import('../../pages/business-control/business-realtime/business-realtime').then(
        (m) => m.BusinessRealtime,
      ),
  },
  {
    path: 'connected-process',
    loadComponent: () =>
      import('../../pages/business-control/connected-process/connected-process').then(
        (m) => m.ConnectedProcess,
      ),
  },
  {
    path: 'smart-workflow',
    loadComponent: () =>
      import('../../pages/business-control/smart-workflow/smart-workflow').then(
        (m) => m.SmartWorkflow,
      ),
  },
  {
    path: 'schedule-demo',
    loadComponent: () =>
      import('../../pages/schedule-demo/schedule-demo').then((m) => m.ScheduleDemo),
  },
];
