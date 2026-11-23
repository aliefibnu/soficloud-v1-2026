import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { FeatureTab, SectionTabs } from './section-tabs';

const FINANCIAL_TABS: readonly FeatureTab[] = [
  {
    id: 'financial-control',
    titleKey: 'FINANCIAL_MANAGEMENT_1.TABS.FINANCIAL_CONTROL',
    defaultTitle: 'FINANCIAL CONTROL',
  },
  {
    id: 'capabilities',
    titleKey: 'FINANCIAL_MANAGEMENT_1.TABS.TEN_CAPABILITIES',
    defaultTitle: '10 CAPABILITIES',
  },
  {
    id: 'expense-advance',
    titleKey: 'FINANCIAL_MANAGEMENT_1.TABS.EXPENSE_ADVANCE',
    defaultTitle: 'EXPENSE & ADVANCE',
  },
  {
    id: 'reporting',
    titleKey: 'FINANCIAL_MANAGEMENT_1.TABS.REPORTING',
    defaultTitle: 'REPORTING',
  },
  {
    id: 'integration',
    titleKey: 'FINANCIAL_MANAGEMENT_1.TABS.INTEGRATION',
    defaultTitle: 'INTEGRATION',
  },
];

describe('FinancialManagement1 SectionTabs', () => {
  let component: SectionTabs;
  let fixture: ComponentFixture<SectionTabs>;
  let translateService: TranslateService;

  beforeEach(async () => {
    window.history.replaceState(null, '', window.location.pathname);

    await TestBed.configureTestingModule({
      imports: [SectionTabs],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'en',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('en', {
      FINANCIAL_MANAGEMENT_1: {
        TABS: {
          NAV_ARIA_LABEL: 'Financial management sections',
          FINANCIAL_CONTROL: 'FINANCIAL CONTROL',
          TEN_CAPABILITIES: '10 CAPABILITIES',
          EXPENSE_ADVANCE: 'EXPENSE & ADVANCE',
          REPORTING: 'REPORTING',
          INTEGRATION: 'INTEGRATION',
        },
      },
    });
    translateService.setTranslation('id', {
      FINANCIAL_MANAGEMENT_1: {
        TABS: {
          NAV_ARIA_LABEL: 'Bagian manajemen keuangan',
          FINANCIAL_CONTROL: 'KONTROL KEUANGAN',
          TEN_CAPABILITIES: '10 KAPABILITAS',
          EXPENSE_ADVANCE: 'BIAYA & UANG MUKA',
          REPORTING: 'PELAPORAN',
          INTEGRATION: 'INTEGRASI',
        },
      },
    });
    translateService.setTranslation('ja', {
      FINANCIAL_MANAGEMENT_1: {
        TABS: {
          NAV_ARIA_LABEL: '財務管理セクション',
          FINANCIAL_CONTROL: '財務管理',
          TEN_CAPABILITIES: '10の機能',
          EXPENSE_ADVANCE: '経費・仮払金',
          REPORTING: 'レポート',
          INTEGRATION: 'システム連携',
        },
      },
    });
    translateService.use('en');

    fixture = TestBed.createComponent(SectionTabs);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', FINANCIAL_TABS);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    window.history.replaceState(null, '', window.location.pathname);
  });

  it('should create the section-tabs component', () => {
    expect(component).toBeTruthy();
  });

  it('should render semantic nav landmark with 5 fragment links and no tablist ARIA anti-pattern', () => {
    const nav = fixture.debugElement.query(By.css('nav'));
    expect(nav).toBeTruthy();
    expect(nav.nativeElement.getAttribute('aria-label')).toBe('Financial management sections');

    expect(fixture.debugElement.query(By.css('[role="tablist"]'))).toBeNull();
    expect(fixture.debugElement.query(By.css('[role="tab"]'))).toBeNull();

    const links = fixture.debugElement.queryAll(By.css('nav ul li a'));
    expect(links.length).toBe(5);
    expect(links[0].nativeElement.textContent.trim()).toBe('FINANCIAL CONTROL');
    expect(links[0].nativeElement.getAttribute('href')).toBe('#financial-control');
    expect(links[1].nativeElement.textContent.trim()).toBe('10 CAPABILITIES');
    expect(links[1].nativeElement.getAttribute('href')).toBe('#capabilities');
    expect(links[2].nativeElement.textContent.trim()).toBe('EXPENSE & ADVANCE');
    expect(links[2].nativeElement.getAttribute('href')).toBe('#expense-advance');
    expect(links[3].nativeElement.textContent.trim()).toBe('REPORTING');
    expect(links[3].nativeElement.getAttribute('href')).toBe('#reporting');
    expect(links[4].nativeElement.textContent.trim()).toBe('INTEGRATION');
    expect(links[4].nativeElement.getAttribute('href')).toBe('#integration');
  });

  it('should mark only the first tab active by default with aria-current and WCAG AA color classes', () => {
    const links = fixture.debugElement.queryAll(By.css('nav ul li a'));
    expect(component.activeTabId()).toBe('financial-control');
    expect(links[0].nativeElement.getAttribute('aria-current')).toBe('true');
    expect(links[0].nativeElement.classList.contains('text-[#23244E]')).toBe(true);
    expect(links[0].nativeElement.classList.contains('min-h-11')).toBe(true);

    for (let i = 1; i < links.length; i++) {
      expect(links[i].nativeElement.getAttribute('aria-current')).toBeNull();
      expect(links[i].nativeElement.classList.contains('text-[#717386]')).toBe(true);
    }
  });

  it('should render full-width 1px gray baseline with horizontal inset padding on the list', () => {
    component.isSticky.set(false);
    fixture.detectChanges();

    const list = fixture.debugElement.query(By.css('ul.tabs-list'));
    expect(list).toBeTruthy();
    expect(list.nativeElement.classList.contains('border-b')).toBe(true);
    expect(list.nativeElement.classList.contains('border-[#D8D8D8]')).toBe(true);
    expect(list.nativeElement.classList.contains('lg:px-16')).toBe(true);
    expect(list.nativeElement.classList.contains('xl:px-20')).toBe(true);

    component.isSticky.set(true);
    fixture.detectChanges();
    expect(list.nativeElement.classList.contains('lg:px-8')).toBe(true);
  });

  it('should support defaultTitle fallback when titleKey is omitted', async () => {
    const customTabs: readonly FeatureTab[] = [
      { id: 'overview', defaultTitle: 'OVERVIEW' },
      { id: 'details', defaultTitle: 'DETAILS' },
    ];
    fixture.componentRef.setInput('tabs', customTabs);
    fixture.componentRef.setInput('navAriaLabel', 'Custom sections');
    fixture.detectChanges();
    await fixture.whenStable();

    const nav = fixture.debugElement.query(By.css('nav'));
    expect(nav.nativeElement.getAttribute('aria-label')).toBe('Custom sections');

    const links = fixture.debugElement.queryAll(By.css('nav ul li a'));
    expect(links.length).toBe(2);
    expect(links[0].nativeElement.textContent.trim()).toBe('OVERVIEW');
    expect(links[1].nativeElement.textContent.trim()).toBe('DETAILS');
    expect(component.activeTabId()).toBe('overview');
  });

  it('should switch active tab, update aria-current and URL hash on click', () => {
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState');
    const links = fixture.debugElement.queryAll(By.css('nav ul li a'));

    links[2].nativeElement.click();
    fixture.detectChanges();

    expect(component.activeTabId()).toBe('expense-advance');
    expect(links[2].nativeElement.getAttribute('aria-current')).toBe('true');
    expect(links[0].nativeElement.getAttribute('aria-current')).toBeNull();
    expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '#expense-advance');

    replaceStateSpy.mockRestore();
  });

  it('should scroll smoothly to matching target section and focus it when tabindex is present', () => {
    const dummySection = document.createElement('section');
    dummySection.id = 'reporting';
    dummySection.setAttribute('tabindex', '-1');
    const scrollSpy = vi.fn();
    const focusSpy = vi.fn();
    dummySection.scrollIntoView = scrollSpy;
    dummySection.focus = focusSpy;
    document.body.appendChild(dummySection);

    try {
      component.selectTab('reporting');
      expect(scrollSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true });
    } finally {
      document.body.removeChild(dummySection);
    }
  });

  it('should respect prefers-reduced-motion when scrolling to a section', () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        media: '(prefers-reduced-motion: reduce)',
      }),
    });

    const dummySection = document.createElement('section');
    dummySection.id = 'integration';
    const scrollSpy = vi.fn();
    dummySection.scrollIntoView = scrollSpy;
    document.body.appendChild(dummySection);

    try {
      component.selectTab('integration');
      expect(scrollSpy).toHaveBeenCalledWith({
        behavior: 'auto',
        block: 'start',
      });
    } finally {
      document.body.removeChild(dummySection);
      Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        writable: true,
        value: originalMatchMedia,
      });
    }
  });

  it('should localize tab labels when switching languages to id and ja', async () => {
    translateService.use('id');
    fixture.detectChanges();
    await fixture.whenStable();

    let links = fixture.debugElement.queryAll(By.css('nav ul li a'));
    expect(links[0].nativeElement.textContent.trim()).toBe('KONTROL KEUANGAN');
    expect(links[1].nativeElement.textContent.trim()).toBe('10 KAPABILITAS');
    expect(links[2].nativeElement.textContent.trim()).toBe('BIAYA & UANG MUKA');
    expect(links[3].nativeElement.textContent.trim()).toBe('PELAPORAN');
    expect(links[4].nativeElement.textContent.trim()).toBe('INTEGRASI');

    translateService.use('ja');
    fixture.detectChanges();
    await fixture.whenStable();

    links = fixture.debugElement.queryAll(By.css('nav ul li a'));
    expect(links[0].nativeElement.textContent.trim()).toBe('財務管理');
    expect(links[1].nativeElement.textContent.trim()).toBe('10の機能');
    expect(links[2].nativeElement.textContent.trim()).toBe('経費・仮払金');
    expect(links[3].nativeElement.textContent.trim()).toBe('レポート');
    expect(links[4].nativeElement.textContent.trim()).toBe('システム連携');
  });

  it('should toggle sticky dynamic-island state with hysteresis and constant vertical height classes', () => {
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1280);
    component.isSticky.set(false);
    fixture.detectChanges();

    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.classList.contains('[overflow-anchor:none]')).toBe(true);

    const firstLink = fixture.debugElement.query(By.css('nav ul li a')).nativeElement as HTMLElement;
    const initialLinkClasses = firstLink.className;

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

    expect(fixture.debugElement.query(By.css('.rounded-b-\\[24px\\]'))).toBeTruthy();
    expect(firstLink.className).toBe(initialLinkClasses);

    // Within hysteresis band (+4px above 76) -> remains sticky
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

    // Past hysteresis band (+6px above 76) -> exits sticky
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

  it('should update activeTabId based on reading-line position of sections in DOM', () => {
    const s1 = document.createElement('section');
    s1.id = 'financial-control';
    const s2 = document.createElement('section');
    s2.id = 'capabilities';
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
      expect(component.activeTabId()).toBe('capabilities');
    } finally {
      document.body.removeChild(s1);
      document.body.removeChild(s2);
    }
  });

  it('should disconnect observer and clean up listeners on destroy', () => {
    const disconnectSpy = vi.fn();
    const cleanupSpy = vi.fn();
    (component as unknown as { edgeFadeObserver?: { disconnect: () => void } }).edgeFadeObserver = {
      disconnect: disconnectSpy,
    };
    (component as unknown as { scrollendCleanup?: () => void }).scrollendCleanup = cleanupSpy;

    component.ngOnDestroy();
    expect(disconnectSpy).toHaveBeenCalled();
    expect(cleanupSpy).toHaveBeenCalled();
  });
});
