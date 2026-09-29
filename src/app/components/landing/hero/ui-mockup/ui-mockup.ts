import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface NavItem {
  readonly id: string;
  readonly labelKey: string;
  readonly active?: boolean;
}

export interface MetricCard {
  readonly titleKey: string;
  readonly value: string;
  readonly indicatorKey: string;
  readonly indicatorType: 'positive' | 'neutral' | 'alert';
}

export interface HealthStatusItem {
  readonly labelKey: string;
  readonly valueKey: string;
  readonly dotColor: string;
}

@Component({
  selector: 'app-ui-mockup',
  imports: [TranslatePipe],
  templateUrl: './ui-mockup.html',
  host: {
    class: 'relative block w-full text-left',
  },
})
export class UiMockup {
  readonly activeNav = signal<string>('dashboard');

  readonly navItems: readonly NavItem[] = [
    { id: 'dashboard', labelKey: 'HERO.UI_MOCKUP.NAV.DASHBOARD', active: true },
    { id: 'finance', labelKey: 'HERO.UI_MOCKUP.NAV.FINANCE' },
    { id: 'sales', labelKey: 'HERO.UI_MOCKUP.NAV.SALES' },
    { id: 'purchasing', labelKey: 'HERO.UI_MOCKUP.NAV.PURCHASING' },
    { id: 'inventory', labelKey: 'HERO.UI_MOCKUP.NAV.INVENTORY' },
    { id: 'production', labelKey: 'HERO.UI_MOCKUP.NAV.PRODUCTION' },
    { id: 'project', labelKey: 'HERO.UI_MOCKUP.NAV.PROJECT' },
    { id: 'analytics', labelKey: 'HERO.UI_MOCKUP.NAV.ANALYTICS' },
  ];

  readonly kpiMetrics: readonly MetricCard[] = [
    {
      titleKey: 'HERO.UI_MOCKUP.METRICS.REVENUE',
      value: 'Rp15,8M',
      indicatorKey: '8,4%',
      indicatorType: 'positive',
    },
    {
      titleKey: 'HERO.UI_MOCKUP.METRICS.GROSS_PROFIT',
      value: 'Rp3,1M',
      indicatorKey: '5,2%',
      indicatorType: 'positive',
    },
    {
      titleKey: 'HERO.UI_MOCKUP.METRICS.INVENTORY_VALUE',
      value: 'Rp18,6M',
      indicatorKey: 'HERO.UI_MOCKUP.METRICS.LOCATIONS_COUNT',
      indicatorType: 'neutral',
    },
    {
      titleKey: 'HERO.UI_MOCKUP.METRICS.AR_OUTSTANDING',
      value: 'Rp4,8M',
      indicatorKey: 'HERO.UI_MOCKUP.METRICS.OVERDUE_COUNT',
      indicatorType: 'alert',
    },
  ];

  readonly healthStatuses: readonly HealthStatusItem[] = [
    {
      labelKey: 'HERO.UI_MOCKUP.HEALTH.CASH_POSITION',
      valueKey: 'HERO.UI_MOCKUP.HEALTH.CASH_POSITION_VALUE',
      dotColor: 'bg-[#1d44eb]',
    },
    {
      labelKey: 'HERO.UI_MOCKUP.HEALTH.ORDER_FULFILMENT',
      valueKey: '96%',
      dotColor: 'bg-[#10b981]',
    },
    {
      labelKey: 'HERO.UI_MOCKUP.HEALTH.INVENTORY_ALERT',
      valueKey: 'HERO.UI_MOCKUP.HEALTH.INVENTORY_ALERT_VALUE',
      dotColor: 'bg-[#f43f5e]',
    },
  ];

  readonly chartMonthKeys: readonly string[] = [
    'HERO.UI_MOCKUP.MONTHS.JAN',
    'HERO.UI_MOCKUP.MONTHS.FEB',
    'HERO.UI_MOCKUP.MONTHS.MAR',
    'HERO.UI_MOCKUP.MONTHS.APR',
    'HERO.UI_MOCKUP.MONTHS.MAY',
    'HERO.UI_MOCKUP.MONTHS.JUN',
    'HERO.UI_MOCKUP.MONTHS.JUL',
  ];
}
