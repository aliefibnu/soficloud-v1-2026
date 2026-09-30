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
    expect(compiled.textContent).toContain('Enterprice Workspace');
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
});
