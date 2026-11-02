import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { FinancialVisibility } from './financial-visibility';
import { VisibilitySectionShell } from '../visibility-section-shell/visibility-section-shell';

describe('FinancialVisibility', () => {
  let fixture: ComponentFixture<FinancialVisibility>;
  let component: FinancialVisibility;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialVisibility],
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
            DECISION_LABEL: 'Untuk keputusan:',
            DASHBOARD: 'Dashboard',
            ADMIN: 'Admin',
            SIDEBAR: {
              PROCUREMENT: 'Procurement',
              SALES: 'Sales',
              MRP: 'MRP',
              FINANCE: 'Finance',
              ORDER_PIPELINE: 'Order Pipeline',
            },
          },
          FINANCIAL_VISIBILITY: {
            TITLE: 'Baca Posisi Keuangan Dan\nPergerakannya Bersama.',
            DESCRIPTION:
              'Dashboard Finance menyajikan dua sudut pandang: komposisi neraca pada satu periode, serta perbandingan income dan expense dari waktu ke waktu.',
            DECISION_TEXT:
              'Evaluasi kondisi keuangan dan tren pemasukan serta pengeluaran untuk menentukan prioritas anggaran dan menjaga kestabilan keuangan',
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
              CHARTS: {
                CASH_BANK_BALANCE: 'CASH & BANK BALANCE (-)',
                INCOME_EXPENSE_TITLE: 'INCOME & EXPENSE ( IDR )',
                EXPENSE: 'Expense',
                INCOME: 'Income',
              },
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(FinancialVisibility);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the financial-visibility component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the outer shell with sectionId financial-visibility and translated title', () => {
    const section = fixture.debugElement.query(
      By.css('section#financial-visibility'),
    );
    expect(section).toBeTruthy();

    const heading = fixture.debugElement.query(
      By.css('h3#financial-visibility-heading'),
    );
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Baca Posisi Keuangan Dan Pergerakannya Bersama.',
    );
  });

  it('should render the ERP window chrome with module title and active Finance sidebar pill', () => {
    const chrome = fixture.debugElement.query(By.css('app-erp-window-chrome'));
    expect(chrome).toBeTruthy();

    const activePill = chrome.query(By.css('.bg-\\[\\#EAF1FD\\]'));
    expect(activePill).toBeTruthy();
    expect(activePill.nativeElement.textContent.trim()).toBe('Finance');

    expect(chrome.nativeElement.textContent).toContain(
      'Finance ( PT INFORSYS INDONESIA )',
    );
  });

  it('should render the status pills in ERP window chrome for Finance', () => {
    const pillsContainer = fixture.debugElement.query(
      By.css('[aria-label="System status and timestamp"]'),
    );
    expect(pillsContainer).toBeTruthy();
    expect(pillsContainer.nativeElement.textContent).toContain('Admin');
    expect(pillsContainer.nativeElement.textContent).toContain(
      'Thursday, 28 Jul 2026',
    );
    expect(pillsContainer.nativeElement.textContent).toContain('09:54:25 AM');
  });

  it('should render exactly 3 balance sheet cards for Assets, Liabilities, and Equity', () => {
    const articles = fixture.debugElement.queryAll(By.css('article'));
    expect(articles.length).toBeGreaterThanOrEqual(3);

    // First 3 articles are the balance sheet cards
    const assetsCard = articles[0];
    expect(assetsCard.nativeElement.textContent).toContain('ASSETS');
    expect(assetsCard.nativeElement.textContent).toContain(
      'Rp 2,162,866,910.38',
    );
    expect(assetsCard.nativeElement.textContent).toContain('CASH');
    expect(assetsCard.nativeElement.textContent).toContain('32,285,731.90');
    expect(assetsCard.nativeElement.textContent).toContain('BANK');
    expect(assetsCard.nativeElement.textContent).toContain('83,938,838.63');
    expect(assetsCard.nativeElement.textContent).toContain('FIXED ASSET');
    expect(assetsCard.nativeElement.textContent).toContain('139,575,580.37');

    const liabilitiesCard = articles[1];
    expect(liabilitiesCard.nativeElement.textContent).toContain('LIABILITIES');
    expect(liabilitiesCard.nativeElement.textContent).toContain(
      'Rp 796,274,157.84',
    );
    expect(liabilitiesCard.nativeElement.textContent).toContain(
      'ACCOUNT PAYABLE',
    );
    expect(liabilitiesCard.nativeElement.textContent).toContain(
      'EXPENSES PAYABLE',
    );
    expect(liabilitiesCard.nativeElement.textContent).toContain(
      '291,862,297.08',
    );

    const equityCard = articles[2];
    expect(equityCard.nativeElement.textContent).toContain('EQUITY');
    expect(equityCard.nativeElement.textContent).toContain(
      'Rp 1,427,742,140.54',
    );
    expect(equityCard.nativeElement.textContent).toContain('CAPITAL');
    expect(equityCard.nativeElement.textContent).toContain('745,000,000.00');
    expect(equityCard.nativeElement.textContent).toContain('RETAINED EARNING');
    expect(equityCard.nativeElement.textContent).toContain('451,972,595.79');
    expect(equityCard.nativeElement.textContent).toContain('CURRENT EARNING');
    expect(equityCard.nativeElement.textContent).toContain('230,769,544.75');
  });

  it('should render 2 Cash & Bank Balance coordinate cards', () => {
    const articles = fixture.debugElement.queryAll(By.css('article'));
    expect(articles.length).toBe(6); // 3 balance sheet + 2 cash & bank + 1 income & expense

    const midCard1 = articles[3];
    expect(midCard1.nativeElement.textContent).toContain(
      'CASH & BANK BALANCE (-)',
    );
    const mid1Texts = midCard1.queryAll(By.css('text'));
    const mid1Labels = mid1Texts.map((t) => t.nativeElement.textContent.trim());
    expect(mid1Labels).toContain('0');
    expect(mid1Labels).toContain('0.5');
    expect(mid1Labels).toContain('1');

    const midCard2 = articles[4];
    expect(midCard2.nativeElement.textContent).toContain(
      'CASH & BANK BALANCE (-)',
    );
    const mid2Texts = midCard2.queryAll(By.css('text'));
    const mid2Labels = mid2Texts.map((t) => t.nativeElement.textContent.trim());
    expect(mid2Labels).toContain('1');
    expect(mid2Labels).toContain('0.5');
    expect(mid2Labels).toContain('0');
  });

  it('should render the Income & Expense dual-curve SVG chart with 13 months', () => {
    const articles = fixture.debugElement.queryAll(By.css('article'));
    const bottomCard = articles[5];
    expect(bottomCard.nativeElement.textContent).toContain(
      'INCOME & EXPENSE ( IDR )',
    );
    expect(bottomCard.nativeElement.textContent).toContain('Expense');
    expect(bottomCard.nativeElement.textContent).toContain('Income');

    const chartSvg = bottomCard.query(By.css('svg[viewBox="0 0 680 230"]'));
    expect(chartSvg).toBeTruthy();

    const paths = chartSvg.queryAll(By.css('path'));
    expect(paths.length).toBe(2); // One expense path, one income path

    const circles = chartSvg.queryAll(By.css('circle'));
    expect(circles.length).toBe(26); // 13 expense markers + 13 income markers

    const cardContent = bottomCard.nativeElement.textContent;
    expect(cardContent).toContain('August 2025');
    expect(cardContent).toContain('December 2025');
    expect(cardContent).toContain('March 2026');
    expect(cardContent).toContain('August 2026');
    expect(cardContent).toContain('600 M');
    expect(cardContent).toContain('0');
  });

  it('should render the decision card with translated decision text', () => {
    const shellEl = fixture.debugElement.query(
      By.directive(VisibilitySectionShell),
    );
    expect(shellEl).toBeTruthy();
    expect(shellEl.nativeElement.textContent).toContain('Untuk keputusan:');
    expect(shellEl.nativeElement.textContent).toContain(
      'Evaluasi kondisi keuangan dan tren pemasukan serta pengeluaran untuk menentukan prioritas anggaran dan menjaga kestabilan keuangan',
    );
  });
});
