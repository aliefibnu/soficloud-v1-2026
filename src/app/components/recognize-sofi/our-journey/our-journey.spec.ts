import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { OurJourney } from './our-journey';

describe('OurJourney', () => {
  let component: OurJourney;
  let fixture: ComponentFixture<OurJourney>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurJourney],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      RECOGNIZE_SOFI: {
        OUR_JOURNEY: {
          ARIA_LABEL: 'Perjalanan dan Komitmen SOFICloud',
          PREV_ARIA_LABEL: 'Slide sebelumnya',
          NEXT_ARIA_LABEL: 'Slide berikutnya',
          INDICATOR_GROUP_ARIA_LABEL: 'Indikator navigasi slide',
          GO_TO_SLIDE_ARIA_LABEL: 'Buka slide',
          SLIDES: {
            OUR_JOURNEY: {
              EYEBROW: 'PERJALANAN KAMI',
              TITLE: 'Sejak 1998, tumbuh bersama kepercayaan pelanggan.',
              PARAGRAPH_1: 'Paragraf 1',
              PARAGRAPH_2: 'Paragraf 2',
              PARAGRAPH_3: 'Paragraf 3',
              IMAGE_ALT: 'Foto perjalanan kami',
            },
            SUSTAINABLE_DEVELOPMENT: {
              EYEBROW: 'PENGEMBANGAN BERKELANJUTAN',
              TITLE: 'Terus berkembang dari kebutuhan di lapangan.',
              PARAGRAPH_1: 'Paragraf 1',
              PARAGRAPH_2: 'Paragraf 2',
              IMAGE_ALT: 'Foto pengembangan berkelanjutan',
            },
            FOR_BUSINESS: {
              EYEBROW: 'UNTUK BISNIS YANG BERTUMBUH',
              TITLE: 'Fokus pada kebutuhan usaha kecil dan menengah.',
              PARAGRAPH_1: 'Paragraf 1',
              PARAGRAPH_2: 'Paragraf 2',
              IMAGE_ALT: 'Foto untuk bisnis yang bertumbuh',
            },
            OUR_COMMITMENT: {
              EYEBROW: 'KOMITMEN KAMI',
              TITLE: 'Mendampingi penerapan, mendukung penggunaan sehari-hari.',
              PARAGRAPH_1: 'Paragraf 1',
              PARAGRAPH_2: 'Paragraf 2',
              IMAGE_ALT: 'Foto komitmen kami',
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(OurJourney);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render full-viewport section with 4 editorial photo cards, 4 text slides, and 4 dot indicators', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section#our-journey');
    expect(section).toBeTruthy();
    expect(section?.classList.contains('lg:min-h-[calc(100svh-77px)]')).toBe(true);

    const photoCards = compiled.querySelectorAll('[data-testid="our-journey-photo-card"]');
    expect(photoCards.length).toBe(4);

    const eyebrows = compiled.querySelectorAll('[data-testid="our-journey-eyebrow"]');
    expect(eyebrows.length).toBe(4);
    expect(eyebrows[0]?.classList.contains('opacity-100')).toBe(true);
    expect(eyebrows[1]?.classList.contains('opacity-0')).toBe(true);

    const headings = compiled.querySelectorAll('[data-testid="our-journey-heading"]');
    expect(headings.length).toBe(4);
    expect(headings[0]?.classList.contains('opacity-100')).toBe(true);
    expect(headings[1]?.classList.contains('opacity-0')).toBe(true);

    const dividers = compiled.querySelectorAll('[data-testid="our-journey-divider"]');
    expect(dividers.length).toBe(1);

    const textSlides = compiled.querySelectorAll('[data-testid="our-journey-text-slide"]');
    expect(textSlides.length).toBe(4);
    expect(textSlides[0]?.classList.contains('opacity-100')).toBe(true);
    expect(textSlides[1]?.classList.contains('opacity-0')).toBe(true);

    const dots = compiled.querySelectorAll('[data-testid="our-journey-dot"]');
    expect(dots.length).toBe(4);
    expect(dots[0]?.getAttribute('aria-current')).toBe('true');
  });

  it('should advance slides via nextSlide, prevSlide, and dot indicators with circular grayscale preview slot', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(component.activeSlide()).toBe(0);
    expect(component.getSlideSlot(0)).toBe(0);
    expect(component.getSlideSlot(1)).toBe(1);
    expect(component.getCardFilter(0)).toBe('grayscale(0%)');
    expect(component.getCardFilter(1)).toBe('grayscale(100%)');

    const nextBtn = compiled.querySelector('button[aria-label="Slide berikutnya"]') as HTMLButtonElement | null;
    nextBtn?.click();
    fixture.detectChanges();

    expect(component.activeSlide()).toBe(1);
    expect(component.getSlideSlot(1)).toBe(0);
    expect(component.getSlideSlot(2)).toBe(1);

    const dots = compiled.querySelectorAll<HTMLButtonElement>('[data-testid="our-journey-dot"]');
    dots[3]?.click();
    fixture.detectChanges();

    expect(component.activeSlide()).toBe(3);
    expect(component.getSlideSlot(3)).toBe(0);
    expect(component.getSlideSlot(0)).toBe(1);

    const prevBtn = compiled.querySelector('button[aria-label="Slide sebelumnya"]') as HTMLButtonElement | null;
    prevBtn?.click();
    fixture.detectChanges();

    expect(component.activeSlide()).toBe(2);
  });
});
