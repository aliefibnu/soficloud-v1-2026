import { Component, computed, inject, InjectionToken, input, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export const CURRENT_DATE = new InjectionToken<Date | (() => Date)>('CURRENT_DATE', {
  providedIn: 'root',
  factory: () => () => new Date(),
});

export const CHART_X_START = 50;
export const CHART_X_END = 535;

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

export interface ChartYTick {
  readonly label: string;
  readonly textX: number;
  readonly textY: number;
  readonly lineY: number;
}

export interface ChartPointData {
  readonly monthKey: string;
  readonly shortMonthKey: string;
  readonly x: number;
  readonly xPercent: number;
  readonly rectX: number;
  readonly rectWidth: number;
  readonly revY: number;
  readonly orderY: number;
  readonly revenue: string;
  readonly salesOrders: string;
}

export interface RawMonthPoint {
  readonly monthKey: string;
  readonly shortMonthKey: string;
  readonly revenueNumber: number;
  readonly salesOrdersNumber: number;
  readonly revenue: string;
  readonly salesOrders: string;
}

export interface FloatingBudgetCardData {
  readonly opexPercent: number;
  readonly executionPercent: number;
  readonly executionBars: readonly number[];
}

export interface MonthDashboardData {
  readonly monthKey: string;
  readonly year: number;
  readonly receivables: {
    readonly total: string;
    readonly overdue: string;
    readonly bars: readonly number[];
  };
  readonly currentMonth: {
    readonly due: string;
    readonly progressPercent: number;
  };
  readonly sales: {
    readonly orders: string;
    readonly growthRate: string;
    readonly bars: readonly number[];
  };
  readonly liquidity: {
    readonly balance: string;
    readonly projected: string;
    readonly sparklinePrimaryPath: string;
    readonly sparklineSecondaryPath: string;
  };
  readonly dynamicPoints: readonly RawMonthPoint[];
  readonly highlightsData: {
    readonly outstandingOrders: string;
    readonly opexBudget: string;
    readonly cashCoverageMonths: string;
    readonly productionPlan: string;
    readonly ordersAtRiskCount: number;
  };
  readonly floatingBudget: FloatingBudgetCardData;
}

const BASE_CHART_RAW_MONTHS: readonly RawMonthPoint[] = [
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.OCTOBER',
    shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.OCT',
    revenueNumber: 1.73,
    salesOrdersNumber: 0.86,
    revenue: 'Rp 1,730,000,000.-',
    salesOrders: 'Rp 860,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.NOVEMBER',
    shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.NOV',
    revenueNumber: 2.4,
    salesOrdersNumber: 1.35,
    revenue: 'Rp 2,400,000,000.-',
    salesOrders: 'Rp 1,350,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.DECEMBER',
    shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.DEC',
    revenueNumber: 3.36,
    salesOrdersNumber: 2.1,
    revenue: 'Rp 3,360,000,000.-',
    salesOrders: 'Rp 2,100,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JANUARY',
    shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.JAN',
    revenueNumber: 2.21,
    salesOrdersNumber: 1.25,
    revenue: 'Rp 2,210,000,000.-',
    salesOrders: 'Rp 1,250,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.FEBRUARY',
    shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.FEB',
    revenueNumber: 3.94,
    salesOrdersNumber: 2.69,
    revenue: 'Rp 3,940,000,000.-',
    salesOrders: 'Rp 2,690,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.MARCH',
    shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.MAR',
    revenueNumber: 4.52,
    salesOrdersNumber: 3.65,
    revenue: 'Rp 4,520,000,000.-',
    salesOrders: 'Rp 3,650,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.APRIL',
    shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.APR',
    revenueNumber: 3.27,
    salesOrdersNumber: 2.31,
    revenue: 'Rp 3,270,000,000.-',
    salesOrders: 'Rp 2,310,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.MAY',
    shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.MAY',
    revenueNumber: 5.19,
    salesOrdersNumber: 3.94,
    revenue: 'Rp 5,190,000,000.-',
    salesOrders: 'Rp 3,940,000,000.-',
  },
  {
    monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JUNE',
    shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.JUN',
    revenueNumber: 4.23,
    salesOrdersNumber: 2.69,
    revenue: 'Rp 4,230,000,000.-',
    salesOrders: 'Rp 2,690,000,000.-',
  },
];

