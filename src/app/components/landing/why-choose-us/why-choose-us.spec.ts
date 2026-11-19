import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { WhyChooseUs } from './why-choose-us';
import { LanguageService } from '../../../systems/lib/language.service';

async function setupWhyChooseUsTestingModule(): Promise<ComponentFixture<WhyChooseUs>> {
  await TestBed.configureTestingModule({
    imports: [WhyChooseUs],
    providers: [
      provideTranslateService({
        fallbackLang: 'id',
        lang: 'id',
      }),
      LanguageService,
    ],
  }).compileComponents();

  const translateService = TestBed.inject(TranslateService);
  translateService.setTranslation('id', {
    WHY_CHOOSE_US: {
      HEADING: 'Mengapa Perusahaan Memilih SOFICloud?',
      SUBHEADING:
        'ERP yang matang, terintegrasi, dan siap mendukung pertumbuhan bisnis Anda.',
      ARIA: {
        PREV_BUTTON: 'Kartu sebelumnya',
        NEXT_BUTTON: 'Kartu berikutnya',
      },
      CARDS: {
        '1': {
          TITLE: 'Dikembangkan\nSejak 1998',
          DESCRIPTION:
            'Pengalaman lebih dari dua dekade membentuk SOFICloud menjadi ERP yang matang.',
        },
      },
    },
  });
  translateService.use('id');

  const fixture = TestBed.createComponent(WhyChooseUs);
  await fixture.whenStable();
  return fixture;
}

describe('WhyChooseUs', () => {
  let component: WhyChooseUs;
  let fixture: ComponentFixture<WhyChooseUs>;

  beforeEach(async () => {
    fixture = await setupWhyChooseUsTestingModule();
    component = fixture.componentInstance;
  });

  it('should create the why-choose-us component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 9 cards configured', () => {
    expect(component.cards.length).toBe(9);
    expect(component.totalCards()).toBe(9);
  });

  it('should start at index 0', () => {
    expect(component.currentIndex()).toBe(0);
  });

  it('should advance to next card and wrap around', () => {
    component.next();
    expect(component.currentIndex()).toBe(1);

    component.goTo(8);
    expect(component.currentIndex()).toBe(8);

    component.next();
    expect(component.currentIndex()).toBe(0);
  });

  it('should go to previous card and wrap around', () => {
    component.prev();
    expect(component.currentIndex()).toBe(8);

    component.prev();
    expect(component.currentIndex()).toBe(7);
  });

  it('should compute circular offset correctly for smooth 3D display', () => {
    component.goTo(0);
    expect(component.getShortestOffset(0)).toBe(0);
    expect(component.getShortestOffset(1)).toBe(1);
    expect(component.getShortestOffset(2)).toBe(2);
    expect(component.getShortestOffset(8)).toBe(-1);
    expect(component.getShortestOffset(7)).toBe(-2);

    component.goTo(8);
    expect(component.getShortestOffset(8)).toBe(0);
    expect(component.getShortestOffset(0)).toBe(1);
    expect(component.getShortestOffset(7)).toBe(-1);
  });

  it('should update active card on card click when offset is not zero', () => {
    component.goTo(0);
    component.onCardClick(2, 2);
    expect(component.currentIndex()).toBe(2);

    // Clicking already center card shouldn't force change
    component.onCardClick(2, 0);
    expect(component.currentIndex()).toBe(2);
  });

  afterEach(() => {
    component?.stopAutoPlay();
    vi.useRealTimers();
  });

  it('should render the heading text', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#why-choose-us-heading');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Mengapa Perusahaan Memilih SOFICloud?');
  });

  it('should apply the linear gradient background and height classes to the top banner', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const banner = compiled.querySelector('#why-choose-us > div.pointer-events-none');
    expect(banner).toBeTruthy();
    expect(banner?.className).toContain(
      'bg-[linear-gradient(180deg,#3874DB_-0.13%,#9CBBF0_65.48%,#C3D7F7_105.66%)]',
    );
    expect(banner?.className).toContain('bg-size-[100%_180%]');
    expect(banner?.className).toContain('bg-top');
    expect(banner?.className).toContain('h-56');
    expect(banner?.className).toContain('sm:h-60');
    expect(banner?.className).toContain('md:h-62');
  });

  it('should render card images with 96x96 dimensions and enlarged size classes', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const firstImg = compiled.querySelector<HTMLImageElement>('.carousel-card img');
    expect(firstImg).toBeTruthy();
    expect(firstImg?.getAttribute('width')).toBe('96');
    expect(firstImg?.getAttribute('height')).toBe('96');
    expect(firstImg?.className).toContain('max-h-16');
    expect(firstImg?.className).toContain('md:max-h-21');
  });

  it('should apply text-[#182849] to center card title and text-slate-400 to unselected card titles', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll<HTMLElement>('.carousel-card');

    // Card 0 is center initially
    const centerTitle = cards[0].querySelector('h3');
    expect(centerTitle?.classList.contains('text-[#182849]')).toBe(true);
    expect(centerTitle?.classList.contains('text-slate-400')).toBe(false);

    // Card 1 is unselected initially
    const unselectedTitle = cards[1].querySelector('h3');
    expect(unselectedTitle?.classList.contains('text-slate-400')).toBe(true);
    expect(unselectedTitle?.classList.contains('text-[#182849]')).toBe(false);
  });

  it('should automatically advance to next card after 5 seconds', () => {
    vi.useFakeTimers();
    component.startAutoPlay();
    expect(component.currentIndex()).toBe(0);

    vi.advanceTimersByTime(5000);
    expect(component.currentIndex()).toBe(1);

    vi.advanceTimersByTime(5000);
    expect(component.currentIndex()).toBe(2);
  });

  it('should pause autoplay on mouseenter and resume on mouseleave', () => {
    vi.useFakeTimers();
    component.startAutoPlay();
    expect(component.currentIndex()).toBe(0);

    component.onMouseEnter();
    expect(component.isHovered()).toBe(true);

    vi.advanceTimersByTime(10000);
    expect(component.currentIndex()).toBe(0);

    component.onMouseLeave();
    expect(component.isHovered()).toBe(false);

    vi.advanceTimersByTime(5000);
    expect(component.currentIndex()).toBe(1);
  });

  it('should pause and resume autoplay on host mouseenter and mouseleave DOM events', () => {
    vi.useFakeTimers();
    component.startAutoPlay();
    const hostEl = fixture.nativeElement as HTMLElement;

    hostEl.dispatchEvent(new MouseEvent('mouseenter'));
    expect(component.isHovered()).toBe(true);

    vi.advanceTimersByTime(10000);
    expect(component.currentIndex()).toBe(0);

    hostEl.dispatchEvent(new MouseEvent('mouseleave'));
    expect(component.isHovered()).toBe(false);

    vi.advanceTimersByTime(5000);
    expect(component.currentIndex()).toBe(1);
  });

  it('should reset autoplay timer on manual navigation', () => {
    vi.useFakeTimers();
    component.startAutoPlay();
    expect(component.currentIndex()).toBe(0);

    vi.advanceTimersByTime(3000);
    component.next();
    expect(component.currentIndex()).toBe(1);

    vi.advanceTimersByTime(3000);
    expect(component.currentIndex()).toBe(1);

    vi.advanceTimersByTime(2000);
    expect(component.currentIndex()).toBe(2);
  });

  it('should stop autoplay when destroyed', () => {
    vi.useFakeTimers();
    component.startAutoPlay();
    fixture.destroy();

    vi.advanceTimersByTime(10000);
    expect(component.currentIndex()).toBe(0);
  });
});

