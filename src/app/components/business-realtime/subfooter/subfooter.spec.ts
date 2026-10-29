import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { Subfooter } from './subfooter';

describe('Subfooter', () => {
  let fixture: ComponentFixture<Subfooter>;
  let component: Subfooter;
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
      BUSINESS_REALTIME: {
        SUBFOOTER: {
          TITLE: 'Informasi Yang Jelas\nTindakan Yang Tepat',
          DESCRIPTION:
            'Diskusikan indikator dan dashboard yang dibutuhkan sesuai alur kerja perusahaan Anda',
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

  it('should render the semantic section with aria-labelledby', () => {
    const section = fixture.debugElement.query(By.css('section#subfooter'));
    expect(section).toBeTruthy();
    expect(section.attributes['aria-labelledby']).toBe('subfooter-heading');
  });

  it('should render the 2-line heading with translated title', () => {
    const heading = fixture.debugElement.query(By.css('h2#subfooter-heading'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.trim()).toBe(
      'Informasi Yang Jelas\nTindakan Yang Tepat',
    );
  });

  it('should render the subtitle with translated description', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent.trim()).toBe(
      'Diskusikan indikator dan dashboard yang dibutuhkan sesuai alur kerja perusahaan Anda',
    );
  });
});
