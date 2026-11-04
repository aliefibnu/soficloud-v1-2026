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

  it('should render the heading with the correct text lines and font weight', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading).toBeTruthy();
    const headingText = heading.nativeElement.textContent;
    expect(headingText).toContain('Pantau Bisnis');
    expect(headingText).toContain('Secara Real-time');
    expect(headingText).toContain('Putuskan');
    expect(headingText).toContain('Langkah');
    expect(headingText).toContain('Lebih Cepat');
    expect(heading.nativeElement.classList.contains('font-inter')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-extrabold')).toBe(true);
  });

  it('should render the description paragraph with the expected text and text-justify class', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent).toContain(
      'Penjualan, pengadaan, kebutuhan material, progres pesanan, dan keuangan',
    );
    expect(paragraph.nativeElement.classList.contains('text-justify')).toBe(true);
  });

  it('should render the unified tablet stage image with proper ngSrc and alt attributes', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBeGreaterThanOrEqual(1);

    const stageImg = images.find((img) =>
      img.nativeElement.getAttribute('src')?.includes('hero-tablet-stage.svg'),
    );
    expect(stageImg).toBeTruthy();
    expect(stageImg?.nativeElement.getAttribute('alt')).toBe('Dashboard SOFICloud pada tablet');
    expect(stageImg?.nativeElement.getAttribute('draggable')).toBe('false');
    expect(stageImg?.nativeElement.classList.contains('object-contain')).toBe(true);
  });

  it('should contain the card container with gradient, shadow, and rounded-32px classes', () => {
    const card = fixture.debugElement.query(
      By.css('.rounded-3xl, [class*="rounded-["]'),
    );
    expect(card).toBeTruthy();
    expect(card.nativeElement.style.background).toContain('conic-gradient');
    expect(card.nativeElement.classList.contains('shadow-[0px_3px_15px_0px_rgba(0,0,0,0.08)]')).toBe(true);
  });

  it('should allow text selection and copying on the typography column', () => {
    const textCol = fixture.debugElement.query(By.css('.z-10'));
    expect(textCol).toBeTruthy();
    expect(textCol.nativeElement.classList.contains('select-text')).toBe(true);
    expect(textCol.nativeElement.classList.contains('select-none')).toBe(false);
  });
});
