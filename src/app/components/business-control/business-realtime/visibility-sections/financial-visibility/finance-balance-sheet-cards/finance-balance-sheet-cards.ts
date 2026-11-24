import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface BalanceSheetItem {
  readonly nameKey: string;
  readonly defaultName: string;
  readonly amount: string;
  readonly nameLines?: readonly string[];
  readonly amountLines?: readonly string[];
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

export const FINANCE_BALANCE_SHEET_CATEGORIES: readonly BalanceSheetCategory[] = [
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
        amount: '32,285,731.96',
      },
      {
        nameKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.BANK',
        defaultName: 'BANK',
        amount: '83,998,838.63',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.ACCOUNT_RECEIVABLE',
        defaultName: 'ACCOUNT RECEIVABLE',
        amount: '964,016,853.90',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.OTHERS_RECEIVABLE',
        defaultName: 'OTHERS RECEIVABLE',
        amount: '251,541.00',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.PREPAID',
        defaultName: 'PREPAID',
        amount: '146,071,698.00',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.INVENTORY',
        defaultName: 'INVENTORY',
        amount: '0.00',
        nameLines: ['INVENT', 'ORY'],
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.FIXED_ASSET',
        defaultName: 'FIXED ASSET',
        amount: '139,575,580.37',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.ASSETS.ITEMS.INTANGIBLE_ASSETS',
        defaultName: 'INTANGIBLE ASSETS',
        amount: '791,666,666.52',
        amountLines: ['791,666,666', '.52'],
      },
    ],
  },
  {
    key: 'liabilities',
    titleKey:
      'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.TITLE',
    defaultTitle: 'LIABILITIES',
    periodKey:
      'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.PERIOD',
    defaultPeriod: 'August 2026',
    total: 'Rp 796,274,157.84',
    iconType: 'bank',
    items: [
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.ITEMS.ACCOUNT_PAYABLE',
        defaultName: 'ACCOUNT PAYABLE',
        amount: '0.00',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.ITEMS.EMPLOYEE_PAYABLE',
        defaultName: 'EMPLOYEE PAYABLE',
        amount: '0.00',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.ITEMS.EXPENSES_PAYABLE',
        defaultName: 'EXPENSES PAYABLE',
        amount: '291,862,297.06',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.ITEMS.TAX_PAYABLE',
        defaultName: 'TAX PAYABLE',
        amount: '50,436,636.00',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.LIABILITIES.ITEMS.LONG_TERM_PAYABLE',
        defaultName: 'LONG TERM PAYABLE',
        amount: '453,975,224.78',
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
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.EQUITY.ITEMS.CAPITAL',
        defaultName: 'CAPITAL',
        amount: '745,000,000.00',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.EQUITY.ITEMS.RETAINED_EARNING',
        defaultName: 'RETAINED EARNING',
        amount: '451,972,595.79',
      },
      {
        nameKey:
          'BUSINESS_REALTIME.VISIBILITY_SECTIONS.FINANCIAL_VISIBILITY.MOCKUP.EQUITY.ITEMS.CURRENT_EARNING',
        defaultName: 'CURRENT EARNING',
        amount: '230,769,544.75',
      },
    ],
  },
];

@Component({
  selector: 'app-finance-balance-sheet-cards',
  imports: [TranslatePipe],
  templateUrl: './finance-balance-sheet-cards.html',
  host: {
    class: 'block w-full',
  },
})
export class FinanceBalanceSheetCards {
  readonly categories = input<readonly BalanceSheetCategory[]>(FINANCE_BALANCE_SHEET_CATEGORIES);
  readonly layout = input<'compact' | 'fluid'>('compact');
}
