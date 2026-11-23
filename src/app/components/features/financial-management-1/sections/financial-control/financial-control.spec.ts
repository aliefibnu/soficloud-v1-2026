import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { FinancialControl } from './financial-control';

const ID_TRANSLATIONS = {
  FINANCIAL_MANAGEMENT_1: {
    FINANCIAL_CONTROL: {
      TITLE: 'Kendalikan Bisnis Dari Satu Tempat',
      SUBTITLE:
        'Pilih area yang ingin dilihat. Setiap proses terhubung ke data yang sama dan dapat ditelusuri kapan saja',
      REPORTING_CARD: {
        RIBBON_TITLE: 'FINANCIAL REPORTING & ACCOUNTING',
        RIBBON_SUBTITLE: 'REPORT',
        HEADING: 'Dari Transaksi Operasional Menuju Informasi Keuangan Yang Siap Dibaca',
        DESCRIPTION:
          'Accounting impact terbentuk dari dokumen sumber. Finance dapat menelusuri jurnal, ledger, sampai laporan keuangan dengan data yang konsisten.',
        STEPS: {
          TRANSACTION: { TITLE: 'Transaction', SUBTITLE: 'Business object' },
          JOURNAL: { TITLE: 'Journal', SUBTITLE: 'Accounting rule' },
          GENERAL_LEDGER: { TITLE: 'General Ledger', SUBTITLE: 'Accounting book' },
          STATEMENT_INSIGHT: { TITLE: 'Statement & Insight', SUBTITLE: 'Financial output' },
        },
      },
      CASH_CONTROL_CARD: {
        RIBBON_TITLE: 'CASH, RECEIVABLE & PAYMENT CONTROL',
        RIBBON_SUBTITLE: 'CONTROL',
        HEADING: 'Kebutuhan cash, jatuh tempo, dan prioritas pembayaran dalam satu control board.',
        DESCRIPTION:
          'Outstanding AR/AP, due date, payment proposal, approval, serta posisi cash & bank tersedia untuk membantu Finance menentukan langkah berikutnya.',
        BOARD_TITLE: 'Payment Priority',
        COLUMNS: {
          VENDOR: 'Vendor',
          DUE_DATE: 'Jatuh Tempo',
          AMOUNT: 'Nominal',
          STATUS: 'Status',
        },
        ROWS: {
          ROW_1: {
            VENDOR: 'Supplier Material A',
            DUE_DATE: '26 Jul',
            AMOUNT: 'Rp42,8 Jt',
            STATUS: 'Ready',
          },
          ROW_2: {
            VENDOR: 'Logistic Partner',
            DUE_DATE: '27 Jul',
            AMOUNT: 'Rp28,4 Jt',
            STATUS: 'Review',
          },
          ROW_3: {
            VENDOR: 'Service Vendor',
            DUE_DATE: '28 Jul',
            AMOUNT: 'Rp19,6 Jt',
            STATUS: 'Approved',
          },
        },
      },
    },
  },
};

