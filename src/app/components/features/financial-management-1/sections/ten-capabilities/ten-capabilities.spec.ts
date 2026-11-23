import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { TenCapabilities } from './ten-capabilities';

const ID_TRANSLATIONS = {
  FINANCIAL_MANAGEMENT_1: {
    TEN_CAPABILITIES: {
      TITLE: 'Kedalaman Fungsi Untuk Operasional Dan Accounting',
      SUBTITLE:
        'Sepuluh kapabilitas yang menghubungkan transaksi harian, kontrol, pencatatan accounting, dan laporan keuangan perusahaan.',
      CARDS: {
        GENERAL_LEDGER: {
          TITLE: 'Buku Besar & Akuntansi Keuangan',
          DESCRIPTION:
            'Bagan Akun Multi-Level, Entri Jurnal, Posting Otomatis, Buku Besar, Neraca Saldo, Buku Pembantu, Kontrol Periode, dan Tutup Buku.',
        },
        ACCOUNT_RECEIVABLE: {
          TITLE: 'Piutang Usaha',
          DESCRIPTION:
            'Faktur Pelanggan, Piutang Belum Lunas, Aging Piutang, Penerimaan, Uang Muka Diterima, Nota Kredit, dan Rekening Koran Pelanggan.',
        },
        ACCOUNT_PAYABLE: {
          TITLE: 'Utang Usaha',
          DESCRIPTION:
            'Bagan Akun Multi-Level, Entri Jurnal, Posting Otomatis, Buku Besar, Neraca Saldo, Buku Pembantu, Kontrol Periode, dan Tutup Buku.',
        },
        CASH_AND_BANK: {
          TITLE: 'Manajemen Kas & Bank',
          DESCRIPTION:
            'Bagan Akun Multi-Level, Entri Jurnal, Posting Otomatis, Buku Besar, Neraca Saldo, Buku Pembantu, Kontrol Periode, dan Tutup Buku.',
        },
        EXPENSE_REIMBURSEMENT: {
          TITLE: 'Biaya, Reimburse & Uang Muka',
          DESCRIPTION:
            'Bagan Akun Multi-Level, Entri Jurnal, Posting Otomatis, Buku Besar, Neraca Saldo, Buku Pembantu, Kontrol Periode, dan Tutup Buku.',
        },
        PAYMENT_PLANNING: {
          TITLE: 'Perencanaan Pembayaran & Kontrol Anggaran',
          DESCRIPTION:
            'Bagan Akun Multi-Level, Entri Jurnal, Posting Otomatis, Buku Besar, Neraca Saldo, Buku Pembantu, Kontrol Periode, dan Tutup Buku.',
        },
        FIXED_ASSET: {
          TITLE: 'Manajemen Aset Tetap',
          DESCRIPTION:
            'Bagan Akun Multi-Level, Entri Jurnal, Posting Otomatis, Buku Besar, Neraca Saldo, Buku Pembantu, Kontrol Periode, dan Tutup Buku.',
        },
        COST_AND_MANAGEMENT: {
          TITLE: 'Akuntansi Biaya & Manajemen',
          DESCRIPTION:
            'Bagan Akun Multi-Level, Entri Jurnal, Posting Otomatis, Buku Besar, Neraca Saldo, Buku Pembantu, Kontrol Periode, dan Tutup Buku.',
        },
        MULTI_CURRENCY: {
          TITLE: 'Multi-Mata Uang & Valas',
          DESCRIPTION:
            'Bagan Akun Multi-Level, Entri Jurnal, Posting Otomatis, Buku Besar, Neraca Saldo, Buku Pembantu, Kontrol Periode, dan Tutup Buku.',
        },
        ACCOUNTING_AUTOMATION: {
          TITLE: 'Otomasi Akuntansi',
          DESCRIPTION:
            'Bagan Akun Multi-Level, Entri Jurnal, Posting Otomatis, Buku Besar, Neraca Saldo, Buku Pembantu, Kontrol Periode, dan Tutup Buku.',
        },
      },
    },
  },
};