@Component({
  selector: 'app-ui-mockup',
  imports: [TranslatePipe],
  templateUrl: './ui-mockup.html',
  styles: `
    .mockup-bottom-fade {
      mask-image: linear-gradient(
        to bottom,
        #000 0%,
        #000 83%,
        rgba(0, 0, 0, 0.8) 91%,
        rgba(0, 0, 0, 0.25) 97%,
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        to bottom,
        #000 0%,
        #000 83%,
        rgba(0, 0, 0, 0.8) 91%,
        rgba(0, 0, 0, 0.25) 97%,
        transparent 100%
      );
    }
  `,
  host: {
    class: 'relative block w-full text-left font-dm-sans',
    '(document:click)': 'onDocumentClick()',
    '(document:keydown.escape)': 'closeAllDropdowns()',
  },
})
export class UiMockup {
  readonly currentDateInput = input<Date | undefined>(undefined, { alias: 'currentDate' });
  private readonly injectedDate = inject(CURRENT_DATE, { optional: true });

  readonly effectiveDate = computed<Date>(() => {
    const custom = this.currentDateInput();
    if (custom) return custom;
    if (typeof this.injectedDate === 'function') return this.injectedDate();
    if (this.injectedDate instanceof Date) return this.injectedDate;
    return new Date();
  });

  readonly currentMonthIndex = computed<number>(() => {
    const d = this.effectiveDate();
    const m = d.getMonth(); // 0-indexed: 6 is July, 7 is August, 8 is September
    return Math.max(0, Math.min(2, m - 6));
  });

  private readonly userSelectedMonthIndex = signal<number | null>(null);

  readonly selectedMonthIndex = computed<number>(() => {
    const maxAllowed = this.currentMonthIndex();
    const userSelected = this.userSelectedMonthIndex();
    if (userSelected === null) return maxAllowed;
    return Math.max(0, Math.min(maxAllowed, userSelected));
  });

