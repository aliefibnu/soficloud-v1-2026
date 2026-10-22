import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { BusinessControl } from './business-control';
import { LanguageService } from '../../../systems/lib/language.service';
import { provideCustomImageLoader } from '../../../systems/lib/image-loader';

describe('BusinessControl', () => {
  let component: BusinessControl;
  let fixture: ComponentFixture<BusinessControl>;
  let languageService: LanguageService;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessControl],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
        LanguageService,
        provideCustomImageLoader(),
      ],
    }).compileComponents();

    languageService = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);

    translateService.setTranslation('id', {
      BUSINESS_CONTROL: {
        HEADER_TITLE: 'Kendalikan Bisnis Dari Satu Tempat',
        HEADER_SUBTITLE:
          'Pilih area yang ingin dilihat. Setiap proses terhubung ke data yang sama dan selalu dapat ditelusuri.',
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
            TITLE: 'Seluruh Proses Bisnis Terhubung Dalam Satu Sistem.',
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

  it('should create the component', () => {
    expect(component).toBeTruthy();
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

  it('should have initial scroll-driven state at progress 0 with card 1 active and text 1 visible', () => {
    component.setScrollProgress(0);
    expect(component.scrollProgress()).toBe(0);
    expect(component.progress12()).toBe(0);
    expect(component.progress23()).toBe(0);
    expect(component.progress34()).toBe(0);
    expect(component.activeCard()).toBe(0);
    expect(component.text1Opacity()).toBe(1);
    expect(component.text2Opacity()).toBe(0);
    expect(component.text3Opacity()).toBe(0);
    expect(component.text4Opacity()).toBe(0);
    expect(component.card1Opacity()).toBe(1);
    expect(component.card2Opacity()).toBe(0);
    expect(component.card3Opacity()).toBe(0);
    expect(component.card4Opacity()).toBe(0);
    expect(component.card1Transform()).toContain('translate3d(0, 0.0px, 0)');
    expect(component.card2Transform()).toContain('translate3d(0, 100.0px, 0)');
    expect(component.card3Transform()).toContain('translate3d(0, 100.0px, 0)');
    expect(component.card4Transform()).toContain('translate3d(0, 100.0px, 0)');
  });

  it('should keep card 1 settled and not start stacking while progress is below 0.14 in center screen', () => {
    component.setScrollProgress(0.1);
    expect(component.progress12()).toBe(0);
    expect(component.progress23()).toBe(0);
    expect(component.progress34()).toBe(0);
    expect(component.activeCard()).toBe(0);
    expect(component.card1Transform()).toContain('translate3d(0, 0.0px, 0)');
    expect(component.card2Transform()).toContain('translate3d(0, 100.0px, 0)');
    expect(component.card2Opacity()).toBe(0);
  });

  it('should transition to card 2 covering card 1 and text 2 fading in around progress 0.42', () => {
    component.setScrollProgress(0.42);
    expect(component.progress12()).toBe(1);
    expect(component.progress23()).toBe(0);
    expect(component.progress34()).toBe(0);
    expect(component.activeCard()).toBe(1);
    expect(component.text1Opacity()).toBe(0);
    expect(component.text2Opacity()).toBe(1);
    expect(component.text3Opacity()).toBe(0);
    expect(component.text4Opacity()).toBe(0);
    expect(component.card1Opacity()).toBeCloseTo(0.85, 2);
    expect(component.card2Opacity()).toBe(1);
    expect(component.card3Opacity()).toBe(0);
    expect(component.card4Opacity()).toBe(0);

    // Tiered stack positioning: Card 1 peeks at -14px, Card 2 at 0px
    expect(component.card1Transform()).toContain('translate3d(0, -14.0px, 0)');
    expect(component.card2Transform()).toContain('translate3d(0, 0.0px, 0)');
  });

  it('should transition to card 3 covering card 2 and text 3 fading in around progress 0.74', () => {
    component.setScrollProgress(0.74);
    expect(component.progress12()).toBe(1);
    expect(component.progress23()).toBe(1);
    expect(component.progress34()).toBe(0);
    expect(component.activeCard()).toBe(2);
    expect(component.text1Opacity()).toBe(0);
    expect(component.text2Opacity()).toBe(0);
    expect(component.text3Opacity()).toBe(1);
    expect(component.text4Opacity()).toBe(0);
    expect(component.card1Opacity()).toBeCloseTo(0.7, 2);
    expect(component.card2Opacity()).toBeCloseTo(0.85, 2);
    expect(component.card3Opacity()).toBe(1);
    expect(component.card4Opacity()).toBe(0);

    // Tiered stack positioning: Card 1 at -28px, Card 2 at -14px, Card 3 at 0px
    expect(component.card1Transform()).toContain('translate3d(0, -28.0px, 0)');
    expect(component.card2Transform()).toContain('translate3d(0, -14.0px, 0)');
    expect(component.card3Transform()).toContain('translate3d(0, 0.0px, 0)');
  });

  it('should transition to card 4 covering card 3 and text 4 fading in at progress 1.0', () => {
    component.setScrollProgress(1);
    expect(component.progress12()).toBe(1);
    expect(component.progress23()).toBe(1);
    expect(component.progress34()).toBe(1);
    expect(component.activeCard()).toBe(3);
    expect(component.text1Opacity()).toBe(0);
    expect(component.text2Opacity()).toBe(0);
    expect(component.text3Opacity()).toBe(0);
    expect(component.text4Opacity()).toBe(1);
    expect(component.card1Opacity()).toBeCloseTo(0.55, 2);
    expect(component.card2Opacity()).toBeCloseTo(0.7, 2);
    expect(component.card3Opacity()).toBeCloseTo(0.85, 2);
    expect(component.card4Opacity()).toBe(1);

    // Tiered stack positioning: Card 1 at -42px, Card 2 at -28px, Card 3 at -14px, Card 4 at 0px
    expect(component.card1Transform()).toContain('translate3d(0, -42.0px, 0)');
    expect(component.card2Transform()).toContain('translate3d(0, -28.0px, 0)');
    expect(component.card3Transform()).toContain('translate3d(0, -14.0px, 0)');
    expect(component.card4Transform()).toContain('translate3d(0, 0.0px, 0)');
  });

  it('should smoothly interpolate values during mid-scroll progress and ensure all 4 text opacities sum to 1', () => {
    // Transition 1 midpoint
    component.setScrollProgress(0.26);
    expect(component.progress12()).toBeGreaterThan(0);
    expect(component.progress12()).toBeLessThan(1);
    expect(
      component.text1Opacity() +
        component.text2Opacity() +
        component.text3Opacity() +
        component.text4Opacity(),
    ).toBeCloseTo(1, 4);

    // Transition 2 midpoint
    component.setScrollProgress(0.58);
    expect(component.progress23()).toBeGreaterThan(0);
    expect(component.progress23()).toBeLessThan(1);
    expect(
      component.text1Opacity() +
        component.text2Opacity() +
        component.text3Opacity() +
        component.text4Opacity(),
    ).toBeCloseTo(1, 4);

    // Transition 3 midpoint
    component.setScrollProgress(0.88);
    expect(component.progress34()).toBeGreaterThan(0);
    expect(component.progress34()).toBeLessThan(1);
    expect(
      component.text1Opacity() +
        component.text2Opacity() +
        component.text3Opacity() +
        component.text4Opacity(),
    ).toBeCloseTo(1, 4);
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

  it('should call window.scrollTo when goToCard is triggered', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    component.goToCard(1);
    expect(scrollToSpy).toHaveBeenCalled();
    scrollToSpy.mockRestore();
  });

  it('should set isSnapping and call goToCard when snapToCard is called', () => {
    const goToSpy = vi.spyOn(component, 'goToCard').mockImplementation(() => {});
    expect(component.isSnapping()).toBe(false);
    component.snapToCard(2);
    expect(component.isSnapping()).toBe(true);
    expect(goToSpy).toHaveBeenCalledWith(2);

    // Calling again while snapping should be ignored
    component.snapToCard(3);
    expect(goToSpy).toHaveBeenCalledTimes(1);
    goToSpy.mockRestore();
  });

  it('should handle wheel scroll down and up when pinned in showcase', () => {
    const snapSpy = vi.spyOn(component, 'snapToCard').mockImplementation(() => {});
    const mockTrack = document.createElement('div');
    Object.defineProperty(mockTrack, 'getBoundingClientRect', {
      value: () => ({ top: 70, bottom: 2500, height: 2430 }),
    });
    Object.defineProperty(component, 'trackRef', {
      value: () => ({ nativeElement: mockTrack }),
    });

    const preventDefault = vi.fn();
    // Scroll down at card 0 -> snaps to card 1
    component.setScrollProgress(0);
    component.onTrackWheel({ deltaY: 50, preventDefault } as unknown as WheelEvent);
    expect(preventDefault).toHaveBeenCalled();
    expect(snapSpy).toHaveBeenCalledWith(1);

    // Scroll up at card 2 -> snaps to card 1
    component.setScrollProgress(0.74);
    component.onTrackWheel({ deltaY: -50, preventDefault } as unknown as WheelEvent);
    expect(snapSpy).toHaveBeenCalledWith(1);

    // Touchpad multi-packet test: micro-deltas (3, 4, 3) accumulate and snap to card 2
    snapSpy.mockClear();
    component.setScrollProgress(0.42); // at card 1
    component.onTrackWheel({ deltaY: 3, preventDefault } as unknown as WheelEvent);
    component.onTrackWheel({ deltaY: 4, preventDefault } as unknown as WheelEvent);
    expect(snapSpy).not.toHaveBeenCalled();
    component.onTrackWheel({ deltaY: 3, preventDefault } as unknown as WheelEvent);
    expect(snapSpy).toHaveBeenCalledWith(2);

    // Touchpad direction reversal test: immediately scrolling up after scrolling down cancels lock and snaps up
    snapSpy.mockClear();
    component.setScrollProgress(0.74); // at card 2
    component.onTrackWheel({ deltaY: -3, preventDefault } as unknown as WheelEvent);
    component.onTrackWheel({ deltaY: -4, preventDefault } as unknown as WheelEvent);
    component.onTrackWheel({ deltaY: -3, preventDefault } as unknown as WheelEvent);
    expect(snapSpy).toHaveBeenCalledWith(1);

    snapSpy.mockRestore();
  });

  it('should allow native scroll to exit section at upper and lower boundaries', () => {
    const snapSpy = vi.spyOn(component, 'snapToCard').mockImplementation(() => {});
    const mockTrack = document.createElement('div');
    Object.defineProperty(mockTrack, 'getBoundingClientRect', {
      value: () => ({ top: 70, bottom: 2500, height: 2430 }),
    });
    Object.defineProperty(component, 'trackRef', {
      value: () => ({ nativeElement: mockTrack }),
    });

    const preventDefault = vi.fn();
    // At card 0, scrolling up (deltaY < 0) -> does NOT preventDefault (exits smoothly upward)
    component.setScrollProgress(0);
    component.onTrackWheel({ deltaY: -50, preventDefault } as unknown as WheelEvent);
    expect(preventDefault).not.toHaveBeenCalled();
    expect(snapSpy).not.toHaveBeenCalled();

    // At card 3, scrolling down (deltaY > 0) -> does NOT preventDefault (exits smoothly downward)
    component.setScrollProgress(1);
    component.onTrackWheel({ deltaY: 50, preventDefault } as unknown as WheelEvent);
    expect(preventDefault).not.toHaveBeenCalled();
    expect(snapSpy).not.toHaveBeenCalled();

    snapSpy.mockRestore();
  });

  describe('Anchor Navigation & Stacking Section Interactivity', () => {
    beforeEach(() => {
      // Mock trackRef element bounding rect
      const mockTrack = document.createElement('div');
      Object.defineProperty(mockTrack, 'getBoundingClientRect', {
        value: () => ({
          top: 800,
          bottom: 4800,
          height: 4000,
          left: 0,
          right: 1200,
          width: 1200,
          x: 0,
          y: 800,
          toJSON: () => {},
        }),
        configurable: true,
      });

      // Override viewChild trackRef
      Object.defineProperty(component, 'trackRef', {
        value: () => ({ nativeElement: mockTrack }),
        configurable: true,
      });

      // Default window scrollY and innerHeight
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
      Object.defineProperty(window, 'innerHeight', {
        value: 800,
        writable: true,
        configurable: true,
      });
    });

    it('should immediately set scrollProgress to 1 and isNavigating to true when anchor is below stacking section', () => {
      window.scrollY = 0; // At top of page (above section)
      component.setScrollProgress(0);

      // Trigger navigation to #features (known below)
      component.checkAndHandleAnchor('features');

      expect(component.isNavigating()).toBe(true);
      expect(component.scrollProgress()).toBe(1);
      expect(component.activeCard()).toBe(3);
    });

    it('should immediately set scrollProgress to 0 and isNavigating to true when anchor is above stacking section', () => {
      window.scrollY = 5000; // Past the section
      component.setScrollProgress(1);

      // Trigger navigation to #hero (above)
      component.checkAndHandleAnchor('hero');

      expect(component.isNavigating()).toBe(true);
      expect(component.scrollProgress()).toBe(0);
      expect(component.activeCard()).toBe(0);
    });

    it('should NOT update scrollProgress during intermediate scroll events while isNavigating is true', () => {
      component.startAnchorNavigation(1);
      expect(component.scrollProgress()).toBe(1);

      // Simulate intermediate scroll event
      const updateSpy = vi.spyOn(component, 'updateScrollProgress');
      component.onWindowScroll();

      expect(component.scrollProgress()).toBe(1);
      expect(updateSpy).not.toHaveBeenCalled();
      updateSpy.mockRestore();
    });

    it('should finish anchor navigation and re-synchronize scrollProgress on onScrollEnd', () => {
      component.startAnchorNavigation(1);
      expect(component.isNavigating()).toBe(true);

      const updateSpy = vi.spyOn(component, 'updateScrollProgress');
      component.onScrollEnd();

      expect(component.isNavigating()).toBe(false);
      expect(updateSpy).toHaveBeenCalled();
      updateSpy.mockRestore();
    });

    it('should immediately finish anchor navigation and hand back control on user scroll interruption (wheel / touchstart)', () => {
      component.startAnchorNavigation(1);
      expect(component.isNavigating()).toBe(true);

      const updateSpy = vi.spyOn(component, 'updateScrollProgress');
      component.onUserScrollInterruption();

      expect(component.isNavigating()).toBe(false);
      expect(updateSpy).toHaveBeenCalled();
      updateSpy.mockRestore();
    });

    it('should intercept anchor clicks on document and trigger checkAndHandleAnchor', () => {
      const checkSpy = vi.spyOn(component, 'checkAndHandleAnchor');

      const anchor = document.createElement('a');
      anchor.setAttribute('href', '#features');
      document.body.appendChild(anchor);

      const clickEvent = new MouseEvent('click', { bubbles: true });
      anchor.dispatchEvent(clickEvent);
      component.onDocumentClick(clickEvent);

      expect(checkSpy).toHaveBeenCalledWith('features');

      checkSpy.mockRestore();
      document.body.removeChild(anchor);
    });

    it('should handle repeated anchor clicks by clearing timers and applying new target', () => {
      component.checkAndHandleAnchor('features');
      expect(component.scrollProgress()).toBe(1);

      window.scrollY = 3000;
      component.checkAndHandleAnchor('hero');
      expect(component.scrollProgress()).toBe(0);
    });

    it('should clean up navigation timers on destroy', () => {
      component.startAnchorNavigation(1);
      const clearSpy = vi.spyOn(component, 'clearNavTimers');

      component.ngOnDestroy();

      expect(clearSpy).toHaveBeenCalled();
      clearSpy.mockRestore();
    });
  });

  it('should reverse an in-flight snap instead of swallowing the opposite mouse-wheel direction', () => {
    const snapSpy = vi.spyOn(component, 'goToCard').mockImplementation(() => {});
    const mockTrack = document.createElement('div');

    Object.defineProperty(mockTrack, 'getBoundingClientRect', {
      value: () => ({ top: 70, bottom: 2500, height: 2430 }),
    });

    Object.defineProperty(component, 'trackRef', {
      value: () => ({ nativeElement: mockTrack }),
      configurable: true,
    });

    component.setScrollProgress(0);
    component.snapToCard(1);

    expect(snapSpy).toHaveBeenLastCalledWith(1);
    expect(component.isSnapping()).toBe(true);

    const preventDefault = vi.fn();

    component.onTrackWheel({
      deltaY: -80,
      deltaMode: 0,
      preventDefault,
    } as unknown as WheelEvent);

    expect(preventDefault).toHaveBeenCalled();
    expect(snapSpy).toHaveBeenLastCalledWith(0);

    snapSpy.mockRestore();
  });

  it('should render indicator buttons with appropriate shadows for active and inactive cards', async () => {
    component.setScrollProgress(0);
    fixture.detectChanges();
    await fixture.whenStable();

    const indicatorButtons = fixture.nativeElement.querySelectorAll('button[aria-label^="Go to card"]');
    expect(indicatorButtons.length).toBe(4);

    // Card 0 is active
    expect(indicatorButtons[0].className).toContain('shadow-[0_2px_10px_#649cead9]');
    // Cards 1, 2, 3 are inactive
    expect(indicatorButtons[1].className).toContain('shadow-[0_2px_6px_#23244e30]');
    expect(indicatorButtons[2].className).toContain('shadow-[0_2px_6px_#23244e30]');
    expect(indicatorButtons[3].className).toContain('shadow-[0_2px_6px_#23244e30]');
  });
});
