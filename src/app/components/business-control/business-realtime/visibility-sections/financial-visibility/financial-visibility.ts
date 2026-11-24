import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { VisibilitySectionShell } from '../visibility-section-shell/visibility-section-shell';
import { ErpWindowChrome } from '../erp-window-chrome/erp-window-chrome';
import {
  BalanceSheetCategory,
  BalanceSheetItem,
  FINANCE_BALANCE_SHEET_CATEGORIES,
  FinanceBalanceSheetCards,
} from './finance-balance-sheet-cards/finance-balance-sheet-cards';

export type { BalanceSheetCategory, BalanceSheetItem };

export interface IncomeExpenseMonth {
  readonly label: string;
  readonly x: number;
  readonly incomeY: number;
  readonly expenseY: number;
}

@Component({
  selector: 'app-financial-visibility',
  imports: [VisibilitySectionShell, ErpWindowChrome, FinanceBalanceSheetCards, TranslatePipe],
  templateUrl: './financial-visibility.html',
})
export class FinancialVisibility {
  readonly categories: readonly BalanceSheetCategory[] = FINANCE_BALANCE_SHEET_CATEGORIES;

  readonly incomePath =
    'M 106.275 164.283 C 122.881 176.097, 122.881 184.63, 142.808 193.819 C 155.521 199.681, 170.841 125.01, 183.326 129.496 C 205.245 137.373, 207.902 174.128, 219.858 182.661 C 232.959 192.011, 245.08 170.19, 257.054 170.19 C 278.974 170.19, 277.871 183.245, 294.251 185.942 C 310.192 188.568, 324.141 176.753, 332.112 176.753 C 352.194 176.753, 365.345 165.482, 369.973 170.19 C 392.556 193.162, 394.655 216.134, 409.162 216.134 C 427.76 216.134, 435.067 136.06, 445.694 136.06 C 468.942 136.06, 476.913 183.645, 482.891 180.692 C 490.862 176.753, 516.767 115.713, 522.745 115.713 L 557.782 102.58';

  readonly expensePath =
    'M 106.275 200.423 L 146.129 194.472 C 146.129 194.472, 162.025 197.387, 181.997 197.754 C 197.471 198.038, 204.581 197.754, 219.194 200.423 C 230.899 202.561, 245.763 169.255, 257.719 166.905 C 274.629 163.582, 279.002 180.032, 296.244 180.032 C 308.2 180.032, 320.622 174.052, 332.776 172.156 C 345.396 170.187, 360.037 104.24, 371.965 111.116 C 395.878 124.899, 404.312 180.067, 407.834 180.689 C 426.432 183.971, 430.417 185.283, 446.359 178.72 C 461.736 172.388, 467.704 167.935, 484.219 172.156 C 496.84 175.381, 522.08 180.032, 522.08 180.032 C 522.08 180.032, 543.374 185.804, 557.948 189.878';

  readonly monthlyData: readonly IncomeExpenseMonth[] = [
    { label: 'August 2025', x: 106.897, incomeY: 164.932, expenseY: 200.379 },
    { label: 'September 2025', x: 144.567, incomeY: 193.811, expenseY: 195.129 },
    { label: 'October 2025', x: 182.241, incomeY: 129.489, expenseY: 197.748 },
    { label: 'November 2025', x: 219.915, incomeY: 182.659, expenseY: 200.379 },
    { label: 'December 2025', x: 257.589, incomeY: 170.180, expenseY: 167.561 },
    { label: 'January 2026', x: 295.268, incomeY: 185.936, expenseY: 179.379 },
    { label: 'February 2026', x: 332.936, incomeY: 176.752, expenseY: 171.496 },
    { label: 'March 2026', x: 370.610, incomeY: 170.180, expenseY: 111.116 },
    { label: 'April 2026', x: 408.284, incomeY: 216.133, expenseY: 180.690 },
    { label: 'May 2026', x: 445.960, incomeY: 136.051, expenseY: 178.063 },
    { label: 'June 2026', x: 483.637, incomeY: 180.690, expenseY: 171.496 },
    { label: 'July 2026', x: 521.307, incomeY: 116.362, expenseY: 179.379 },
    { label: 'August 2026', x: 558.518, incomeY: 103.235, expenseY: 189.873 },
  ];

  readonly gridLevels = [
    { label: '600 M', y: 94.70 },
    { label: '500 M', y: 129.93 },
    { label: '400 M', y: 165.15 },
    { label: '300 M', y: 200.38 },
    { label: '200 M', y: 235.61 },
    { label: '100 M', y: 270.82 },
    { label: '0', y: 306.05 },
  ];

  readonly scrollThumbTop = signal<number>(0);

  onContentScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const maxScroll = target.scrollHeight - target.clientHeight;
    if (maxScroll > 0) {
      const trackHeight = target.clientHeight - 50; // 50px is the blue indicator thumb height
      const scrollRatio = target.scrollTop / maxScroll;
      this.scrollThumbTop.set(Math.max(0, Math.min(trackHeight, scrollRatio * trackHeight)));
    } else {
      this.scrollThumbTop.set(0);
    }
  }
}