  readonly monthDatasets: readonly MonthDashboardData[] = [
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JULY',
      year: 2026,
      receivables: {
        total: 'Rp 7,920,000,000.-',
        overdue: 'Rp 850,000,000.-',
        bars: [30, 50, 35, 65, 45, 75],
      },
      currentMonth: {
        due: 'Rp 1,650,000,000.-',
        progressPercent: 46,
      },
      sales: {
        orders: 'Rp 4,900,000,000.-',
        growthRate: '+8.2%',
        bars: [25, 45, 35, 55, 50, 70],
      },
      liquidity: {
        balance: 'Rp 5,840,000,000.-',
        projected: 'Rp 4,700,000,000.-',
        sparklinePrimaryPath:
          'M 5,18 C 20,12 30,20 45,16 C 60,11 70,20 85,16 C 100,11 110,20 125,16 C 140,11 150,18 158,15',
        sparklineSecondaryPath:
          'M 0,20 C 15,23 25,15 40,19 C 55,24 65,15 80,20 C 95,24 105,16 120,20 C 135,24 145,16 158,20',
      },
      dynamicPoints: [
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JULY',
          shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.JUL',
          revenueNumber: 6.54,
          salesOrdersNumber: 5.38,
          revenue: 'Rp 6,540,000,000.-',
          salesOrders: 'Rp 5,380,000,000.-',
        },
      ],
      highlightsData: {
        outstandingOrders: 'Rp 2,750,000,000.-',
        opexBudget: 'Rp 2,450,000,000.-',
        cashCoverageMonths: '2.1',
        productionPlan: '11,200 (76.8%)',
        ordersAtRiskCount: 3,
      },
      floatingBudget: {
        opexPercent: 54,
        executionPercent: 88,
        executionBars: [32, 68, 48, 85],
      },
    },
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.AUGUST',
      year: 2026,
      receivables: {
        total: 'Rp 8,150,000,000.-',
        overdue: 'Rp 980,000,000.-',
        bars: [35, 60, 45, 75, 60, 88],
      },
      currentMonth: {
        due: 'Rp 1,890,000,000.-',
        progressPercent: 52,
      },
      sales: {
        orders: 'Rp 5,300,000,000.-',
        growthRate: '+14.5%',
        bars: [35, 55, 50, 70, 65, 85],
      },
      liquidity: {
        balance: 'Rp 6,250,000,000.-',
        projected: 'Rp 4,950,000,000.-',
        sparklinePrimaryPath:
          'M 5,16 C 20,10 30,18 45,14 C 60,9 70,18 85,14 C 100,9 110,18 125,14 C 140,9 150,17 158,14',
        sparklineSecondaryPath:
          'M 0,18 C 15,21 25,12 40,17 C 55,22 65,12 80,18 C 95,22 105,13 120,18 C 135,22 145,13 158,18',
      },
      dynamicPoints: [
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JULY',
          shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.JUL',
          revenueNumber: 7.12,
          salesOrdersNumber: 5.77,
          revenue: 'Rp 7,120,000,000.-',
          salesOrders: 'Rp 5,770,000,000.-',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.AUGUST',
          shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.AUG',
          revenueNumber: 5.58,
          salesOrdersNumber: 4.42,
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
      floatingBudget: {
        opexPercent: 58,
        executionPercent: 91,
        executionBars: [35, 75, 52, 92],
      },
    },
    {
      monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.SEPTEMBER',
      year: 2026,
      receivables: {
        total: 'Rp 8,450,000,000.-',
        overdue: 'Rp 1,100,000,000.-',
        bars: [40, 70, 50, 90, 70, 100],
      },
      currentMonth: {
        due: 'Rp 2,100,000,000.-',
        progressPercent: 58,
      },
      sales: {
        orders: 'Rp 5,800,000,000.-',
        growthRate: '+18.4%',
        bars: [35, 65, 55, 85, 75, 100],
      },
      liquidity: {
        balance: 'Rp 6,720,000,000.-',
        projected: 'Rp 5,150,000,000.-',
        sparklinePrimaryPath:
          'M 5,16 C 20,8 30,18 45,13 C 60,8 70,18 85,13 C 100,8 110,18 125,13 C 140,8 150,16 158,13',
        sparklineSecondaryPath:
          'M 0,18 C 15,21 25,10 40,16 C 55,22 65,10 80,17 C 95,23 105,11 120,17 C 135,22 145,11 158,18',
      },
      dynamicPoints: [
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.JULY',
          shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.JUL',
          revenueNumber: 7.5,
          salesOrdersNumber: 6.06,
          revenue: 'Rp 7,500,000,000.-',
          salesOrders: 'Rp 6,060,000,000.-',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.AUGUST',
          shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.AUG',
          revenueNumber: 5.96,
          salesOrdersNumber: 4.81,
          revenue: 'Rp 5,960,000,000.-',
          salesOrders: 'Rp 4,810,000,000.-',
        },
        {
          monthKey: 'HERO.UI_MOCKUP.MONTHS_FULL.SEPTEMBER',
          shortMonthKey: 'HERO.UI_MOCKUP.MONTHS.SEP',
          revenueNumber: 8.2,
          salesOrdersNumber: 5.8,
          revenue: 'Rp 8,200,000,000.-',
          salesOrders: 'Rp 5,800,000,000.-',
        },
      ],
      highlightsData: {
        outstandingOrders: 'Rp 3,250,000,000.-',
        opexBudget: 'Rp 2,800,000,000.-',
        cashCoverageMonths: '2.4',
        productionPlan: '12,500 (80.4%)',
        ordersAtRiskCount: 5,
      },
      floatingBudget: {
        opexPercent: 62,
        executionPercent: 94,
        executionBars: [38, 81, 57, 100],
      },
    },
  ];

  readonly currentData = computed(() => this.monthDatasets[this.selectedMonthIndex()]);

  readonly currentMonthKey = computed(() => this.currentData().monthKey);

  readonly currentRawPoints = computed<readonly RawMonthPoint[]>(() => {
    return [...BASE_CHART_RAW_MONTHS, ...this.currentData().dynamicPoints];
  });

  readonly yMax = computed<number>(() => {
    const points = this.currentRawPoints();
    const maxVal = Math.max(
      ...points.map((p) => p.revenueNumber),
      ...points.map((p) => p.salesOrdersNumber),
    );
    if (maxVal <= 8) return 8;
    return 10;
  });

  readonly yTicks = computed<readonly ChartYTick[]>(() => {
    const max = this.yMax();
    if (max === 8) {
      return [
        { label: '8 B', textX: 5, textY: 16, lineY: 12 },
        { label: '6 B', textX: 5, textY: 42, lineY: 38 },
        { label: '4 B', textX: 5, textY: 68, lineY: 64 },
        { label: '2 B', textX: 5, textY: 94, lineY: 90 },
        { label: '0', textX: 18, textY: 118, lineY: 116 },
      ];
    }
    return [
      { label: '10 B', textX: 5, textY: 16, lineY: 12 },
      { label: '8 B', textX: 5, textY: 37, lineY: 33 },
      { label: '6 B', textX: 5, textY: 58, lineY: 54 },
      { label: '4 B', textX: 5, textY: 78, lineY: 74 },
      { label: '2 B', textX: 5, textY: 99, lineY: 95 },
      { label: '0', textX: 18, textY: 118, lineY: 116 },
    ];
  });

  readonly chartPointsData = computed<readonly ChartPointData[]>(() => {
    const yMax = this.yMax();
    const rawPoints = this.currentRawPoints();
    const count = rawPoints.length;
    const chartWidth = CHART_X_END - CHART_X_START;
    const step = count > 1 ? chartWidth / (count - 1) : 0;

    return rawPoints.map((p, i) => {
      const x = Number((CHART_X_START + (count > 1 ? i * step : 0)).toFixed(1));
      const xPercent = (x / 540) * 100;
      const rectWidth = Number((count > 1 ? step : chartWidth).toFixed(1));
      const rectX = Number((x - rectWidth / 2).toFixed(1));
      const revY = Number((116 - (p.revenueNumber / yMax) * 104).toFixed(1));
      const orderY = Number((116 - (p.salesOrdersNumber / yMax) * 104).toFixed(1));
      return {
        monthKey: p.monthKey,
        shortMonthKey: p.shortMonthKey,
        x,
        xPercent,
        rectX,
        rectWidth,
        revY,
        orderY,
        revenue: p.revenue,
        salesOrders: p.salesOrders,
      };
    });
  });

  private buildSmoothPath(pts: readonly { x: number; y: number }[], tension = 0.16): string {
    const n = pts.length;
    if (n === 0) return '';
    if (n === 1) return `M ${pts[0].x},${pts[0].y}`;
    if (n === 2) return `M ${pts[0].x},${pts[0].y} L ${pts[1].x},${pts[1].y}`;

    let path = `M ${pts[0].x},${pts[0].y}`;

    for (let i = 0; i < n - 1; i++) {
      const p0 = pts[Math.max(0, i - 1)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(n - 1, i + 2)];

      const cp1x = Number((p1.x + (p2.x - p0.x) * tension).toFixed(1));
      const cp1y = Number((p1.y + (p2.y - p0.y) * tension).toFixed(1));
      const cp2x = Number((p2.x - (p3.x - p1.x) * tension).toFixed(1));
      const cp2y = Number((p2.y - (p3.y - p1.y) * tension).toFixed(1));

      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }

    return path;
  }

  readonly chartRevenuePath = computed(() =>
    this.buildSmoothPath(this.chartPointsData().map((p) => ({ x: p.x, y: p.revY }))),
  );

  readonly chartRevenueAreaPath = computed(() => {
    const pts = this.chartPointsData();
    if (pts.length === 0) return '';
    const linePath = this.chartRevenuePath();
    const lastX = pts[pts.length - 1].x;
    const firstX = pts[0].x;
    return `${linePath} L ${lastX},116 L ${firstX},116 Z`;
  });

  readonly chartSalesOrderPath = computed(() =>
    this.buildSmoothPath(this.chartPointsData().map((p) => ({ x: p.x, y: p.orderY }))),
  );

  readonly chartRevenuePoints = computed(() =>
    this.chartPointsData()
      .map((p) => `${p.x},${p.revY}`)
      .join(' '),
  );

  readonly chartSalesOrderPoints = computed(() =>
    this.chartPointsData()
      .map((p) => `${p.x},${p.orderY}`)
      .join(' '),
  );

  readonly chartRevenueDots = computed(() =>
    this.chartPointsData()
      .filter((_, i) => i >= 2)
      .map((p) => ({ cx: p.x, cy: p.revY })),
  );

  readonly hoveredMonthIndex = signal<number | null>(null);

  readonly hoveredChartPoint = computed(() => {
    const idx = this.hoveredMonthIndex();
    if (idx === null) return null;
    return this.chartPointsData()[idx] ?? null;
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
    const current = this.selectedMonthIndex();
    if (current > 0) {
      this.userSelectedMonthIndex.set(current - 1);
    }
  }

  nextMonth(): void {
    const current = this.selectedMonthIndex();
    const maxAllowed = this.currentMonthIndex();
    if (current < maxAllowed) {
      this.userSelectedMonthIndex.set(current + 1);
    }
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

  readonly donutArcBlue = computed(() => 'M 40.0,12.0 A 28,28 0 1,1 15.75,54.0');
  readonly donutArcTeal = computed(() => 'M 15.75,54.0 A 28,28 0 0,1 12.95,32.75');
  readonly donutTrackGray = computed(() => 'M 12.95,32.75 A 28,28 0 0,1 40.0,12.0');
}
