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

  it('should include the smart-workflow route', () => {
    const smartWorkflowRoute = routes.find(
      (r: Route) => r.path === 'smart-workflow',
    );
    expect(smartWorkflowRoute).toBeDefined();
    expect(smartWorkflowRoute?.loadComponent).toBeDefined();
  });

  it('should lazy load the SmartWorkflow component', async () => {
    const smartWorkflowRoute = routes.find(
      (r: Route) => r.path === 'smart-workflow',
    );
    const loadedComponent = await (
      smartWorkflowRoute?.loadComponent as () => Promise<unknown>
    )();
    expect(loadedComponent).toBeDefined();
  });
});
