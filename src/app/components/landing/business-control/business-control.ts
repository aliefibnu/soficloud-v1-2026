  import {
    Component,
    computed,
    inject,
    signal,
    viewChild,
    ElementRef,
    PLATFORM_ID,
    OnDestroy,
    AfterViewInit,
  } from '@angular/core';
  import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
  import { Router, NavigationStart, RouterLink } from '@angular/router';
  import { Subscription } from 'rxjs';
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
    host: {
      class: 'block w-full',
      '(document:click)': 'onDocumentClick($event)',
      '(document:keydown.escape)': 'closeMenu()',
      '(window:scroll)': 'onWindowScroll()',
      '(window:resize)': 'onWindowResize()',
      '(window:hashchange)': 'onHashChange()',
      '(window:popstate)': 'onPopState()',
      '(window:wheel)': 'onUserScrollInterruption()',
      '(window:touchstart)': 'onUserScrollInterruption()',
      '(window:scrollend)': 'onScrollEnd()',
    },
  })
  export class BusinessControl implements OnDestroy, AfterViewInit {
    protected readonly languageService = inject(LanguageService);
    protected readonly translate = inject(TranslateService);
    private readonly platformId = inject(PLATFORM_ID);
    readonly isBrowser = isPlatformBrowser(this.platformId);
    private readonly router = inject(Router, { optional: true });
    private routerSub: Subscription | null = null;

    readonly trackRef = viewChild<ElementRef<HTMLElement>>('trackRef');

    readonly isMobile = signal<boolean>(false);
    readonly mobileCardIndex = signal<0 | 1 | 2 | 3>(0);
    readonly scrollProgress = signal<number>(0);
    readonly isNavigating = signal<boolean>(false);
    readonly isSnapping = signal<boolean>(false);
    private rafId: number | null = null;
    private snapAnimRafId: number | null = null;
    private navAnimRafId: number | null = null;
    private navSettleTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private navSafetyTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private snapCooldownId: ReturnType<typeof setTimeout> | null = null;
    private wheelIdleTimeoutId: ReturnType<typeof setTimeout> | null = null;
    private scrollSnapDebounceId: ReturnType<typeof setTimeout> | null = null;
    private lastWheelDirection: -1 | 0 | 1 = 0;
    private isProgrammaticCardScroll = false;
    private snappingFromCard: 0 | 1 | 2 | 3 = 0;
    private snappingToCard: 0 | 1 | 2 | 3 = 0;
    private hasSnappedThisWheelGesture = false;
    private accumulatedWheelDelta = 0;
    private touchStartX = 0;
    private touchStartY = 0;

    constructor() {
      if (this.isBrowser) {
        this.checkMobileBreakpoint();
      }
      if (this.isBrowser && this.router) {
        this.routerSub = this.router.events.subscribe((event) => {
          if (event instanceof NavigationStart) {
            const hashIdx = event.url.indexOf('#');
            if (hashIdx !== -1) {
              this.checkAndHandleAnchor(event.url.slice(hashIdx + 1));
            } else if (event.url === '/' || event.url === '') {
              this.checkAndHandleAnchor('hero');
            }
          }
        });
      }
    }

    checkMobileBreakpoint(): void {
      if (typeof window !== 'undefined') {
        this.isMobile.set(window.innerWidth < 1024);
      }
    }

    ngAfterViewInit(): void {
      if (!this.isBrowser) return;
      const track = this.trackRef()?.nativeElement;
      if (track) {
        track.addEventListener('wheel', this.onTrackWheel, { passive: false });
        track.addEventListener('touchstart', this.onTrackTouchStart, { passive: true });
        track.addEventListener('touchend', this.onTrackTouchEnd, { passive: true });
      }
    }

    ngOnDestroy(): void {
      this.clearNavTimers();
      this.clearSnapAnimation();
      this.resetWheelGesture();
      if (this.scrollSnapDebounceId !== null) {
        clearTimeout(this.scrollSnapDebounceId);
        this.scrollSnapDebounceId = null;
      }
      if (this.snapCooldownId !== null) {
        clearTimeout(this.snapCooldownId);
        this.snapCooldownId = null;
      }
      if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
      if (this.routerSub) {
        this.routerSub.unsubscribe();
        this.routerSub = null;
      }
      if (this.isBrowser) {
        const track = this.trackRef()?.nativeElement;
        if (track) {
          track.removeEventListener('wheel', this.onTrackWheel);
          track.removeEventListener('touchstart', this.onTrackTouchStart);
          track.removeEventListener('touchend', this.onTrackTouchEnd);
        }
      }
    }

    readonly categoryHeaders: readonly CardCategoryHeader[] = [
    { title: 'REAL-TIME BUSINESS CONTROL', subtitle: 'REAL-TIME' },
    { title: 'END-TO-END BUSINESS INTEGRATION', subtitle: 'INTEGRATE' },
    { title: 'SMART WORKFLOW & APPROVAL', subtitle: 'AUTOMATE' },
    { title: 'FINANCIAL & COST INTELLIGENCE', subtitle: 'ANALYZE' },
  ];

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

    readonly progress12 = computed<number>(() => {
      const p = this.scrollProgress();
      // Stacking animation begins only after the card is truly centered and settled in the viewport
      const start = 0.14;
      const end = 0.38;
      const t = Math.min(Math.max((p - start) / (end - start), 0), 1);
      return t * t * (3 - 2 * t);
    });

    readonly progress23 = computed<number>(() => {
      const p = this.scrollProgress();
      // Card 2 stays settled, then Card 3 stacks in front-bottom
      const start = 0.46;
      const end = 0.70;
      const t = Math.min(Math.max((p - start) / (end - start), 0), 1);
      return t * t * (3 - 2 * t);
    });

    readonly progress34 = computed<number>(() => {
      const p = this.scrollProgress();
      // Card 3 stays settled, then Card 4 stacks in front-bottom
      const start = 0.78;
      const end = 0.98;
      const t = Math.min(Math.max((p - start) / (end - start), 0), 1);
      return t * t * (3 - 2 * t);
    });

    // Alias for backward compatibility if referenced
    readonly transitionProgress = computed<number>(() => this.progress12());

    readonly activeCard = computed<0 | 1 | 2 | 3>(() => {
      if (this.isMobile()) {
        return this.mobileCardIndex();
      }
      if (this.progress34() >= 0.5) return 3;
      if (this.progress23() >= 0.5) return 2;
      if (this.progress12() >= 0.5) return 1;
      return 0;
    });

    // PREVIEW CARD 1 (Chart, lowest layer in stack)
    readonly card1Transform = computed<string>(() => {
      const t1 = this.progress12();
      const t2 = this.progress23();
      const t3 = this.progress34();
      const translateY = -14 * t1 - 14 * t2 - 14 * t3;
      const scale = 1 - 0.04 * t1 - 0.04 * t2 - 0.04 * t3;
      return `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
    });

    readonly card1Opacity = computed<number>(() => {
      const t1 = this.progress12();
      const t2 = this.progress23();
      const t3 = this.progress34();
      return 1 - 0.15 * t1 - 0.15 * t2 - 0.15 * t3;
    });

    // PREVIEW CARD 2 (Connected processes, 2nd layer in stack)
    readonly card2Transform = computed<string>(() => {
      const t1 = this.progress12();
      const t2 = this.progress23();
      const t3 = this.progress34();
      let translateY: number;
      let scale: number;
      if (t2 > 0) {
        translateY = -14 * t2 - 14 * t3;
        scale = 1 - 0.04 * t2 - 0.04 * t3;
      } else {
        translateY = 100 * (1 - t1);
        scale = 0.96 + 0.04 * t1;
      }
      return `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
    });

    readonly card2Opacity = computed<number>(() => {
      const t1 = this.progress12();
      const t2 = this.progress23();
      const t3 = this.progress34();
      if (t2 > 0) {
        return 1 - 0.15 * t2 - 0.15 * t3;
      }
      return t1;
    });

    // PREVIEW CARD 3 (Workflow & approval, 3rd layer in stack)
    readonly card3Transform = computed<string>(() => {
      const t2 = this.progress23();
      const t3 = this.progress34();
      let translateY: number;
      let scale: number;
      if (t3 > 0) {
        translateY = -14 * t3;
        scale = 1 - 0.04 * t3;
      } else {
        translateY = 100 * (1 - t2);
        scale = 0.96 + 0.04 * t2;
      }
      return `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
    });

    readonly card3Opacity = computed<number>(() => {
      const t2 = this.progress23();
      const t3 = this.progress34();
      if (t3 > 0) {
        return 1 - 0.15 * t3;
      }
      return t2;
    });

    // PREVIEW CARD 4 (Project Revenue & Cost Control, top layer in stack)
    readonly card4Transform = computed<string>(() => {
      const t3 = this.progress34();
      const translateY = 100 * (1 - t3);
      const scale = 0.96 + 0.04 * t3;
      return `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
    });

    readonly card4Opacity = computed<number>(() => {
      const t3 = this.progress34();
      return this.progress34();
    });

    // RIGHT COLUMN: Cross-fade opacities (no stacking effect)
    readonly text1Opacity = computed<number>(() => {
      return 1 - this.progress12();
    });

    readonly text2Opacity = computed<number>(() => {
      return this.progress12() * (1 - this.progress23());
    });

    readonly text3Opacity = computed<number>(() => {
      return this.progress23() * (1 - this.progress34());
    });

    readonly text4Opacity = computed<number>(() => {
      return this.progress34();
    });

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
      this.handlePotentialAnchorClick(event);
    }

    private handlePotentialAnchorClick(event: MouseEvent): void {
      if (!this.isBrowser) return;
      const target = event.target as HTMLElement | null;

      const scrollToTopBtn = target?.closest('app-scroll-to-top button, [data-scroll-to-top]');
      if (scrollToTopBtn) {
        const handled = this.checkAndHandleAnchor('hero');
        if (handled) {
          event.preventDefault();
          return;
        }
      }

      const anchor = target?.closest('a');
      if (!anchor) return;

      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return;

      const href = anchor.getAttribute('href') || anchor.getAttribute('routerLink');
      if (!href) return;

      let targetId: string | null = null;
      if (href.startsWith('#')) {
        targetId = href.slice(1);
      } else if (href === '/' || href.startsWith('/#')) {
        const hashIdx = href.indexOf('#');
        targetId = hashIdx !== -1 ? href.slice(hashIdx + 1) : 'hero';
      }

      if (targetId !== null) {
        const handled = this.checkAndHandleAnchor(targetId);
        if (handled) {
          event.preventDefault();
          if (typeof history !== 'undefined' && targetId !== 'hero') {
            history.pushState(null, '', '#' + targetId);
          }
        }
      }
    }

    checkAndHandleAnchor(anchorId: string): boolean {
      if (!this.isBrowser) return false;
      const trackEl = this.trackRef()?.nativeElement;
      if (!trackEl) return false;

      const cleanId = anchorId.replace(/^#/, '').trim();
      if (!cleanId && cleanId !== '') return false;

      const trackRect = trackEl.getBoundingClientRect();
      const windowH = typeof window !== 'undefined' ? window.innerHeight : 800;
      const trackHeight = trackRect.height > 0 ? trackRect.height : windowH * 4.2;
      const stickyOffset = this.getStickyOffset();
      const currentScroll = stickyOffset - trackRect.top;
      const totalScroll = Math.max(0, trackHeight - windowH);

      let isBelow = false;
      let isAbove = false;
      let targetScrollY: number | null = null;

      if (cleanId === '' || cleanId === 'hero' || cleanId === 'top') {
        isAbove = true;
        targetScrollY = 0;
      } else {
        const targetEl = document.getElementById(cleanId);
        if (targetEl) {
          const targetRect = targetEl.getBoundingClientRect();
          isBelow = targetRect.top >= trackRect.bottom - 50;
          isAbove = targetRect.bottom <= trackRect.top + 50;
          const currentY = typeof window !== 'undefined' ? window.scrollY : 0;
          // Helper divs (#solutions, #pricing, #contact, #about, #business-model)
          // have CSS 'absolute -top-20' baked in, so offset is already accounted for.
          // Direct section elements (#features, #why-choose-us, #overview, etc.)
          // use scroll-mt-20 and need stickyOffset subtracted to land below navbar.
          const hasBuiltInOffset =
            targetEl.classList.contains('absolute') &&
            targetEl.classList.contains('-top-20');
          if (hasBuiltInOffset) {
            targetScrollY = Math.max(0, targetRect.top + currentY);
          } else {
            targetScrollY = Math.max(0, targetRect.top + currentY - stickyOffset);
          }
        } else {
          const knownBelow = [
            'overview',
            'features',
            'why-choose-us',
            'about',
            'solutions',
            'pricing',
            'contact',
            'resources',
            'customers',
            'business-model',
          ];
          if (knownBelow.includes(cleanId)) {
            isBelow = true;
            const currentY = typeof window !== 'undefined' ? window.scrollY : 0;
            targetScrollY = Math.max(0, trackRect.bottom + currentY);
          } else if (cleanId === 'hero') {
            isAbove = true;
            targetScrollY = 0;
          }
        }
      }

      if (targetScrollY !== null) {
        const targetProgress = isAbove ? 0 : 1;
        this.startAnchorNavigation(targetProgress, targetScrollY);
        return true;
      }
      return false;
    }

    startAnchorNavigation(targetProgress: number, targetY?: number): void {
      this.clearNavTimers();
      this.isNavigating.set(true);
      this.scrollProgress.set(targetProgress);

      if (typeof targetY === 'number') {
        const currentY = typeof window !== 'undefined' ? window.scrollY : 0;
        const distance = Math.abs(targetY - currentY);
        const duration = Math.min(800, Math.max(400, Math.round(distance * 0.1)));
        this.animateNavScrollTo(targetY, duration);
      } else {
        this.navSafetyTimeoutId = setTimeout(() => {
          this.finishAnchorNavigation();
        }, 2000);
      }
    }

    animateNavScrollTo(targetY: number, durationMs = 450): void {
      if (!this.isBrowser) return;
      this.clearNavScrollAnimation();

      const startY = typeof window !== 'undefined' ? window.scrollY : 0;
      const distance = targetY - startY;

      if (Math.abs(distance) < 2) {
        window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
        this.finishAnchorNavigation();
        return;
      }

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        // Smooth cubic easeInOut for effortless velocity across long distances
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        const nextY = startY + distance * ease;
        window.scrollTo({ top: nextY, behavior: 'instant' as ScrollBehavior });

        if (progress < 1 && this.isNavigating()) {
          this.navAnimRafId = requestAnimationFrame(animate);
        } else {
          this.navAnimRafId = null;
          window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
          this.finishAnchorNavigation();
        }
      };

      this.navAnimRafId = requestAnimationFrame(animate);
    }

    finishAnchorNavigation(): void {
      if (!this.isNavigating()) return;
      this.clearNavTimers();
      this.isNavigating.set(false);
      this.updateScrollProgress();
    }

    clearNavTimers(): void {
      this.clearSnapAnimation();
      this.clearNavScrollAnimation();
      if (this.navSettleTimeoutId !== null) {
        clearTimeout(this.navSettleTimeoutId);
        this.navSettleTimeoutId = null;
      }
      if (this.navSafetyTimeoutId !== null) {
        clearTimeout(this.navSafetyTimeoutId);
        this.navSafetyTimeoutId = null;
      }
    }

    clearNavScrollAnimation(): void {
      if (this.navAnimRafId !== null && typeof cancelAnimationFrame !== 'undefined') {
        cancelAnimationFrame(this.navAnimRafId);
        this.navAnimRafId = null;
      }
    }

    onScrollEnd(): void {
      if (this.isNavigating() && this.navAnimRafId === null) {
        this.finishAnchorNavigation();
      }
      if (!this.isSnapping() && this.snapAnimRafId === null) {
        this.snapToNearestIfPinned();
      }
    }

    onUserScrollInterruption(): void {
      if (this.isNavigating()) {
        this.clearNavScrollAnimation();
        this.finishAnchorNavigation();
      }
    }

    onHashChange(): void {
      if (!this.isBrowser) return;
      const hash = window.location.hash.slice(1);
      if (hash) {
        this.checkAndHandleAnchor(hash);
      }
    }

    onPopState(): void {
      if (!this.isBrowser) return;
      const hash = window.location.hash.slice(1);
      this.checkAndHandleAnchor(hash || 'hero');
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

    onWindowScroll(): void {
      if (!this.isBrowser || this.isMobile() || this.isNavigating() || this.isProgrammaticCardScroll) return;

      if (this.rafId === null) {
        this.rafId = requestAnimationFrame(() => {
          this.rafId = null;
          // A programmatic snap owns progress updates while its RAF is running.
          if (!this.isNavigating() && !this.isProgrammaticCardScroll) {
            this.updateScrollProgress();
          }
        });
      }
    }

    onWindowResize(): void {
      if (!this.isBrowser) return;
      this.checkMobileBreakpoint();
      if (!this.isMobile()) {
        this.updateScrollProgress();
      }
    }

    private getStickyOffset(): number {
      if (typeof window === 'undefined') return 80;
      if (window.innerWidth < 640) return 64;
      if (window.innerWidth < 1024) return 72;
      return 80;
    }

    updateScrollProgress(): void {
      const el = this.trackRef()?.nativeElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      const totalScroll = rect.height - windowHeight;
      if (totalScroll <= 0) {
        this.scrollProgress.set(0);
        return;
      }
      const stickyOffset = this.getStickyOffset();
      const currentScroll = stickyOffset - rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      this.scrollProgress.set(progress);
    }

    setScrollProgress(progress: number): void {
      this.resetWheelGesture();
      this.scrollProgress.set(Math.min(Math.max(progress, 0), 1));
    }

    goToCard(index: number): void {
      const clampedIndex = Math.max(0, Math.min(index, 3)) as 0 | 1 | 2 | 3;
      if (this.isMobile()) {
        this.mobileCardIndex.set(clampedIndex);
        return;
      }
      if (!this.isBrowser) return;
      const el = this.trackRef()?.nativeElement;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;
      const stickyOffset = this.getStickyOffset();
      const targets = [0.0, 0.42, 0.74, 1.0];
      const targetProgress = targets[clampedIndex] ?? 0;
      const targetScrollY = window.scrollY + rect.top - stickyOffset + targetProgress * totalScroll;
      this.animateScrollTo(targetScrollY, 420);
    }

    nextCard(): void {
      const current = this.activeCard();
      if (current < 3) {
        this.goToCard(current + 1);
      }
    }

    prevCard(): void {
      const current = this.activeCard();
      if (current > 0) {
        this.goToCard(current - 1);
      }
    }

    getMobileCardTransform(cardIndex: number): string {
      const offset = cardIndex - this.activeCard();
      return `translate3d(${offset * 100}%, 0, 0)`;
    }

    private butteryEase(x: number): number {
      if (x <= 0) return 0;
      if (x >= 1) return 1;
      // Buttery curve: cubic-bezier(0.22, 0.8, 0.25, 1.0)
      const x1 = 0.22;
      const y1 = 0.8;
      const x2 = 0.25;
      const y2 = 1.0;
      let t = x;
      for (let i = 0; i < 6; i++) {
        const currentX = 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t;
        const currentSlope = 3 * (1 - t) * (1 - t) * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t * t * (1 - x2);
        if (Math.abs(currentSlope) < 1e-6) break;
        t -= (currentX - x) / currentSlope;
        t = Math.max(0, Math.min(1, t));
      }
      return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t;
    }

    animateScrollTo(targetY: number, durationMs = 420): void {
      if (!this.isBrowser) return;

      this.clearSnapAnimation();
      if (this.rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }

      const startY = window.scrollY;
      const distance = targetY - startY;
      this.isProgrammaticCardScroll = true;
      window.scrollTo({ top: startY, behavior: 'instant' as ScrollBehavior });

      if (Math.abs(distance) < 2) {
        window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
        this.updateScrollProgress();
        this.isProgrammaticCardScroll = false;
        this.isSnapping.set(false);
        return;
      }

      const startTime = performance.now();
      const animate = (currentTime: number) => {
        if (!this.isProgrammaticCardScroll) {
          this.snapAnimRafId = null;
          return;
        }

        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const ease = this.butteryEase(progress);
        const nextY = startY + distance * ease;
        window.scrollTo({ top: nextY, behavior: 'instant' as ScrollBehavior });
        this.updateScrollProgress();

        if (progress < 1) {
          this.snapAnimRafId = requestAnimationFrame(animate);
          return;
        }

        this.snapAnimRafId = null;
        window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
        this.updateScrollProgress();
        this.isProgrammaticCardScroll = false;
        this.isSnapping.set(false);
        this.hasSnappedThisWheelGesture = false;
        if (this.snapCooldownId !== null) {
          clearTimeout(this.snapCooldownId);
          this.snapCooldownId = null;
        }
      };

      this.snapAnimRafId = requestAnimationFrame(animate);
    }

    clearSnapAnimation(): void {
      if (this.snapAnimRafId !== null && typeof cancelAnimationFrame !== 'undefined') {
        cancelAnimationFrame(this.snapAnimRafId);
      }
      this.snapAnimRafId = null;
      this.isProgrammaticCardScroll = false;
    }

    snapToCard(index: number): void {
      const clampedIndex = Math.max(0, Math.min(index, 3)) as 0 | 1 | 2 | 3;
      if (this.isSnapping()) return;

      this.snappingFromCard = this.activeCard();
      this.snappingToCard = clampedIndex;
      this.isSnapping.set(true);
      this.accumulatedWheelDelta = 0;
      this.goToCard(clampedIndex);

      if (this.snapCooldownId !== null) {
        clearTimeout(this.snapCooldownId);
      }
      this.snapCooldownId = setTimeout(() => {
        // animateScrollTo normally clears this first; timeout is only a safety net.
        if (this.snapAnimRafId === null) this.isSnapping.set(false);
        this.hasSnappedThisWheelGesture = false;
        this.snapCooldownId = null;
      }, 460);
    }

    getNearestCard(): 0 | 1 | 2 | 3 {
      const p = this.scrollProgress();
      const targets = [0.0, 0.42, 0.74, 1.0];
      let nearestIndex: 0 | 1 | 2 | 3 = 0;
      let minDiff = Infinity;
      for (let i = 0; i < targets.length; i++) {
        const diff = Math.abs(p - targets[i]);
        if (diff < minDiff) {
          minDiff = diff;
          nearestIndex = i as 0 | 1 | 2 | 3;
        }
      }
      return nearestIndex;
    }

    snapToNearestCard(): void {
      const nearest = this.getNearestCard();
      this.snapToCard(nearest);
    }

    snapToNearestIfPinned(): void {
      if (
        !this.isBrowser ||
        this.isNavigating() ||
        this.isSnapping() ||
        this.snapAnimRafId !== null
      ) {
        return;
      }

      const el = this.trackRef()?.nativeElement;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const stickyOffset = this.getStickyOffset();
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

      const isPinned = rect.top <= stickyOffset + 5 && rect.bottom >= windowHeight + 5;
      if (!isPinned) return;

      const p = this.scrollProgress();
      const targets = [0.0, 0.42, 0.74, 1.0];
      const nearestIndex = this.getNearestCard();
      const targetProgress = targets[nearestIndex];

      if (Math.abs(p - targetProgress) < 0.02) {
        return;
      }

      this.snapToCard(nearestIndex);
    }

    readonly onTrackWheel = (event: WheelEvent): void => {
      if (!this.isBrowser || this.isMobile() || this.isNavigating()) return;

      const el = this.trackRef()?.nativeElement;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const stickyOffset = this.getStickyOffset();
      const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
      const isPinned = rect.top <= stickyOffset + 5 && rect.bottom >= windowHeight + 5;
      if (!isPinned) return;

      const deltaY = event.deltaMode === 1
        ? event.deltaY * 16
        : event.deltaMode === 2
          ? event.deltaY * windowHeight
          : event.deltaY;
      if (Math.abs(deltaY) < 1) return;

      const incomingDirection: -1 | 1 = deltaY > 0 ? 1 : -1;
      const isAnimationRunning = this.isSnapping() || this.snapAnimRafId !== null;

      // Absorb same-direction momentum, but honor an explicit wheel reversal immediately.
      if (isAnimationRunning) {
        event.preventDefault();
        const snapDirection: -1 | 0 | 1 = this.snappingToCard > this.snappingFromCard
          ? 1
          : this.snappingToCard < this.snappingFromCard
            ? -1
            : 0;
        const expectedDirection = this.lastWheelDirection || snapDirection;

        if (expectedDirection !== 0 && incomingDirection !== expectedDirection) {
          const returnTo = this.snappingFromCard;
          this.clearSnapAnimation();
          if (this.snapCooldownId !== null) {
            clearTimeout(this.snapCooldownId);
            this.snapCooldownId = null;
          }
          this.isSnapping.set(false);
          this.accumulatedWheelDelta = 0;
          this.lastWheelDirection = incomingDirection;
          this.snapToCard(returnTo);
        }
        return;
      }

      const currentCard = this.activeCard();
      if ((deltaY < 0 && currentCard === 0) || (deltaY > 0 && currentCard === 3)) {
        this.resetWheelGesture();
        return;
      }

      event.preventDefault();
      if (this.lastWheelDirection !== 0 && incomingDirection !== this.lastWheelDirection) {
        this.accumulatedWheelDelta = 0;
      }
      this.lastWheelDirection = incomingDirection;

      if (this.wheelIdleTimeoutId !== null) {
        clearTimeout(this.wheelIdleTimeoutId);
      }
      this.wheelIdleTimeoutId = setTimeout(() => this.onWheelIdle(), 140);

      this.accumulatedWheelDelta += deltaY;
      const threshold = 10;
      if (this.accumulatedWheelDelta >= threshold && currentCard < 3) {
        this.accumulatedWheelDelta = 0;
        this.snapToCard((currentCard + 1) as 0 | 1 | 2 | 3);
      } else if (this.accumulatedWheelDelta <= -threshold && currentCard > 0) {
        this.accumulatedWheelDelta = 0;
        this.snapToCard((currentCard - 1) as 0 | 1 | 2 | 3);
      }
    };

    private onWheelIdle(): void {
      const currentCard = this.activeCard();
      if (!this.isSnapping() && this.snapAnimRafId === null) {
        if (this.accumulatedWheelDelta >= 5 && currentCard < 3) {
          this.snapToCard(currentCard + 1);
        } else if (this.accumulatedWheelDelta <= -5 && currentCard > 0) {
          this.snapToCard(currentCard - 1);
        } else {
          this.snapToNearestIfPinned();
        }
      }
      this.resetWheelGesture();
    }

    private resetWheelGesture(): void {
      if (this.wheelIdleTimeoutId !== null) {
        clearTimeout(this.wheelIdleTimeoutId);
        this.wheelIdleTimeoutId = null;
      }
      if (this.scrollSnapDebounceId !== null) {
        clearTimeout(this.scrollSnapDebounceId);
        this.scrollSnapDebounceId = null;
      }
      this.hasSnappedThisWheelGesture = false;
      this.accumulatedWheelDelta = 0;
      this.lastWheelDirection = 0;
    }

    readonly onTrackTouchStart = (event: TouchEvent): void => {
      if (event.touches.length > 0) {
        this.touchStartX = event.touches[0].clientX;
        this.touchStartY = event.touches[0].clientY;
      }
    };

    readonly onTrackTouchEnd = (event: TouchEvent): void => {
      if (event.changedTouches.length === 0) return;
      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;
      const diffX = touchEndX - this.touchStartX;
      const diffY = touchEndY - this.touchStartY;

      // Handle horizontal swipe gesture (swipe left / right to navigate cards)
      const isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40;
      if (isHorizontalSwipe) {
        if (diffX < 0) {
          // Swiped left -> next card
          this.nextCard();
        } else if (diffX > 0) {
          // Swiped right -> prev card
          this.prevCard();
        }
      }
    };
  }