const EN_TRANSLATIONS = {
  FINANCIAL_MANAGEMENT_1: {
    TEN_CAPABILITIES: {
      TITLE: 'Functional Depth for Operations and Accounting',
      SUBTITLE:
        'Ten capabilities connecting daily transactions, controls, accounting records, and company financial statements.',
      CARDS: {
        GENERAL_LEDGER: {
          TITLE: 'General Ledger & Financial Accounting',
          DESCRIPTION:
            'Multi-Level CoA, Journal Entry, Automatic Posting, General Ledger, Trial Balance, Subsidiary Ledger, Period Control, and Closing.',
        },
        ACCOUNT_RECEIVABLE: {
          TITLE: 'Account Receivable',
          DESCRIPTION:
            'Customer Invoice, Outstanding AR, AR Aging, Receipt, Advance Receipt, Credit Note, and Customer Statement.',
        },
        ACCOUNT_PAYABLE: {
          TITLE: 'Account Payable',
          DESCRIPTION:
            'Multi-Level CoA, Journal Entry, Automatic Posting, General Ledger, Trial Balance, Subsidiary Ledger, Period Control, and Closing.',
        },
        CASH_AND_BANK: {
          TITLE: 'Cash & Bank Management',
          DESCRIPTION:
            'Multi-Level CoA, Journal Entry, Automatic Posting, General Ledger, Trial Balance, Subsidiary Ledger, Period Control, and Closing.',
        },
        EXPENSE_REIMBURSEMENT: {
          TITLE: 'Expense, Reimbursement & Advance',
          DESCRIPTION:
            'Multi-Level CoA, Journal Entry, Automatic Posting, General Ledger, Trial Balance, Subsidiary Ledger, Period Control, and Closing.',
        },
        PAYMENT_PLANNING: {
          TITLE: 'Payment Planning & Budget Control',
          DESCRIPTION:
            'Multi-Level CoA, Journal Entry, Automatic Posting, General Ledger, Trial Balance, Subsidiary Ledger, Period Control, and Closing.',
        },
        FIXED_ASSET: {
          TITLE: 'Fixed Asset Management',
          DESCRIPTION:
            'Multi-Level CoA, Journal Entry, Automatic Posting, General Ledger, Trial Balance, Subsidiary Ledger, Period Control, and Closing.',
        },
        COST_AND_MANAGEMENT: {
          TITLE: 'Cost & Management Accounting',
          DESCRIPTION:
            'Multi-Level CoA, Journal Entry, Automatic Posting, General Ledger, Trial Balance, Subsidiary Ledger, Period Control, and Closing.',
        },
        MULTI_CURRENCY: {
          TITLE: 'Multi-Currency & Forex',
          DESCRIPTION:
            'Multi-Level CoA, Journal Entry, Automatic Posting, General Ledger, Trial Balance, Subsidiary Ledger, Period Control, and Closing.',
        },
        ACCOUNTING_AUTOMATION: {
          TITLE: 'Accounting Automation',
          DESCRIPTION:
            'Multi-Level CoA, Journal Entry, Automatic Posting, General Ledger, Trial Balance, Subsidiary Ledger, Period Control, and Closing.',
        },
      },
    },
  },
};

describe('TenCapabilities', () => {
  let component: TenCapabilities;
  let fixture: ComponentFixture<TenCapabilities>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenCapabilities],
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

    fixture = TestBed.createComponent(TenCapabilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the ten-capabilities section component', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with #capabilities anchor, tabindex="-1", and aria-labelledby', () => {
    const section = fixture.debugElement.query(By.css('section#capabilities'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.getAttribute('tabindex')).toBe('-1');
    expect(section.nativeElement.getAttribute('aria-labelledby')).toBe('capabilities-heading');

    const h2 = fixture.debugElement.query(By.css('h2#capabilities-heading'));
    expect(h2).toBeTruthy();
    expect(h2.nativeElement.textContent.trim()).toBe(
      'Kedalaman Fungsi Untuk Operasional Dan Accounting',
    );
  });

  it('should render all 10 capability cards in order with decorative illustrations', () => {
    const cards = fixture.debugElement.queryAll(By.css('article.capability-card'));
    expect(cards.length).toBe(10);

    const expectedTitles = [
      'Buku Besar & Akuntansi Keuangan',
      'Piutang Usaha',
      'Utang Usaha',
      'Manajemen Kas & Bank',
      'Biaya, Reimburse & Uang Muka',
      'Perencanaan Pembayaran & Kontrol Anggaran',
      'Manajemen Aset Tetap',
      'Akuntansi Biaya & Manajemen',
      'Multi-Mata Uang & Valas',
      'Otomasi Akuntansi',
    ];

    const expectedSrcs = [
      '/images/landing/features/1/general-ledger.svg',
      '/images/landing/features/1/account-receivable.svg',
      '/images/landing/features/1/account-payable.svg',
      '/images/landing/features/1/cash-and-bank.svg',
      '/images/landing/features/1/expense.svg',
      '/images/landing/features/1/payment-planning.svg',
      '/images/landing/features/1/fixed-asset.svg',
      '/images/landing/features/1/cost-and-management.svg',
      '/images/landing/features/1/multi-currency.svg',
      '/images/landing/features/1/accounting-automation.svg',
    ];

    cards.forEach((card, index) => {
      const heading = card.query(By.css('h3')).nativeElement as HTMLElement;
      const img = card.query(By.css('img')).nativeElement as HTMLImageElement;

      expect(heading.textContent?.trim()).toBe(expectedTitles[index]);
      expect(img.getAttribute('src')).toBe(expectedSrcs[index]);
      expect(img.getAttribute('alt')).toBe('');
      expect(img.getAttribute('aria-hidden')).toBe('true');
      expect(img.getAttribute('width')).toBe(String(component.capabilities[index].imageWidth));
      expect(img.getAttribute('height')).toBe(String(component.capabilities[index].imageHeight));
      expect(img.style.getPropertyValue('--cap-img-w')).toBe(
        component.capabilities[index].illustrationWidthCqi,
      );
      expect(img.style.getPropertyValue('--cap-img-x')).toBe(
        component.capabilities[index].offsetX,
      );
      expect(img.style.getPropertyValue('--cap-img-y')).toBe(
        component.capabilities[index].offsetY,
      );
    });
  });

  it('should update translated text when switching language to English', async () => {
    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    const h2 = fixture.debugElement.query(By.css('h2#capabilities-heading')).nativeElement;
    expect(h2.textContent.trim()).toBe('Functional Depth for Operations and Accounting');

    const firstDesc = fixture.debugElement.query(
      By.css('article.capability-card p'),
    ).nativeElement;
    expect(firstDesc.textContent.trim()).toContain('Period Control, and Closing.');
  });
});
