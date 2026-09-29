import { Component, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export type PeriodId = 'month' | 'quarter' | 'year';

export interface PeriodOption {
  readonly id: PeriodId;
  readonly labelKey: string;
}

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

export interface PeriodDataSet {
  readonly metrics: readonly MetricCard[];
  readonly chartPoints: readonly ChartDataPoint[];
  readonly healthScore: number;
  readonly healthStatuses: readonly HealthStatusItem[];
}

@Component({
  selector: 'app-ui-mockup',
  imports: [TranslatePipe],
  templateUrl: './ui-mockup.html',
  host: {
    class: 'relative block w-full text-left',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closePeriodMenu()',
  },
})
export class UiMockup {
  readonly activeNav = signal<string>('dashboard');
  readonly selectedPeriod = signal<PeriodId>('month');
  readonly isPeriodMenuOpen = signal<boolean>(false);
  readonly isTransitioning = signal<boolean>(false);
  readonly hoveredIndex = signal<number | null>(null);

  readonly periodOptions: readonly PeriodOption[] = [
    { id: 'month', labelKey: 'HERO.UI_MOCKUP.PERIOD_CURRENT_MONTH' },
    { id: 'quarter', labelKey: 'HERO.UI_MOCKUP.PERIOD_THIS_QUARTER' },
    { id: 'year', labelKey: 'HERO.UI_MOCKUP.PERIOD_THIS_YEAR' },
  ];

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

  private readonly periodData: Record<PeriodId, PeriodDataSet> = {
    month: {
      metrics: [
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
      ],
      chartPoints: [
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
      ],
      healthScore: 92,
      healthStatuses: [
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
      ],
    },
    quarter: {
      metrics: [
        {
          titleKey: 'HERO.UI_MOCKUP.METRICS.REVENUE',
          value: 'Rp48,2M',
          indicatorKey: '12,4%',
          indicatorType: 'positive',
        },
        {
          titleKey: 'HERO.UI_MOCKUP.METRICS.GROSS_PROFIT',
          value: 'Rp9,8M',
          indicatorKey: '8,7%',
          indicatorType: 'positive',
        },
        {
          titleKey: 'HERO.UI_MOCKUP.METRICS.INVENTORY_VALUE',
          value: 'Rp19,4M',
          indicatorKey: 'HERO.UI_MOCKUP.METRICS.LOCATIONS_COUNT',
          indicatorType: 'neutral',
        },
        {
          titleKey: 'HERO.UI_MOCKUP.METRICS.AR_OUTSTANDING',
          value: 'Rp3,6M',
          indicatorKey: 'HERO.UI_MOCKUP.METRICS.OVERDUE_COUNT',
          indicatorType: 'alert',
        },
      ],
      chartPoints: [
        {
          monthKey: 'HERO.UI_MOCKUP.WEEKS.W1',
          x: 10,
          y: 88,
          revenue: 'Rp5,8M',
          profit: 'Rp1,2M',
          growth: '+5.1%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.WEEKS.W2',
          x: 90,
          y: 76,
          revenue: 'Rp6,9M',
          profit: 'Rp1,4M',
          growth: '+6.8%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.WEEKS.W3',
          x: 170,
          y: 68,
          revenue: 'Rp7,5M',
          profit: 'Rp1,5M',
          growth: '+7.2%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.WEEKS.W4',
          x: 250,
          y: 52,
          revenue: 'Rp8,8M',
          profit: 'Rp1,8M',
          growth: '+9.4%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.WEEKS.W5',
          x: 330,
          y: 44,
          revenue: 'Rp9,4M',
          profit: 'Rp1,9M',
          growth: '+10.1%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.WEEKS.W6',
          x: 415,
          y: 28,
          revenue: 'Rp11,2M',
          profit: 'Rp2,3M',
          growth: '+12.5%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.WEEKS.W7',
          x: 490,
          y: 15,
          revenue: 'Rp12,8M',
          profit: 'Rp2,6M',
          growth: '+15.2%',
        },
      ],
      healthScore: 95,
      healthStatuses: [
        {
          labelKey: 'HERO.UI_MOCKUP.HEALTH.CASH_POSITION',
          valueKey: 'HERO.UI_MOCKUP.HEALTH.CASH_POSITION_VALUE',
          dotColor: 'bg-[#1d44eb]',
        },
        {
          labelKey: 'HERO.UI_MOCKUP.HEALTH.ORDER_FULFILMENT',
          valueKey: '98%',
          dotColor: 'bg-[#10b981]',
        },
        {
          labelKey: 'HERO.UI_MOCKUP.HEALTH.INVENTORY_ALERT',
          valueKey: 'HERO.UI_MOCKUP.HEALTH.INVENTORY_ALERT_VALUE_QTR',
          dotColor: 'bg-[#f43f5e]',
        },
      ],
    },
    year: {
      metrics: [
        {
          titleKey: 'HERO.UI_MOCKUP.METRICS.REVENUE',
          value: 'Rp184,5M',
          indicatorKey: '18,6%',
          indicatorType: 'positive',
        },
        {
          titleKey: 'HERO.UI_MOCKUP.METRICS.GROSS_PROFIT',
          value: 'Rp38,2M',
          indicatorKey: '15,4%',
          indicatorType: 'positive',
        },
        {
          titleKey: 'HERO.UI_MOCKUP.METRICS.INVENTORY_VALUE',
          value: 'Rp21,8M',
          indicatorKey: 'HERO.UI_MOCKUP.METRICS.LOCATIONS_COUNT',
          indicatorType: 'neutral',
        },
        {
          titleKey: 'HERO.UI_MOCKUP.METRICS.AR_OUTSTANDING',
          value: 'Rp2,1M',
          indicatorKey: 'HERO.UI_MOCKUP.METRICS.OVERDUE_COUNT',
          indicatorType: 'neutral',
        },
      ],
      chartPoints: [
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS.JAN',
          x: 10,
          y: 98,
          revenue: 'Rp22,4M',
          profit: 'Rp4,6M',
          growth: '+8.2%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS.FEB',
          x: 90,
          y: 85,
          revenue: 'Rp24,8M',
          profit: 'Rp5,1M',
          growth: '+10.5%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS.MAR',
          x: 170,
          y: 70,
          revenue: 'Rp27,6M',
          profit: 'Rp5,7M',
          growth: '+12.1%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS.APR',
          x: 250,
          y: 58,
          revenue: 'Rp30,2M',
          profit: 'Rp6,2M',
          growth: '+13.8%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS.MAY',
          x: 330,
          y: 42,
          revenue: 'Rp33,5M',
          profit: 'Rp6,9M',
          growth: '+15.4%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS.JUN',
          x: 415,
          y: 22,
          revenue: 'Rp36,8M',
          profit: 'Rp7,6M',
          growth: '+17.0%',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS.JUL',
          x: 490,
          y: 10,
          revenue: 'Rp41,2M',
          profit: 'Rp8,5M',
          growth: '+19.5%',
        },
      ],
      healthScore: 98,
      healthStatuses: [
        {
          labelKey: 'HERO.UI_MOCKUP.HEALTH.CASH_POSITION',
          valueKey: 'HERO.UI_MOCKUP.HEALTH.CASH_POSITION_VALUE',
          dotColor: 'bg-[#1d44eb]',
        },
        {
          labelKey: 'HERO.UI_MOCKUP.HEALTH.ORDER_FULFILMENT',
          valueKey: '99%',
          dotColor: 'bg-[#10b981]',
        },
        {
          labelKey: 'HERO.UI_MOCKUP.HEALTH.INVENTORY_ALERT',
          valueKey: 'HERO.UI_MOCKUP.HEALTH.INVENTORY_ALERT_VALUE_YR',
          dotColor: 'bg-[#f43f5e]',
        },
      ],
    },
  };

  readonly currentPeriodOption = computed<PeriodOption>(() => {
    return this.periodOptions.find((p) => p.id === this.selectedPeriod()) ?? this.periodOptions[0];
  });

  readonly currentMetrics = computed<readonly MetricCard[]>(
    () => this.periodData[this.selectedPeriod()].metrics
  );

  readonly currentChartPoints = computed<readonly ChartDataPoint[]>(
    () => this.periodData[this.selectedPeriod()].chartPoints
  );

  readonly currentHealthScore = computed<number>(
    () => this.periodData[this.selectedPeriod()].healthScore
  );

  readonly currentHealthStatuses = computed<readonly HealthStatusItem[]>(
    () => this.periodData[this.selectedPeriod()].healthStatuses
  );

  readonly gaugeDashOffset = computed<number>(() => {
    const score = this.currentHealthScore();
    return Number((188.5 * (1 - score / 100)).toFixed(2));
  });

  readonly chartPath = computed<string>(() => {
    return this.calculateCatmullRomSpline(this.currentChartPoints());
  });

  readonly chartAreaPath = computed<string>(() => {
    const pts = this.currentChartPoints();
    if (pts.length === 0) return '';
    const line = this.calculateCatmullRomSpline(pts);
    const firstX = pts[0].x;
    const lastX = pts[pts.length - 1].x;
    return `${line} L ${lastX},120 L ${firstX},120 Z`;
  });

  readonly activePoint = computed<ChartDataPoint | null>(() => {
    const idx = this.hoveredIndex();
    const pts = this.currentChartPoints();
    if (idx === null || idx < 0 || idx >= pts.length) {
      return null;
    }
    return pts[idx];
  });

  readonly tooltipLeftPercent = computed<number>(() => {
    const pt = this.activePoint();
    if (!pt) return 50;
    const rawPercent = (pt.x / 500) * 100;
    // Clamp between 10% and 90% to avoid edge overflow
    return Math.max(10, Math.min(90, rawPercent));
  });

  get kpiMetrics(): readonly MetricCard[] {
    return this.currentMetrics();
  }

  get healthStatuses(): readonly HealthStatusItem[] {
    return this.currentHealthStatuses();
  }

  get chartPoints(): readonly ChartDataPoint[] {
    return this.currentChartPoints();
  }

  togglePeriodMenu(event?: MouseEvent): void {
    event?.stopPropagation();
    this.isPeriodMenuOpen.update((open) => !open);
  }

  closePeriodMenu(): void {
    this.isPeriodMenuOpen.set(false);
  }

  selectPeriod(id: PeriodId): void {
    if (this.selectedPeriod() === id) {
      this.closePeriodMenu();
      return;
    }
    this.isTransitioning.set(true);
    this.selectedPeriod.set(id);
    this.hoveredIndex.set(null);
    this.closePeriodMenu();
    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 250);
  }

  onMenuKeyDown(event: KeyboardEvent): void {
    const currentIndex = this.periodOptions.findIndex((p) => p.id === this.selectedPeriod());
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % this.periodOptions.length;
      this.selectPeriod(this.periodOptions[nextIndex].id);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + this.periodOptions.length) % this.periodOptions.length;
      this.selectPeriod(this.periodOptions[prevIndex].id);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.selectPeriod(this.periodOptions[0].id);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.selectPeriod(this.periodOptions[this.periodOptions.length - 1].id);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      this.closePeriodMenu();
    }
  }

  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (this.isPeriodMenuOpen() && !target?.closest('.period-dropdown-container')) {
      this.closePeriodMenu();
    }
  }

  onPointHover(index: number): void {
    this.hoveredIndex.set(index);
  }

  onPointLeave(): void {
    this.hoveredIndex.set(null);
  }

  private calculateCatmullRomSpline(points: readonly { x: number; y: number }[]): string {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

    let path = `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`;
    const tension = 0.2;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i > 0 ? i - 1 : i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }

    return path;
  }
}
