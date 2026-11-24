import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ErpWindowChrome } from '../../../../business-control/business-realtime/visibility-sections/erp-window-chrome/erp-window-chrome';
import {
  BalanceSheetCategory,
  FINANCE_BALANCE_SHEET_CATEGORIES,
  FinanceBalanceSheetCards,
} from '../../../../business-control/business-realtime/visibility-sections/financial-visibility/finance-balance-sheet-cards/finance-balance-sheet-cards';

/** Informational report category card shown beside the live dashboard preview. */
export interface RealDashboardCategoryCard {
  readonly id: string;
  readonly number: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
}

/** Horizontal bar entry for the Cash & Bank Balance chart. */
export interface CashBankBarItem {
  readonly id: string;
  readonly label: string;
  readonly valueMillions: number;
  readonly formattedValue: string;
  readonly centerY: number;
  readonly barPath: string | null;
  readonly fill: string;
  readonly stroke: string;
}

/** Vertical column entry for the Customer Billing Receipt chart. */
export interface BillingReceiptBarItem {
  readonly id: string;
  readonly label: string;
  readonly valueMillions: number;
  readonly centerX: number;
  readonly barPath: string;
  readonly fill: string;
  readonly stroke: string;
}

/** Tick mark along an SVG chart axis. */
export interface ChartAxisTick {
  readonly label: string;
  readonly pos: number;
}

const CASH_BAR_START_X = 104;
const CASH_BAR_MAX_WIDTH = 200; // 0..80 M
const CASH_BAR_HEIGHT = 21;
const CASH_BAR_RADIUS = 2.5;

function buildHorizontalBarPath(centerY: number, valueMillions: number): string | null {
  if (valueMillions <= 0) {
    return null;
  }
  const width = (valueMillions / 80) * CASH_BAR_MAX_WIDTH;
  const xEnd = Number((CASH_BAR_START_X + width).toFixed(2));
  const yTop = Number((centerY - CASH_BAR_HEIGHT / 2).toFixed(2));
  const yBottom = Number((centerY + CASH_BAR_HEIGHT / 2).toFixed(2));
  const r = Math.min(CASH_BAR_RADIUS, width / 2);
  const xCurve = Number((xEnd - r).toFixed(2));
  return `M ${CASH_BAR_START_X} ${yTop} H ${xCurve} Q ${xEnd} ${yTop} ${xEnd} ${Number((yTop + r).toFixed(2))} V ${Number((yBottom - r).toFixed(2))} Q ${xEnd} ${yBottom} ${xCurve} ${yBottom} H ${CASH_BAR_START_X} Z`;
}

const BILLING_BASE_Y = 130;
const BILLING_PLOT_HEIGHT = 112; // 0..400 M
const BILLING_BAR_WIDTH = 21;
const BILLING_BAR_RADIUS = 2.5;

function buildVerticalBarPath(centerX: number, valueMillions: number): string {
  const height = (valueMillions / 400) * BILLING_PLOT_HEIGHT;
  const xLeft = Number((centerX - BILLING_BAR_WIDTH / 2).toFixed(2));
  const xRight = Number((centerX + BILLING_BAR_WIDTH / 2).toFixed(2));
  const yTop = Number((BILLING_BASE_Y - height).toFixed(2));
  const r = Math.min(BILLING_BAR_RADIUS, height / 2);
  const yCurve = Number((yTop + r).toFixed(2));
  return `M ${xLeft} ${BILLING_BASE_Y} V ${yCurve} Q ${xLeft} ${yTop} ${Number((xLeft + r).toFixed(2))} ${yTop} H ${Number((xRight - r).toFixed(2))} Q ${xRight} ${yTop} ${xRight} ${yCurve} V ${BILLING_BASE_Y} Z`;
}

@Component({
  selector: 'app-real-dashboard',
  imports: [ErpWindowChrome, FinanceBalanceSheetCards, TranslatePipe],
  templateUrl: './real-dashboard.html',
  styleUrl: './real-dashboard.css',
  host: {
    class: 'block w-full',
  },
})
export class RealDashboard {
  readonly balanceSheetCategories: readonly BalanceSheetCategory[] =
    FINANCE_BALANCE_SHEET_CATEGORIES;

  readonly reportCategories: readonly RealDashboardCategoryCard[] = [
    {
      id: 'financial-statements',
      number: '01',
      titleKey: 'FINANCIAL_MANAGEMENT_1.REAL_DASHBOARD.CARDS.FINANCIAL_STATEMENTS.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.REAL_DASHBOARD.CARDS.FINANCIAL_STATEMENTS.DESCRIPTION',
    },
    {
      id: 'receivable-payable',
      number: '02',
      titleKey: 'FINANCIAL_MANAGEMENT_1.REAL_DASHBOARD.CARDS.RECEIVABLE_PAYABLE.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.REAL_DASHBOARD.CARDS.RECEIVABLE_PAYABLE.DESCRIPTION',
    },
    {
      id: 'accounting-reports',
      number: '03',
      titleKey: 'FINANCIAL_MANAGEMENT_1.REAL_DASHBOARD.CARDS.ACCOUNTING_REPORTS.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.REAL_DASHBOARD.CARDS.ACCOUNTING_REPORTS.DESCRIPTION',
    },
    {
      id: 'management-analysis',
      number: '04',
      titleKey: 'FINANCIAL_MANAGEMENT_1.REAL_DASHBOARD.CARDS.MANAGEMENT_ANALYSIS.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.REAL_DASHBOARD.CARDS.MANAGEMENT_ANALYSIS.DESCRIPTION',
    },
  ];

