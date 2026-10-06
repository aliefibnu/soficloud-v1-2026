import {
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../systems/lib/language.service';

export interface DataPoint {
  readonly id: number;
  readonly x: number;
  readonly monthKey: string;
  readonly periodLabel: string;
  readonly expense: number;
  readonly income: number;
}

export interface GridLine {
  readonly value: number;
  readonly label: string;
  readonly y: number;
}

export interface MonthAxis {
  readonly x: number;
  readonly translationKey: string;
}

@Component({
  selector: 'app-business-control',
  imports: [TranslatePipe],
  templateUrl: './business-control.html',
  host: {
    class: 'block w-full',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class BusinessControl {
  protected readonly languageService = inject(LanguageService);
  protected readonly translate = inject(TranslateService);

  readonly svgWidth = 620;
  readonly svgHeight = 290;
  readonly chartTop = 25;
  readonly chartBottom = 230;
  readonly chartLeft = 55;
  readonly chartRight = 585;
  readonly maxY = 600;

  readonly isExpenseVisible = signal<boolean>(true);
  readonly isIncomeVisible = signal<boolean>(true);
  readonly hoveredIndex = signal<number | null>(null);
  readonly isMenuOpen = signal<boolean>(false);
  readonly copyFeedback = signal<boolean>(false);

  readonly yGridLines: readonly GridLine[] = [
    { value: 600, label: '600M', y: this.getYForValue(600) },
    { value: 500, label: '500M', y: this.getYForValue(500) },
    { value: 400, label: '400M', y: this.getYForValue(400) },
    { value: 300, label: '300M', y: this.getYForValue(300) },
    { value: 200, label: '200M', y: this.getYForValue(200) },
    { value: 100, label: '100M', y: this.getYForValue(100) },
    { value: 0, label: '0', y: this.getYForValue(0) },
  ];

  readonly monthAxes: readonly MonthAxis[] = [
    { x: 85, translationKey: 'BUSINESS_CONTROL.MONTHS.AUG_2025' },
    { x: 180, translationKey: 'BUSINESS_CONTROL.MONTHS.SEP_2025' },
    { x: 275, translationKey: 'BUSINESS_CONTROL.MONTHS.OCT_2025' },
    { x: 370, translationKey: 'BUSINESS_CONTROL.MONTHS.NOV_2025' },
    { x: 465, translationKey: 'BUSINESS_CONTROL.MONTHS.DEC_2025' },
    { x: 560, translationKey: 'BUSINESS_CONTROL.MONTHS.JAN_2026' },
  ];

  readonly dataPoints: readonly DataPoint[] = [
    { id: 0, x: 85, monthKey: 'BUSINESS_CONTROL.MONTHS.AUG_2025', periodLabel: 'Early Aug 2025', expense: 210, income: 270 },
    { id: 1, x: 132.5, monthKey: 'BUSINESS_CONTROL.MONTHS.AUG_2025', periodLabel: 'Late Aug 2025', expense: 215, income: 395 },
    { id: 2, x: 180, monthKey: 'BUSINESS_CONTROL.MONTHS.SEP_2025', periodLabel: 'Early Sep 2025', expense: 205, income: 275 },
    { id: 3, x: 227.5, monthKey: 'BUSINESS_CONTROL.MONTHS.SEP_2025', periodLabel: 'Late Sep 2025', expense: 295, income: 235 },
    { id: 4, x: 275, monthKey: 'BUSINESS_CONTROL.MONTHS.OCT_2025', periodLabel: 'Early Oct 2025', expense: 265, income: 275 },
    { id: 5, x: 322.5, monthKey: 'BUSINESS_CONTROL.MONTHS.OCT_2025', periodLabel: 'Late Oct 2025', expense: 270, income: 280 },
    { id: 6, x: 370, monthKey: 'BUSINESS_CONTROL.MONTHS.NOV_2025', periodLabel: 'Early Nov 2025', expense: 460, income: 165 },
    { id: 7, x: 417.5, monthKey: 'BUSINESS_CONTROL.MONTHS.NOV_2025', periodLabel: 'Late Nov 2025', expense: 245, income: 380 },
    { id: 8, x: 465, monthKey: 'BUSINESS_CONTROL.MONTHS.DEC_2025', periodLabel: 'Early Dec 2025', expense: 255, income: 265 },
    { id: 9, x: 512.5, monthKey: 'BUSINESS_CONTROL.MONTHS.DEC_2025', periodLabel: 'Late Dec 2025', expense: 280, income: 400 },
    { id: 10, x: 560, monthKey: 'BUSINESS_CONTROL.MONTHS.JAN_2026', periodLabel: 'Jan 2026', expense: 230, income: 475 },
  ];

  readonly activePointIndex = computed<number | null>(() => this.hoveredIndex());

  readonly activePoint = computed<DataPoint | null>(() => {
    const idx = this.activePointIndex();
    return idx !== null ? (this.dataPoints[idx] ?? null) : null;
  });

  readonly incomePath = computed<string>(() => {
    const coords = this.dataPoints.map((pt) => ({
      x: pt.x,
      y: this.getYForValue(pt.income),
    }));
    return this.calculateCatmullRomSpline(coords);
  });

  readonly expensePath = computed<string>(() => {
    const coords = this.dataPoints.map((pt) => ({
      x: pt.x,
      y: this.getYForValue(pt.expense),
    }));
    return this.calculateCatmullRomSpline(coords);
  });

  getYForValue(value: number): number {
    const ratio = Math.max(0, Math.min(value, this.maxY)) / this.maxY;
    return this.chartBottom - ratio * (this.chartBottom - this.chartTop);
  }

  formatCurrency(valueInMillions: number): string {
    const fullAmount = valueInMillions * 1_000_000;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(fullAmount);
  }

  toggleExpense(): void {
    this.isExpenseVisible.update((visible) => !visible);
  }

  toggleIncome(): void {
    this.isIncomeVisible.update((visible) => !visible);
  }

  setHoveredIndex(index: number | null): void {
    this.hoveredIndex.set(index);
  }

  selectPoint(index: number | null): void {
    this.hoveredIndex.set(index);
  }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isMenuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  resetView(): void {
    this.isExpenseVisible.set(true);
    this.isIncomeVisible.set(true);
    this.hoveredIndex.set(null);
    this.closeMenu();
  }

  exportData(): void {
    const dataString = JSON.stringify(this.dataPoints, null, 2);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(dataString);
      this.copyFeedback.set(true);
      setTimeout(() => this.copyFeedback.set(false), 2000);
    }
    this.closeMenu();
  }

  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('.chart-menu-container')) {
      this.closeMenu();
    }
    if (target && !target.closest('.chart-interactive-area')) {
      this.hoveredIndex.set(null);
    }
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

      const cp1x = p1.x + ((p2.x - p0.x) * tension);
      const cp1y = p1.y + ((p2.y - p0.y) * tension);
      const cp2x = p2.x - ((p3.x - p1.x) * tension);
      const cp2y = p2.y - ((p3.y - p1.y) * tension);

      path += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }

    return path;
  }
}
