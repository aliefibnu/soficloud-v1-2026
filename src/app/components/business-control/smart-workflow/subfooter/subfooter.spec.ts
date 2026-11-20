import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { Subfooter } from './subfooter';

describe('SmartWorkflow Subfooter', () => {
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
      SMART_WORKFLOW: {
        SUBFOOTER: {
          TITLE: 'Sesuaikan Pengendalian\nDengan Kebijakan Perusahaan Anda',
          DESCRIPTION:
            'Diskusikan hak akses, kewenangan transaksi, urutan approval, serta kebutuhan notifikasi bersama tim SOFICloud.',
        },
      },
    });
    translateService.setTranslation('en', {
      SMART_WORKFLOW: {
        SUBFOOTER: {
          TITLE: 'Tailor Control\nTo Your Company Policies',
          DESCRIPTION:
            'Discuss access rights, transaction authority, approval sequences, and notification requirements with the SOFICloud team.',
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

  it('should have proper landmark and heading accessibility attributes', () => {
    const section = fixture.debugElement.query(By.css('section#subfooter'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.getAttribute('aria-labelledby')).toBe('subfooter-heading');

    const heading = fixture.debugElement.query(By.css('h2#subfooter-heading'));
    expect(heading).toBeTruthy();
  });

  it('should render the 2-line heading with translated title', () => {
    const heading = fixture.debugElement.query(By.css('h2#subfooter-heading'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.classList.contains('whitespace-pre-line')).toBe(true);
    expect(heading.nativeElement.textContent.trim()).toBe(
      'Sesuaikan Pengendalian\nDengan Kebijakan Perusahaan Anda',
    );
  });

  it('should render the subtitle with translated description', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent.trim()).toBe(
      'Diskusikan hak akses, kewenangan transaksi, urutan approval, serta kebutuhan notifikasi bersama tim SOFICloud.',
    );
  });

  it('should update heading and description when switching language', async () => {
    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    const heading = fixture.debugElement.query(By.css('h2#subfooter-heading'));
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(heading.nativeElement.textContent.trim()).toBe(
      'Tailor Control\nTo Your Company Policies',
    );
    expect(paragraph.nativeElement.textContent.trim()).toBe(
      'Discuss access rights, transaction authority, approval sequences, and notification requirements with the SOFICloud team.',
    );
  });
});