  readonly cashBankXTicks: readonly ChartAxisTick[] = [
    { label: '0', pos: 104 },
    { label: '10 M', pos: 129 },
    { label: '20 M', pos: 154 },
    { label: '30 M', pos: 179 },
    { label: '40 M', pos: 204 },
    { label: '50 M', pos: 229 },
    { label: '60 M', pos: 254 },
    { label: '70 M', pos: 279 },
    { label: '80 M', pos: 304 },
  ];

  readonly cashBankBalances: readonly CashBankBarItem[] = [
    {
      id: 'cash-idr',
      label: 'Cash - IDR',
      valueMillions: 74.2,
      formattedValue: '74.2 M',
      centerY: 33,
      barPath: buildHorizontalBarPath(33, 74.2),
      fill: '#FED3CD',
      stroke: '#E89B92',
    },
    {
      id: 'bank-bca',
      label: 'Bank BCA - 0611712455',
      valueMillions: 43.2,
      formattedValue: '43.2 M',
      centerY: 73,
      barPath: buildHorizontalBarPath(73, 43.2),
      fill: '#CFDAF6',
      stroke: '#96B0EC',
    },
    {
      id: 'petty-cash',
      label: 'Petty Cash - IDR',
      valueMillions: 0,
      formattedValue: '0',
      centerY: 113,
      barPath: buildHorizontalBarPath(113, 0),
      fill: 'none',
      stroke: 'none',
    },
  ];

  readonly billingYTicks: readonly ChartAxisTick[] = [
    { label: '400 M', pos: 18 },
    { label: '350 M', pos: 32 },
    { label: '300 M', pos: 46 },
    { label: '250 M', pos: 60 },
    { label: '200 M', pos: 74 },
    { label: '150 M', pos: 88 },
    { label: '100 M', pos: 102 },
    { label: '50 M', pos: 116 },
    { label: '0', pos: 130 },
  ];

  readonly billingVerticalGridLines: readonly number[] = [46, 79, 112, 145, 178, 211, 244, 277, 310];

  readonly billingReceipts: readonly BillingReceiptBarItem[] = [
    {
      id: 'aug-2026',
      label: 'Aug2026',
      valueMillions: 334,
      centerX: 62.5,
      barPath: buildVerticalBarPath(62.5, 334),
      fill: '#FFE3E0',
      stroke: '#E6B2AC',
    },
    {
      id: 'sep-2026',
      label: 'Sep2026',
      valueMillions: 271,
      centerX: 95.5,
      barPath: buildVerticalBarPath(95.5, 271),
      fill: '#FFD2CD',
      stroke: '#E89A92',
    },
    {
      id: 'oct-2026',
      label: 'Oct2026',
      valueMillions: 364,
      centerX: 128.5,
      barPath: buildVerticalBarPath(128.5, 364),
      fill: '#FBB5B5',
      stroke: '#DF7E7E',
    },
    {
      id: 'nov-2026',
      label: 'Nov2026',
      valueMillions: 221,
      centerX: 161.5,
      barPath: buildVerticalBarPath(161.5, 221),
      fill: '#A2B7E6',
      stroke: '#6B8AD4',
    },
    {
      id: 'dec-2026',
      label: 'Dec2026',
      valueMillions: 304,
      centerX: 194.5,
      barPath: buildVerticalBarPath(194.5, 304),
      fill: '#CDDAFA',
      stroke: '#96B2F0',
    },
    {
      id: 'jan-2026',
      label: 'Jan2026',
      valueMillions: 344,
      centerX: 227.5,
      barPath: buildVerticalBarPath(227.5, 344),
      fill: '#E5EDFA',
      stroke: '#B9CDF2',
    },
    {
      id: 'feb-2027',
      label: 'Feb2027',
      valueMillions: 367,
      centerX: 260.5,
      barPath: buildVerticalBarPath(260.5, 367),
      fill: '#FFE3E0',
      stroke: '#E6B2AC',
    },
    {
      id: 'mar-2026',
      label: 'Mar2026',
      valueMillions: 291,
      centerX: 293.5,
      barPath: buildVerticalBarPath(293.5, 291),
      fill: '#FFD2CF',
      stroke: '#E89A92',
    },
  ];
}
