import { Component, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface NavMenuItem {
  readonly id: string;
  readonly labelKey: string;
  readonly active?: boolean;
}

export interface HighlightItem {
  readonly labelKey: string;
  readonly value?: string;
  readonly valueKey?: string;
  readonly valueParams?: Record<string, unknown>;
}

export interface MockAlertItem {
  readonly id: string;
  readonly type: 'danger' | 'warning' | 'info';
  readonly titleKey: string;
  readonly timeKey: string;
}

export interface ChartDot {
  readonly cx: number;
  readonly cy: number;
}

export interface ChartPointData {
  readonly monthKey: string;
  readonly x: number;
  readonly xPercent: number;
  readonly revY: number;
  readonly orderY: number;
  readonly revenue: string;
  readonly salesOrders: string;
}

export interface MonthDashboardData {
  readonly monthKey: string;
  readonly year: number;
  readonly receivables: {
    readonly total: string;
    readonly overdue: string;
  };
  readonly currentMonth: {
    readonly due: string;
    readonly progressPercent: number;
  };
  readonly sales: {
    readonly orders: string;
    readonly growthRate: string;
  };
  readonly liquidity: {
    readonly balance: string;
    readonly projected: string;
  };
  readonly chartRevenuePoints: string;
  readonly chartSalesOrderPoints: string;
  readonly chartRevenueDots: readonly ChartDot[];
  readonly chartPointsData: readonly ChartPointData[];
  readonly highlightsData: {
    readonly outstandingOrders: string;
    readonly opexBudget: string;
    readonly cashCoverageMonths: string;
    readonly productionPlan: string;
    readonly ordersAtRiskCount: number;
  };
}

const BASE_CHART_MONTHS: readonly ChartPointData[] = [
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.OCTOBER',
    x: 60,
    xPercent: 11.11,
    revY: 98,
    orderY: 107,
    revenue: 'Rp 1,730,000,000.-',
    salesOrders: 'Rp 860,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.NOVEMBER',
    x: 104,
    xPercent: 19.26,
    revY: 91,
    orderY: 102,
    revenue: 'Rp 2,400,000,000.-',
    salesOrders: 'Rp 1,350,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.DECEMBER',
    x: 148,
    xPercent: 27.41,
    revY: 81,
    orderY: 94,
    revenue: 'Rp 3,360,000,000.-',
    salesOrders: 'Rp 2,100,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JANUARY',
    x: 192,
    xPercent: 35.56,
    revY: 93,
    orderY: 103,
    revenue: 'Rp 2,210,000,000.-',
    salesOrders: 'Rp 1,250,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.FEBRUARY',
    x: 236,
    xPercent: 43.7,
    revY: 75,
    orderY: 88,
    revenue: 'Rp 3,940,000,000.-',
    salesOrders: 'Rp 2,690,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.MARCH',
    x: 280,
    xPercent: 51.85,
    revY: 69,
    orderY: 78,
    revenue: 'Rp 4,520,000,000.-',
    salesOrders: 'Rp 3,650,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.APRIL',
    x: 324,
    xPercent: 60.0,
    revY: 82,
    orderY: 92,
    revenue: 'Rp 3,270,000,000.-',
    salesOrders: 'Rp 2,310,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.MAY',
    x: 368,
    xPercent: 68.15,
    revY: 62,
    orderY: 75,
    revenue: 'Rp 5,190,000,000.-',
    salesOrders: 'Rp 3,940,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JUNE',
    x: 412,
    xPercent: 76.3,
    revY: 72,
    orderY: 88,
    revenue: 'Rp 4,230,000,000.-',
    salesOrders: 'Rp 2,690,000,000.-',
  },
];

