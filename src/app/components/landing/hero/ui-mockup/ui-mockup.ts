import { Component, computed, signal } from '@angular/core';

export interface NavMenuItem {
  readonly id: string;
  readonly label: string;
  readonly active?: boolean;
}

export interface HighlightItem {
  readonly label: string;
  readonly value: string;
}

export interface MockAlertItem {
  readonly id: string;
  readonly type: 'danger' | 'warning' | 'info';
  readonly title: string;
  readonly time: string;
}

export interface ChartDot {
  readonly cx: number;
  readonly cy: number;
}

export interface MonthDashboardData {
  readonly month: string;
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
    readonly growth: string;
  };
  readonly liquidity: {
    readonly balance: string;
    readonly projected: string;
  };
  readonly chartRevenuePoints: string;
  readonly chartSalesOrderPoints: string;
  readonly chartRevenueDots: readonly ChartDot[];
  readonly highlights: readonly HighlightItem[];
}

@Component({
  selector: 'app-ui-mockup',
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
      month: 'July',
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
        growth: '+8.2% vs Last month',
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
      highlights: [
        { label: 'Outstanding Sales Orders', value: 'Rp 2,750,000,000.-' },
        { label: 'OPEX Budget vs Actual', value: 'Rp 2,450,000,000.-' },
        { label: 'Operating Cash Coverage', value: '2.1 months' },
        { label: 'Production Plan vs Actual', value: '11,200 (76.8%)' },
        { label: 'Orders at Risk', value: '3 orders' },
      ],
    },
    {
      month: 'August',
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
        growth: '+14.5% vs Last month',
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
      highlights: [
        { label: 'Outstanding Sales Orders', value: 'Rp 2,980,000,000.-' },
        { label: 'OPEX Budget vs Actual', value: 'Rp 2,620,000,000.-' },
        { label: 'Operating Cash Coverage', value: '2.2 months' },
        { label: 'Production Plan vs Actual', value: '11,900 (78.5%)' },
        { label: 'Orders at Risk', value: '4 orders' },
      ],
    },
    {
      month: 'September',
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
        growth: '+18.4% vs Last month',
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
      highlights: [
        { label: 'Outstanding Sales Orders', value: 'Rp 3,250,000,000.-' },
        { label: 'OPEX Budget vs Actual', value: 'Rp 2,800,000,000.-' },
        { label: 'Operating Cash Coverage', value: '2.4 months' },
        { label: 'Production Plan vs Actual', value: '12,500 (80.4%)' },
        { label: 'Orders at Risk', value: '5 orders' },
      ],
    },
  ];

  readonly selectedMonthIndex = signal<number>(2); // Defaults to September (index 2)

  readonly currentData = computed(
    () => this.monthDatasets[this.selectedMonthIndex()],
  );

  readonly currentMonthName = computed(() => this.currentData().month);

  readonly isNotificationsOpen = signal<boolean>(false);
  readonly unreadCount = signal<number>(3);
  readonly isProfileOpen = signal<boolean>(false);

  readonly alerts: readonly MockAlertItem[] = [
    {
      id: '1',
      type: 'danger',
      title: '5 Orders at Risk of shipping delay',
      time: '10m ago',
    },
    {
      id: '2',
      type: 'warning',
      title: 'OPEX Budget reached 80.4% threshold',
      time: '1h ago',
    },
    {
      id: '3',
      type: 'info',
      title: 'Rp 2.1B Due Invoices awaiting confirmation',
      time: '3h ago',
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
    { id: 'dashboard', label: 'Dashboard', active: true },
    { id: 'procurement', label: 'Procurement' },
    { id: 'service', label: 'Service' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'mfg-planning', label: 'Manufacturing Planning' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'sales', label: 'Sales' },
    { id: 'gl', label: 'General Ledger' },
    { id: 'ap', label: 'Account Payable' },
    { id: 'ar', label: 'Account Receivable' },
    { id: 'cash-bank', label: 'Cash & Bank' },
    { id: 'process', label: 'Process' },
    { id: 'report', label: 'Report' },
    { id: 'static-data', label: 'Static Data' },
    { id: 'miscellaneous', label: 'Miscellaneous' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'setting-fav', label: 'Setting Favorite Menu' },
    { id: 'upload-report', label: 'Upload Report Menu' },
    { id: 'manual-book', label: 'Manual Book' },
  ];

  readonly highlights = computed(() => this.currentData().highlights);
}
