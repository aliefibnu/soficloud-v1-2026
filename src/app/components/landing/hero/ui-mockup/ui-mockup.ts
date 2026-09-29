import { Component, signal } from '@angular/core';

export interface NavItem {
  id: string;
  label: string;
  active?: boolean;
}

export interface MetricCard {
  title: string;
  value: string;
  indicator: string;
  indicatorType: 'positive' | 'neutral' | 'alert';
}

export interface HealthStatusItem {
  label: string;
  value: string;
  dotColor: string;
}

@Component({
  selector: 'app-ui-mockup',
  templateUrl: './ui-mockup.html',
  host: {
    class: 'relative block w-full select-none text-left',
  },
})
export class UiMockup {
  readonly activeNav = signal<string>('dashboard');
  readonly selectedPeriod = signal<string>('Bulan berjalan');

  readonly navItems: readonly NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', active: true },
    { id: 'finance', label: 'Finance' },
    { id: 'sales', label: 'Sales' },
    { id: 'purchasing', label: 'Purchasing' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'production', label: 'Production' },
    { id: 'project', label: 'Project' },
    { id: 'analytics', label: 'Analytics' },
  ];

  readonly kpiMetrics: readonly MetricCard[] = [
    {
      title: 'Revenue',
      value: 'Rp15,8M',
      indicator: '8,4%',
      indicatorType: 'positive',
    },
    {
      title: 'Gross Profit',
      value: 'Rp3,1M',
      indicator: '5,2%',
      indicatorType: 'positive',
    },
    {
      title: 'Inventory Value',
      value: 'Rp18,6M',
      indicator: '42 lokasi',
      indicatorType: 'neutral',
    },
    {
      title: 'AR Outstanding',
      value: 'Rp4,8M',
      indicator: '12 Jatuh tempo',
      indicatorType: 'alert',
    },
  ];

  readonly healthStatuses: readonly HealthStatusItem[] = [
    { label: 'Cash position', value: 'sehat', dotColor: 'bg-[#1d44eb]' },
    { label: 'Order fulfilment', value: '96%', dotColor: 'bg-[#10b981]' },
    { label: 'Inventory alert', value: '8 item', dotColor: 'bg-[#f43f5e]' },
  ];

  readonly chartMonths: readonly string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
}
