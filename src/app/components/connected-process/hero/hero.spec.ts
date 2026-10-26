import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { Hero } from './hero';

describe('ConnectedProcess Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
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
        HERO: {
          TITLE_LINE_1: 'Dari Aktivitas',
          TITLE_LINE_2: 'Bisnis Hingga',
          TITLE_LINE_3: 'Laporan',
          TITLE_LINE_4: 'Keuangan',
          DESCRIPTION:
            'Penjualan, pengadaan, kebutuhan material, progres pesanan, dan keuangan dapat dilihat dari dashboard SOFICloud. Setiap tampilan membantu tim melihat kondisi terkini dan menentukan hal yang perlu ditindaklanjuti.',
          TABLET_ALT: 'Dashboard Connected Business SOFICloud pada tablet',
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

  it('should render the heading with the correct 4 text lines', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading).toBeTruthy();
    const headingText = heading.nativeElement.textContent;
    expect(headingText).toContain('Dari Aktivitas');
    expect(headingText).toContain('Bisnis Hingga');
    expect(headingText).toContain('Laporan');
    expect(headingText).toContain('Keuangan');
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
      img.nativeElement.getAttribute('src')?.includes('pillar.svg'),
    );
    expect(pillarImg).toBeTruthy();
    expect(pillarImg?.nativeElement.getAttribute('aria-hidden')).toBe('true');

    const tabletImg = images.find((img) =>
      img.nativeElement.getAttribute('src')?.includes('tablet.webp'),
    );
    expect(tabletImg).toBeTruthy();
    expect(tabletImg?.nativeElement.getAttribute('alt')).toBe(
      'Dashboard Connected Business SOFICloud pada tablet',
    );
  });

  it('should contain the canvas container with conic gradient and shadow classes', () => {
    const canvas = fixture.debugElement.query(
      By.css('.rounded-3xl, .rounded-4xl, [class*="rounded-["]'),
    );
    expect(canvas).toBeTruthy();
    expect(canvas.nativeElement.style.background).toContain('conic-gradient');
  });

  it('should structure inverted 2-column layout with visual on left and text on right on desktop', () => {
    const columns = fixture.debugElement.queryAll(
      By.css('.grid > div'),
    );
    expect(columns.length).toBe(2);

    // Left column contains visual assets
    const visualCol = columns[0];
    expect(visualCol.nativeElement.classList.contains('lg:order-1')).toBe(true);
    expect(visualCol.query(By.css('img[src*="tablet.webp"]'))).toBeTruthy();

    // Right column contains text content
    const textCol = columns[1];
    expect(textCol.nativeElement.classList.contains('lg:order-2')).toBe(true);
    expect(textCol.query(By.css('h1'))).toBeTruthy();
    expect(textCol.nativeElement.classList.contains('text-right')).toBe(true);
    expect(textCol.nativeElement.classList.contains('items-end')).toBe(true);
  });

  it('should position the tablet flush to the left of the canvas and fit properly on the pillar', () => {
    const visualWrapper = fixture.debugElement.query(
      By.css('.aspect-691\\/649'),
    );
    expect(visualWrapper).toBeTruthy();
    expect(visualWrapper.nativeElement.classList.contains('left-0')).toBe(true);
    expect(visualWrapper.nativeElement.classList.contains('bottom-0')).toBe(true);

    const pillarImg = visualWrapper.query(By.css('img[src*="pillar.svg"]'));
    expect(pillarImg).toBeTruthy();
    expect(
      pillarImg.nativeElement.classList.contains('-bottom-[4.45%]') ||
        pillarImg.nativeElement.classList.contains('bottom-[-4.45%]'),
    ).toBe(true);
    expect(
      pillarImg.nativeElement.classList.contains('-left-[5.67%]') ||
        pillarImg.nativeElement.classList.contains('left-[-5.67%]'),
    ).toBe(true);
    expect(pillarImg.nativeElement.classList.contains('w-[105.64%]')).toBe(
      true,
    );

    const tabletImg = visualWrapper.query(By.css('img[src*="tablet.webp"]'));
    expect(tabletImg).toBeTruthy();
    expect(tabletImg.nativeElement.classList.contains('top-0')).toBe(true);
    expect(
      tabletImg.nativeElement.classList.contains('-left-[2.25%]') ||
        tabletImg.nativeElement.classList.contains('left-[-2.25%]'),
    ).toBe(true);
    expect(tabletImg.nativeElement.classList.contains('w-[92.19%]')).toBe(
      true,
    );
  });
});
