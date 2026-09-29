import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { UiMockup } from './ui-mockup';

const ID_TRANSLATIONS = {
  HERO: {
    UI_MOCKUP: {
      TARGET_REVENUE: 'Target Revenue',
      APPROVAL_TODAY: 'Approval Hari ini',
      APPROVAL_DOCUMENTS: '18 dokumen',
      MANAGEMENT_OVERVIEW: 'Management Overview',
      DATE: 'Rabu, 18 Maret 2026',
      GREETING: 'Selamat datang, {{name}}',
      PERIOD_CURRENT_MONTH: 'Bulan berjalan',
      PERIOD_THIS_QUARTER: 'Kuartal ini',
      PERIOD_THIS_YEAR: 'Tahun ini',
      NAV: {
        DASHBOARD: 'Dashboard',
        FINANCE: 'Finance',
        SALES: 'Sales',
        PURCHASING: 'Purchasing',
        INVENTORY: 'Inventory',
        PRODUCTION: 'Production',
        PROJECT: 'Project',
        ANALYTICS: 'Analytics',
      },
      METRICS: {
        REVENUE: 'Revenue',
        GROSS_PROFIT: 'Gross Profit',
        INVENTORY_VALUE: 'Inventory Value',
        AR_OUTSTANDING: 'AR Outstanding',
        LOCATIONS_COUNT: '42 lokasi',
        OVERDUE_COUNT: '12 Jatuh tempo',
      },
      SALES_PERFORMANCE: 'Sales Performance',
      REVENUE_GROSS_PROFIT: 'Revenue & gross profit',
      MONTHS: {
        JAN: 'Jan',
        FEB: 'Feb',
        MAR: 'Mar',
        APR: 'Apr',
        MAY: 'Mei',
        JUN: 'Jun',
        JUL: 'Jul',
      },
      WEEKS: {
        W1: 'Mg 1',
        W2: 'Mg 2',
        W3: 'Mg 3',
        W4: 'Mg 4',
        W5: 'Mg 5',
        W6: 'Mg 6',
        W7: 'Mg 7',
      },
      HEALTH: {
        CASH_POSITION: 'Cash position',
        CASH_POSITION_VALUE: 'sehat',
        ORDER_FULFILMENT: 'Order fulfilment',
        INVENTORY_ALERT: 'Inventory alert',
        INVENTORY_ALERT_VALUE: '8 item',
        INVENTORY_ALERT_VALUE_QTR: '4 item',
        INVENTORY_ALERT_VALUE_YR: '2 item',
      },
      ARIA: {
        TARGET_REVENUE_CARD: 'Target Revenue Card',
        APPROVAL_STATUS_CARD: 'Approval Status Card',
        USER_PROFILE: 'User Profile',
        SIDEBAR_NAV: 'Dashboard Sidebar Navigation',
        PERIOD_SELECTOR: 'Filter periode waktu dashboard',
      },
    },
  },
};

const EN_TRANSLATIONS = {
  HERO: {
    UI_MOCKUP: {
      TARGET_REVENUE: 'Target Revenue',
      APPROVAL_TODAY: "Today's Approval",
      APPROVAL_DOCUMENTS: '18 documents',
      MANAGEMENT_OVERVIEW: 'Management Overview',
      DATE: 'Wednesday, 18 March 2026',
      GREETING: 'Welcome, {{name}}',
      PERIOD_CURRENT_MONTH: 'Current month',
      PERIOD_THIS_QUARTER: 'This quarter',
      PERIOD_THIS_YEAR: 'This year',
      NAV: {
        DASHBOARD: 'Dashboard',
        FINANCE: 'Finance',
        SALES: 'Sales',
        PURCHASING: 'Purchasing',
        INVENTORY: 'Inventory',
        PRODUCTION: 'Production',
        PROJECT: 'Project',
        ANALYTICS: 'Analytics',
      },
      METRICS: {
        REVENUE: 'Revenue',
        GROSS_PROFIT: 'Gross Profit',
        INVENTORY_VALUE: 'Inventory Value',
        AR_OUTSTANDING: 'AR Outstanding',
        LOCATIONS_COUNT: '42 locations',
        OVERDUE_COUNT: '12 overdue',
      },
      SALES_PERFORMANCE: 'Sales Performance',
      REVENUE_GROSS_PROFIT: 'Revenue & gross profit',
      MONTHS: {
        JAN: 'Jan',
        FEB: 'Feb',
        MAR: 'Mar',
        APR: 'Apr',
        MAY: 'May',
        JUN: 'Jun',
        JUL: 'Jul',
      },
      WEEKS: {
        W1: 'W1',
        W2: 'W2',
        W3: 'W3',
        W4: 'W4',
        W5: 'W5',
        W6: 'W6',
        W7: 'W7',
      },
      HEALTH: {
        CASH_POSITION: 'Cash position',
        CASH_POSITION_VALUE: 'Healthy',
        ORDER_FULFILMENT: 'Order fulfillment',
        INVENTORY_ALERT: 'Inventory alert',
        INVENTORY_ALERT_VALUE: '8 items',
        INVENTORY_ALERT_VALUE_QTR: '4 items',
        INVENTORY_ALERT_VALUE_YR: '2 items',
      },
      ARIA: {
        TARGET_REVENUE_CARD: 'Target Revenue Card',
        APPROVAL_STATUS_CARD: 'Approval Status Card',
        USER_PROFILE: 'User Profile',
        SIDEBAR_NAV: 'Dashboard Sidebar Navigation',
        PERIOD_SELECTOR: 'Filter dashboard time period',
      },
    },
  },
};

