import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMockup } from './ui-mockup';

describe('UiMockup', () => {
  let component: UiMockup;
  let fixture: ComponentFixture<UiMockup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMockup],
    }).compileComponents();

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

  it('should render header elements including workspace, date, and user avatar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Enterprise Workspace');
    expect(compiled.textContent).toContain('September 2026');

    const avatar = compiled.querySelector('[aria-label="User profile avatar"]');
    expect(avatar).toBeTruthy();
    expect(avatar?.textContent?.trim()).toBe('A');
  });

  it('should render all 19 sidebar menu items with Dashboard active', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(component.navItems.length).toBe(19);

    expect(compiled.textContent).toContain('Dashboard');
    expect(compiled.textContent).toContain('Procurement');
    expect(compiled.textContent).toContain('Service');
    expect(compiled.textContent).toContain('Inventory');
    expect(compiled.textContent).toContain('Manufacturing Planning');
    expect(compiled.textContent).toContain('Manufacturing');
    expect(compiled.textContent).toContain('Sales');
    expect(compiled.textContent).toContain('General Ledger');
    expect(compiled.textContent).toContain('Account Payable');
    expect(compiled.textContent).toContain('Account Receivable');
    expect(compiled.textContent).toContain('Cash & Bank');
    expect(compiled.textContent).toContain('Process');
    expect(compiled.textContent).toContain('Report');
    expect(compiled.textContent).toContain('Static Data');
    expect(compiled.textContent).toContain('Miscellaneous');
    expect(compiled.textContent).toContain('Maintenance');
    expect(compiled.textContent).toContain('Setting Favorite Menu');
    expect(compiled.textContent).toContain('Upload Report Menu');
    expect(compiled.textContent).toContain('Manual Book');

    const activeItem = compiled.querySelector('aside div.bg-\\[\\#ebf3fe\\]');
    expect(activeItem?.textContent).toContain('Dashboard');
  });

  it('should render Executive Dashboard header, breadcrumb, simple data button, and subtitle', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('SofiCloud / Management View');
    expect(compiled.textContent).toContain('Executive Dashboard');
    expect(compiled.textContent).toContain('Simple data');
    expect(compiled.textContent).toContain('Real-time visibilty into receivables, sales, cash, expenses, and operational performance');
  });

  it('should render all 4 KPI metric cards with accurate values and descriptions', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Card 1: Receivables
    expect(compiled.textContent).toContain('RECEIVABLES');
    expect(compiled.textContent).toContain('Total Accounts Receivable');
    expect(compiled.textContent).toContain('Rp 8,450,000,000.-');
    expect(compiled.textContent).toContain('Overdue AR: Rp 1,100,000,000.-');

    // Card 2: Current Month
    expect(compiled.textContent).toContain('CURRENT MONTH');
    expect(compiled.textContent).toContain('Due Invoices This Month');
    expect(compiled.textContent).toContain('Rp 2,100,000,000.-');
    expect(compiled.textContent).toContain('Outstanding invoices due in september');

    // Card 3: Sales
    expect(compiled.textContent).toContain('SALES');
    expect(compiled.textContent).toContain('Sales Orders This Month');
    expect(compiled.textContent).toContain('Rp 5,800,000,000.-');
    expect(compiled.textContent).toContain('+18.4% vs Last month');

    // Card 4: Liquidity
    expect(compiled.textContent).toContain('LIQUIDITY');
    expect(compiled.textContent).toContain('Cash & Bank Balance');
    expect(compiled.textContent).toContain('Rp 6,720,000,000.-');
    expect(compiled.textContent).toContain('Project month-end: Rp 5,150,000,000.-');
  });

  it('should render 12-Month Sales Trend section with axes and legend', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('SALES ANALYSIS');
    expect(compiled.textContent).toContain('12-Month Sales Trend');
    expect(compiled.textContent).toContain('Revenue vs Sales Orders');
    expect(compiled.textContent).toContain('Revenue');
    expect(compiled.textContent).toContain('Sales Orders');

    // Months
    expect(compiled.textContent).toContain('Oct');
    expect(compiled.textContent).toContain('Nov');
    expect(compiled.textContent).toContain('Des');
    expect(compiled.textContent).toContain('Jan');
    expect(compiled.textContent).toContain('Feb');
    expect(compiled.textContent).toContain('Mar');
    expect(compiled.textContent).toContain('Apr');
    expect(compiled.textContent).toContain('May');
    expect(compiled.textContent).toContain('Jun');
    expect(compiled.textContent).toContain('Jul');
    expect(compiled.textContent).toContain('Aug');
  });

  it('should render Executive Highlights with all 5 attention items and their values', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('EXECUTIVE HIGHLIGHTS');
    expect(compiled.textContent).toContain('What needs attention');

    expect(compiled.textContent).toContain('Outstanding Sales Orders');
    expect(compiled.textContent).toContain('Rp 3,250,000,000.-');

    expect(compiled.textContent).toContain('OPEX Budget vs Actual');
    expect(compiled.textContent).toContain('Rp 2,800,000,000.-');

    expect(compiled.textContent).toContain('Operating Cash Coverage');
    expect(compiled.textContent).toContain('2.4 months');

    expect(compiled.textContent).toContain('Production Plan vs Actual');
    expect(compiled.textContent).toContain('12,500 (80.4%)');

    expect(compiled.textContent).toContain('Orders at Risk');
    expect(compiled.textContent).toContain('5 orders');
  });

  it('should cycle through 3 monthly datasets and dynamically update dashboard metrics and chart dots', () => {
    expect(component.selectedMonthIndex()).toBe(2); // September default
    expect(component.currentMonthName()).toBe('September');
    expect(fixture.nativeElement.textContent).toContain('Rp 8,450,000,000.-');
    expect(fixture.nativeElement.textContent).toContain('Rp 5,800,000,000.-');
    expect(fixture.nativeElement.textContent).toContain('5 orders');

    const compiled = fixture.nativeElement as HTMLElement;
    let peakDot = compiled.querySelector('circle[cx="456"]');
    expect(peakDot?.getAttribute('cy')).toBe('38');

    // Step backward to August
    component.prevMonth();
    fixture.detectChanges();
    expect(component.selectedMonthIndex()).toBe(1); // August
    expect(component.currentMonthName()).toBe('August');
    expect(fixture.nativeElement.textContent).toContain('August 2026');
    expect(fixture.nativeElement.textContent).toContain(
      'Outstanding invoices due in august',
    );
    expect(fixture.nativeElement.textContent).toContain('Rp 8,150,000,000.-');
    expect(fixture.nativeElement.textContent).toContain('Rp 5,300,000,000.-');
    expect(fixture.nativeElement.textContent).toContain('4 orders');
    peakDot = compiled.querySelector('circle[cx="456"]');
    expect(peakDot?.getAttribute('cy')).toBe('42');

    // Step backward to July
    component.prevMonth();
    fixture.detectChanges();
    expect(component.selectedMonthIndex()).toBe(0); // July
    expect(component.currentMonthName()).toBe('July');
    expect(fixture.nativeElement.textContent).toContain('July 2026');
    expect(fixture.nativeElement.textContent).toContain(
      'Outstanding invoices due in july',
    );
    expect(fixture.nativeElement.textContent).toContain('Rp 7,920,000,000.-');
    expect(fixture.nativeElement.textContent).toContain('Rp 4,900,000,000.-');
    expect(fixture.nativeElement.textContent).toContain('3 orders');
    peakDot = compiled.querySelector('circle[cx="456"]');
    expect(peakDot?.getAttribute('cy')).toBe('48');

    // Step forward back to August then September
    component.nextMonth();
    component.nextMonth();
    fixture.detectChanges();
    expect(component.selectedMonthIndex()).toBe(2); // September
    expect(component.currentMonthName()).toBe('September');
    expect(fixture.nativeElement.textContent).toContain('Rp 5,800,000,000.-');
    peakDot = compiled.querySelector('circle[cx="456"]');
    expect(peakDot?.getAttribute('cy')).toBe('38');
  });

  it('should toggle notifications drawer and mark alerts as read', () => {
    expect(component.isNotificationsOpen()).toBe(false);
    expect(component.unreadCount()).toBe(3);

    component.toggleNotifications();
    expect(component.isNotificationsOpen()).toBe(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Executive Alerts');
    expect(fixture.nativeElement.textContent).toContain(
      '5 Orders at Risk of shipping delay',
    );

    component.markAllAsRead();
    expect(component.unreadCount()).toBe(0);
  });

  it('should toggle user profile popover and display user info', () => {
    expect(component.isProfileOpen()).toBe(false);

    component.toggleProfile();
    expect(component.isProfileOpen()).toBe(true);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Aditya Pratama');
    expect(fixture.nativeElement.textContent).toContain('VP of Operations');
  });

  it('should close all open dropdowns on closeAllDropdowns, document click, or escape key', () => {
    component.isNotificationsOpen.set(true);
    component.isProfileOpen.set(true);

    component.closeAllDropdowns();
    expect(component.isNotificationsOpen()).toBe(false);
    expect(component.isProfileOpen()).toBe(false);

    // Document click
    component.isNotificationsOpen.set(true);
    component.onDocumentClick();
    expect(component.isNotificationsOpen()).toBe(false);

    // Escape key
    component.isProfileOpen.set(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.isProfileOpen()).toBe(false);
  });

  it('should display floating tooltip, crosshair line, and vertex halos when hovering a chart column, and dismiss on leave', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Initially no hover state
    expect(component.hoveredMonthIndex()).toBeNull();
    expect(component.hoveredChartPoint()).toBeNull();
    expect(compiled.querySelector('[role="tooltip"]')).toBeNull();
    expect(compiled.querySelector('line[stroke-dasharray="3,3"]')).toBeNull();

    // Hover over July column (index 9, x=456)
    component.setHoveredMonth(9);
    fixture.detectChanges();

    expect(component.hoveredMonthIndex()).toBe(9);
    const point = component.hoveredChartPoint();
    expect(point).toBeTruthy();
    expect(point?.monthName).toBe('July');

    const tooltip = compiled.querySelector('[role="tooltip"]');
    expect(tooltip).toBeTruthy();
    expect(tooltip?.textContent).toContain('July 2026');
    expect(tooltip?.textContent).toContain('Revenue:');
    expect(tooltip?.textContent).toContain('Sales Orders:');

    // Dashed crosshair line
    const crosshair = compiled.querySelector('line[stroke-dasharray="3,3"]');
    expect(crosshair).toBeTruthy();
    expect(crosshair?.getAttribute('x1')).toBe('456');
    expect(crosshair?.getAttribute('x2')).toBe('456');

    // Halos
    const halos = compiled.querySelectorAll('circle[r="6.5"]');
    expect(halos.length).toBe(2); // One for revenue, one for sales orders

    // Clear hover
    component.clearHoveredMonth();
    fixture.detectChanges();

    expect(component.hoveredMonthIndex()).toBeNull();
    expect(component.hoveredChartPoint()).toBeNull();
    expect(compiled.querySelector('[role="tooltip"]')).toBeNull();
    expect(compiled.querySelector('line[stroke-dasharray="3,3"]')).toBeNull();
  });

  it('should adjust tooltip transform for leftmost (Oct) and rightmost (Aug) columns', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Hover leftmost column (Oct - index 0)
    component.setHoveredMonth(0);
    fixture.detectChanges();
    let tooltip = compiled.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltip).toBeTruthy();
    expect(tooltip.style.transform).toBe('translateX(-15%)');
    expect(tooltip.textContent).toContain('October 2026');

    // Hover rightmost column (Aug - index 10)
    component.setHoveredMonth(10);
    fixture.detectChanges();
    tooltip = compiled.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltip).toBeTruthy();
    expect(tooltip.style.transform).toBe('translateX(-85%)');
    expect(tooltip.textContent).toContain('August 2026');

    // Hover middle column (Feb - index 4)
    component.setHoveredMonth(4);
    fixture.detectChanges();
    tooltip = compiled.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tooltip).toBeTruthy();
    expect(tooltip.style.transform).toBe('translateX(-50%)');
    expect(tooltip.textContent).toContain('February 2026');
  });
});

