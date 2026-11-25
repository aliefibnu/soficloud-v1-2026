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
      APPROVAL_CARD: {
        RIBBON_TITLE: 'FINANCIAL REPORTING & ACCOUNTING',
        RIBBON_SUBTITLE: 'REPORT',
        HEADING: 'Setiap pengajuan memiliki status, otorisasi, komentar, dan histori keputusan.',
        DESCRIPTION:
          'Claim, reimbursement, dan advance bergerak dari request hingga settlement dan accounting dengan jalur yang dapat ditelusuri.',
        BOARD_EYEBROW: 'CLAIM EXPENSE · REQ-260903-018',
        BOARD_TITLE: 'Approval History',
        STEPS: {
          SUPERVISOR: {
            ROLE: 'Finance Supervisor',
            META: 'Approved · 09.42',
          },
          MANAGER: {
            ROLE: 'Finance Manager',
            META: 'Approved · 10.06',
          },
          DIRECTOR: {
            ROLE: 'Finance Director',
            META: 'Waiting for approval',
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
      APPROVAL_CARD: {
        RIBBON_TITLE: 'FINANCIAL REPORTING & ACCOUNTING',
        RIBBON_SUBTITLE: 'REPORT',
        HEADING:
          'Every submission has a clear status, authorization, comments, and decision history.',
        DESCRIPTION:
          'Claims, reimbursements, and advances move from request to settlement and accounting along a fully traceable path.',
        BOARD_EYEBROW: 'CLAIM EXPENSE · REQ-260903-018',
        BOARD_TITLE: 'Approval History',
        STEPS: {
          SUPERVISOR: {
            ROLE: 'Finance Supervisor',
            META: 'Approved · 09.42',
          },
          MANAGER: {
            ROLE: 'Finance Manager',
            META: 'Approved · 10.06',
          },
          DIRECTOR: {
            ROLE: 'Finance Director',
            META: 'Waiting for approval',
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

  it('should render three feature cards with flush-left gradient ribbons', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    expect(cards.length).toBe(3);

    const card1Text = cards[0].nativeElement.textContent;
    expect(card1Text).toContain('FINANCIAL REPORTING & ACCOUNTING');
    expect(card1Text).toContain('REPORT');

    const card2Text = cards[1].nativeElement.textContent;
    expect(card2Text).toContain('CASH, RECEIVABLE & PAYMENT CONTROL');
    expect(card2Text).toContain('CONTROL');

    const card3Text = cards[2].nativeElement.textContent;
    expect(card3Text).toContain('FINANCIAL REPORTING & ACCOUNTING');
    expect(card3Text).toContain('REPORT');
    expect(cards[2].nativeElement.classList.contains('lg:col-span-2')).toBe(true);

    const ribbons = fixture.debugElement.queryAll(By.css('article div.rounded-r-xl'));
    expect(ribbons.length).toBe(3);
    for (const ribbon of ribbons) {
      const bg = (ribbon.nativeElement as HTMLElement).style.background;
      expect(bg).toContain('linear-gradient');
      expect(bg).toContain('108.08deg');
      expect(bg).toContain('rgb(215, 228, 250)');
    }
  });

  it('should render staggered 4-step accounting pipeline with calendar icons and 3 decorative elbow connectors', () => {
    const reportingCard = fixture.debugElement.queryAll(By.css('article'))[0];
    const ol = reportingCard.query(By.css('ol'));
    expect(ol).toBeTruthy();

    const stepItems = reportingCard.queryAll(By.css('ol > li'));
    expect(stepItems.length).toBe(4);

    const stepCards = reportingCard.queryAll(By.css('.flow-step-card'));
    expect(stepCards.length).toBe(4);
    expect(stepCards[0].nativeElement.classList.contains('mr-auto')).toBe(true);
    expect(stepCards[1].nativeElement.classList.contains('ml-auto')).toBe(true);
    expect(stepCards[2].nativeElement.classList.contains('mr-auto')).toBe(true);
    expect(stepCards[3].nativeElement.classList.contains('ml-auto')).toBe(true);

    const images = reportingCard.queryAll(By.css('ol img'));
    expect(images.length).toBe(4);
    for (const img of images) {
      expect(img.nativeElement.getAttribute('src')).toContain(
        '/images/landing/why-choose-us/calendar.svg',
      );
      expect(img.nativeElement.getAttribute('alt')).toBe('');
      expect(img.nativeElement.getAttribute('aria-hidden')).toBe('true');
    }

    const connectors = reportingCard.queryAll(By.css('ol svg'));
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

  it('should render the full-width Approval History card with localized heading, description, and 3-step stepper', async () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    const approvalCard = cards[2];

    const heading = approvalCard.query(By.css('h3'));
    const description = approvalCard.query(By.css('h3 + p'));
    expect(heading.nativeElement.textContent.trim()).toBe(
      'Setiap pengajuan memiliki status, otorisasi, komentar, dan histori keputusan.',
    );
    expect(description.nativeElement.textContent.trim()).toContain(
      'Claim, reimbursement, dan advance bergerak dari request hingga settlement',
    );

    const boardEyebrow = approvalCard.query(By.css('.approval-board-card p'));
    const boardTitle = approvalCard.query(By.css('h4#approval-history-title'));
    expect(boardEyebrow.nativeElement.textContent.trim()).toBe('CLAIM EXPENSE · REQ-260903-018');
    expect(boardTitle.nativeElement.textContent.trim()).toBe('Approval History');

    const stepperList = approvalCard.query(By.css('ol.approval-stepper-list'));
    expect(stepperList).toBeTruthy();
    expect(stepperList.nativeElement.getAttribute('role')).toBe('list');
    expect(stepperList.nativeElement.getAttribute('aria-labelledby')).toBe(
      'approval-history-title',
    );

    const steps = approvalCard.queryAll(By.css('ol.approval-stepper-list > li'));
    expect(steps.length).toBe(3);

    expect(steps[0].nativeElement.getAttribute('aria-current')).toBeNull();
    expect(steps[1].nativeElement.getAttribute('aria-current')).toBeNull();
    expect(steps[2].nativeElement.getAttribute('aria-current')).toBe('step');

    const checkImages = approvalCard.queryAll(By.css('ol.approval-stepper-list img'));
    expect(checkImages.length).toBe(2);
    for (const img of checkImages) {
      expect(img.nativeElement.getAttribute('src')).toContain(
        '/images/landing/features/1/check.svg',
      );
      expect(img.nativeElement.getAttribute('alt')).toBe('');
      expect(img.nativeElement.getAttribute('aria-hidden')).toBe('true');
    }

    expect(steps[2].query(By.css('.approval-step-node span')).nativeElement.textContent.trim()).toBe(
      '3',
    );

    const connectors = approvalCard.queryAll(By.css('.approval-step-connector'));
    expect(connectors.length).toBe(2);
    for (const connector of connectors) {
      expect(connector.nativeElement.getAttribute('aria-hidden')).toBe('true');
    }

    expect(steps.map((s) => s.query(By.css('.approval-step-copy p')).nativeElement.textContent.trim())).toEqual([
      'Finance Supervisor',
      'Finance Manager',
      'Finance Director',
    ]);

    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(heading.nativeElement.textContent.trim()).toBe(
      'Every submission has a clear status, authorization, comments, and decision history.',
    );
    expect(description.nativeElement.textContent.trim()).toContain(
      'Claims, reimbursements, and advances move from request to settlement',
    );
  });

  it('should preserve full readable heading typography without short-viewport font shrinking while keeping compact spacing and Payment Priority header strip', () => {
    const section = fixture.debugElement.query(By.css('section#financial-control'));
    expect(section.nativeElement.classList.contains('short:pt-3')).toBe(true);
    expect(section.nativeElement.classList.contains('short:pb-10')).toBe(true);

    const h2 = fixture.debugElement.query(By.css('h2#financial-control-heading'));
    expect(h2.nativeElement.className).not.toContain('short:text-');

    const cardHeadings = fixture.debugElement.queryAll(By.css('article h3'));
    expect(cardHeadings.length).toBe(3);
    for (const heading of cardHeadings) {
      expect(heading.nativeElement.className).not.toContain('short:text-');
    }

    const grid = fixture.debugElement.query(By.css('section#financial-control > div.grid'));
    expect(grid.nativeElement.classList.contains('short:mt-5')).toBe(true);

    const paymentTitle = fixture.debugElement.query(By.css('h4#payment-priority-title'));
    const paymentHeaderStrip = paymentTitle.nativeElement.parentElement as HTMLElement;
    expect(paymentHeaderStrip.classList.contains('border-b')).toBe(true);
    expect(paymentHeaderStrip.className).toContain('shadow-[0_3px_12px_rgba(35,36,78,0.04)]');

    const stepperContainer = fixture.debugElement.query(By.css('.approval-stepper-container'));
    expect(stepperContainer.nativeElement.classList.contains('short:py-5')).toBe(true);
  });
});
