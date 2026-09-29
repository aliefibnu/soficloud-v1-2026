import { Component, computed, signal } from '@angular/core';
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

export interface ChartDataPoint {
  readonly monthKey: string;
  readonly x: number;
  readonly y: number;
  readonly revenue: string;
  readonly profit: string;
  readonly growth: string;
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
  readonly hoveredIndex = signal<number | null>(null);

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

  readonly chartPoints: readonly ChartDataPoint[] = [
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS.JAN',
      x: 10,
      y: 95,
      revenue: 'Rp8,4M',
      profit: 'Rp1,6M',
      growth: '+4.2%',
    },
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS.FEB',
      x: 90,
      y: 80,
      revenue: 'Rp9,8M',
      profit: 'Rp1,9M',
      growth: '+6.1%',
    },
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS.MAR',
      x: 170,
      y: 82,
      revenue: 'Rp10,5M',
      profit: 'Rp2,1M',
      growth: '+5.5%',
    },
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS.APR',
      x: 250,
      y: 66,
      revenue: 'Rp12,2M',
      profit: 'Rp2,4M',
      growth: '+8.0%',
    },
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS.MAY',
      x: 330,
      y: 74,
      revenue: 'Rp11,6M',
      profit: 'Rp2,3M',
      growth: '+7.4%',
    },
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS.JUN',
      x: 415,
      y: 26,
      revenue: 'Rp14,5M',
      profit: 'Rp2,9M',
      growth: '+11.2%',
    },
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS.JUL',
      x: 490,
      y: 12,
      revenue: 'Rp15,8M',
      profit: 'Rp3,1M',
      growth: '+14.8%',
    },
  ];

  readonly chartMonthKeys: readonly string[] = this.chartPoints.map((p) => p.monthKey);

  readonly activePoint = computed<ChartDataPoint | null>(() => {
    const idx = this.hoveredIndex();
    if (idx === null || idx < 0 || idx >= this.chartPoints.length) {
      return null;
    }
    return this.chartPoints[idx];
  });

  readonly tooltipLeftPercent = computed<number>(() => {
    const pt = this.activePoint();
    if (!pt) return 50;
    const rawPercent = (pt.x / 500) * 100;
    // Clamp between 10% and 90% to avoid edge overflow
    return Math.max(10, Math.min(90, rawPercent));
  });

  onPointHover(index: number): void {
    this.hoveredIndex.set(index);
  }

  onPointLeave(): void {
    this.hoveredIndex.set(null);
  }
}
