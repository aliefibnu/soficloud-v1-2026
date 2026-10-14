import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

export interface StackingCardInfo {
  readonly id: number;
  readonly key: string;
  readonly tabKey: string;
  readonly titleKey: string;
  readonly descKey: string;
  readonly badge: string;
}

export interface ProcessNode {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly subtitle: string;
  readonly iconType: 'cart' | 'procure' | 'inventory' | 'production' | 'gl' | 'project' | 'dashboard';
  readonly metric: string;
  readonly detail: string;
  readonly status: string;
}

export interface ApprovalItem {
  readonly id: number;
  readonly requestNo: string;
  readonly coa: string;
  readonly uom: string;
  readonly price: number;
  qty: number;
}

export interface PortfolioProject {
  readonly id: string;
  readonly name: string;
  readonly statusText: string;
  readonly category: 'completed' | 'in-progress';
  readonly progress: number;
  readonly budget: string;
  readonly cost: string;
  readonly variance: string;
}

@Component({
  selector: 'app-business-control',
  imports: [TranslatePipe],
  templateUrl: './business-control.html',
  styleUrl: './business-control.css',
  host: {
    class: 'block w-full',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class BusinessControl implements AfterViewInit, OnDestroy {
  protected readonly languageService = inject(LanguageService);
  protected readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly scrollTrackRef = viewChild<ElementRef<HTMLElement>>('scrollTrack');
  readonly cardsViewportRef = viewChild<ElementRef<HTMLElement>>('cardsViewport');

  private scrollListenerRemover: (() => void) | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private animationFrameId: number | null = null;

  /* =====================================================================
   * STACKING CARDS CONFIGURATION & ACTIVE STATE
   * ===================================================================== */
  readonly cards: readonly StackingCardInfo[] = [
    {
      id: 0,
      key: 'REALTIME',
      tabKey: 'BUSINESS_CONTROL.CARDS.REALTIME.TAB',
      titleKey: 'BUSINESS_CONTROL.CARDS.REALTIME.TITLE',
      descKey: 'BUSINESS_CONTROL.CARDS.REALTIME.DESC',
      badge: '01',
    },
    {
      id: 1,
      key: 'CONNECTED',
      tabKey: 'BUSINESS_CONTROL.CARDS.CONNECTED.TAB',
      titleKey: 'BUSINESS_CONTROL.CARDS.CONNECTED.TITLE',
      descKey: 'BUSINESS_CONTROL.CARDS.CONNECTED.DESC',
      badge: '02',
    },
    {
      id: 2,
      key: 'WORKFLOW',
      tabKey: 'BUSINESS_CONTROL.CARDS.WORKFLOW.TAB',
      titleKey: 'BUSINESS_CONTROL.CARDS.WORKFLOW.TITLE',
      descKey: 'BUSINESS_CONTROL.CARDS.WORKFLOW.DESC',
      badge: '03',
    },
    {
      id: 3,
      key: 'INSIGHT',
      tabKey: 'BUSINESS_CONTROL.CARDS.INSIGHT.TAB',
      titleKey: 'BUSINESS_CONTROL.CARDS.INSIGHT.TITLE',
      descKey: 'BUSINESS_CONTROL.CARDS.INSIGHT.DESC',
      badge: '04',
    },
  ];

  readonly activeCardIndex = signal<number>(0);
  readonly cardProgress = signal<readonly number[]>([1, 0, 0, 0]);

  /* =====================================================================
   * CARD 1: REAL-TIME INCOME & EXPENSE CHART (EXISTING FUNCTIONALITY)
   * ===================================================================== */
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

  readonly incomeAreaPath = computed<string>(() => {
    if (this.dataPoints.length === 0) return '';
    const firstX = this.dataPoints[0].x;
    const lastX = this.dataPoints[this.dataPoints.length - 1].x;
    const curve = this.incomePath();
    return `${curve} L ${lastX},${this.chartBottom} L ${firstX},${this.chartBottom} Z`;
  });

  readonly expenseAreaPath = computed<string>(() => {
    if (this.dataPoints.length === 0) return '';
    const firstX = this.dataPoints[0].x;
    const lastX = this.dataPoints[this.dataPoints.length - 1].x;
    const curve = this.expensePath();
    return `${curve} L ${lastX},${this.chartBottom} L ${firstX},${this.chartBottom} Z`;
  });

  readonly pointsWithCoords = computed(() => {
    return this.dataPoints.map((pt) => ({
      ...pt,
      incomeY: this.getYForValue(pt.income),
      expenseY: this.getYForValue(pt.expense),
    }));
  });

  /* =====================================================================
   * CARD 2: CONNECTED BUSINESS PROCESS (MONITOR + 7 PROCESS NODES)
   * ===================================================================== */
  readonly processNodes: readonly ProcessNode[] = [
    {
      id: '01',
      number: '01',
      title: 'Sales',
      subtitle: 'SO Confirmed',
      iconType: 'cart',
      metric: 'Rp 12,3M',
      detail: '128 SO confirmed hari ini. Alur otomatis meneruskan demand ke Procurement & Inventory.',
      status: 'Terhubung ke Procurement',
    },
    {
      id: '02',
      number: '02',
      title: 'Procurement',
      subtitle: 'MRP Demand',
      iconType: 'procure',
      metric: 'Rp 2,5M',
      detail: 'Kebutuhan material otomatis dikalkulasi dari Sales Order & jadwal Produksi tanpa input ulang.',
      status: 'Material Planning Aktif',
    },
    {
      id: '03',
      number: '03',
      title: 'Inventory',
      subtitle: 'Stock Allocated',
      iconType: 'inventory',
      metric: 'Rp 15,8M',
      detail: 'Stock dialokasikan secara real-time pada multi-warehouse, mencegah over-promising & delay.',
      status: 'Multi-Warehouse Sync',
    },
    {
      id: '04',
      number: '04',
      title: 'Production',
      subtitle: 'MO Released',
      iconType: 'production',
      metric: 'Rp 4,6M',
      detail: 'Manufacturing Order dilepas dengan routing & BOM presisi. Lacak progres shop floor instan.',
      status: 'Routing & BOM Terverifikasi',
    },
    {
      id: '05',
      number: '05',
      title: 'General Ledger',
      subtitle: 'Posted to GL',
      iconType: 'gl',
      metric: 'Jurnal Otomatis',
      detail: 'Setiap transaksi Sales, Pembelian, dan Biaya langsung tercatat di GL secara akurat.',
      status: 'Jurnal Terposting Real-Time',
    },
    {
      id: '06',
      number: '06',
      title: 'Project',
      subtitle: 'Project Initiated',
      iconType: 'project',
      metric: '14 Active',
      detail: 'Milestone proyek, pengadaan khusus, dan timesheet terikat langsung ke anggaran proyek.',
      status: 'Cost Control Terpantau',
    },
    {
      id: '07',
      number: '07',
      title: 'Dashboard',
      subtitle: 'Data Refreshed',
      iconType: 'dashboard',
      metric: '100% Live',
      detail: 'Executive summary & operasional tersinkronisasi detik demi detik untuk keputusan cepat.',
      status: 'Executive View Siaga',
    },
  ];

  readonly activeProcessNodeId = signal<string>('01');
  readonly selectedNode = computed<ProcessNode>(() => {
    const id = this.activeProcessNodeId();
    return this.processNodes.find((n) => n.id === id) ?? this.processNodes[0];
  });

  /* =====================================================================
   * CARD 3: STRUCTURED WORKFLOW & APPROVALS
   * ===================================================================== */
  readonly approvalStep = signal<number>(2); // 1: Manager, 2: Finance, 3: Director
  readonly approvalActionFeedback = signal<string | null>(null);

  readonly approvalItems = signal<ApprovalItem[]>([
    {
      id: 1,
      requestNo: 'Hotel Ticket - AWS',
      coa: '600.013 - Travel Expenses',
      uom: 'PIECES',
      price: 1800000,
      qty: 2,
    },
    {
      id: 2,
      requestNo: 'Flight Ticket - NS',
      coa: '600.013 - Travel Expenses',
      uom: 'PIECES',
      price: 2100000,
      qty: 2,
    },
  ]);

  readonly approvalTotal = computed<number>(() => {
    return this.approvalItems().reduce((acc, item) => acc + item.price * item.qty, 0);
  });

  /* =====================================================================
   * CARD 4: FINANCIAL & PROJECT REVENUE / COST CONTROL
   * ===================================================================== */
  readonly projectFilter = signal<'all' | 'in-progress' | 'completed'>('all');
  readonly selectedProjectName = signal<string | null>(null);

  readonly allProjects: readonly PortfolioProject[] = [
    {
      id: 'p1',
      name: 'Hauni Protos / M2607',
      statusText: 'Completed | 28.4% billed',
      category: 'completed',
      progress: 68.8,
      budget: 'Rp 4,20 M',
      cost: 'Rp 2,89 M',
      variance: '+18.4%',
    },
    {
      id: 'p2',
      name: 'Woodfire LNG / EH01',
      statusText: 'Completed | Fully billed',
      category: 'completed',
      progress: 72.3,
      budget: 'Rp 3,50 M',
      cost: 'Rp 2,53 M',
      variance: '+12.1%',
    },
    {
      id: 'p3',
      name: 'McLaren / MCD SUB1',
      statusText: 'In Progress',
      category: 'in-progress',
      progress: 43.0,
      budget: 'Rp 2,80 M',
      cost: 'Rp 1,20 M',
      variance: '+7.5%',
    },
    {
      id: 'p4',
      name: 'Tanggo / JBT-LYG1',
      statusText: 'Completed | Partially billed',
      category: 'completed',
      progress: 41.7,
      budget: 'Rp 1,50 M',
      cost: 'Rp 0,62 M',
      variance: '+5.0%',
    },
    {
      id: 'p5',
      name: 'Petrobras / PBR FPSO',
      statusText: 'In Progress',
      category: 'in-progress',
      progress: 6.3,
      budget: 'Rp 0,62 M',
      cost: 'Rp 0,04 M',
      variance: '+0.8%',
    },
  ];

  readonly filteredProjects = computed<readonly PortfolioProject[]>(() => {
    const filter = this.projectFilter();
    if (filter === 'all') return this.allProjects;
    return this.allProjects.filter((p) => p.category === filter);
  });

  /* =====================================================================
   * LIFECYCLE HOOKS & SCROLL DRIVER
   * ===================================================================== */
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initScrollDriver();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListenerRemover) {
      this.scrollListenerRemover();
      this.scrollListenerRemover = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.animationFrameId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private initScrollDriver(): void {
    const trackEl = this.scrollTrackRef()?.nativeElement;
    const viewportEl = this.cardsViewportRef()?.nativeElement;
    if (!trackEl || !viewportEl) return;

    const onScrollOrResize = (): void => {
      if (this.animationFrameId !== null) return;

      this.animationFrameId = requestAnimationFrame(() => {
        this.animationFrameId = null;
        this.updateScrollProgress(trackEl, viewportEl);
      });
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        onScrollOrResize();
      });
      this.resizeObserver.observe(trackEl);
    }

    this.scrollListenerRemover = () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };

    // Initial calculation
    onScrollOrResize();
  }

  private smoothEase(start: number, end: number, current: number): number {
    if (current <= start) return 0;
    if (current >= end) return 1;
    const t = (current - start) / (end - start);
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  private getStickyTopOffset(trackEl: HTMLElement): number {
    const stickyEl = trackEl.querySelector<HTMLElement>('.cards-sticky-frame');
    if (stickyEl && typeof window !== 'undefined') {
      const topStr = window.getComputedStyle(stickyEl).top;
      const parsed = parseFloat(topStr);
      if (!Number.isNaN(parsed) && parsed > 0) {
        return parsed;
      }
    }
    return 80;
  }

  private updateScrollProgress(trackEl: HTMLElement, viewportEl: HTMLElement): void {
    const rect = trackEl.getBoundingClientRect();
    const windowH = window.innerHeight;
    const stickyTop = this.getStickyTopOffset(trackEl);

    const scrollDistance = -rect.top + stickyTop;
    const maxScroll = rect.height - windowH;

    if (maxScroll <= 0) return;

    const rawProgress = Math.max(0, Math.min(scrollDistance / maxScroll, 1));

    // Snappy transitions with generous unstacked reading zones (~50% equivalent scroll space per card)
    // Card 1 rest / read: [0.00, 0.21] (~115vh uncovered)
    // Card 2 snaps in: [0.21, 0.24] (~16.5vh) | Card 2 rest / read: [0.24, 0.47] (~126vh uncovered by Card 3)
    // Card 3 snaps in: [0.47, 0.50] (~16.5vh) | Card 3 rest / read: [0.50, 0.73] (~126vh uncovered by Card 4)
    // Card 4 snaps in: [0.73, 0.76] (~16.5vh) | Card 4 rest / read: [0.76, 1.00] (~132vh uncovered)
    const p2 = this.smoothEase(0.21, 0.24, rawProgress);
    const p3 = this.smoothEase(0.47, 0.50, rawProgress);
    const p4 = this.smoothEase(0.73, 0.76, rawProgress);

    const card2TranslateX = (1 - p2) * 100;
    const card3TranslateX = (1 - p3) * 100;
    const card4TranslateX = (1 - p4) * 100;

    // Subtle scale down and opacity for covered cards underneath
    const card1Scale = 1 - 0.035 * p2;
    const card1Opacity = 1 - 0.08 * p2;

    const card2Scale = 1 - 0.035 * p3;
    const card2Opacity = 1 - 0.08 * p3;

    const card3Scale = 1 - 0.035 * p4;
    const card3Opacity = 1 - 0.08 * p4;

    viewportEl.style.setProperty('--card2-x', `${card2TranslateX.toFixed(2)}%`);
    viewportEl.style.setProperty('--card3-x', `${card3TranslateX.toFixed(2)}%`);
    viewportEl.style.setProperty('--card4-x', `${card4TranslateX.toFixed(2)}%`);

    // Prevent shadow from encroaching into previous card when waiting offscreen
    viewportEl.style.setProperty('--card2-shadow', p2 > 0.005 ? '1' : '0');
    viewportEl.style.setProperty('--card3-shadow', p3 > 0.005 ? '1' : '0');
    viewportEl.style.setProperty('--card4-shadow', p4 > 0.005 ? '1' : '0');

    viewportEl.style.setProperty('--card1-scale', card1Scale.toFixed(3));
    viewportEl.style.setProperty('--card1-opacity', card1Opacity.toFixed(3));
    viewportEl.style.setProperty('--card2-scale', card2Scale.toFixed(3));
    viewportEl.style.setProperty('--card2-opacity', card2Opacity.toFixed(3));
    viewportEl.style.setProperty('--card3-scale', card3Scale.toFixed(3));
    viewportEl.style.setProperty('--card3-opacity', card3Opacity.toFixed(3));

    this.cardProgress.set([1, p2, p3, p4]);

    // Determine current active card index
    if (p4 > 0.5) {
      this.activeCardIndex.set(3);
    } else if (p3 > 0.5) {
      this.activeCardIndex.set(2);
    } else if (p2 > 0.5) {
      this.activeCardIndex.set(1);
    } else {
      this.activeCardIndex.set(0);
    }
  }

  scrollToCard(targetIndex: number): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const trackEl = this.scrollTrackRef()?.nativeElement;
    if (!trackEl) return;

    const rect = trackEl.getBoundingClientRect();
    const scrollY = window.scrollY;
    const trackTop = rect.top + scrollY;
    const windowH = window.innerHeight;
    const maxScroll = rect.height - windowH;
    const stickyTop = this.getStickyTopOffset(trackEl);

    // Fractional scroll positions targeting the rest zone (jeda) of each card
    const targetProgress = [0.10, 0.35, 0.61, 0.88][targetIndex] ?? 0;
    const targetScrollY = trackTop - stickyTop + targetProgress * maxScroll;

    window.scrollTo({
      top: Math.max(0, targetScrollY),
      behavior: 'smooth',
    });

    this.activeCardIndex.set(targetIndex);
  }

  nextCard(): void {
    const current = this.activeCardIndex();
    if (current < this.cards.length - 1) {
      this.scrollToCard(current + 1);
    }
  }

  prevCard(): void {
    const current = this.activeCardIndex();
    if (current > 0) {
      this.scrollToCard(current - 1);
    }
  }

  /* =====================================================================
   * CARD 1: CHART METHODS
   * ===================================================================== */
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

      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
    }

    return path;
  }

  /* =====================================================================
   * CARD 2: CONNECTED PROCESS METHODS
   * ===================================================================== */
  selectProcessNode(id: string): void {
    this.activeProcessNodeId.set(id);
  }

  /* =====================================================================
   * CARD 3: WORKFLOW & APPROVAL METHODS
   * ===================================================================== */
  approveStep(): void {
    const current = this.approvalStep();
    if (current < 3) {
      this.approvalStep.set(current + 1);
      this.showFeedback(
        current === 1
          ? 'Disetujui oleh Marketing Manager ✓'
          : current === 2
            ? 'Disetujui oleh Accounting & Finance ✓'
            : 'Persetujuan Selesai ✓'
      );
    } else {
      // Completed, toggle back or notify
      this.showFeedback('Semua tahapan persetujuan telah diselesaikan ✓');
    }
  }

  resetApproval(): void {
    this.approvalStep.set(1);
    this.showFeedback('Alur persetujuan direset ke status awal');
  }

  updateItemQty(id: number, delta: number): void {
    this.approvalItems.update((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, Math.min(item.qty + delta, 99));
          return { ...item, qty: newQty };
        }
        return item;
      })
    );
  }

  private showFeedback(message: string): void {
    this.approvalActionFeedback.set(message);
    setTimeout(() => {
      this.approvalActionFeedback.set(null);
    }, 2500);
  }

  /* =====================================================================
   * CARD 4: FINANCIAL & PROJECT METHODS
   * ===================================================================== */
  setProjectFilter(filter: 'all' | 'in-progress' | 'completed'): void {
    this.projectFilter.set(filter);
  }

  toggleProjectSelection(name: string): void {
    if (this.selectedProjectName() === name) {
      this.selectedProjectName.set(null);
    } else {
      this.selectedProjectName.set(name);
    }
  }
}
