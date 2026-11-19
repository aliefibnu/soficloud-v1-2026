import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { WhatIs } from './what-is';

describe('WhatIs', () => {
  let component: WhatIs;
  let fixture: ComponentFixture<WhatIs>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhatIs],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      RECOGNIZE_SOFI: {
        WHAT_IS: {
          TITLE_LINE_1: 'Apa itu',
          TITLE_LINE_2: 'SOFICloud ERP?',
          PARAGRAPH_1:
            'SOFICloud ERP adalah sistem pengelolaan bisnis terintegrasi dari PT Inforsys Indonesia yang menghubungkan penjualan, pembelian, persediaan, gudang, produksi, proyek, hingga keuangan dan akuntansi dalam satu platform.',
          PARAGRAPH_2:
            'Keterhubungan data antarbagian memungkinkan transaksi ditelusuri dari pesanan pelanggan hingga pembayaran tercatat dalam laporan keuangan.',
          PARAGRAPH_3:
            'SOFICloud ERP membantu perusahaan menata proses kerja, mengendalikan biaya, serta memantau stok, progres pesanan, dan kinerja usaha. Alur persetujuan dan laporan terintegrasi juga mendukung ketertiban kerja serta pengambilan keputusan manajemen.',
          IMAGE_ALT:
            'Profesional bisnis meninjau dokumen operasional dan laporan keuangan menggunakan SOFICloud ERP di laptop',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(WhatIs);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render full-viewport section landmark with heading, divider, and 3 paragraphs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section#what-is-soficloud');
    expect(section).toBeTruthy();
    expect(section?.getAttribute('aria-labelledby')).toBe('what-is-heading');
    expect(section?.classList.contains('lg:min-h-[calc(100svh-77px)]')).toBe(true);

    const heading = compiled.querySelector('h2#what-is-heading');
    expect(heading?.textContent?.trim()).toContain('Apa itu');
    expect(heading?.textContent?.trim()).toContain('SOFICloud ERP?');

    const divider = compiled.querySelector('[data-testid="what-is-divider"]');
    expect(divider).toBeTruthy();
    expect(divider?.classList.contains('bg-[#1C73E8]')).toBe(true);

    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs.length).toBe(3);
    expect(paragraphs[0]?.classList.contains('text-justify')).toBe(true);
  });

  it('should render the overlapping women-writing image with NgOptimizedImage dimensions and alt text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img') as HTMLImageElement | null;
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toContain('/images/recognize-sofi/what-is/women-writing.png');
    expect(img?.getAttribute('width')).toBe('642');
    expect(img?.getAttribute('height')).toBe('482');
    expect(img?.getAttribute('alt')?.trim().length).toBeGreaterThan(0);

    const cardBg = compiled.querySelector('[data-testid="what-is-card-bg"]');
    expect(cardBg).toBeTruthy();
    expect(cardBg?.classList.contains('lg:left-[8.95%]')).toBe(true);
  });
});
