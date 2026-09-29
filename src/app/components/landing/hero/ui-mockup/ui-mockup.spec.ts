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
      DATE: 'Rabu, 18 Maret 2009',
      GREETING: 'Selamat datang, {{name}}',
      PERIOD_CURRENT_MONTH: 'Bulan berjalan',
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
      HEALTH: {
        CASH_POSITION: 'Cash position',
        CASH_POSITION_VALUE: 'sehat',
        ORDER_FULFILMENT: 'Order fulfilment',
        INVENTORY_ALERT: 'Inventory alert',
        INVENTORY_ALERT_VALUE: '8 item',
      },
      ARIA: {
        TARGET_REVENUE_CARD: 'Target Revenue Card',
        APPROVAL_STATUS_CARD: 'Approval Status Card',
        USER_PROFILE: 'User Profile',
        SIDEBAR_NAV: 'Dashboard Sidebar Navigation',
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
      DATE: 'Wednesday, 18 March 2009',
      GREETING: 'Welcome, {{name}}',
      PERIOD_CURRENT_MONTH: 'Current month',
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
      HEALTH: {
        CASH_POSITION: 'Cash position',
        CASH_POSITION_VALUE: 'Healthy',
        ORDER_FULFILMENT: 'Order fulfillment',
        INVENTORY_ALERT: 'Inventory alert',
        INVENTORY_ALERT_VALUE: '8 items',
      },
      ARIA: {
        TARGET_REVENUE_CARD: 'Target Revenue Card',
        APPROVAL_STATUS_CARD: 'Approval Status Card',
        USER_PROFILE: 'User Profile',
        SIDEBAR_NAV: 'Dashboard Sidebar Navigation',
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
    expect(compiled.textContent).toContain('Rabu, 18 Maret 2009');
    expect(compiled.textContent).toContain('Selamat datang, Atabil');
  });

  it('should render 4 KPI metric cards', () => {
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
    expect(compiled.textContent).toContain('Wednesday, 18 March 2009');
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

