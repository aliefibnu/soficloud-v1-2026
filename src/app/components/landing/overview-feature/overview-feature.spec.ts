import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { OverviewFeature } from './overview-feature';
import { LanguageService } from '../../../systems/lib/language.service';
import { provideCustomImageLoader } from '../../../systems/lib/image-loader';

describe('OverviewFeature', () => {
  let component: OverviewFeature;
  let fixture: ComponentFixture<OverviewFeature>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewFeature],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
        provideCustomImageLoader(),
        LanguageService,
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      OVERVIEW_FEATURE: {
        TITLE: 'SOFICloud, Software ERP Andal dengan Beragam Fitur Unggulan',
        DESCRIPTION:
          'SOFICloud dirancang untuk mendukung berbagai proses penting perusahaan dalam satu sistem yang terintegrasi.',
        TARGET_REVENUE: {
          LABEL: 'Target Revenue',
          VALUE: '92%',
        },
        APPROVAL: {
          LABEL: 'Approval Hari ini',
          VALUE: '18 dokumen',
        },
        ARIA: {
          IMAGE_ALT: 'Pratinjau Dashboard ERP SOFICloud',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(OverviewFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the overview feature component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading and description', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#overview-feature-heading');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain(
      'SOFICloud, Software ERP Andal dengan Beragam Fitur Unggulan',
    );
  });

  it('should render the floating cards with labels and values', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Approval Hari ini');
    expect(compiled.textContent).toContain('18 dokumen');
    expect(compiled.textContent).toContain('Target Revenue');
    expect(compiled.textContent).toContain('92%');
  });

  it('should render responsive image attributes for glow and computer images', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const images = compiled.querySelectorAll('img');
    const glowImg = Array.from(images).find((img) => img.getAttribute('src')?.includes('glow'));
    const computerImg = Array.from(images).find((img) =>
      img.getAttribute('src')?.includes('computer'),
    );

    expect(glowImg).toBeTruthy();
    expect(glowImg?.getAttribute('srcset')).toContain('glow-418w.webp 418w');
    expect(glowImg?.getAttribute('srcset')).toContain('glow.webp 521w');
    expect(glowImg?.getAttribute('sizes')).toContain('(max-width: 640px) 418px, 521px');
    expect(glowImg?.getAttribute('loading')).toBe('lazy');

    expect(computerImg).toBeTruthy();
    expect(computerImg?.getAttribute('srcset')).toContain('computer-309w.webp 309w');
    expect(computerImg?.getAttribute('srcset')).toContain('computer.webp 417w');
    expect(computerImg?.getAttribute('sizes')).toContain('(max-width: 640px) 309px, 417px');
    expect(computerImg?.getAttribute('loading')).toBe('lazy');
  });
});
