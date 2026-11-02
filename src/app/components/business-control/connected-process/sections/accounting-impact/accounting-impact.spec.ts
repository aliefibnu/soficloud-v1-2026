import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { AccountingImpact } from './accounting-impact';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';
import { provideCustomImageLoader } from '../../../../systems/lib/image-loader';

describe('AccountingImpact', () => {
  let fixture: ComponentFixture<AccountingImpact>;
  let component: AccountingImpact;
  let translateService: TranslateService;

  const idTranslations = {
    CONNECTED_PROCESS: {
      ACCOUNTING_IMPACT: {
        TITLE: 'Operasional Berjalan\nPembukuan Mengikuti',
        DESCRIPTION:
          'Dokumen yang sudah memenuhi tahap pencatatan menghasilkan dampak akuntansi berdasarkan konfigurasi akun dan kebijakan perusahaan.',
        COLUMN_1: {
          TITLE: 'Dokumen Sumber',
          SUBTITLE: 'Termasuk General Journal dan adjustment bila diperlukan',
          ITEMS: [
            'Customer Invoice',
            'Supplier Invoice',
            'Inventory & Manufacturing',
            'Receipt & Payment',
          ],
        },
        COLUMN_2: {
          TITLE: 'Posting & Pemetaan COA',
          SUBTITLE:
            'Transaksi dapat ditelusuri kembali ke dokumen asal. Koreksi dilakukan melalui proses yang sesuai, dengan jejak perubahan dan otorisasi.',
          ITEMS: ['Jurnal', 'Trial Balance', 'General Ledger'],
        },
        COLUMN_3: {
          TITLE: 'Hasil Keuangan',
          SUBTITLE:
            'Kinerja keuangan positif melalui pertumbuhan pendapatan dan efisiensi biaya.',
          ITEMS: ['Laba Rugi', 'Neraca', 'Arus Kas', 'Subledger AP / AR'],
        },
        DISCLAIMER_LABEL: 'Penting:',
        DISCLAIMER_TEXT:
          'Alur ini menggambarkan hubungan proses dan data. Jenis jurnal, titik posting, pengakuan pendapatan/biaya, serta format laporan disesuaikan dengan implementasi dan kebijakan akuntansi perusahaan.',
      },
    },
  };

  const enTranslations = {
    CONNECTED_PROCESS: {
      ACCOUNTING_IMPACT: {
        TITLE: 'Operations Run,\nAccounting Follows',
        DESCRIPTION:
          'Documents that reach accounting recognition stages generate ledger entries based on chart of accounts setup and corporate policies.',
        COLUMN_1: {
          TITLE: 'Source Documents',
          SUBTITLE: 'Including General Journals and manual adjustments when required',
          ITEMS: [
            'Customer Invoice',
            'Supplier Invoice',
            'Inventory & Manufacturing',
            'Receipt & Payment',
          ],
        },
        COLUMN_2: {
          TITLE: 'Posting & COA Mapping',
          SUBTITLE:
            'Transactions can be traced back to source documents. Adjustments follow audit trails and proper authorization.',
          ITEMS: ['Journal', 'Trial Balance', 'General Ledger'],
        },
        COLUMN_3: {
          TITLE: 'Financial Statements',
          SUBTITLE:
            'Positive financial performance through revenue growth and cost control.',
          ITEMS: ['Profit & Loss', 'Balance Sheet', 'Cash Flow', 'Subledger AP / AR'],
        },
        DISCLAIMER_LABEL: 'Important:',
        DISCLAIMER_TEXT:
          'This flow illustrates process and data relationships. Posting points and financial statement structures reflect company configuration and policies.',
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountingImpact],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
        provideCustomImageLoader(),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', idTranslations);
    translateService.setTranslation('en', enTranslations);
    translateService.use('id');

    fixture = TestBed.createComponent(AccountingImpact);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the AccountingImpact component', () => {
    expect(component).toBeTruthy();
  });

  it('should render ProcessSectionShell with sectionId "dampak-akuntansi" and correct design tokens', () => {
    const shellEl = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shellEl).toBeTruthy();

    const shell = shellEl.componentInstance as ProcessSectionShell;
    expect(shell.sectionId()).toBe('dampak-akuntansi');
    expect(shell.stageBgClass()).toBe(
      'bg-[linear-gradient(322.37deg,#EDF3FB_-7.13%,rgba(178,204,245,0.91)_36.2%,#C3D7F7_96.88%)]',
    );
    expect(shell.titleMaxWidthClass()).toBe('max-w-xl sm:max-w-2xl lg:max-w-[640px]');
    expect(shell.descriptionMaxWidthClass()).toBe('max-w-xl sm:max-w-2xl lg:max-w-[760px]');
    expect(shell.title()).toBe('Operasional Berjalan\nPembukuan Mengikuti');
    expect(shell.description()).toContain('tahap pencatatan menghasilkan dampak akuntansi');
  });

  it('should render the 5-track responsive pipeline grid container', () => {
    const gridEl = fixture.debugElement.query(By.css('[data-testid="accounting-pipeline-grid"]'));
    expect(gridEl).toBeTruthy();
    expect(
      gridEl.nativeElement.classList.contains(
        'lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]',
      ),
    ).toBe(true);
  });

  it('should render Column 1 (Dokumen Sumber) with h3, subtitle, and 4 source document pill items with icons', () => {
    const col1El = fixture.debugElement.query(By.css('[data-testid="accounting-col-source"]'));
    expect(col1El).toBeTruthy();

    const headingEl = col1El.query(By.css('#accounting-col-1-heading'));
    expect(headingEl.nativeElement.textContent.trim()).toBe('Dokumen Sumber');

    const subtitleEl = col1El.query(By.css('p'));
    expect(subtitleEl.nativeElement.textContent.trim()).toBe(
      'Termasuk General Journal dan adjustment bila diperlukan',
    );

    const items = col1El.queryAll(By.css('ul > li'));
    expect(items.length).toBe(4);

    const expectedLabels = [
      'Customer Invoice',
      'Supplier Invoice',
      'Inventory & Manufacturing',
      'Receipt & Payment',
    ];

    items.forEach((item, index) => {
      const label = item.query(By.css('span')).nativeElement.textContent.trim();
      expect(label).toBe(expectedLabels[index]);

      const img = item.query(By.css('img'));
      expect(img).toBeTruthy();
      expect(img.nativeElement.getAttribute('src')).toContain('.svg');
    });
  });

  it('should render Column 2 (Posting & Pemetaan COA) with 3 ordered boxes and exactly 2 downward arrows', () => {
    const col2El = fixture.debugElement.query(By.css('[data-testid="accounting-col-coa"]'));
    expect(col2El).toBeTruthy();

    const headingEl = col2El.query(By.css('#accounting-col-2-heading'));
    expect(headingEl.nativeElement.textContent.trim()).toBe('Posting & Pemetaan COA');

    const steps = col2El.queryAll(By.css('ol > li'));
    expect(steps.length).toBe(3);

    const expectedSteps = ['Jurnal', 'Trial Balance', 'General Ledger'];
    steps.forEach((step, index) => {
      const boxText = step.query(By.css('span')).nativeElement.textContent.trim();
      expect(boxText).toBe(expectedSteps[index]);
    });

    const verticalArrows = col2El.queryAll(By.css('[data-testid="coa-vertical-arrow"]'));
    expect(verticalArrows.length).toBe(2);
    verticalArrows.forEach((arrow) => {
      expect(arrow.nativeElement.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should render Column 3 (Hasil Keuangan) with h3, subtitle, and 4 financial statement pills with icons', () => {
    const col3El = fixture.debugElement.query(By.css('[data-testid="accounting-col-results"]'));
    expect(col3El).toBeTruthy();

    const headingEl = col3El.query(By.css('#accounting-col-3-heading'));
    expect(headingEl.nativeElement.textContent.trim()).toBe('Hasil Keuangan');

    const subtitleEl = col3El.query(By.css('p'));
    expect(subtitleEl.nativeElement.textContent.trim()).toBe(
      'Kinerja keuangan positif melalui pertumbuhan pendapatan dan efisiensi biaya.',
    );

    const items = col3El.queryAll(By.css('ul > li'));
    expect(items.length).toBe(4);

    const expectedLabels = ['Laba Rugi', 'Neraca', 'Arus Kas', 'Subledger AP / AR'];
    items.forEach((item, index) => {
      const label = item.query(By.css('span')).nativeElement.textContent.trim();
      expect(label).toBe(expectedLabels[index]);

      const img = item.query(By.css('img'));
      expect(img).toBeTruthy();
      expect(img.nativeElement.getAttribute('src')).toContain('.svg');
    });
  });

  it('should render exactly 2 inter-column pipeline arrows with responsive rotation and aria-hidden="true"', () => {
    const arrows = fixture.debugElement.queryAll(By.css('[data-testid="pipeline-arrow"]'));
    expect(arrows.length).toBe(2);

    arrows.forEach((arrow) => {
      expect(arrow.nativeElement.getAttribute('aria-hidden')).toBe('true');
      const svg = arrow.query(By.css('svg'));
      expect(svg).toBeTruthy();
      expect(svg.nativeElement.classList.contains('rotate-90')).toBe(true);
      expect(svg.nativeElement.classList.contains('lg:rotate-0')).toBe(true);
    });
  });

  it('should render the bottom policy disclaimer box with bold label and policy text', () => {
    const disclaimerEl = fixture.debugElement.query(By.css('[data-testid="accounting-disclaimer"]'));
    expect(disclaimerEl).toBeTruthy();

    const strongEl = disclaimerEl.query(By.css('strong'));
    expect(strongEl.nativeElement.textContent.trim()).toBe('Penting:');

    const textEl = disclaimerEl.query(By.css('[data-testid="accounting-disclaimer-text"]'));
    expect(textEl.nativeElement.textContent).toContain('Alur ini menggambarkan hubungan proses dan data.');
  });

  it('should update texts when language changes to "en"', async () => {
    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    const shell = fixture.debugElement.query(By.directive(ProcessSectionShell))
      .componentInstance as ProcessSectionShell;
    expect(shell.title()).toBe('Operations Run,\nAccounting Follows');

    const col1Heading = fixture.debugElement.query(By.css('#accounting-col-1-heading'));
    expect(col1Heading.nativeElement.textContent.trim()).toBe('Source Documents');

    const col2Heading = fixture.debugElement.query(By.css('#accounting-col-2-heading'));
    expect(col2Heading.nativeElement.textContent.trim()).toBe('Posting & COA Mapping');

    const col2Steps = fixture.debugElement.queryAll(By.css('ol > li span'));
    expect(col2Steps[0].nativeElement.textContent.trim()).toBe('Journal');
    expect(col2Steps[1].nativeElement.textContent.trim()).toBe('Trial Balance');
    expect(col2Steps[2].nativeElement.textContent.trim()).toBe('General Ledger');

    const col3Heading = fixture.debugElement.query(By.css('#accounting-col-3-heading'));
    expect(col3Heading.nativeElement.textContent.trim()).toBe('Financial Statements');

    const col3Pills = fixture.debugElement.queryAll(By.css('[data-testid="accounting-col-results"] ul > li span'));
    expect(col3Pills[0].nativeElement.textContent.trim()).toBe('Profit & Loss');
    expect(col3Pills[1].nativeElement.textContent.trim()).toBe('Balance Sheet');
    expect(col3Pills[2].nativeElement.textContent.trim()).toBe('Cash Flow');
    expect(col3Pills[3].nativeElement.textContent.trim()).toBe('Subledger AP / AR');

    const disclaimerLabel = fixture.debugElement.query(By.css('[data-testid="accounting-disclaimer"] strong'));
    expect(disclaimerLabel.nativeElement.textContent.trim()).toBe('Important:');
  });

  it('should maintain semantic heading and list hierarchies for WCAG AA compliance', () => {
    // Shell has h2
    const h2 = fixture.debugElement.query(By.css('h2'));
    expect(h2).toBeTruthy();

    // 3 column cards use h3
    const h3s = fixture.debugElement.queryAll(By.css('h3'));
    expect(h3s.length).toBe(3);

    // Columns 1 and 3 use ul with aria-labelledby
    const uls = fixture.debugElement.queryAll(By.css('ul'));
    expect(uls.length).toBe(2);
    expect(uls[0].nativeElement.getAttribute('aria-labelledby')).toBe('accounting-col-1-heading');
    expect(uls[1].nativeElement.getAttribute('aria-labelledby')).toBe('accounting-col-3-heading');

    // Column 2 uses ol with aria-labelledby
    const ol = fixture.debugElement.query(By.css('ol'));
    expect(ol).toBeTruthy();
    expect(ol.nativeElement.getAttribute('aria-labelledby')).toBe('accounting-col-2-heading');
  });

  it('should apply height-responsive vertical rhythm classes for compact viewports', () => {
    const stageContainer = fixture.debugElement.query(By.css('.short\\:py-1\\.5'));
    expect(stageContainer).toBeTruthy();
    expect(stageContainer.nativeElement.classList.contains('short:gap-3')).toBe(true);

    const col1 = fixture.debugElement.query(By.css('[data-testid="accounting-col-source"]'));
    expect(col1.nativeElement.classList.contains('short:py-3.5')).toBe(true);

    const disclaimer = fixture.debugElement.query(By.css('[data-testid="accounting-disclaimer"]'));
    expect(disclaimer.nativeElement.classList.contains('short:py-3')).toBe(true);
  });
});
