import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { StrongErp } from './strong-erp';

describe('StrongErp', () => {
  let component: StrongErp;
  let fixture: ComponentFixture<StrongErp>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrongErp],
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
        STRONG_ERP: {
          TITLE: 'ERP yang kuat, dengan penerapan yang lebih sederhana.',
          PARAGRAPH_1:
            'Kami membangun SOFICloud agar perusahaan dapat menggunakan ERP dengan proses yang mudah dipahami dan biaya terjangkau. Kebutuhan bisnis menjadi dasar penentuan modul, alur kerja, dan tahapan penerapan.',
          PARAGRAPH_2:
            'Tim kami membantu menerjemahkan aktivitas sehari-hari ke dalam sistem terintegrasi, sehingga pengguna lebih mudah beradaptasi, transaksi tercatat tertib, dan manfaat ERP dapat dirasakan dalam operasional bisnis.',
          IMAGE_ALT:
            'Tim implementasi SOFICloud berdiskusi bersama di depan laptop untuk menata proses bisnis terintegrasi',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(StrongErp);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render full-viewport section landmark with heading, divider, and 2 paragraphs', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section#strong-erp');
    expect(section).toBeTruthy();
    expect(section?.getAttribute('aria-labelledby')).toBe('strong-erp-heading');
    expect(section?.classList.contains('lg:min-h-[calc(100svh-77px)]')).toBe(true);

    const heading = compiled.querySelector('h2#strong-erp-heading');
    expect(heading?.textContent?.trim()).toBe('ERP yang kuat, dengan penerapan yang lebih sederhana.');

    const divider = compiled.querySelector('[data-testid="strong-erp-divider"]');
    expect(divider).toBeTruthy();
    expect(divider?.classList.contains('bg-[#365AD2]')).toBe(true);

    const paragraphs = compiled.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
    expect(paragraphs[0]?.classList.contains('text-left')).toBe(true);
  });

  it('should render the team photo with NgOptimizedImage dimensions, rounded-32 frame, and alt text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const frame = compiled.querySelector('[data-testid="strong-erp-image-frame"]');
    expect(frame).toBeTruthy();
    expect(frame?.classList.contains('lg:rounded-[32px]')).toBe(true);

    const img = compiled.querySelector('img') as HTMLImageElement | null;
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toContain('/images/recognize-sofi/strong-erp/picture.png');
    expect(img?.getAttribute('width')).toBe('763');
    expect(img?.getAttribute('height')).toBe('479');
    expect(img?.getAttribute('alt')?.trim().length).toBeGreaterThan(0);
  });
});
