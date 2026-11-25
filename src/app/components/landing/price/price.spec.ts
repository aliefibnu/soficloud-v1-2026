import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Price } from './price';

describe('Price', () => {
  let component: Price;
  let fixture: ComponentFixture<Price>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Price],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      PRICE: {
        HEADING: 'Mulai Dari Sini\nWujudkan Kebutuhanmu',
        STARTING_FROM: 'Harga Mulai Dari',
        AMOUNT: 'Rp2.500.000',
        PERIOD: '/bln',
        BUTTON: 'Lihat Detail Harga',
      },
    });

    fixture = TestBed.createComponent(Price);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the Price component', () => {
    expect(component).toBeTruthy();
  });

  it('should render section with id="pricing" and aria-labelledby', () => {
    const section = fixture.nativeElement.querySelector('section#pricing');
    expect(section).toBeTruthy();
    expect(section.getAttribute('aria-labelledby')).toBe('price-heading');
  });

  it('should render heading with Inter semi-bold styling', () => {
    const heading = fixture.nativeElement.querySelector('#price-heading');
    expect(heading).toBeTruthy();
    expect(heading.textContent).toContain('Mulai Dari Sini');
    expect(heading.textContent).toContain('Wujudkan Kebutuhanmu');
    expect(heading.classList.contains('font-inter')).toBe(true);
    expect(heading.classList.contains('font-semibold')).toBe(true);
  });

  it('should render starting price label and amount with Inter extra-bold', () => {
    const textContent = fixture.nativeElement.textContent;
    expect(textContent).toContain('Harga Mulai Dari');
    expect(textContent).toContain('Rp2.500.000');
    expect(textContent).toContain('/bln');

    const amountEl = fixture.nativeElement.querySelector('.font-extrabold');
    expect(amountEl).toBeTruthy();
    expect(amountEl.textContent).toContain('Rp2.500.000');
    expect(amountEl.textContent).toContain('/bln');
    expect(amountEl.classList.contains('font-inter')).toBe(true);
  });

  it('should render button with DM Sans, semi-bold, 130% line height and linear gradient', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent.trim()).toBe('Lihat Detail Harga');
    expect(button.getAttribute('aria-label')).toBe('Lihat Detail Harga');

    expect(button.classList.contains('font-dm-sans')).toBe(true);
    expect(button.classList.contains('font-semibold')).toBe(true);
    expect(button.classList.contains('leading-[130%]')).toBe(true);
    expect(button.className).toContain('from-[#1E37E1]');
    expect(button.className).toContain('via-[#1C7DD8]');
    expect(button.className).toContain('to-[#6694EB]');
  });

  it('should render the decorative background wave SVG anchored at top-0', () => {
    const waveContainer = fixture.nativeElement.querySelector('section > div');
    expect(waveContainer).toBeTruthy();
    expect(waveContainer.classList.contains('top-0')).toBe(true);

    const waveSvg = waveContainer.querySelector('svg');
    expect(waveSvg).toBeTruthy();
    const path = waveSvg.querySelector('path');
    expect(path).toBeTruthy();
    expect(path.getAttribute('fill')).toBe('#3874db');
  });

  it('should render all 7 illustration assets', () => {
    const images: HTMLImageElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('div[aria-hidden="true"] img'),
    );
    expect(images.length).toBe(7);

    const sources = images.map((img) => img.getAttribute('src'));
    expect(sources.some((s) => s?.includes('arrow-graph.svg'))).toBe(true);
    expect(sources.some((s) => s?.includes('pillar-1.svg'))).toBe(true);
    expect(sources.some((s) => s?.includes('pillar-2.svg'))).toBe(true);
    expect(sources.some((s) => s?.includes('pillar-3.svg'))).toBe(true);
    expect(sources.some((s) => s?.includes('coins.svg'))).toBe(true);
    expect(sources.some((s) => s?.includes('coin.svg'))).toBe(true);
    expect(sources.some((s) => s?.includes('bottom-coins.svg'))).toBe(true);

    const stage = fixture.nativeElement.querySelector('div[aria-hidden="true"] > div');
    expect(stage?.className).toContain('aspect-[998/565]');

    const arrowImg = images.find((img) => img.getAttribute('src')?.includes('arrow-graph.svg'));
    expect(arrowImg?.className).toContain('-top-[42.12%]');
    expect(arrowImg?.className).toContain('-right-[2.61%]');
    expect(arrowImg?.className).toContain('w-[101.40%]');

    const p1Img = images.find((img) => img.getAttribute('src')?.includes('pillar-1.svg'));
    const p2Img = images.find((img) => img.getAttribute('src')?.includes('pillar-2.svg'));
    const p3Img = images.find((img) => img.getAttribute('src')?.includes('pillar-3.svg'));

    expect(p1Img?.className).toContain('opacity-40');
    expect(p2Img?.className).toContain('opacity-40');
    expect(p3Img?.className).toContain('opacity-40');

    expect(p1Img?.className).toContain('right-[65.93%]');
    expect(p2Img?.className).toContain('right-[31.86%]');
    expect(p3Img?.className).toContain('-right-[2.20%]');
    expect(p1Img?.className).toContain('-bottom-[5.13%]');
    expect(p2Img?.className).toContain('-bottom-[5.13%]');
    expect(p3Img?.className).toContain('-bottom-[5.13%]');

    const bottomCoinsImg = images.find((img) =>
      img.getAttribute('src')?.endsWith('bottom-coins.svg'),
    );
    const coinsImg = images.find((img) => img.getAttribute('src')?.endsWith('/coins.svg'));
    const coinImg = images.find((img) => img.getAttribute('src')?.endsWith('/coin.svg'));

    expect(bottomCoinsImg?.className).toContain('-bottom-[5.13%]');
    expect(bottomCoinsImg?.className).toContain('right-[42.89%]');
    expect(bottomCoinsImg?.className).toContain('z-10');

    expect(coinsImg?.className).toContain('-bottom-[5.31%]');
    expect(coinsImg?.className).toContain('right-[13.83%]');
    expect(coinsImg?.className).toContain('z-20');

    expect(coinImg?.className).toContain('top-[9.56%]');
    expect(coinImg?.className).toContain('right-[17.54%]');
    expect(coinImg?.className).toContain('z-30');
  });
});
