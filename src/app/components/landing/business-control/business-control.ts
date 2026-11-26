import {
  Component,
  computed,
  ElementRef,
  inject,
  signal,
  PLATFORM_ID,
  OnDestroy,
  viewChild,
  viewChildren,
} from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../systems/lib/language.service';
import { observeHostViewport } from '../../../systems/lib/viewport-observer';

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

export interface CardCategoryHeader {
  readonly title: string;
  readonly subtitle: string;
}

export interface ProcessCard {
  readonly id: string;
  readonly step: string;
  readonly title: string;
  readonly subtitle: string;
  readonly icon: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
}

export interface ProjectCostItem {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly percent: number;
  readonly percentLabel: string;
}

export interface ProjectKpiMetric {
  readonly label: string;
  readonly value: string;
}

@Component({
  selector: 'app-business-control',
  imports: [TranslatePipe, NgOptimizedImage, RouterLink],
  templateUrl: './business-control.html',
  styles: `
    .business-control-surface {
      background: #ffffff;
    }

    @media (min-width: 640px) {
      .business-control-surface {
        background: linear-gradient(
          180deg,
          #D7E4FA 0%,
          #EBF2FD 50%,
          rgba(169, 196, 241, 0.4) 100%
        );
      }
    }

    .bc-mobile-tablist {
      overflow-x: auto;
      scroll-snap-type: inline proximity;
      scroll-padding-inline: 1.5rem;
      overscroll-behavior-x: contain;
      scrollbar-width: none;
    }

    .bc-mobile-tablist::-webkit-scrollbar {
      display: none;
    }

    @supports (animation-timeline: scroll(self inline)) {
      .bc-mobile-tablist {
        --fade-size: 1.75rem;
        mask:
          linear-gradient(#000, #000) no-clip subtract,
          linear-gradient(to right, #000, transparent) 0 0 / var(--tab-fade-start) 100% no-repeat no-clip,
          linear-gradient(to right, transparent, #000) 100% 0 / var(--tab-fade-end) 100% no-repeat no-clip;
        animation: bc-reveal-fade-start linear both, bc-hide-fade-end linear both;
        animation-timeline: scroll(self inline);
        animation-range: 0 var(--fade-size), calc(100% - var(--fade-size)) 100%;
      }
    }

    @keyframes bc-reveal-fade-start {
      to {
        --tab-fade-start: var(--fade-size);
      }
    }

    @keyframes bc-hide-fade-end {
      from {
        --tab-fade-end: var(--fade-size);
      }
    }

    .bc-mobile-tab {
      position: relative;
      scroll-snap-align: start;
    }

    .bc-mobile-tab[aria-selected='true']::after {
      content: '';
      position: absolute;
      inset: auto 0 0;
      border-block-end: 2.5px solid #1d44eb;
      border-radius: 9999px;
    }

    @media (pointer: coarse) {
      .bc-mobile-tab {
        min-block-size: 44px;
      }
    }

    .business-cta-btn {
      background: linear-gradient(90deg, #1E37E1 0%, #1C7DD8 69.97%, #6694EB 100%);
    }

    .business-cta-btn:hover {
      filter: brightness(1.06);
    }

    @media (prefers-reduced-motion: reduce) {
      .carousel-slide,
      .carousel-text {
        transition-duration: 0.01ms !important;
      }
    }
  `,
  host: {
    class: 'block w-full',
    tabindex: '0',
    role: 'region',
    'aria-roledescription': 'carousel',
    'aria-label': 'Business Control Interactive Showcase',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeMenu()',
    '(keydown.arrowLeft)': 'prevCard()',
    '(keydown.arrowRight)': 'nextCard()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focusin)': 'onMouseEnter()',
    '(focusout)': 'onMouseLeave()',
  },
})
export class BusinessControl implements OnDestroy {
  protected readonly languageService = inject(LanguageService);
  protected readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly currentIndex = signal<0 | 1 | 2 | 3>(0);
  readonly activeCard = computed<0 | 1 | 2 | 3>(() => this.currentIndex());
  readonly isHovered = signal<boolean>(false);
  readonly isInViewport = signal<boolean>(false);

  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;
  readonly autoPlayDelayMs = 5000;

