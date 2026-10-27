import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { SatuData } from './satu-data';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';

describe('SatuData', () => {
  let fixture: ComponentFixture<SatuData>;
  let component: SatuData;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SatuData],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      CONNECTED_PROCESS: {
        SATU_DATA: {
          TITLE: 'Setiap Bagian Bergerak Dengan Konteks Yang Sama.',
          DESCRIPTION:
            'Dokumen bisnis membawa referensi ke tahap berikutnya. Tim dapat mengikuti asal permintaan, status pesanan, penerimaan, produksi, penagihan, hingga transaksi keuangannya.',
          CARDS: {
            CARD_1: {
              NUMBER: '01',
              TITLE: 'Referensi dokumen terhubung',
              DESCRIPTION:
                'Order, PO, penerimaan, invoice, dan pembayaran dapat ditelusuri sesuai alurnya.',
            },
            CARD_2: {
              NUMBER: '02',
              TITLE: 'Kontrol lintas bagian',
              DESCRIPTION:
                'Workflow dan approval memberi titik pemeriksaan saat dokumen berpindah proses.',
            },
            CARD_3: {
              NUMBER: '03',
              TITLE: 'Angka yang dapat dijelaskan',
              DESCRIPTION:
                'Laporan operasional dan akuntansi memiliki transaksi sumber yang jelas.',
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(SatuData);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the satu-data component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the ProcessSectionShell with sectionId satu-data and Figma background gradient stageBgClass', () => {
    const shellEl = fixture.debugElement.query(
      By.directive(ProcessSectionShell),
    );
    expect(shellEl).toBeTruthy();

    const shellComponent = shellEl.componentInstance as ProcessSectionShell;
    expect(shellComponent.sectionId()).toBe('satu-data');
    expect(shellComponent.stageBgClass()).toBe(
      'bg-[linear-gradient(322.37deg,#EDF3FB_-7.13%,rgba(178,204,245,0.91)_36.2%,#C3D7F7_96.88%)]',
    );
    expect(shellComponent.title()).toBe(
      'Setiap Bagian Bergerak Dengan Konteks Yang Sama.',
    );
    expect(shellComponent.description()).toContain(
      'Dokumen bisnis membawa referensi ke tahap berikutnya.',
    );
  });

  it('should render exactly 3 feature cards in a responsive grid', () => {
    const gridEl = fixture.debugElement.query(By.css('.grid'));
    expect(gridEl).toBeTruthy();
    expect(gridEl.nativeElement.classList.contains('md:grid-cols-3')).toBe(true);

    const cards = fixture.debugElement.queryAll(By.css('article'));
    expect(cards.length).toBe(3);
  });

  it('should render numbers 01, 02, and 03 in the cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    const numbers = cards.map((c) =>
      c.query(By.css('span')).nativeElement.textContent.trim(),
    );
    expect(numbers).toEqual(['01', '02', '03']);
  });

  it('should render translated titles for all 3 cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    const titles = cards.map((c) =>
      c.query(By.css('h3')).nativeElement.textContent.trim(),
    );
    expect(titles).toEqual([
      'Referensi dokumen terhubung',
      'Kontrol lintas bagian',
      'Angka yang dapat dijelaskan',
    ]);
  });

  it('should render translated descriptions for all 3 cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    const descriptions = cards.map((c) =>
      c.query(By.css('p')).nativeElement.textContent.trim(),
    );
    expect(descriptions[0]).toContain(
      'Order, PO, penerimaan, invoice, dan pembayaran dapat ditelusuri sesuai alurnya.',
    );
    expect(descriptions[1]).toContain(
      'Workflow dan approval memberi titik pemeriksaan saat dokumen berpindah proses.',
    );
    expect(descriptions[2]).toContain(
      'Laporan operasional dan akuntansi memiliki transaksi sumber yang jelas.',
    );
  });

  it('should apply rounded-[25.09px] border radius to all feature cards to match Figma spec', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    expect(cards.length).toBe(3);
    for (const card of cards) {
      expect(card.nativeElement.classList.contains('rounded-[25.09px]')).toBe(
        true,
      );
    }
  });

  it('should ensure card titles have single-line styling without max-w-72 restriction', () => {
    const titles = fixture.debugElement.queryAll(By.css('h3'));
    expect(titles.length).toBe(3);
    for (const title of titles) {
      expect(
        title.nativeElement.classList.contains('md:whitespace-nowrap'),
      ).toBe(true);
      expect(title.nativeElement.classList.contains('max-w-72')).toBe(false);
    }
  });

  it('should render a wider responsive grid container with max-w-7xl', () => {
    const gridEl = fixture.debugElement.query(By.css('.grid'));
    expect(gridEl.nativeElement.classList.contains('max-w-7xl')).toBe(true);
  });
});