describe('UiMockup', () => {
  let component: UiMockup;
  let fixture: ComponentFixture<UiMockup>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMockup],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', ID_TRANSLATIONS);
    translateService.setTranslation('en', EN_TRANSLATIONS);
    translateService.use('id');

    fixture = TestBed.createComponent(UiMockup);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the UiMockup component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('img[alt="SOFICloud Logo"]');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('src')).toBe('/soficloud-logo.svg');
  });

  it('should render the Management Overview pill', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Management Overview');
  });

  it('should render all 8 navigation items in sidebar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Dashboard');
    expect(compiled.textContent).toContain('Finance');
    expect(compiled.textContent).toContain('Sales');
    expect(compiled.textContent).toContain('Purchasing');
    expect(compiled.textContent).toContain('Inventory');
    expect(compiled.textContent).toContain('Production');
    expect(compiled.textContent).toContain('Project');
    expect(compiled.textContent).toContain('Analytics');
  });

  it('should lock active navigation to Dashboard only', () => {
    expect(component.activeNav()).toBe('dashboard');

    const compiled = fixture.nativeElement as HTMLElement;
    const activeItem = compiled.querySelector('aside div.bg-\\[\\#ebf3fe\\]');
    expect(activeItem?.textContent).toContain('Dashboard');
  });

  it('should render greeting and date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Rabu, 18 Maret 2026');
    expect(compiled.textContent).toContain('Selamat datang, Atabil');
  });

  it('should render 4 default KPI metric cards for current month', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Revenue');
    expect(compiled.textContent).toContain('Rp15,8M');
    expect(compiled.textContent).toContain('Gross Profit');
    expect(compiled.textContent).toContain('Rp3,1M');
    expect(compiled.textContent).toContain('Inventory Value');
    expect(compiled.textContent).toContain('Rp18,6M');
    expect(compiled.textContent).toContain('AR Outstanding');
    expect(compiled.textContent).toContain('Rp4,8M');
  });

  it('should render sales performance chart section and month labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Sales Performance');
    expect(compiled.textContent).toContain('Revenue & gross profit');
    expect(compiled.textContent).toContain('2026');
    expect(compiled.textContent).toContain('Jan');
    expect(compiled.textContent).toContain('Jul');
  });

  it('should render health gauge score and status indicators', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('92');
    expect(compiled.textContent).toContain('/ 100');
    expect(compiled.textContent).toContain('Cash position');
    expect(compiled.textContent).toContain('sehat');
    expect(compiled.textContent).toContain('Order fulfilment');
    expect(compiled.textContent).toContain('96%');
    expect(compiled.textContent).toContain('Inventory alert');
    expect(compiled.textContent).toContain('8 item');
  });

  it('should render bottom-left Approval card and not render Target Revenue card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const targetRevenueCard = compiled.querySelector('[aria-label="Target Revenue Card"]');
    const approvalCard = compiled.querySelector('[aria-label="Approval Status Card"]');

    expect(targetRevenueCard).toBeNull();

    expect(approvalCard).toBeTruthy();
    expect(approvalCard?.textContent).toContain('Approval Hari ini');
    expect(approvalCard?.textContent).toContain('18 dokumen');
  });

  it('should toggle period dropdown and render all 3 options', () => {
    expect(component.isPeriodMenuOpen()).toBe(false);

    component.togglePeriodMenu();
    fixture.detectChanges();

    expect(component.isPeriodMenuOpen()).toBe(true);

    const compiled = fixture.nativeElement as HTMLElement;
    const menu = compiled.querySelector('#period-options-list');
    expect(menu).toBeTruthy();

    const options = menu?.querySelectorAll('[role="option"]');
    expect(options?.length).toBe(3);
    expect(options?.[0].textContent).toContain('Bulan berjalan');
    expect(options?.[1].textContent).toContain('Kuartal ini');
    expect(options?.[2].textContent).toContain('Tahun ini');
  });

  it('should switch to "This quarter" and update KPIs, chart, and health gauge', () => {
    component.selectPeriod('quarter');
    fixture.detectChanges();

    expect(component.selectedPeriod()).toBe('quarter');
    expect(component.currentHealthScore()).toBe(95);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Rp48,2M');
    expect(compiled.textContent).toContain('Rp9,8M');
    expect(compiled.textContent).toContain('Rp19,4M');
    expect(compiled.textContent).toContain('Rp3,6M');
    expect(compiled.textContent).toContain('95');
    expect(compiled.textContent).toContain('4 item');
    expect(compiled.textContent).toContain('Mg 1');
  });

  it('should switch to "This year" and update KPIs, chart, and health gauge', () => {
    component.selectPeriod('year');
    fixture.detectChanges();

    expect(component.selectedPeriod()).toBe('year');
    expect(component.currentHealthScore()).toBe(98);

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Rp184,5M');
    expect(compiled.textContent).toContain('Rp38,2M');
    expect(compiled.textContent).toContain('Rp21,8M');
    expect(compiled.textContent).toContain('Rp2,1M');
    expect(compiled.textContent).toContain('98');
    expect(compiled.textContent).toContain('2 item');
  });

  it('should handle keyboard navigation in period menu', () => {
    component.togglePeriodMenu();
    expect(component.selectedPeriod()).toBe('month');

    // ArrowDown moves from month to quarter
    component.onMenuKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(component.selectedPeriod()).toBe('quarter');

    // ArrowDown moves from quarter to year
    component.onMenuKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(component.selectedPeriod()).toBe('year');

    // ArrowUp moves from year to quarter
    component.onMenuKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(component.selectedPeriod()).toBe('quarter');

    // Home moves to month
    component.onMenuKeyDown(new KeyboardEvent('keydown', { key: 'Home' }));
    expect(component.selectedPeriod()).toBe('month');

    // End moves to year
    component.onMenuKeyDown(new KeyboardEvent('keydown', { key: 'End' }));
    expect(component.selectedPeriod()).toBe('year');

    // Escape closes menu
    component.togglePeriodMenu();
    expect(component.isPeriodMenuOpen()).toBe(true);
    component.onMenuKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.isPeriodMenuOpen()).toBe(false);
  });

  it('should handle click outside to close period menu', () => {
    component.togglePeriodMenu();
    expect(component.isPeriodMenuOpen()).toBe(true);

    const outsideDiv = document.createElement('div');
    component.onDocumentClick(new MouseEvent('click', { relatedTarget: outsideDiv }));
    expect(component.isPeriodMenuOpen()).toBe(false);
  });

  it('should handle chart hover and leave interactions', () => {
    expect(component.hoveredIndex()).toBeNull();
    expect(component.activePoint()).toBeNull();

    // Hover over May (index 4)
    component.onPointHover(4);
    fixture.detectChanges();

    expect(component.hoveredIndex()).toBe(4);
    expect(component.activePoint()?.monthKey).toBe('HERO.UI_MOCKUP.MONTHS.MAY');
    expect(component.activePoint()?.revenue).toBe('Rp11,6M');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Rp11,6M');
    expect(compiled.textContent).toContain('+7.4%');

    // Leave hover
    component.onPointLeave();
    fixture.detectChanges();

    expect(component.hoveredIndex()).toBeNull();
    expect(component.activePoint()).toBeNull();
  });

  it('should update texts when language changes to English', async () => {
    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Wednesday, 18 March 2026');
    expect(compiled.textContent).toContain('Welcome, Atabil');
    expect(compiled.textContent).toContain('Current month');
    expect(compiled.textContent).toContain("Today's Approval");
    expect(compiled.textContent).toContain('18 documents');
    expect(compiled.textContent).toContain('42 locations');
    expect(compiled.textContent).toContain('12 overdue');
    expect(compiled.textContent).toContain('Healthy');
    expect(compiled.textContent).toContain('8 items');
  });
});
