import { routes } from './app.routes';
import { Route } from '@angular/router';

describe('app.routes', () => {
  it('should include the connected-process route', () => {
    const connectedProcessRoute = routes.find(
      (r: Route) => r.path === 'connected-process',
    );
    expect(connectedProcessRoute).toBeDefined();
    expect(connectedProcessRoute?.loadComponent).toBeDefined();
  });

  it('should lazy load the ConnectedProcess component', async () => {
    const connectedProcessRoute = routes.find(
      (r: Route) => r.path === 'connected-process',
    );
    const loadedComponent = await (
      connectedProcessRoute?.loadComponent as () => Promise<unknown>
    )();
    expect(loadedComponent).toBeDefined();
  });

  it('should include the schedule-demo route', () => {
    const scheduleDemoRoute = routes.find(
      (r: Route) => r.path === 'schedule-demo',
    );
    expect(scheduleDemoRoute).toBeDefined();
    expect(scheduleDemoRoute?.loadComponent).toBeDefined();
  });

  it('should lazy load the ScheduleDemo component', async () => {
    const scheduleDemoRoute = routes.find(
      (r: Route) => r.path === 'schedule-demo',
    );
    const loadedComponent = await (
      scheduleDemoRoute?.loadComponent as () => Promise<unknown>
    )();
    expect(loadedComponent).toBeDefined();
  });
});