const EN_TRANSLATIONS = {
  FINANCIAL_MANAGEMENT_1: {
    FINANCIAL_CONTROL: {
      TITLE: 'Control Your Business From One Place',
      SUBTITLE:
        'Choose the area you want to inspect. Every process connects to the same data and can be traced at any time',
      REPORTING_CARD: {
        RIBBON_TITLE: 'FINANCIAL REPORTING & ACCOUNTING',
        RIBBON_SUBTITLE: 'REPORT',
        HEADING: 'From Operational Transactions to Ready-to-Read Financial Information',
        DESCRIPTION:
          'Accounting impact is formed directly from source documents. Finance can trace journals, ledgers, and financial statements with consistent data.',
        STEPS: {
          TRANSACTION: { TITLE: 'Transaction', SUBTITLE: 'Business object' },
          JOURNAL: { TITLE: 'Journal', SUBTITLE: 'Accounting rule' },
          GENERAL_LEDGER: { TITLE: 'General Ledger', SUBTITLE: 'Accounting book' },
          STATEMENT_INSIGHT: { TITLE: 'Statement & Insight', SUBTITLE: 'Financial output' },
        },
      },
      CASH_CONTROL_CARD: {
        RIBBON_TITLE: 'CASH, RECEIVABLE & PAYMENT CONTROL',
        RIBBON_SUBTITLE: 'CONTROL',
        HEADING: 'Cash requirements, due dates, and payment priorities in a single control board.',
        DESCRIPTION:
          'Outstanding AR/AP, due dates, payment proposals, approvals, and cash & bank positions are available to help Finance decide the next step.',
        BOARD_TITLE: 'Payment Priority',
        COLUMNS: {
          VENDOR: 'Vendor',
          DUE_DATE: 'Due Date',
          AMOUNT: 'Amount',
          STATUS: 'Status',
        },
        ROWS: {
          ROW_1: {
            VENDOR: 'Supplier Material A',
            DUE_DATE: '26 Jul',
            AMOUNT: 'Rp42.8M',
            STATUS: 'Ready',
          },
          ROW_2: {
            VENDOR: 'Logistic Partner',
            DUE_DATE: '27 Jul',
            AMOUNT: 'Rp28.4M',
            STATUS: 'Review',
          },
          ROW_3: {
            VENDOR: 'Service Vendor',
            DUE_DATE: '28 Jul',
            AMOUNT: 'Rp19.6M',
            STATUS: 'Approved',
          },
        },
      },
    },
  },
};