describe('WhyChooseUs viewport autoplay guard', () => {
  const originalIO = globalThis.IntersectionObserver;
  let observerCallback: IntersectionObserverCallback | null = null;
  let component: WhyChooseUs;
  let fixture: ComponentFixture<WhyChooseUs>;

  const emitVisibility = (isIntersecting: boolean): void => {
    observerCallback?.(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  };

  beforeEach(async () => {
    observerCallback = null;

    class MockIntersectionObserver {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
      root = null;
      rootMargin = '';
      thresholds = [];
    }

    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    fixture = await setupWhyChooseUsTestingModule();
    component = fixture.componentInstance;
    vi.useFakeTimers();
  });

  afterEach(() => {
    component?.stopAutoPlay();
    vi.useRealTimers();
    globalThis.IntersectionObserver = originalIO;
  });

  it('should not restart autoplay on touch end when scrolled offscreen', () => {
    emitVisibility(true);
    expect(component.isInViewport()).toBe(true);

    component.onTouchStart({
      touches: [{ clientX: 100 }],
    } as unknown as TouchEvent);

    emitVisibility(false);
    expect(component.isInViewport()).toBe(false);

    component.onTouchEnd({
      changedTouches: [{ clientX: 105 }],
    } as unknown as TouchEvent);

    vi.advanceTimersByTime(10000);
    expect(component.currentIndex()).toBe(0);
  });

  it('should not restart autoplay on mouse up or mouse leave when offscreen', () => {
    emitVisibility(true);

    component.onMouseDown({ clientX: 100 } as unknown as MouseEvent);
    emitVisibility(false);
    component.onMouseUp({ clientX: 105 } as unknown as MouseEvent);

    vi.advanceTimersByTime(10000);
    expect(component.currentIndex()).toBe(0);

    component.onMouseEnter();
    component.onMouseLeave();

    vi.advanceTimersByTime(10000);
    expect(component.currentIndex()).toBe(0);
  });

  it('should ignore resetAutoPlay while offscreen and resume when back in viewport', () => {
    emitVisibility(false);
    component.next();
    component.resetAutoPlay();

    vi.advanceTimersByTime(10000);
    expect(component.currentIndex()).toBe(1);

    emitVisibility(true);
    vi.advanceTimersByTime(5000);
    expect(component.currentIndex()).toBe(2);
  });
});
