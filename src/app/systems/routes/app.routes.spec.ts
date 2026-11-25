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

  it('should include the recognize-sofi route', () => {
    const recognizeSofiRoute = routes.find(
      (r: Route) => r.path === 'recognize-sofi',
    );
    expect(recognizeSofiRoute).toBeDefined();
    expect(recognizeSofiRoute?.loadComponent).toBeDefined();
  });

  it('should lazy load the RecognizeSofi component', async () => {
    const recognizeSofiRoute = routes.find(
      (r: Route) => r.path === 'recognize-sofi',
    );
    const loadedComponent = await (
      recognizeSofiRoute?.loadComponent as () => Promise<unknown>
    )();
    expect(loadedComponent).toBeDefined();
  });

  it('should include the financial-management-1 route', () => {
    const financialManagementRoute = routes.find(
      (r: Route) => r.path === 'financial-management-1',
    );
    expect(financialManagementRoute).toBeDefined();
    expect(financialManagementRoute?.loadComponent).toBeDefined();
  });

  it('should lazy load the FinancialManagement1 component', async () => {
    const financialManagementRoute = routes.find(
      (r: Route) => r.path === 'financial-management-1',
    );
    const loadedComponent = await (
      financialManagementRoute?.loadComponent as () => Promise<unknown>
    )();
    expect(loadedComponent).toBeDefined();
  });

  it('should include the sales-management-2 route', () => {
    const salesManagementRoute = routes.find(
      (r: Route) => r.path === 'sales-management-2',
    );
    expect(salesManagementRoute).toBeDefined();
    expect(salesManagementRoute?.loadComponent).toBeDefined();
  });

  it('should lazy load the SalesManagement2 component', async () => {
    const salesManagementRoute = routes.find(
      (r: Route) => r.path === 'sales-management-2',
    );
    const loadedComponent = await (
      salesManagementRoute?.loadComponent as () => Promise<unknown>
    )();
    expect(loadedComponent).toBeDefined();
  });
});
