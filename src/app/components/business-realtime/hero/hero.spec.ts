import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { Hero } from './hero';

describe('BusinessRealtime Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
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
        HERO: {
          TITLE_LINE_1: 'Pantau Bisnis',
          TITLE_LINE_2: 'Secara Real-time',
          TITLE_LINE_3: 'Putuskan',
          TITLE_LINE_4: 'Langkah',
          TITLE_LINE_5: 'Lebih Cepat',
          DESCRIPTION:
            'Penjualan, pengadaan, kebutuhan material, progres pesanan, dan keuangan dapat dilihat dari dashboard SOFICloud. Setiap tampilan membantu tim melihat kondisi terkini dan menentukan hal yang perlu ditindaklanjuti.',
          TABLET_ALT: 'Dashboard SOFICloud pada tablet',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading with the correct text lines', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading).toBeTruthy();
    const headingText = heading.nativeElement.textContent;
    expect(headingText).toContain('Pantau Bisnis');
    expect(headingText).toContain('Secara Real-time');
    expect(headingText).toContain('Putuskan');
    expect(headingText).toContain('Langkah');
    expect(headingText).toContain('Lebih Cepat');
  });

  it('should render the description paragraph with the expected text and 15px size', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent).toContain(
      'Penjualan, pengadaan, kebutuhan material, progres pesanan, dan keuangan',
    );
    expect(paragraph.nativeElement.classList.contains('text-[15px]')).toBe(true);
  });

  it('should render the tablet and pillar images with proper ngSrc and alt attributes', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBeGreaterThanOrEqual(2);

    const pillarImg = images.find((img) =>
      img.nativeElement.getAttribute('src')?.includes('tablet-pillar.svg'),
    );
    expect(pillarImg).toBeTruthy();
    expect(pillarImg?.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(pillarImg?.nativeElement.getAttribute('draggable')).toBe('false');
    expect(pillarImg?.nativeElement.classList.contains('pointer-events-none')).toBe(true);

    const tabletImg = images.find((img) =>
      img.nativeElement.getAttribute('src')?.includes('tablet.svg'),
    );
    expect(tabletImg).toBeTruthy();
    expect(tabletImg?.nativeElement.getAttribute('alt')).toBe('Dashboard SOFICloud pada tablet');
    expect(tabletImg?.nativeElement.getAttribute('draggable')).toBe('false');
    expect(tabletImg?.nativeElement.classList.contains('pointer-events-none')).toBe(true);
  });

  it('should contain the canvas container with gradient and shadow classes without border stroke', () => {
    const canvas = fixture.debugElement.query(
      By.css('.rounded-3xl, .rounded-4xl, [class*="rounded-["]'),
    );
    expect(canvas).toBeTruthy();
    expect(canvas.nativeElement.style.background).toContain('conic-gradient');
    expect(canvas.nativeElement.classList.contains('border')).toBe(false);
    expect(canvas.nativeElement.classList.contains('border-white/80')).toBe(false);
  });
});