@Component({
  selector: 'app-ui-mockup',
  imports: [TranslatePipe],
  templateUrl: './ui-mockup.html',
  host: {
    class: 'relative block w-full text-left font-dm-sans',
    '(document:click)': 'onDocumentClick()',
    '(document:keydown.escape)': 'closeAllDropdowns()',
  },
})
export class UiMockup {
  readonly monthDatasets: readonly MonthDashboardData[] = [
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JULY',
      year: 2026,
      receivables: {
        total: 'Rp 7,920,000,000.-',
        overdue: 'Rp 850,000,000.-',
      },
      currentMonth: {
        due: 'Rp 1,650,000,000.-',
        progressPercent: 46,
      },
      sales: {
        orders: 'Rp 4,900,000,000.-',
        growthRate: '+8.2%',
      },
      liquidity: {
        balance: 'Rp 5,840,000,000.-',
        projected: 'Rp 4,700,000,000.-',
      },
      chartRevenuePoints:
        '60,98 104,91 148,81 192,93 236,75 280,69 324,82 368,62 412,72 456,48 500,62',
      chartSalesOrderPoints:
        '60,107 104,102 148,94 192,103 236,88 280,78 324,92 368,75 412,88 456,60 500,74',
      chartRevenueDots: [
        { cx: 148, cy: 81 },
        { cx: 192, cy: 93 },
        { cx: 236, cy: 75 },
        { cx: 280, cy: 69 },
        { cx: 324, cy: 82 },
        { cx: 368, cy: 62 },
        { cx: 412, cy: 72 },
        { cx: 456, cy: 48 },
      ],
      chartPointsData: [
        ...BASE_CHART_MONTHS,
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JULY',
          x: 456,
          xPercent: 84.44,
          revY: 48,
          orderY: 60,
          revenue: 'Rp 6,540,000,000.-',
          salesOrders: 'Rp 5,380,000,000.-',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.AUGUST',
          x: 500,
          xPercent: 92.59,
          revY: 62,
          orderY: 74,
          revenue: 'Rp 5,190,000,000.-',
          salesOrders: 'Rp 4,040,000,000.-',
        },
      ],
      highlightsData: {
        outstandingOrders: 'Rp 2,750,000,000.-',
        opexBudget: 'Rp 2,450,000,000.-',
        cashCoverageMonths: '2.1',
        productionPlan: '11,200 (76.8%)',
        ordersAtRiskCount: 3,
      },
    },
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.AUGUST',
      year: 2026,
      receivables: {
        total: 'Rp 8,150,000,000.-',
        overdue: 'Rp 980,000,000.-',
      },
      currentMonth: {
        due: 'Rp 1,890,000,000.-',
        progressPercent: 52,
      },
      sales: {
        orders: 'Rp 5,300,000,000.-',
        growthRate: '+14.5%',
      },
      liquidity: {
        balance: 'Rp 6,250,000,000.-',
        projected: 'Rp 4,950,000,000.-',
      },
      chartRevenuePoints:
        '60,98 104,91 148,81 192,93 236,75 280,69 324,82 368,62 412,72 456,42 500,58',
      chartSalesOrderPoints:
        '60,107 104,102 148,94 192,103 236,88 280,78 324,92 368,75 412,88 456,56 500,70',
      chartRevenueDots: [
        { cx: 148, cy: 81 },
        { cx: 192, cy: 93 },
        { cx: 236, cy: 75 },
        { cx: 280, cy: 69 },
        { cx: 324, cy: 82 },
        { cx: 368, cy: 62 },
        { cx: 412, cy: 72 },
        { cx: 456, cy: 42 },
      ],
      chartPointsData: [
        ...BASE_CHART_MONTHS,
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JULY',
          x: 456,
          xPercent: 84.44,
          revY: 42,
          orderY: 56,
          revenue: 'Rp 7,120,000,000.-',
          salesOrders: 'Rp 5,770,000,000.-',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.AUGUST',
          x: 500,
          xPercent: 92.59,
          revY: 58,
          orderY: 70,
          revenue: 'Rp 5,580,000,000.-',
          salesOrders: 'Rp 4,420,000,000.-',
        },
      ],
      highlightsData: {
        outstandingOrders: 'Rp 2,980,000,000.-',
        opexBudget: 'Rp 2,620,000,000.-',
        cashCoverageMonths: '2.2',
        productionPlan: '11,900 (78.5%)',
        ordersAtRiskCount: 4,
      },
    },
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.SEPTEMBER',
      year: 2026,
      receivables: {
        total: 'Rp 8,450,000,000.-',
        overdue: 'Rp 1,100,000,000.-',
      },
      currentMonth: {
        due: 'Rp 2,100,000,000.-',
        progressPercent: 58,
      },
      sales: {
        orders: 'Rp 5,800,000,000.-',
        growthRate: '+18.4%',
      },
      liquidity: {
        balance: 'Rp 6,720,000,000.-',
        projected: 'Rp 5,150,000,000.-',
      },
      chartRevenuePoints:
        '60,98 104,91 148,81 192,93 236,75 280,69 324,82 368,62 412,72 456,38 500,54',
      chartSalesOrderPoints:
        '60,107 104,102 148,94 192,103 236,88 280,78 324,92 368,75 412,88 456,53 500,66',
      chartRevenueDots: [
        { cx: 148, cy: 81 },
        { cx: 192, cy: 93 },
        { cx: 236, cy: 75 },
        { cx: 280, cy: 69 },
        { cx: 324, cy: 82 },
        { cx: 368, cy: 62 },
        { cx: 412, cy: 72 },
        { cx: 456, cy: 38 },
      ],
      chartPointsData: [
        ...BASE_CHART_MONTHS,
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JULY',
          x: 456,
          xPercent: 84.44,
          revY: 38,
          orderY: 53,
          revenue: 'Rp 7,500,000,000.-',
          salesOrders: 'Rp 6,060,000,000.-',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.AUGUST',
          x: 500,
          xPercent: 92.59,
          revY: 54,
          orderY: 66,
          revenue: 'Rp 5,960,000,000.-',
          salesOrders: 'Rp 4,810,000,000.-',
        },
      ],
      highlightsData: {
        outstandingOrders: 'Rp 3,250,000,000.-',
        opexBudget: 'Rp 2,800,000,000.-',
        cashCoverageMonths: '2.4',
        productionPlan: '12,500 (80.4%)',
        ordersAtRiskCount: 5,
      },
    },
  ];

  readonly selectedMonthIndex = signal<number>(2); // Defaults to September (index 2)

  readonly currentData = computed(
    () => this.monthDatasets[this.selectedMonthIndex()],
  );

  readonly currentMonthKey = computed(() => this.currentData().monthKey);

  readonly hoveredMonthIndex = signal<number | null>(null);

  readonly hoveredChartPoint = computed(() => {
    const idx = this.hoveredMonthIndex();
    if (idx === null) return null;
    return this.currentData().chartPointsData[idx] ?? null;
  });

  setHoveredMonth(index: number): void {
    this.hoveredMonthIndex.set(index);
  }

  clearHoveredMonth(): void {
    this.hoveredMonthIndex.set(null);
  }

  readonly activeMobileTab = signal<'chart' | 'highlights'>('chart');

  setActiveMobileTab(tab: 'chart' | 'highlights'): void {
    this.activeMobileTab.set(tab);
  }

  readonly isNotificationsOpen = signal<boolean>(false);
  readonly unreadCount = signal<number>(3);
  readonly isProfileOpen = signal<boolean>(false);

  readonly alerts: readonly MockAlertItem[] = [
    {
      id: '1',
      type: 'danger',
      titleKey: 'HERO.UI_MOCKUP.NOTIFICATIONS.ALERT_1_TITLE',
      timeKey: 'HERO.UI_MOCKUP.NOTIFICATIONS.ALERT_1_TIME',
    },
    {
      id: '2',
      type: 'warning',
      titleKey: 'HERO.UI_MOCKUP.NOTIFICATIONS.ALERT_2_TITLE',
      timeKey: 'HERO.UI_MOCKUP.NOTIFICATIONS.ALERT_2_TIME',
    },
    {
      id: '3',
      type: 'info',
      titleKey: 'HERO.UI_MOCKUP.NOTIFICATIONS.ALERT_3_TITLE',
      timeKey: 'HERO.UI_MOCKUP.NOTIFICATIONS.ALERT_3_TIME',
    },
  ];

  prevMonth(): void {
    this.selectedMonthIndex.update(
      (prev) => (prev - 1 + this.monthDatasets.length) % this.monthDatasets.length,
    );
  }

  nextMonth(): void {
    this.selectedMonthIndex.update(
      (prev) => (prev + 1) % this.monthDatasets.length,
    );
  }

  toggleNotifications(event?: Event): void {
    event?.stopPropagation();
    const nextState = !this.isNotificationsOpen();
    this.closeAllDropdowns();
    this.isNotificationsOpen.set(nextState);
  }

  markAllAsRead(event?: Event): void {
    event?.stopPropagation();
    this.unreadCount.set(0);
  }

  toggleProfile(event?: Event): void {
    event?.stopPropagation();
    const nextState = !this.isProfileOpen();
    this.closeAllDropdowns();
    this.isProfileOpen.set(nextState);
  }

  closeAllDropdowns(): void {
    this.isNotificationsOpen.set(false);
    this.isProfileOpen.set(false);
  }

  onDocumentClick(): void {
    this.closeAllDropdowns();
  }

  readonly navItems: readonly NavMenuItem[] = [
    { id: 'dashboard', labelKey: 'HERO.UI_MOCKUP.NAV.DASHBOARD', active: true },
    { id: 'procurement', labelKey: 'HERO.UI_MOCKUP.NAV.PROCUREMENT' },
    { id: 'service', labelKey: 'HERO.UI_MOCKUP.NAV.SERVICE' },
    { id: 'inventory', labelKey: 'HERO.UI_MOCKUP.NAV.INVENTORY' },
    { id: 'mfg-planning', labelKey: 'HERO.UI_MOCKUP.NAV.MFG_PLANNING' },
    { id: 'manufacturing', labelKey: 'HERO.UI_MOCKUP.NAV.MANUFACTURING' },
    { id: 'sales', labelKey: 'HERO.UI_MOCKUP.NAV.SALES' },
    { id: 'gl', labelKey: 'HERO.UI_MOCKUP.NAV.GL' },
    { id: 'ap', labelKey: 'HERO.UI_MOCKUP.NAV.AP' },
    { id: 'ar', labelKey: 'HERO.UI_MOCKUP.NAV.AR' },
    { id: 'cash-bank', labelKey: 'HERO.UI_MOCKUP.NAV.CASH_BANK' },
    { id: 'process', labelKey: 'HERO.UI_MOCKUP.NAV.PROCESS' },
    { id: 'report', labelKey: 'HERO.UI_MOCKUP.NAV.REPORT' },
    { id: 'static-data', labelKey: 'HERO.UI_MOCKUP.NAV.STATIC_DATA' },
    { id: 'miscellaneous', labelKey: 'HERO.UI_MOCKUP.NAV.MISCELLANEOUS' },
    { id: 'maintenance', labelKey: 'HERO.UI_MOCKUP.NAV.MAINTENANCE' },
    { id: 'setting-fav', labelKey: 'HERO.UI_MOCKUP.NAV.SETTING_FAV' },
    { id: 'upload-report', labelKey: 'HERO.UI_MOCKUP.NAV.UPLOAD_REPORT' },
    { id: 'manual-book', labelKey: 'HERO.UI_MOCKUP.NAV.MANUAL_BOOK' },
  ];

  readonly highlights = computed<readonly HighlightItem[]>(() => {
    const data = this.currentData().highlightsData;
    return [
      {
        labelKey: 'HERO.UI_MOCKUP.HIGHLIGHTS.OUTSTANDING_ORDERS',
        value: data.outstandingOrders,
      },
      {
        labelKey: 'HERO.UI_MOCKUP.HIGHLIGHTS.OPEX_BUDGET',
        value: data.opexBudget,
      },
      {
        labelKey: 'HERO.UI_MOCKUP.HIGHLIGHTS.CASH_COVERAGE',
        valueKey: 'HERO.UI_MOCKUP.HIGHLIGHTS.MONTHS_VALUE',
        valueParams: { count: data.cashCoverageMonths },
      },
      {
        labelKey: 'HERO.UI_MOCKUP.HIGHLIGHTS.PRODUCTION_PLAN',
        value: data.productionPlan,
      },
      {
        labelKey: 'HERO.UI_MOCKUP.HIGHLIGHTS.ORDERS_AT_RISK',
        valueKey: 'HERO.UI_MOCKUP.HIGHLIGHTS.ORDERS_VALUE',
        valueParams: { count: data.ordersAtRiskCount },
      },
    ];
  });
}