  private touchStartX = 0;
  private touchStartY = 0;
  private isMouseDown = false;
  private mouseStartX = 0;
  private mouseStartY = 0;

  constructor() {
    observeHostViewport((visible) => {
      this.isInViewport.set(visible);
      if (visible && !this.isHovered()) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    if (!this.isBrowser || !this.isInViewport() || this.isHovered()) return;
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (!this.isHovered() && this.isInViewport()) {
        this.nextCard();
      }
    }, this.autoPlayDelayMs);
  }

  stopAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  resetAutoPlay(): void {
    if (!this.isHovered()) {
      this.startAutoPlay();
    }
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
    this.stopAutoPlay();
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
    this.startAutoPlay();
  }

  private readonly mobileTablistRef = viewChild<ElementRef<HTMLElement>>('mobileTablist');
  private readonly mobileTabRefs = viewChildren<ElementRef<HTMLButtonElement>>('mobileTabBtn');

  readonly capabilityTabs: readonly { readonly id: string; readonly labelKey: string }[] = [
    { id: 'realtime', labelKey: 'BUSINESS_CONTROL.CARDS.REALTIME.TAB' },
    { id: 'connected', labelKey: 'BUSINESS_CONTROL.CARDS.CONNECTED.TAB' },
    { id: 'workflow', labelKey: 'BUSINESS_CONTROL.CARDS.WORKFLOW.TAB' },
    { id: 'insight', labelKey: 'BUSINESS_CONTROL.CARDS.INSIGHT.TAB' },
  ];

  readonly categoryHeaders: readonly CardCategoryHeader[] = [
    { title: 'REAL-TIME BUSINESS CONTROL', subtitle: 'REAL-TIME' },
    { title: 'END-TO-END BUSINESS INTEGRATION', subtitle: 'INTEGRATE' },
    { title: 'SMART WORKFLOW & APPROVAL', subtitle: 'AUTOMATE' },
    { title: 'FINANCIAL & COST INTELLIGENCE', subtitle: 'ANALYZE' },
  ];

  readonly totalCards = this.categoryHeaders.length;

  readonly processCards: readonly ProcessCard[] = [
    {
      id: 'sales',
      step: '01',
      title: 'Sales',
      subtitle: 'SO Confirmed',
      icon: '/images/landing/business-control/1sales.svg',
      iconWidth: 47,
      iconHeight: 46,
    },
    {
      id: 'procurement',
      step: '02',
      title: 'Procurement',
      subtitle: 'MRP Demand',
      icon: '/images/landing/business-control/2procurement.svg',
      iconWidth: 58,
      iconHeight: 36,
    },
    {
      id: 'inventory',
      step: '03',
      title: 'Inventory',
      subtitle: 'Stock Allocated',
      icon: '/images/landing/business-control/3inventory.svg',
      iconWidth: 42,
      iconHeight: 40,
    },
    {
      id: 'production',
      step: '04',
      title: 'Production',
      subtitle: 'MO Released',
      icon: '/images/landing/business-control/4production.svg',
      iconWidth: 47,
      iconHeight: 36,
    },
    {
      id: 'general-ledger',
      step: '05',
      title: 'General Ledger',
      subtitle: 'Posted to GL',
      icon: '/images/landing/business-control/5general ledger.svg',
      iconWidth: 47,
      iconHeight: 35,
    },
    {
      id: 'project',
      step: '06',
      title: 'Project',
      subtitle: 'Project Initiated',
      icon: '/images/landing/business-control/6project.svg',
      iconWidth: 45,
      iconHeight: 35,
    },
    {
      id: 'dashboard',
      step: '07',
      title: 'Dashboard',
      subtitle: 'Data Refreshed',
      icon: '/images/landing/business-control/7dashboard.svg',
      iconWidth: 46,
      iconHeight: 35,
    },
  ];

