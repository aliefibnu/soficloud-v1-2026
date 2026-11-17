import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ProcessTab, ProcessTabs } from './process-tabs';

const CONNECTED_PROCESS_TABS: readonly ProcessTab[] = [
  {
    id: 'satu-data',
    titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.SATU_DATA',
    defaultTitle: 'SATU DATA',
  },
  {
    id: 'alur-transaksi',
    titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.ALUR_TRANSAKSI',
    defaultTitle: 'ALUR TRANSAKSI',
  },
  {
    id: 'dampak-akuntansi',
    titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.DAMPAK_AKUNTANSI',
    defaultTitle: 'DAMPAK AKUNTANSI',
  },
  {
    id: 'laporan',
    titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.LAPORAN',
    defaultTitle: 'LAPORAN',
  },
  {
    id: 'peta-lengkap',
    titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.PETA_LENGKAP',
    defaultTitle: 'PETA LENGKAP',
  },
];

describe('Shared ProcessTabs', () => {
  let component: ProcessTabs;
  let fixture: ComponentFixture<ProcessTabs>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessTabs],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      CONNECTED_PROCESS: {
        PROCESS_TABS: {
          SATU_DATA: 'SATU DATA',
          ALUR_TRANSAKSI: 'ALUR TRANSAKSI',
          DAMPAK_AKUNTANSI: 'DAMPAK AKUNTANSI',
          LAPORAN: 'LAPORAN',
          PETA_LENGKAP: 'PETA LENGKAP',
        },
      },
    });

    translateService.setTranslation('ja', {
      CONNECTED_PROCESS: {
        PROCESS_TABS: {
          SATU_DATA: '統合データ',
          ALUR_TRANSAKSI: '取引フロー',
          DAMPAK_AKUNTANSI: '会計影響',
          LAPORAN: 'レポート',
          PETA_LENGKAP: '全体プロセスマップ',
        },
      },
    });

    translateService.setTranslation('en', {
      CONNECTED_PROCESS: {
        PROCESS_TABS: {
          SATU_DATA: 'SINGLE DATA SOURCE',
          ALUR_TRANSAKSI: 'TRANSACTION FLOW',
          DAMPAK_AKUNTANSI: 'ACCOUNTING IMPACT',
          LAPORAN: 'REPORTS',
          PETA_LENGKAP: 'FULL PROCESS MAP',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(ProcessTabs);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', CONNECTED_PROCESS_TABS);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the process-tabs component', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT render any h2 or p title/subtitle elements', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading).toBeNull();

    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeNull();
  });

  it('should render 5 tab buttons with tablist ARIA role and matching aria-controls', () => {
    const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
    expect(tablist).toBeTruthy();

    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(tabs.length).toBe(5);
    expect(tabs[0].nativeElement.textContent.trim()).toBe('SATU DATA');
    expect(tabs[0].nativeElement.getAttribute('aria-controls')).toBe('satu-data');
    expect(tabs[1].nativeElement.textContent.trim()).toBe('ALUR TRANSAKSI');
    expect(tabs[1].nativeElement.getAttribute('aria-controls')).toBe('alur-transaksi');
    expect(tabs[2].nativeElement.textContent.trim()).toBe('DAMPAK AKUNTANSI');
    expect(tabs[2].nativeElement.getAttribute('aria-controls')).toBe('dampak-akuntansi');
    expect(tabs[3].nativeElement.textContent.trim()).toBe('LAPORAN');
    expect(tabs[3].nativeElement.getAttribute('aria-controls')).toBe('laporan');
    expect(tabs[4].nativeElement.textContent.trim()).toBe('PETA LENGKAP');
    expect(tabs[4].nativeElement.getAttribute('aria-controls')).toBe('peta-lengkap');
  });

  it('should support a 3-tab configuration with defaultTitle fallback when titleKey is omitted', async () => {
    const smartWorkflowTabs: readonly ProcessTab[] = [
      { id: 'workflow-section-1', defaultTitle: 'SECTION 1' },
      { id: 'workflow-section-2', defaultTitle: 'SECTION 2' },
      { id: 'workflow-section-3', defaultTitle: 'SECTION 3' },
    ];
    fixture.componentRef.setInput('tabs', smartWorkflowTabs);
    fixture.componentRef.setInput('navAriaLabel', 'Smart workflow navigation');
    fixture.componentRef.setInput('tablistAriaLabel', 'Smart workflow milestones');
    fixture.componentRef.setInput('listMinWidthClass', 'min-w-max sm:min-w-0');
    fixture.detectChanges();
    await fixture.whenStable();

    const section = fixture.debugElement.query(By.css('#process-tabs'));
    expect(section.nativeElement.getAttribute('aria-label')).toBe('Smart workflow navigation');

    const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
    expect(tablist.nativeElement.getAttribute('aria-label')).toBe('Smart workflow milestones');

    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(tabs.length).toBe(3);
    expect(tabs[0].nativeElement.textContent.trim()).toBe('SECTION 1');
    expect(tabs[1].nativeElement.textContent.trim()).toBe('SECTION 2');
    expect(tabs[2].nativeElement.textContent.trim()).toBe('SECTION 3');
    expect(component.activeTabId()).toBe('workflow-section-1');
  });

  it('should have satu-data active by default with correct styles and accessibility attributes', () => {
    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(component.activeTabId()).toBe('satu-data');
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

    expect(component.activeTabId()).toBe('alur-transaksi');
    expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('false');
  });

  it('should attempt smooth scroll when target section exists in DOM', () => {
    const dummySection = document.createElement('div');
    dummySection.id = 'dampak-akuntansi';
    const scrollSpy = vi.fn();
    dummySection.scrollIntoView = scrollSpy;
    document.body.appendChild(dummySection);

    try {
      component.selectTab('dampak-akuntansi');
      expect(scrollSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    } finally {
      document.body.removeChild(dummySection);
    }
  });

  it('should navigate tabs using arrow keys and Home/End keys', () => {
    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));

    const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    tabs[0].nativeElement.dispatchEvent(eventRight);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('alur-transaksi');

    const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    tabs[1].nativeElement.dispatchEvent(eventLeft);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('satu-data');

    const eventEnd = new KeyboardEvent('keydown', { key: 'End' });
    tabs[0].nativeElement.dispatchEvent(eventEnd);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('peta-lengkap');

    const eventHome = new KeyboardEvent('keydown', { key: 'Home' });
    tabs[4].nativeElement.dispatchEvent(eventHome);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('satu-data');
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

  it('should update indicator on window resize', () => {
    const updateSpy = vi.spyOn(component, 'updateIndicator');
    window.dispatchEvent(new Event('resize'));
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should render Japanese tab titles when switching language to ja', async () => {
    translateService.use('ja');
    fixture.detectChanges();
    await fixture.whenStable();

    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(tabs[0].nativeElement.textContent.trim()).toBe('統合データ');
    expect(tabs[1].nativeElement.textContent.trim()).toBe('取引フロー');
    expect(tabs[2].nativeElement.textContent.trim()).toBe('会計影響');
    expect(tabs[3].nativeElement.textContent.trim()).toBe('レポート');
    expect(tabs[4].nativeElement.textContent.trim()).toBe('全体プロセスマップ');
  });

  it('should recalculate indicator dimensions when updateIndicator is called with mock bounding boxes', () => {
    const listEl = component.tabsListRef()?.nativeElement;
    expect(listEl).toBeTruthy();
    if (!listEl) return;

    vi.spyOn(listEl, 'getBoundingClientRect').mockReturnValue({
      left: 20,
      top: 100,
      width: 375,
      height: 40,
      right: 395,
      bottom: 140,
      x: 20,
      y: 100,
      toJSON: () => {},
    });

    const activeBtn = listEl.querySelector(
      `[data-tab-id="${component.activeTabId()}"]`,
    ) as HTMLElement;
    expect(activeBtn).toBeTruthy();

    const buttons = listEl.querySelectorAll('[role="tab"]');
    const firstBtn = buttons[0] as HTMLElement;

    vi.spyOn(firstBtn, 'getBoundingClientRect').mockReturnValue({
      left: 44,
      top: 100,
      width: 86,
      height: 40,
      right: 130,
      bottom: 140,
      x: 44,
      y: 100,
      toJSON: () => {},
    });

    component.updateIndicator();

    expect(component.indicatorLeft()).toBe(0);
    expect(component.indicatorWidth()).toBe(86);
  });

  it('should disconnect resizeObserver on destroy', () => {
    const disconnectSpy = vi.fn();
    (component as unknown as { resizeObserver?: { disconnect: () => void } }).resizeObserver = {
      disconnect: disconnectSpy,
    };

    component.ngOnDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should toggle isSticky when scrolled past top offset threshold', () => {
    component.isSticky.set(false);
    expect(component.isSticky()).toBe(false);

    const hostEl = fixture.nativeElement;
    vi.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue({
      top: 60,
      bottom: 120,
      left: 0,
      right: 1200,
      width: 1200,
      height: 60,
      x: 0,
      y: 60,
      toJSON: () => {},
    });

    component.onWindowScroll();
    expect(component.isSticky()).toBe(true);
    fixture.detectChanges();

    const islandEl = fixture.debugElement.query(By.css('.rounded-b-\\[24px\\]'));
    expect(islandEl).toBeTruthy();
  });

  it('should apply hysteresis around the sticky threshold and maintain constant vertical height classes', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1280);
    component.isSticky.set(false);
    fixture.detectChanges();

    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.classList.contains('[overflow-anchor:none]')).toBe(true);

    const sectionEl = fixture.debugElement.query(By.css('#process-tabs')).nativeElement as HTMLElement;
    const firstTabBtn = fixture.debugElement.query(By.css('[role="tab"]')).nativeElement as HTMLElement;
    const nonStickyBtnClasses = firstTabBtn.className;

    const rectSpy = vi.spyOn(hostEl, 'getBoundingClientRect').mockReturnValue({
      top: 79,
      bottom: 139,
      left: 0,
      right: 1280,
      width: 1280,
      height: 60,
      x: 0,
      y: 79,
      toJSON: () => {},
    });
    component.onWindowScroll();
    expect(component.isSticky()).toBe(false);

    rectSpy.mockReturnValue({
      top: 76,
      bottom: 136,
      left: 0,
      right: 1280,
      width: 1280,
      height: 60,
      x: 0,
      y: 76,
      toJSON: () => {},
    });
    component.onWindowScroll();
    expect(component.isSticky()).toBe(true);
    fixture.detectChanges();

    expect(sectionEl.classList.contains('py-0')).toBe(true);
    expect(firstTabBtn.className).toBe(nonStickyBtnClasses);

    rectSpy.mockReturnValue({
      top: 80,
      bottom: 140,
      left: 0,
      right: 1280,
      width: 1280,
      height: 60,
      x: 0,
      y: 80,
      toJSON: () => {},
    });
    component.onWindowScroll();
    expect(component.isSticky()).toBe(true);

    rectSpy.mockReturnValue({
      top: 82,
      bottom: 142,
      left: 0,
      right: 1280,
      width: 1280,
      height: 60,
      x: 0,
      y: 82,
      toJSON: () => {},
    });
    component.onWindowScroll();
    expect(component.isSticky()).toBe(false);
  });

  it('should accurately update activeTabId based on readingLine position of sections', () => {
    const s1 = document.createElement('div');
    s1.id = 'satu-data';
    const s2 = document.createElement('div');
    s2.id = 'alur-transaksi';
    document.body.appendChild(s1);
    document.body.appendChild(s2);

    try {
      vi.spyOn(s1, 'getBoundingClientRect').mockReturnValue({
        top: -600,
        bottom: 200,
        left: 0,
        right: 1200,
        width: 1200,
        height: 800,
        x: 0,
        y: -600,
        toJSON: () => {},
      });

      vi.spyOn(s2, 'getBoundingClientRect').mockReturnValue({
        top: 200,
        bottom: 1000,
        left: 0,
        right: 1200,
        width: 1200,
        height: 800,
        x: 0,
        y: 200,
        toJSON: () => {},
      });

      component.updateActiveSectionByScroll();
      expect(component.activeTabId()).toBe('alur-transaksi');
    } finally {
      document.body.removeChild(s1);
      document.body.removeChild(s2);
    }
  });
});
