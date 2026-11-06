import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { BusinessControl } from './business-control';
import { LanguageService } from '../../../systems/lib/language.service';
import { provideCustomImageLoader } from '../../../systems/lib/image-loader';

describe('BusinessControl', () => {
  let component: BusinessControl;
  let fixture: ComponentFixture<BusinessControl>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessControl],
      providers: [
        provideRouter([]),
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
        LanguageService,
        provideCustomImageLoader(),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);

    translateService.setTranslation('id', {
      BUSINESS_CONTROL: {
        HEADER_TITLE: 'Kendalikan Bisnis Dari Satu Tempat',
        CARD_TITLE: 'Real-Time Business Control',
        CARD_BADGE: 'REAL-TIME',
        CHART_TITLE: 'INCOME AND EXPENSIVE (IDR)',
        EXPENSE: 'Expense',
        INCOME: 'Income',
        CONTENT_TITLE: 'Pantau Bisnis Secara Real-Time Untuk Keputusan Yang Lebih Cepat',
        CONTENT_DESC:
          'Sales, cash position, inventory alert, outstanding process, production, project, dan KPI bisnis tersedia dalam satu management view.',
        CTA_BUTTON: 'Lihat Kapabilitas',
        CARDS: {
          REALTIME: {
            TAB: 'Monitoring Real-Time',
            TITLE: 'Pantau Bisnis Secara Real-Time Untuk Keputusan Yang Lebih Cepat.',
            DESC: 'Sales, cash position, inventory alert, outstanding process, production, project, dan KPI bisnis tersedia dalam satu management view.',
          },
          CONNECTED: {
            TAB: 'Proses Terhubung',
            TITLE: 'Seluruh Proses\nBisnis Terhubung\nDalam Satu\nSistem.',
            DESC: 'Data mengalir dari Sales ke Procurement, Inventory, Manufacturing, Project, hingga Finance & Accounting tanpa input berulang.',
          },
          WORKFLOW: {
            TAB: 'Workflow & Approval',
            TITLE: 'Workflow & Approval Terstruktur Sesuai Kebijakan Perusahaan.',
            DESC: 'Dokumen bergerak melalui tahapan Diajukan, Ditinjau, Disetujui, Diproses, dan Selesai, lengkap dengan approval chain serta audit trail.',
          },
          INSIGHT: {
            TAB: 'Insight Keuangan',
            TITLE: 'Insight Keuangan Dan Biaya Untuk Keputusan Yang Lebih Cerdas.',
            DESC: 'Revenue, gross margin, cash flow, AR/AP, inventory value, budget versus actual, cost, dan profitability dapat dianalisa dalam satu financial surface.',
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(BusinessControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    component.stopAutoPlay();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header title without a subtitle', () => {
    const heading = fixture.debugElement.nativeElement.querySelector('h2');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toContain('Kendalikan Bisnis Dari Satu Tempat');

    const headerContainer = heading.parentElement;
    expect(headerContainer.querySelector('p')).toBeNull();
  });

  it('should toggle expense visibility correctly', () => {
    expect(component.isExpenseVisible()).toBe(true);
    component.toggleExpense();
    expect(component.isExpenseVisible()).toBe(false);
    component.toggleExpense();
    expect(component.isExpenseVisible()).toBe(true);
  });

  it('should toggle income visibility correctly', () => {
    expect(component.isIncomeVisible()).toBe(true);
    component.toggleIncome();
    expect(component.isIncomeVisible()).toBe(false);
    component.toggleIncome();
    expect(component.isIncomeVisible()).toBe(true);
  });

  it('should update hoveredIndex and compute activePoint', () => {
    component.setHoveredIndex(3);
    expect(component.hoveredIndex()).toBe(3);
    expect(component.activePointIndex()).toBe(3);
    expect(component.activePoint()?.id).toBe(3);

    component.setHoveredIndex(null);
    expect(component.hoveredIndex()).toBeNull();
    expect(component.activePointIndex()).toBe(component.selectedIndex() ?? 6);
  });

  it('should select point on click', () => {
    component.selectPoint(2);
    expect(component.selectedIndex()).toBe(2);
  });

  it('should toggle and close menu', () => {
    const mockEvent = {
      stopPropagation: () => {},
    } as unknown as MouseEvent;

    expect(component.isMenuOpen()).toBe(false);
    component.toggleMenu(mockEvent);
    expect(component.isMenuOpen()).toBe(true);
    component.closeMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should reset view to default state', () => {
    component.isExpenseVisible.set(false);
    component.isIncomeVisible.set(false);
    component.selectedIndex.set(1);
    component.hoveredIndex.set(4);
    component.isMenuOpen.set(true);

    component.resetView();

    expect(component.isExpenseVisible()).toBe(true);
    expect(component.isIncomeVisible()).toBe(true);
    expect(component.selectedIndex()).toBe(6);
    expect(component.hoveredIndex()).toBeNull();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should compute valid Catmull-Rom spline paths', () => {
    expect(component.incomePath()).toContain('M 85.0,');
    expect(component.expensePath()).toContain('M 85.0,');
    expect(component.incomePath()).toContain('C ');
    expect(component.expensePath()).toContain('C ');
  });

  it('should format currency accurately in IDR', () => {
    const formatted = component.formatCurrency(460);
    expect(formatted).toContain('460');
  });

  it('should close menu on document click outside container', () => {
    component.isMenuOpen.set(true);
    const mockEvent = {
      target: document.createElement('div'),
    } as unknown as MouseEvent;
    component.onDocumentClick(mockEvent);
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should contain all required project cost items and KPI metrics', () => {
    expect(component.projectCostItems.length).toBe(5);
    expect(component.projectKpiMetrics.length).toBe(4);
    expect(component.projectCostItems[0].name).toBe('Hauni Protos /M2607');
    expect(component.projectCostItems[1].name).toBe('Woodfire LNG / EH01');
    expect(component.projectCostItems[2].name).toBe('McLaren / MCD SUB1');
    expect(component.projectCostItems[3].name).toBe('Tanggo / JBT-LYG1');
    expect(component.projectCostItems[4].name).toBe('Petrobras / PBR FPSO');
  });

  it('should contain all 7 required process cards with valid steps and assets', () => {
    expect(component.processCards.length).toBe(7);
    const steps = component.processCards.map((c) => c.step);
    expect(steps).toEqual(['01', '02', '03', '04', '05', '06', '07']);

    expect(component.salesCard.title).toBe('Sales');
    expect(component.procurementCard.title).toBe('Procurement');
    expect(component.inventoryCard.title).toBe('Inventory');
    expect(component.productionCard.title).toBe('Production');
    expect(component.generalLedgerCard.title).toBe('General Ledger');
    expect(component.projectCard.title).toBe('Project');
    expect(component.dashboardCard.title).toBe('Dashboard');
  });

  describe('Carousel Navigation & Controls', () => {
    it('should start at card 0 by default', () => {
      expect(component.activeCard()).toBe(0);
    });

    it('should cycle forward and wrap around from card 3 to card 0 on nextCard()', () => {
      expect(component.activeCard()).toBe(0);
      component.nextCard();
      expect(component.activeCard()).toBe(1);
      component.nextCard();
      expect(component.activeCard()).toBe(2);
      component.nextCard();
      expect(component.activeCard()).toBe(3);
      component.nextCard();
      expect(component.activeCard()).toBe(0);
    });

    it('should cycle backward and wrap around from card 0 to card 3 on prevCard()', () => {
      expect(component.activeCard()).toBe(0);
      component.prevCard();
      expect(component.activeCard()).toBe(3);
      component.prevCard();
      expect(component.activeCard()).toBe(2);
      component.prevCard();
      expect(component.activeCard()).toBe(1);
      component.prevCard();
      expect(component.activeCard()).toBe(0);
    });

    it('should navigate directly to a specific card via goToCard() with circular wrapping', () => {
      component.goToCard(2);
      expect(component.activeCard()).toBe(2);

      component.goToCard(4);
      expect(component.activeCard()).toBe(0);

      component.goToCard(-1);
      expect(component.activeCard()).toBe(3);
    });

    it('should compute horizontal slide transforms via getCardTransform', () => {
      component.goToCard(1);
      expect(component.getCardTransform(0)).toBe('translate3d(-100%, 0, 0)');
      expect(component.getCardTransform(1)).toBe('translate3d(0%, 0, 0)');
      expect(component.getCardTransform(2)).toBe('translate3d(100%, 0, 0)');
      expect(component.getCardTransform(3)).toBe('translate3d(200%, 0, 0)');
    });

    it('should render 4 circular indicator buttons with active and inactive shadows', async () => {
      component.goToCard(0);
      fixture.detectChanges();
      await fixture.whenStable();

      const indicatorButtons = fixture.nativeElement.querySelectorAll(
        'button[aria-label^="Go to card"]',
      );
      expect(indicatorButtons.length).toBe(4);

      expect(indicatorButtons[0].className).toContain('shadow-[0_2px_10px_#649cead9]');
      expect(indicatorButtons[1].className).toContain('shadow-[0_2px_6px_#23244e30]');
      expect(indicatorButtons[2].className).toContain('shadow-[0_2px_6px_#23244e30]');
      expect(indicatorButtons[3].className).toContain('shadow-[0_2px_6px_#23244e30]');

      indicatorButtons[2].click();
      fixture.detectChanges();
      expect(component.activeCard()).toBe(2);
      expect(indicatorButtons[2].className).toContain('shadow-[0_2px_10px_#649cead9]');
    });

    it('should render Previous and Next arrow buttons with the arrow SVG gradient and navigate on click', () => {
      const prevBtn = fixture.nativeElement.querySelector(
        'button[aria-label="Previous card"]',
      ) as HTMLButtonElement;
      const nextBtn = fixture.nativeElement.querySelector(
        'button[aria-label="Next card"]',
      ) as HTMLButtonElement;

      expect(prevBtn).toBeTruthy();
      expect(nextBtn).toBeTruthy();
      expect(prevBtn.querySelector('svg path[fill="url(#business-control-arrow-gradient)"]')).toBeTruthy();
      expect(nextBtn.querySelector('svg path[fill="url(#business-control-arrow-gradient)"]')).toBeTruthy();

      nextBtn.click();
      expect(component.activeCard()).toBe(1);

      prevBtn.click();
      expect(component.activeCard()).toBe(0);
    });

    it('should navigate to next card on horizontal touch swipe left and prev card on swipe right', () => {
      component.goToCard(0);

      component.onTouchStart({
        touches: [{ clientX: 200, clientY: 150 }],
      } as unknown as TouchEvent);
      component.onTouchEnd({
        changedTouches: [{ clientX: 110, clientY: 155 }],
      } as unknown as TouchEvent);
      expect(component.activeCard()).toBe(1);

      component.onTouchStart({
        touches: [{ clientX: 110, clientY: 150 }],
      } as unknown as TouchEvent);
      component.onTouchEnd({
        changedTouches: [{ clientX: 200, clientY: 145 }],
      } as unknown as TouchEvent);
      expect(component.activeCard()).toBe(0);
    });

    it('should ignore vertical touch gestures in swipe handler', () => {
      component.goToCard(1);

      component.onTouchStart({
        touches: [{ clientX: 100, clientY: 200 }],
      } as unknown as TouchEvent);
      component.onTouchEnd({
        changedTouches: [{ clientX: 110, clientY: 100 }],
      } as unknown as TouchEvent);

      expect(component.activeCard()).toBe(1);
    });

    it('should navigate on mouse drag left and right', () => {
      component.goToCard(0);

      component.onMouseDown({ clientX: 300, clientY: 200 } as unknown as MouseEvent);
      component.onMouseUp({ clientX: 200, clientY: 205 } as unknown as MouseEvent);
      expect(component.activeCard()).toBe(1);

      component.onMouseDown({ clientX: 200, clientY: 200 } as unknown as MouseEvent);
      component.onMouseUp({ clientX: 300, clientY: 205 } as unknown as MouseEvent);
      expect(component.activeCard()).toBe(0);
    });

    it('should auto-play every 5 seconds and pause on mouseenter / resume on mouseleave', () => {
      vi.useFakeTimers();
      component.goToCard(0);
      component.startAutoPlay();

      vi.advanceTimersByTime(5000);
      expect(component.activeCard()).toBe(1);

      component.onMouseEnter();
      expect(component.isHovered()).toBe(true);
      vi.advanceTimersByTime(10000);
      expect(component.activeCard()).toBe(1);

      component.onMouseLeave();
      expect(component.isHovered()).toBe(false);
      vi.advanceTimersByTime(5000);
      expect(component.activeCard()).toBe(2);

      component.stopAutoPlay();
      vi.useRealTimers();
    });

    it('should link the real-time card CTA button to /business-realtime', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const ctaLink = compiled.querySelector(
        'a[routerlink="/business-realtime"], a[href="/business-realtime"]',
      );
      expect(ctaLink).toBeTruthy();
      expect(ctaLink?.getAttribute('routerlink') || ctaLink?.getAttribute('href')).toBe(
        '/business-realtime',
      );
    });

    it('should link the connected-process card CTA button to /connected-process', () => {
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      const ctaLink = compiled.querySelector(
        'a[routerlink="/connected-process"], a[href="/connected-process"]',
      );
      expect(ctaLink).toBeTruthy();
      expect(ctaLink?.getAttribute('routerlink') || ctaLink?.getAttribute('href')).toBe(
        '/connected-process',
      );
    });
  });
});