  readonly salesCard = this.processCards[0];
  readonly procurementCard = this.processCards[1];
  readonly inventoryCard = this.processCards[2];
  readonly productionCard = this.processCards[3];
  readonly generalLedgerCard = this.processCards[4];
  readonly projectCard = this.processCards[5];
  readonly dashboardCard = this.processCards[6];

  readonly projectKpiMetrics: readonly ProjectKpiMetric[] = [
    { label: 'Total Budget', value: 'Rp12.62' },
    { label: 'Actual Cost', value: 'Rp6.56' },
    { label: 'Billed To Customer', value: 'Rp6.62' },
    { label: 'Billed – Actual Cost', value: 'Rp59.56' },
  ];

  readonly projectCostItems: readonly ProjectCostItem[] = [
    {
      id: 'hauni',
      name: 'Hauni Protos /M2607',
      status: 'Completed | 28.4% billed',
      percent: 68.8,
      percentLabel: '68,8%',
    },
    {
      id: 'woodfire',
      name: 'Woodfire LNG / EH01',
      status: 'Completed | Fully billed',
      percent: 73.3,
      percentLabel: '73,3%',
    },
    {
      id: 'mclaren',
      name: 'McLaren / MCD SUB1',
      status: 'In Progress',
      percent: 42.0,
      percentLabel: '42,0%',
    },
    {
      id: 'tanggo',
      name: 'Tanggo / JBT-LYG1',
      status: 'Completed | Partially billed',
      percent: 41.7,
      percentLabel: '41,7',
    },
    {
      id: 'petrobras',
      name: 'Petrobras / PBR FPSO',
      status: 'In Progress',
      percent: 8.3,
      percentLabel: '8,3%',
    },
  ];

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
  readonly selectedIndex = signal<number | null>(6);
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
    {
      id: 0,
      x: 85,
      monthKey: 'BUSINESS_CONTROL.MONTHS.AUG_2025',
      periodLabel: 'Early Aug 2025',
      expense: 210,
      income: 270,
    },
    {
      id: 1,
      x: 132.5,
      monthKey: 'BUSINESS_CONTROL.MONTHS.AUG_2025',
      periodLabel: 'Late Aug 2025',
      expense: 215,
      income: 395,
    },
    {
      id: 2,
      x: 180,
      monthKey: 'BUSINESS_CONTROL.MONTHS.SEP_2025',
      periodLabel: 'Early Sep 2025',
      expense: 205,
      income: 275,
    },
    {
      id: 3,
      x: 227.5,
      monthKey: 'BUSINESS_CONTROL.MONTHS.SEP_2025',
      periodLabel: 'Late Sep 2025',
      expense: 295,
      income: 235,
    },
    {
      id: 4,
      x: 275,
      monthKey: 'BUSINESS_CONTROL.MONTHS.OCT_2025',
      periodLabel: 'Early Oct 2025',
      expense: 265,
      income: 275,
    },
    {
      id: 5,
      x: 322.5,
      monthKey: 'BUSINESS_CONTROL.MONTHS.OCT_2025',
      periodLabel: 'Late Oct 2025',
      expense: 270,
      income: 280,
    },
    {
      id: 6,
      x: 370,
      monthKey: 'BUSINESS_CONTROL.MONTHS.NOV_2025',
      periodLabel: 'Early Nov 2025',
      expense: 460,
      income: 165,
    },
    {
      id: 7,
      x: 417.5,
      monthKey: 'BUSINESS_CONTROL.MONTHS.NOV_2025',
      periodLabel: 'Late Nov 2025',
      expense: 245,
      income: 380,
    },
    {
      id: 8,
      x: 465,
      monthKey: 'BUSINESS_CONTROL.MONTHS.DEC_2025',
      periodLabel: 'Early Dec 2025',
      expense: 255,
      income: 265,
    },
    {
      id: 9,
      x: 512.5,
      monthKey: 'BUSINESS_CONTROL.MONTHS.DEC_2025',
      periodLabel: 'Late Dec 2025',
      expense: 280,
      income: 400,
    },
    {
      id: 10,
      x: 560,
      monthKey: 'BUSINESS_CONTROL.MONTHS.JAN_2026',
      periodLabel: 'Jan 2026',
      expense: 230,
      income: 475,
    },
  ];

  readonly activePointIndex = computed<number>(() => {
    const hovered = this.hoveredIndex();
    if (hovered !== null) return hovered;
    const selected = this.selectedIndex();
    return selected !== null ? selected : 6;
  });

  readonly activePoint = computed<DataPoint | null>(() => {
    const idx = this.activePointIndex();
    return this.dataPoints[idx] ?? null;
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

  selectPoint(index: number): void {
    this.selectedIndex.set(index);
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
    this.selectedIndex.set(6);
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

  goToCard(index: number): void {
    const normalized = (((index % 4) + 4) % 4) as 0 | 1 | 2 | 3;
    this.currentIndex.set(normalized);
    this.scrollActiveTabIntoView(normalized);
    this.resetAutoPlay();
  }

  nextCard(): void {
    this.currentIndex.update((prev) => ((prev + 1) % 4) as 0 | 1 | 2 | 3);
    this.scrollActiveTabIntoView(this.activeCard());
    this.resetAutoPlay();
  }

  prevCard(): void {
    this.currentIndex.update((prev) => ((prev + 3) % 4) as 0 | 1 | 2 | 3);
    this.scrollActiveTabIntoView(this.activeCard());
    this.resetAutoPlay();
  }

  selectMobileTab(index: number): void {
    this.goToCard(index);
  }

  onMobileTabKeydown(event: KeyboardEvent, index: number): void {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % this.totalCards;
    } else if (event.key === 'ArrowLeft') {
      nextIndex = (index + this.totalCards - 1) % this.totalCards;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = this.totalCards - 1;
    }

    if (nextIndex === null) return;
    event.preventDefault();
    event.stopPropagation();
    this.goToCard(nextIndex);
    this.mobileTabRefs()[nextIndex]?.nativeElement.focus({ preventScroll: true });
  }

  private scrollActiveTabIntoView(index: number): void {
    if (!this.isBrowser) return;
    const tablist = this.mobileTablistRef()?.nativeElement;
    const tab = this.mobileTabRefs()[index]?.nativeElement;
    if (!tablist || !tab || tablist.clientWidth === 0) return;

    const pad = 24;
    const tabStart = tab.offsetLeft;
    const tabEnd = tabStart + tab.offsetWidth;
    let nextLeft: number | null = null;

    if (tabStart < tablist.scrollLeft + pad) {
      nextLeft = Math.max(0, tabStart - pad);
    } else if (tabEnd > tablist.scrollLeft + tablist.clientWidth - pad) {
      nextLeft = tabEnd - tablist.clientWidth + pad;
    }

    if (nextLeft !== null) {
      const reducedMotion =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      tablist.scrollTo?.({
        left: nextLeft,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  }

  getCardTransform(cardIndex: number): string {
    const offset = cardIndex - this.activeCard();
    return `translate3d(${offset * 100}%, 0, 0)`;
  }

  getMobileCardTransform(cardIndex: number): string {
    return this.getCardTransform(cardIndex);
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length > 0) {
      this.stopAutoPlay();
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (event.changedTouches.length === 0) return;
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    this.handleSwipe(this.touchStartX, this.touchStartY, touchEndX, touchEndY);
    if (!this.isHovered()) {
      this.startAutoPlay();
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.stopAutoPlay();
    this.isMouseDown = true;
    this.mouseStartX = event.clientX;
    this.mouseStartY = event.clientY;
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isMouseDown) return;
    this.isMouseDown = false;
    this.handleSwipe(this.mouseStartX, this.mouseStartY, event.clientX, event.clientY);
    if (!this.isHovered()) {
      this.startAutoPlay();
    }
  }

  private handleSwipe(startX: number, startY: number, endX: number, endY: number): void {
    const diffX = endX - startX;
    const diffY = endY - startY;
    const threshold = 40;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX < 0) {
        this.nextCard();
      } else {
        this.prevCard();
      }
    }
  }
}
