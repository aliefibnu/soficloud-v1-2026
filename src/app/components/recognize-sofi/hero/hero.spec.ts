import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Hero } from './hero';
import { LanguageService } from '../../../systems/lib/language.service';
import { By } from '@angular/platform-browser';

describe('Hero (Recognize Sofi)', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;
  let languageService: LanguageService;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        LanguageService,
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);

    translateService.setTranslation('id', {
      OVERVIEW_FEATURE: {
        APPROVAL: {
          LABEL: 'Approval Hari ini',
          VALUE: '18 dokumen',
        },
        TARGET_REVENUE: {
          LABEL: 'Target Revenue',
          VALUE: '92%',
        },
      },
    });

    translateService.setTranslation('en', {
      OVERVIEW_FEATURE: {
        APPROVAL: {
          LABEL: "Today's Approval",
          VALUE: '18 documents',
        },
        TARGET_REVENUE: {
          LABEL: 'Target Revenue',
          VALUE: '92%',
        },
      },
    });

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the Hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main heading with "Mengenal", "SofiCloud", and "Lebih Dekat"', () => {
    const heading = fixture.debugElement.query(By.css('h1#recognize-hero-heading'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent).toContain('Mengenal');
    expect(heading.nativeElement.textContent).toContain('SofiCloud');
    expect(heading.nativeElement.textContent).toContain('Lebih Dekat');
  });

  it('should render the subtitle description paragraph matching the design', () => {
    const desc = fixture.debugElement.query(By.css('p'));
    expect(desc).toBeTruthy();
    expect(desc.nativeElement.textContent).toContain(
      'Kenali SofiCloud sebagai solusi teknologi yang membantu perusahaan mengelola proses bisnis secara lebih terintegrasi, efisien, dan terstruktur.',
    );
  });

  it('should render the dashboard mockup monitor image with correct attributes', () => {
    const img = fixture.debugElement.query(By.css('img[ngSrc*="dashboard-stand.svg"]'));
    expect(img).toBeTruthy();
    expect(img.attributes['alt']).toBe('SOFICloud Executive Dashboard Mockup on Pedestal');
    expect(img.attributes['width']).toBe('417');
    expect(img.attributes['height']).toBe('461');
  });

  it('should render the concentric ripple background glow elements', () => {
    const glowCore = fixture.debugElement.query(By.css('.glow-core'));
    const glowRings = fixture.debugElement.queryAll(By.css('.glow-ring'));
    expect(glowCore).toBeTruthy();
    expect(glowRings.length).toBe(7);
  });

  it('should render the Approval floating card with progressbar', () => {
    const leftCard = fixture.debugElement.query(By.css('.animate-floating-card-left'));
    expect(leftCard).toBeTruthy();
    expect(leftCard.nativeElement.textContent).toContain('Approval Hari ini');
    expect(leftCard.nativeElement.textContent).toContain('18 dokumen');

    const progressBar = leftCard.query(By.css('[role="progressbar"]'));
    expect(progressBar).toBeTruthy();
    expect(progressBar.attributes['aria-valuenow']).toBe('75');
  });

  it('should render the Target Revenue floating card with 92% circular gauge', () => {
    const rightCard = fixture.debugElement.query(By.css('.animate-floating-card-right'));
    expect(rightCard).toBeTruthy();
    expect(rightCard.nativeElement.textContent).toContain('Target Revenue');
    expect(rightCard.nativeElement.textContent).toContain('92%');

    const svgCircle = rightCard.query(By.css('svg circle, svg path[stroke-dasharray]'));
    expect(svgCircle).toBeTruthy();
    expect(svgCircle.attributes['stroke-dasharray']).toBe('92, 100');
  });

  it('should adapt typography and text when language is changed to English', async () => {
    languageService.currentLanguage.set('en');
    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    const heading = fixture.debugElement.query(By.css('h1#recognize-hero-heading'));
    expect(heading.nativeElement.textContent).toContain('Getting to Know');
    expect(heading.nativeElement.textContent).toContain('More Closely');

    const desc = fixture.debugElement.query(By.css('p'));
    expect(desc.nativeElement.textContent).toContain('Get to know SofiCloud');
  });
});
