import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Subfooter } from './subfooter';

describe('FinancialManagement1 Subfooter', () => {
  let component: Subfooter;
  let fixture: ComponentFixture<Subfooter>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subfooter],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      FINANCIAL_MANAGEMENT_1: {
        SUBFOOTER: {
          TITLE:
            'Lihat bagaimana alur finance perusahaan\nAnda dapat dijalankan di SOFICloud.',
          DESCRIPTION:
            'Mulai dari transaksi operasional, approval, cash control,\nsampai laporan keuangan dan analisa manajemen.',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(Subfooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the subfooter component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the decorative top blue divider inside the section', () => {
    const divider = fixture.debugElement.query(By.css('[data-testid="subfooter-divider"]'));
    expect(divider).toBeTruthy();
    expect(divider.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(divider.nativeElement.classList.contains('bg-[#365AD2]')).toBe(true);
    expect(divider.nativeElement.classList.contains('w-full')).toBe(true);
  });

  it('should render the heading with the translated text and id', () => {
    const heading = fixture.debugElement.query(By.css('h2#subfooter-heading'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Lihat bagaimana alur finance perusahaan Anda dapat dijalankan di SOFICloud.',
    );
  });

  it('should render the translated description paragraph', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Mulai dari transaksi operasional, approval, cash control, sampai laporan keuangan dan analisa manajemen.',
    );
  });
});
