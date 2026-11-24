import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { RealDashboard } from './real-dashboard';

describe('RealDashboard', () => {
  let fixture: ComponentFixture<RealDashboard>;
  let component: RealDashboard;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealDashboard],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      BUSINESS_REALTIME: {
        VISIBILITY_SECTIONS: {
          COMMON: {
            DASHBOARD: 'Dashboard',
            ADMIN: 'Admin',
            SIDEBAR: {
              PROCUREMENT: 'Procurement',
              SALES: 'Sales',
              MRP: 'MRP',
              FINANCE: 'Finance',
              ORDER_PIPELINE: 'Order Pipeline',
            },
            PROFILE: {
              ARIA: 'Avatar profil pengguna',
              NAME: 'Atabil Marove',
              ROLE: 'VP of Operations',
              STATUS: 'Online',
              BADGE: 'Admin',
            },
          },
          FINANCIAL_VISIBILITY: {
            MOCKUP: {
              WINDOW_TITLE: 'Finance ( PT INFORSYS INDONESIA )',
              ASSETS: {
                TITLE: 'ASSETS',
                PERIOD: 'August 2026',
                TOTAL: 'Rp 2,162,866,910.38',
                ITEMS: {
                  CASH: 'CASH',
                  BANK: 'BANK',
                  ACCOUNT_RECEIVABLE: 'ACCOUNT RECEIVABLE',
                  OTHERS_RECEIVABLE: 'OTHERS RECEIVABLE',
                  PREPAID: 'PREPAID',
                  INVENTORY: 'INVENTORY',
                  FIXED_ASSET: 'FIXED ASSET',
                  INTANGIBLE_ASSETS: 'INTANGIBLE ASSETS',
                },
              },
              LIABILITIES: {
                TITLE: 'LIABILITIES',
                PERIOD: 'August 2026',
                TOTAL: 'Rp 796,274,157.84',
                ITEMS: {
                  ACCOUNT_PAYABLE: 'ACCOUNT PAYABLE',
                  EMPLOYEE_PAYABLE: 'EMPLOYEE PAYABLE',
                  EXPENSES_PAYABLE: 'EXPENSES PAYABLE',
                  TAX_PAYABLE: 'TAX PAYABLE',
                  LONG_TERM_PAYABLE: 'LONG TERM PAYABLE',
                },
              },
              EQUITY: {
                TITLE: 'EQUITY',
                PERIOD: 'August 2026',
                TOTAL: 'Rp 1,427,742,140.54',
                ITEMS: {
                  CAPITAL: 'CAPITAL',
                  RETAINED_EARNING: 'RETAINED EARNING',
                  CURRENT_EARNING: 'CURRENT EARNING',
                },
              },
              TABLE: {
                NAME: 'NAME',
                PERIOD: 'August 2026',
              },
            },
          },
        },
      },
      FINANCIAL_MANAGEMENT_1: {
        REAL_DASHBOARD: {
          TITLE: 'Dashboard Asli Ditampilkan Dalam Rasio Utuh',
          SUBTITLE:
            'Screenshot digunakan sebagai bukti tampilan produk dan dibiarkan mengikuti ukuran aslinya tanpa crop, stretch, atau pemaksaan frame.',
          LIST_ARIA_LABEL: 'Kategori laporan keuangan',
          CARDS: {
            FINANCIAL_STATEMENTS: {
              TITLE: 'Financial Statements',
              DESCRIPTION:
                'Balance Sheet, Income Statement, Cash Flow, COGS, dan Changes in Equity.',
            },
            RECEIVABLE_PAYABLE: {
              TITLE: 'Receivable & Payable',
              DESCRIPTION: 'AR/AP Aging, Customer/Supplier Statement, dan Due Date Analysis.',
            },
            ACCOUNTING_REPORTS: {
              TITLE: 'Accounting Reports',
              DESCRIPTION: 'General Ledger, Trial Balance, Journal Listing, dan Account Movement.',
            },
            MANAGEMENT_ANALYSIS: {
              TITLE: 'Management Analysis',
              DESCRIPTION: 'Budget vs Actual, Cost Centre, Profitability, dan Cost Analysis.',
            },
          },
          CHARTS: {
            CASH_BANK_BALANCE: 'CASH & BANK BALANCE (-)',
            CASH_BANK_ARIA: 'Grafik batang horizontal Cash and Bank Balance dalam juta rupiah',
            CUSTOMER_BILLING_RECEIPT: 'CUSTOMER BILLING RECEIPT (-)',
            CUSTOMER_BILLING_ARIA: 'Grafik batang vertikal Customer Billing Receipt per bulan',
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(RealDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the real-dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the reporting section landmark with translated heading and subtitle', () => {
    const section = fixture.debugElement.query(By.css('section#reporting'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.getAttribute('tabindex')).toBe('-1');
    expect(section.nativeElement.getAttribute('aria-labelledby')).toBe('real-dashboard-heading');

    const heading = fixture.debugElement.query(By.css('h2#real-dashboard-heading'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.trim()).toBe(
      'Dashboard Asli Ditampilkan Dalam Rasio Utuh',
    );

    const subtitle = section.query(By.css('p'));
    expect(subtitle.nativeElement.textContent.trim()).toContain(
      'Screenshot digunakan sebagai bukti tampilan produk',
    );
  });

  it('should render 4 numbered report category cards in order (01-04)', () => {
    const cards = fixture.debugElement.queryAll(By.css('ol > li > article[data-category-id]'));
    expect(cards.length).toBe(4);

    const expected = [
      {
        id: 'financial-statements',
        number: '01',
        title: 'Financial Statements',
        description: 'Balance Sheet, Income Statement, Cash Flow, COGS, dan Changes in Equity.',
      },
      {
        id: 'receivable-payable',
        number: '02',
        title: 'Receivable & Payable',
        description: 'AR/AP Aging, Customer/Supplier Statement, dan Due Date Analysis.',
      },
      {
        id: 'accounting-reports',
        number: '03',
        title: 'Accounting Reports',
        description: 'General Ledger, Trial Balance, Journal Listing, dan Account Movement.',
      },
      {
        id: 'management-analysis',
        number: '04',
        title: 'Management Analysis',
        description: 'Budget vs Actual, Cost Centre, Profitability, dan Cost Analysis.',
      },
    ];

    expected.forEach((item, index) => {
      const card = cards[index].nativeElement as HTMLElement;
      expect(card.getAttribute('data-category-id')).toBe(item.id);
      expect(card.querySelector('h3')?.textContent?.trim()).toBe(item.title);
      expect(card.querySelector('p')?.textContent?.trim()).toBe(item.description);
      expect(card.querySelector('.real-dashboard-card-badge')?.textContent?.trim()).toBe(
        item.number,
      );
    });
  });

  it('should reuse app-erp-window-chrome with Finance active module and status pills', () => {
    const chrome = fixture.debugElement.query(By.css('app-erp-window-chrome'));
    expect(chrome).toBeTruthy();

    const logoImg = chrome.query(By.css('header img'));
    expect(logoImg).toBeTruthy();
    expect(logoImg.nativeElement.getAttribute('src')).toBe('/images/landing/features/1/cart.svg');
    expect(logoImg.nativeElement.getAttribute('alt')).toBe('');
    expect(logoImg.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(chrome.query(By.css('#shopping_cart_img'))).toBeNull();

    const activePill = chrome.query(By.css('.bg-\\[\\#EAF1FD\\]'));
    expect(activePill).toBeTruthy();
    expect(activePill.nativeElement.textContent.trim()).toBe('Finance');
    expect(chrome.nativeElement.textContent).toContain('Finance ( PT INFORSYS INDONESIA )');

    const statusPills = chrome.query(By.css('[aria-label="System status and timestamp"]'));
    expect(statusPills).toBeTruthy();
    expect(statusPills.nativeElement.textContent).toContain('Admin');
    expect(statusPills.nativeElement.textContent).toContain('Thursday, 28 Jul 2026');
    expect(statusPills.nativeElement.textContent).toContain('09:54:25 AM');
    expect(chrome.query(By.css('main'))).toBeNull();
  });

  it('should render shared balance sheet cards with semantic tables for Assets, Liabilities, and Equity', () => {
    const balanceSheetHost = fixture.debugElement.query(By.css('app-finance-balance-sheet-cards'));
    expect(balanceSheetHost).toBeTruthy();

    const tables = balanceSheetHost.queryAll(By.css('table'));
    expect(tables.length).toBe(3);

    const text = balanceSheetHost.nativeElement.textContent as string;
    expect(text).toContain('ASSETS');
    expect(text).toContain('Rp 2,162,866,910.38');
    expect(text).toContain('INTANGIBLE ASSETS');
    expect(text).toContain('791,666,666.52');
    expect(text).toContain('LIABILITIES');
    expect(text).toContain('Rp 796,274,157.84');
    expect(text).toContain('EQUITY');
    expect(text).toContain('Rp 1,427,742,140.54');
  });

  it('should render the Cash & Bank Balance horizontal bar chart with 0-80 M axis and 2 bars', () => {
    const chartCard = fixture.debugElement.query(By.css('article[data-chart-id="cash-bank-balance"]'));
    expect(chartCard).toBeTruthy();
    expect(chartCard.query(By.css('h4')).nativeElement.textContent.trim()).toBe(
      'CASH & BANK BALANCE (-)',
    );

    const svg = chartCard.query(By.css('svg[role="img"]'));
    expect(svg).toBeTruthy();

    const paths = svg.queryAll(By.css('path'));
    expect(paths.length).toBe(2);

    const svgText = svg.nativeElement.textContent as string;
    expect(svgText).toContain('Cash - IDR');
    expect(svgText).toContain('Bank BCA - 0611712455');
    expect(svgText).toContain('Petty Cash - IDR');
    expect(svgText).toContain('0');
    expect(svgText).toContain('40 M');
    expect(svgText).toContain('80 M');
  });

  it('should render the Customer Billing Receipt vertical column chart with 8 columns and preserved month labels', () => {
    const chartCard = fixture.debugElement.query(
      By.css('article[data-chart-id="customer-billing-receipt"]'),
    );
    expect(chartCard).toBeTruthy();
    expect(chartCard.query(By.css('h4')).nativeElement.textContent.trim()).toBe(
      'CUSTOMER BILLING RECEIPT (-)',
    );

    const svg = chartCard.query(By.css('svg[role="img"]'));
    expect(svg).toBeTruthy();
    expect(svg.query(By.css('[data-legend-pill]'))).toBeTruthy();

    const bars = svg.queryAll(By.css('path'));
    expect(bars.length).toBe(8);

    const svgText = svg.nativeElement.textContent as string;
    expect(svgText).toContain('400 M');
    expect(svgText).toContain('200 M');
    for (const label of [
      'Aug2026',
      'Sep2026',
      'Oct2026',
      'Nov2026',
      'Dec2026',
      'Jan2026',
      'Feb2027',
      'Mar2026',
    ]) {
      expect(svgText).toContain(label);
    }
  });
});
