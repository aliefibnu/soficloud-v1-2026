import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { VisibilitySectionShell } from '../visibility-section-shell/visibility-section-shell';
import { ErpWindowChrome } from '../erp-window-chrome/erp-window-chrome';

export interface BalanceSheetItem {
  readonly nameKey: string;
  readonly defaultName: string;
  readonly amount: string;
}

export interface BalanceSheetCategory {
  readonly key: 'assets' | 'liabilities' | 'equity';
  readonly titleKey: string;
  readonly defaultTitle: string;
  readonly periodKey: string;
  readonly defaultPeriod: string;
  readonly total: string;
  readonly iconType: 'building' | 'bank' | 'equity';
  readonly items: readonly BalanceSheetItem[];
}

export interface IncomeExpenseMonth {
  readonly label: string;
  readonly x: number;
  readonly incomeY: number;
  readonly expenseY: number;
}

@Component({
  selector: 'app-financial-visibility',
  imports: [VisibilitySectionShell, ErpWindowChrome, TranslatePipe],
  templateUrl: './financial-visibility.html',
})
export class FinancialVisibility {
  readonly categories: readonly BalanceSheetCategory[] = [
    {
      key: 'assets',
      titleKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.TITLE',
      defaultTitle: 'ASSETS',
      periodKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.PERIOD',
      defaultPeriod: 'August 2026',
      total: 'Rp 2,162,866,910.38',
      iconType: 'building',
      items: [
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.CASH',
          defaultName: 'CASH',
          amount: '32,285,731.90',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.BANK',
          defaultName: 'BANK',
          amount: '83,938,838.63',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.ACCOUNT_RECEIVABLE',
          defaultName: 'ACCOUNT RECEIVABLE',
          amount: '964,016,853.90',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.OTHERS_RECEIVABLE',
          defaultName: 'OTHERS RECEIVABLE',
          amount: '251,541.00',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.PREPAID',
          defaultName: 'PREPAID',
          amount: '146,071,698.00',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.INVENTORY',
          defaultName: 'INVENTORY',
          amount: '0.00',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.FIXED_ASSET',
          defaultName: 'FIXED ASSET',
          amount: '139,575,580.37',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.INTANGIBLE_ASSETS',
          defaultName: 'INTANGIBLE ASSETS',
          amount: '791,666,666.52',
        },
      ],
    },
    {
      key: 'liabilities',
      titleKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.TITLE',
      defaultTitle: 'LIABILITIES',
      periodKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.PERIOD',
      defaultPeriod: 'August 2026',
      total: 'Rp 796,274,157.84',
      iconType: 'bank',
      items: [
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.ITEMS.ACCOUNT_PAYABLE',
          defaultName: 'ACCOUNT PAYABLE',
          amount: '0.00',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.ITEMS.EMPLOYEE_PAYABLE',
          defaultName: 'EMPLOYEE PAYABLE',
          amount: '0.00',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.ITEMS.EXPENSES_PAYABLE',
          defaultName: 'EXPENSES PAYABLE',
          amount: '291,862,297.08',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.ITEMS.TAX_PAYABLE',
          defaultName: 'TAX PAYABLE',
          amount: '50,436,636.00',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.ITEMS.LONG_TERM_PAYABLE',
          defaultName: 'LONG TERM PAYABLE',
          amount: '453,975,224.76',
        },
      ],
    },
    {
      key: 'equity',
      titleKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.EQUITY.TITLE',
      defaultTitle: 'EQUITY',
      periodKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.EQUITY.PERIOD',
      defaultPeriod: 'August 2026',
      total: 'Rp 1,427,742,140.54',
      iconType: 'equity',
      items: [
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.EQUITY.ITEMS.CAPITAL',
          defaultName: 'CAPITAL',
          amount: '745,000,000.00',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.EQUITY.ITEMS.RETAINED_EARNING',
          defaultName: 'RETAINED EARNING',
          amount: '451,972,595.79',
        },
        {
          nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.EQUITY.ITEMS.CURRENT_EARNING',
          defaultName: 'CURRENT EARNING',
          amount: '230,769,544.75',
        },
      ],
    },
  ];

  readonly incomePath =
    'M 55.0 100.0 C 63.3 103.2, 88.1 123.5, 104.6 119.3 C 121.1 115.1, 137.7 76.1, 154.2 75.0 C 170.7 73.9, 187.3 107.7, 203.8 112.5 C 220.3 117.3, 236.8 103.6, 253.3 104.0 C 269.8 104.4, 286.4 122.0, 302.9 114.8 C 319.4 107.6, 336.0 62.7, 352.5 60.8 C 369.0 58.9, 385.6 90.9, 402.1 103.5 C 418.6 116.1, 435.2 140.3, 451.7 136.3 C 468.2 132.3, 484.8 83.8, 501.3 79.5 C 517.8 75.2, 534.3 112.7, 550.8 110.3 C 567.3 107.9, 583.9 75.5, 600.4 65.3 C 616.9 55.0, 641.7 51.5, 650.0 48.8';

  readonly expensePath =
    'M 55.0 125.0 C 63.3 124.4, 88.1 121.8, 104.6 121.5 C 121.1 121.2, 137.7 122.7, 154.2 123.3 C 170.7 123.9, 187.3 128.6, 203.8 125.0 C 220.3 121.4, 236.8 104.2, 253.3 101.8 C 269.8 99.3, 286.4 109.8, 302.9 110.3 C 319.4 110.8, 336.0 112.5, 352.5 104.5 C 369.0 96.5, 385.6 61.0, 402.1 62.0 C 418.6 63.0, 435.2 103.0, 451.7 110.8 C 468.2 118.6, 484.8 110.0, 501.3 109.0 C 517.8 108.0, 534.3 104.3, 550.8 104.5 C 567.3 104.7, 583.9 108.1, 600.4 110.3 C 616.9 112.5, 641.7 116.3, 650.0 117.5';

  readonly monthlyData: readonly IncomeExpenseMonth[] = [
    { label: 'August 2025', x: 55.0, incomeY: 100.0, expenseY: 125.0 },
    { label: 'September 2025', x: 104.6, incomeY: 119.3, expenseY: 121.5 },
    { label: 'October 2025', x: 154.2, incomeY: 75.0, expenseY: 123.3 },
    { label: 'November 2025', x: 203.8, incomeY: 112.5, expenseY: 125.0 },
    { label: 'December 2025', x: 253.3, incomeY: 104.0, expenseY: 101.8 },
    { label: 'January 2026', x: 302.9, incomeY: 114.8, expenseY: 110.3 },
    { label: 'February 2026', x: 352.5, incomeY: 60.8, expenseY: 104.5 },
    { label: 'March 2026', x: 402.1, incomeY: 103.5, expenseY: 62.0 },
    { label: 'April 2026', x: 451.7, incomeY: 136.3, expenseY: 110.8 },
    { label: 'May 2026', x: 501.3, incomeY: 79.5, expenseY: 109.0 },
    { label: 'June 2026', x: 550.8, incomeY: 110.3, expenseY: 104.5 },
    { label: 'July 2026', x: 600.4, incomeY: 65.3, expenseY: 110.3 },
    { label: 'August 2026', x: 650.0, incomeY: 48.8, expenseY: 117.5 },
  ];

  readonly gridLevels = [
    { label: '600 M', y: 25 },
    { label: '500 M', y: 50 },
    { label: '400 M', y: 75 },
    { label: '300 M', y: 100 },
    { label: '200 M', y: 125 },
    { label: '100 M', y: 150 },
    { label: '0', y: 175 },
  ];
}
