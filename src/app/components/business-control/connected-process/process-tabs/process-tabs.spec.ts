import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ProcessTabs } from './process-tabs';

describe('ConnectedProcess ProcessTabs', () => {
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

    // Press ArrowRight on tab 0 -> moves to tab 1
    const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    tabs[0].nativeElement.dispatchEvent(eventRight);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('alur-transaksi');

    // Press ArrowLeft on tab 1 -> moves back to tab 0
    const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    tabs[1].nativeElement.dispatchEvent(eventLeft);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('satu-data');

    // Press End -> moves to last tab
    const eventEnd = new KeyboardEvent('keydown', { key: 'End' });
    tabs[0].nativeElement.dispatchEvent(eventEnd);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('peta-lengkap');

    // Press Home -> moves to first tab
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

    // Simulate mobile viewport where container left is 20 and tab button starts at 44 with width 86
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

    vi.spyOn(activeBtn, 'getBoundingClientRect').mockReturnValue({
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

    expect(component.indicatorLeft()).toBe(24); // 44 - 20 = 24
    expect(component.indicatorWidth()).toBe(86); // 86px width
  });

  it('should disconnect resizeObserver on destroy', () => {
    const disconnectSpy = vi.fn();
    (component as unknown as { resizeObserver?: { disconnect: () => void } }).resizeObserver = {
      disconnect: disconnectSpy,
    };

    component.ngOnDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