describe('FinancialManagement1 FinancialControl', () => {
  let component: FinancialControl;
  let fixture: ComponentFixture<FinancialControl>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialControl],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', ID_TRANSLATIONS);
    translateService.setTranslation('en', EN_TRANSLATIONS);
    translateService.use('id');

    fixture = TestBed.createComponent(FinancialControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the financial-control section component', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with #financial-control anchor, tabindex="-1", and aria-labelledby', () => {
    const section = fixture.debugElement.query(By.css('section#financial-control'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.getAttribute('tabindex')).toBe('-1');
    expect(section.nativeElement.getAttribute('aria-labelledby')).toBe(
      'financial-control-heading',
    );
  });

  it('should render centered heading and subtitle in id and update when switched to en', async () => {
    const h2 = fixture.debugElement.query(By.css('h2#financial-control-heading'));
    expect(h2).toBeTruthy();
    expect(h2.nativeElement.textContent.trim()).toBe('Kendalikan Bisnis Dari Satu Tempat');

    const subtitle = fixture.debugElement.query(By.css('section > div > p'));
    expect(subtitle.nativeElement.textContent.trim()).toContain(
      'Setiap proses terhubung ke data yang sama',
    );

    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(h2.nativeElement.textContent.trim()).toBe('Control Your Business From One Place');
    expect(subtitle.nativeElement.textContent.trim()).toContain(
      'Every process connects to the same data',
    );
  });

  it('should render two feature cards with flush-left gradient ribbons', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    expect(cards.length).toBe(2);

    const card1Text = cards[0].nativeElement.textContent;
    expect(card1Text).toContain('FINANCIAL REPORTING & ACCOUNTING');
    expect(card1Text).toContain('REPORT');

    const card2Text = cards[1].nativeElement.textContent;
    expect(card2Text).toContain('CASH, RECEIVABLE & PAYMENT CONTROL');
    expect(card2Text).toContain('CONTROL');

    const ribbons = fixture.debugElement.queryAll(By.css('article > div.rounded-r-xl'));
    expect(ribbons.length).toBe(2);
    for (const ribbon of ribbons) {
      const bg = (ribbon.nativeElement as HTMLElement).style.background;
      expect(bg).toContain('linear-gradient');
      expect(bg).toContain('108.08deg');
      expect(bg).toContain('rgb(215, 228, 250)');
    }
  });

  it('should render staggered 4-step accounting pipeline with calendar icons and 3 decorative elbow connectors', () => {
    const ol = fixture.debugElement.query(By.css('ol'));
    expect(ol).toBeTruthy();

    const stepItems = fixture.debugElement.queryAll(By.css('ol > li'));
    expect(stepItems.length).toBe(4);

    const stepCards = fixture.debugElement.queryAll(By.css('.flow-step-card'));
    expect(stepCards.length).toBe(4);
    expect(stepCards[0].nativeElement.classList.contains('mr-auto')).toBe(true);
    expect(stepCards[1].nativeElement.classList.contains('ml-auto')).toBe(true);
    expect(stepCards[2].nativeElement.classList.contains('mr-auto')).toBe(true);
    expect(stepCards[3].nativeElement.classList.contains('ml-auto')).toBe(true);

    const images = fixture.debugElement.queryAll(By.css('ol img'));
    expect(images.length).toBe(4);
    for (const img of images) {
      expect(img.nativeElement.getAttribute('src')).toContain(
        '/images/landing/why-choose-us/calendar.svg',
      );
      expect(img.nativeElement.getAttribute('alt')).toBe('');
      expect(img.nativeElement.getAttribute('aria-hidden')).toBe('true');
    }

    const connectors = fixture.debugElement.queryAll(By.css('ol svg'));
    expect(connectors.length).toBe(3);
    for (const svg of connectors) {
      expect(svg.nativeElement.getAttribute('aria-hidden')).toBe('true');
    }
  });

  it('should render semantic Payment Priority table with accessible headers, rows, and WCAG AA teal status pills', () => {
    const region = fixture.debugElement.query(By.css('.payment-table-wrapper[role="region"]'));
    expect(region).toBeTruthy();
    expect(region.nativeElement.getAttribute('tabindex')).toBe('0');
    expect(region.nativeElement.getAttribute('aria-labelledby')).toBe('payment-priority-title');

    const colHeaders = fixture.debugElement.queryAll(By.css('table thead th[scope="col"]'));
    expect(colHeaders.length).toBe(4);

    const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(rows.length).toBe(3);

    const rowHeaders = fixture.debugElement.queryAll(By.css('table tbody th[scope="row"]'));
    expect(rowHeaders.length).toBe(3);
    expect(rowHeaders.map((h) => h.nativeElement.textContent.trim())).toEqual([
      'Supplier Material A',
      'Logistic Partner',
      'Service Vendor',
    ]);

    const statusPills = fixture.debugElement.queryAll(By.css('.payment-cell-status span'));
    expect(statusPills.length).toBe(3);
    expect(statusPills.map((s) => s.nativeElement.textContent.trim())).toEqual([
      'Ready',
      'Review',
      'Approved',
    ]);
    for (const pill of statusPills) {
      expect(pill.nativeElement.classList.contains('bg-[#0F7E7F]')).toBe(true);
      const bgImage = (pill.nativeElement as HTMLElement).style.backgroundImage;
      expect(bgImage).toContain('linear-gradient');
      expect(bgImage).toContain('90deg');
      expect(bgImage).toContain('rgb(13, 149, 150)');
      expect(bgImage).toContain('rgb(16, 191, 193)');
    }
  });

  it('should expose translated data-label attributes on responsive payment cells for stacked mobile layout', async () => {
    const dateCells = fixture.debugElement.queryAll(By.css('.payment-cell-date'));
    const amountCells = fixture.debugElement.queryAll(By.css('.payment-cell-amount'));
    const statusCells = fixture.debugElement.queryAll(By.css('.payment-cell-status'));

    expect(dateCells.length).toBe(3);
    expect(amountCells.length).toBe(3);
    expect(statusCells.length).toBe(3);

    for (const cell of dateCells) {
      expect(cell.nativeElement.getAttribute('data-label')).toBe('Jatuh Tempo');
    }
    for (const cell of amountCells) {
      expect(cell.nativeElement.getAttribute('data-label')).toBe('Nominal');
    }
    for (const cell of statusCells) {
      expect(cell.nativeElement.getAttribute('data-label')).toBe('Status');
    }

    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    for (const cell of dateCells) {
      expect(cell.nativeElement.getAttribute('data-label')).toBe('Due Date');
    }
    for (const cell of amountCells) {
      expect(cell.nativeElement.getAttribute('data-label')).toBe('Amount');
    }
    for (const cell of statusCells) {
      expect(cell.nativeElement.getAttribute('data-label')).toBe('Status');
    }
  });
});
