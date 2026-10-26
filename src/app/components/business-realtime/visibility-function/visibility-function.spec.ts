import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { VisibilityFunction } from './visibility-function';

describe('BusinessRealtime VisibilityFunction', () => {
  let component: VisibilityFunction;
  let fixture: ComponentFixture<VisibilityFunction>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisibilityFunction],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      BUSINESS_REALTIME: {
        VISIBILITY_FUNCTION: {
          TITLE: 'VISIBILITAS LINTAS FUNGSI',
          SUBTITLE:
            'Mulai dari pesanan pelanggan sampai posisi keuangan, manajemen melihat indikator yang relevan pada tiap proses. Enam tampilan berikut menunjukkan bagaimana tim membaca peluang, hambatan, dan pekerjaan yang masih terbuka.',
          TABS: {
            SALES_PERFORMANCE: 'KINERJA PENJUALAN',
            PROCUREMENT_CONTROL: 'PENGENDALIAN PENGADAAN',
            MATERIAL_READINESS: 'KESIAPAN MATERIAL',
            ORDER_PIPELINE: 'PIPELINE PESANAN',
            FINANCIAL_VISIBILITY: 'VISIBILITAS KEUANGAN',
          },
          ALTS: {
            SALES_PERFORMANCE: 'Pratinjau Dashboard Sales Performance',
            PROCUREMENT_CONTROL: 'Pratinjau Dashboard Procurement Control',
            MATERIAL_READINESS: 'Pratinjau Dashboard Material Readiness',
            ORDER_PIPELINE: 'Pratinjau Dashboard Order Pipeline',
            FINANCIAL_VISIBILITY: 'Pratinjau Dashboard Financial Visibility',
          },
        },
      },
    });

    translateService.setTranslation('ja', {
      BUSINESS_REALTIME: {
        VISIBILITY_FUNCTION: {
          TITLE: '部門横断の可視化',
          SUBTITLE:
            '顧客の注文から財務状況に至るまで、マネジメント層は各プロセスに関連する重要指標を把握できます。以下の画面により、チームはビジネス機会、ボトルネック、未処理の業務を的確に把握できます。',
          TABS: {
            SALES_PERFORMANCE: '販売実績',
            PROCUREMENT_CONTROL: '調達管理',
            MATERIAL_READINESS: '資材準備状況',
            ORDER_PIPELINE: '受注パイプライン',
            FINANCIAL_VISIBILITY: '財務状況',
          },
          ALTS: {
            SALES_PERFORMANCE: '販売実績ダッシュボードプレビュー',
            PROCUREMENT_CONTROL: '調達管理ダッシュボードプレビュー',
            MATERIAL_READINESS: '資材準備状況ダッシュボードプレビュー',
            ORDER_PIPELINE: '注文パイプラインダッシュボードプレビュー',
            FINANCIAL_VISIBILITY: '財務状況ダッシュボードプレビュー',
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(VisibilityFunction);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the visibility-function component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title with Inter bold and correct color', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.trim()).toBe('VISIBILITAS LINTAS FUNGSI');
    expect(heading.nativeElement.classList.contains('font-inter')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-bold')).toBe(true);
    expect(heading.nativeElement.classList.contains('text-[#23244E]')).toBe(true);
  });

  it('should render the subtitle with DM Sans regular, 17px size, and correct color', () => {
    const subtitle = fixture.debugElement.query(By.css('p'));
    expect(subtitle).toBeTruthy();
    expect(subtitle.nativeElement.textContent).toContain(
      'Mulai dari pesanan pelanggan sampai posisi keuangan',
    );
    expect(subtitle.nativeElement.classList.contains('font-dm-sans')).toBe(true);
    expect(subtitle.nativeElement.classList.contains('font-normal')).toBe(true);
    expect(subtitle.nativeElement.classList.contains('text-[#23244E]')).toBe(true);
    expect(subtitle.nativeElement.classList.contains('text-[17px]')).toBe(true);
  });

  it('should render 5 tab buttons with tablist ARIA role and matching aria-controls', () => {
    const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
    expect(tablist).toBeTruthy();

    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(tabs.length).toBe(5);
    expect(tabs[0].nativeElement.textContent.trim()).toBe('KINERJA PENJUALAN');
    expect(tabs[0].nativeElement.getAttribute('aria-controls')).toBe('sales-performance');
    expect(tabs[1].nativeElement.textContent.trim()).toBe('PENGENDALIAN PENGADAAN');
    expect(tabs[1].nativeElement.getAttribute('aria-controls')).toBe('procurement-control');
    expect(tabs[2].nativeElement.textContent.trim()).toBe('KESIAPAN MATERIAL');
    expect(tabs[2].nativeElement.getAttribute('aria-controls')).toBe('material-readiness');
    expect(tabs[3].nativeElement.textContent.trim()).toBe('PIPELINE PESANAN');
    expect(tabs[3].nativeElement.getAttribute('aria-controls')).toBe('order-pipeline');
    expect(tabs[4].nativeElement.textContent.trim()).toBe('VISIBILITAS KEUANGAN');
    expect(tabs[4].nativeElement.getAttribute('aria-controls')).toBe('financial-visibility');
  });

  it('should have sales-performance active by default with correct styles', () => {
    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(component.activeTabId()).toBe('sales-performance');
    expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].nativeElement.getAttribute('tabindex')).toBe('0');
    expect(tabs[0].nativeElement.style.color).toBe('rgb(35, 36, 78)');

    expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('false');
    expect(tabs[1].nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should switch tabs on button click', () => {
    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    tabs[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.activeTabId()).toBe('procurement-control');
    expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('false');
  });

  it('should navigate tabs using arrow keys', () => {
    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));

    // Press ArrowRight on tab 0 -> should move to tab 1
    const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    tabs[0].nativeElement.dispatchEvent(eventRight);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('procurement-control');

    // Press ArrowLeft on tab 1 -> should move back to tab 0
    const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    tabs[1].nativeElement.dispatchEvent(eventLeft);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('sales-performance');

    // Press End -> should move to last tab
    const eventEnd = new KeyboardEvent('keydown', { key: 'End' });
    tabs[0].nativeElement.dispatchEvent(eventEnd);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('financial-visibility');

    // Press Home -> should move to first tab
    const eventHome = new KeyboardEvent('keydown', { key: 'Home' });
    tabs[4].nativeElement.dispatchEvent(eventHome);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('sales-performance');
  });

  it('should render the tablist with padding to provide leftover space on both sides of the line', () => {
    const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
    expect(tablist).toBeTruthy();
    expect(
      tablist.nativeElement.classList.contains('lg:px-17.5') ||
        tablist.nativeElement.classList.contains('lg:px-[70px]'),
    ).toBe(true);
    expect(tablist.nativeElement.classList.contains('sm:px-10')).toBe(true);
    expect(tablist.nativeElement.classList.contains('px-6')).toBe(true);
  });

  it('should render the base line with overflow-hidden and highlighted indicator', () => {
    const baseLine = fixture.debugElement.query(By.css('.bg-\\[\\#D9D9D9\\]'));
    expect(baseLine).toBeTruthy();
    expect(baseLine.nativeElement.classList.contains('overflow-hidden')).toBe(true);

    const indicator = fixture.debugElement.query(By.css('.bg-\\[\\#365AD2\\]'));
    expect(indicator).toBeTruthy();
  });

  it('should render Japanese tab titles when switching language to ja', async () => {
    translateService.use('ja');
    fixture.detectChanges();
    await fixture.whenStable();

    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(tabs[0].nativeElement.textContent.trim()).toBe('販売実績');
    expect(tabs[1].nativeElement.textContent.trim()).toBe('調達管理');
    expect(tabs[2].nativeElement.textContent.trim()).toBe('資材準備状況');
    expect(tabs[3].nativeElement.textContent.trim()).toBe('受注パイプライン');
    expect(tabs[4].nativeElement.textContent.trim()).toBe('財務状況');
  });

  it('should recalculate indicator dimensions when updateIndicator is called with mock bounding boxes', () => {
    const listEl = component.tabsListRef()?.nativeElement;
    expect(listEl).toBeTruthy();
    if (!listEl) return;

    // Mock bounding rects
    vi.spyOn(listEl, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 200,
      width: 1000,
      height: 40,
      right: 1100,
      bottom: 240,
      x: 100,
      y: 200,
      toJSON: () => {},
    });

    const activeBtn = listEl.querySelector(
      `[data-tab-id="${component.activeTabId()}"]`,
    ) as HTMLElement;
    expect(activeBtn).toBeTruthy();

    vi.spyOn(activeBtn, 'getBoundingClientRect').mockReturnValue({
      left: 170,
      top: 200,
      width: 85,
      height: 40,
      right: 255,
      bottom: 240,
      x: 170,
      y: 200,
      toJSON: () => {},
    });

    component.updateIndicator();

    expect(component.indicatorLeft()).toBe(70); // 170 - 100 = 70
    expect(component.indicatorWidth()).toBe(85); // 85px to cover the word
  });

  it('should disconnect resizeObserver on destroy', () => {
    const disconnectSpy = vi.fn();
    (component as unknown as { resizeObserver?: { disconnect: () => void } }).resizeObserver = {
      disconnect: disconnectSpy,
    };

    component.ngOnDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should attempt smooth scroll to section and update URL hash when tab is selected', () => {
    const dummySection = document.createElement('div');
    dummySection.id = 'procurement-control';
    const scrollSpy = vi.fn();
    dummySection.scrollIntoView = scrollSpy;
    document.body.appendChild(dummySection);

    const replaceStateSpy = vi.spyOn(history, 'replaceState');

    try {
      component.selectTab('procurement-control');
      expect(scrollSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
      expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '#procurement-control');
    } finally {
      document.body.removeChild(dummySection);
      replaceStateSpy.mockRestore();
    }
  });
});
