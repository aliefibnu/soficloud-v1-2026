import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { Subfooter } from './subfooter';

describe('ConnectedProcess Subfooter', () => {
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
      CONNECTED_PROCESS: {
        SUBFOOTER: {
          TITLE: 'Sambungkan Proses Pahami Hasilnya',
          DESCRIPTION:
            'Diskusikan alur transaksi, titik kontrol, dan kebutuhan pelaporan perusahaan Anda bersama tim SOFICloud.',
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

  it('should render the heading with the correct translated text and id', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.getAttribute('id')).toBe('subfooter-heading');
    expect(heading.nativeElement.textContent).toContain(
      'Sambungkan Proses Pahami Hasilnya',
    );
  });

  it('should render the description paragraph with the expected text', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent).toContain(
      'Diskusikan alur transaksi, titik kontrol, dan kebutuhan pelaporan',
    );
  });

  it('should have the proper accessibility attributes on the section element', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.getAttribute('aria-labelledby')).toBe(
      'subfooter-heading',
    );
  });
});
