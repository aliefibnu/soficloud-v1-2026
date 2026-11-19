import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Customers } from './customers';
import { provideCustomImageLoader } from '../../../systems/lib/image-loader';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

async function setupCustomersTestingModule(): Promise<ComponentFixture<Customers>> {
  await TestBed.configureTestingModule({
    imports: [Customers],
    providers: [
      provideCustomImageLoader(),
      provideTranslateService({
        fallbackLang: 'id',
        lang: 'id',
      }),
    ],
  }).compileComponents();

  const translateService = TestBed.inject(TranslateService);
  translateService.setTranslation('id', {
    CUSTOMERS: {
      STAT: '50+',
      HEADING: 'Pelanggan Kami',
      SUBTITLE: 'Telah menggunakan SOFICloud untuk mendukung proses bisnis dan operasional.',
      CARDS: {
        INDUSTRY_TITLE: 'Berbagai Industri',
        INDUSTRY_DESC: 'Pengalaman pada beragam karakter dan model bisnis.',
        TEAM_TITLE: 'Tim Implementasi Berpengalaman',
        TEAM_DESC: 'Memahami aplikasi dan proses bisnis perusahaan.',
        SUPPORT_TITLE: 'Dukungan Purna Jual',
        SUPPORT_DESC: 'Dukungan berkelanjutan setelah implementasi.',
      },
      CTA_MORE: 'Lihat selengkapnya',
      CTA_EXPERIENCE: 'Lihat Pengalaman Bisnis',
      ARIA: {
        SECTION: 'Pelanggan SOFICloud',
        CUSTOMER_CARD: 'Perusahaan pelanggan {{name}}',
        SELECT_CUSTOMER: 'Pilih perusahaan {{name}}',
      },
    },
  });
  translateService.use('id');

  const fixture = TestBed.createComponent(Customers);
  fixture.detectChanges();
  await fixture.whenStable();
  return fixture;
}

describe('Customers', () => {
  let component: Customers;
  let fixture: ComponentFixture<Customers>;

  beforeEach(async () => {
    vi.useFakeTimers();
    fixture = await setupCustomersTestingModule();
    component = fixture.componentInstance;
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero stat 50+ and heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('50+');
    expect(compiled.textContent).toContain('Pelanggan Kami');
    expect(compiled.textContent).toContain('Berbagai Industri');
    expect(compiled.textContent).toContain('Lihat selengkapnya');
    expect(compiled.textContent).toContain('Lihat Pengalaman Bisnis');
  });

  it('should have 10 top customer companies and an infinite cloned buffer', () => {
    expect(component.topCustomers.length).toBe(10);
    expect(component.infiniteTopCustomers.length).toBe(50);
  });

  it('should initialize with activeCustomerIndex at 2 (PT. Sanipak Indonesia) centered in spotlight', () => {
    expect(component.activeCustomerIndex()).toBe(2);
    expect(component.activeCustomer().name).toBe('PT. Sanipak Indonesia');
    expect(component.trackTransform()).toBe('translateX(calc(50% - 2872px))');
  });

  it('should switch active customer and update trackTransform when selectCustomer is called', () => {
    component.selectCustomer(20);
    expect(component.activeCustomerIndex()).toBe(0);
    expect(component.activeCustomer().name).toBe('PT. Madeira Threads Indonesia');
    expect(component.trackTransform()).toBe('translateX(calc(50% - 2616px))');

    // Selecting same customer does nothing
    component.selectCustomer(20);
    expect(component.activeCustomerIndex()).toBe(0);
  });

  it('should rotate active customer after synchronized timer interval', () => {
    expect(component.activeCustomerIndex()).toBe(2);
    vi.advanceTimersByTime(3500);
    expect(component.activeCustomerIndex()).toBe(3);
    vi.advanceTimersByTime(3500);
    expect(component.activeCustomerIndex()).toBe(4);
  });

  it('should not rotate when paused on hover', () => {
    expect(component.activeCustomerIndex()).toBe(2);
    component.pauseRotation();
    vi.advanceTimersByTime(3500);
    expect(component.activeCustomerIndex()).toBe(2);
    component.resumeRotation();
    vi.advanceTimersByTime(3500);
    expect(component.activeCustomerIndex()).toBe(3);
  });

  it('should generate 11 visible cards with active card centered at offset 0', () => {
    const cards = component.visibleCards();
    expect(cards.length).toBe(11);

    const centerCard = cards.find((c) => c.offset === 0);
    expect(centerCard).toBeDefined();
    expect(centerCard?.isActive).toBe(true);
    expect(centerCard?.customer.name).toBe('PT. Sanipak Indonesia');

    // 5 cards on left, 5 cards on right
    expect(cards.filter((c) => c.offset < 0).length).toBe(5);
    expect(cards.filter((c) => c.offset > 0).length).toBe(5);
  });

  it('should seamlessly loop infinitely past the last customer without delay', () => {
    component.activeCustomerIndex.set(9); // PT. Adhya Tirta Lampung
    expect(component.activeCustomer().name).toBe('PT. Adhya Tirta Lampung');

    vi.advanceTimersByTime(3200); // Trigger auto-advance
    expect(component.activeCustomerIndex()).toBe(0); // Loops directly to Madeira
    expect(component.activeCustomer().name).toBe('PT. Madeira Threads Indonesia');

    const centerCard = component.visibleCards().find((c) => c.offset === 0);
    expect(centerCard?.customer.name).toBe('PT. Madeira Threads Indonesia');
  });

  it('should switch customer instantly with 0ms delay when selectCustomer is called', () => {
    component.selectCustomer(7);
    expect(component.activeCustomerIndex()).toBe(7);
    expect(component.activeCustomer().name).toBe('PT. Bumi Sarimas Indonesia');
  });

  it('should define explicit positive width and height metadata for all customer logos', () => {
    const allCustomers = [
      ...component.topCustomers,
      ...component.bottomRow1,
      ...component.bottomRow2,
    ];
    for (const customer of allCustomers) {
      expect(Number.isInteger(customer.width)).toBe(true);
      expect(Number.isInteger(customer.height)).toBe(true);
      expect(customer.width).toBeGreaterThan(0);
      expect(customer.height).toBeGreaterThan(0);
    }
  });

  it('should render explicit width and height attributes on all customer images including customer-4.svg', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const images = Array.from(compiled.querySelectorAll('img'));
    expect(images.length).toBeGreaterThan(0);

    for (const img of images) {
      const width = Number(img.getAttribute('width'));
      const height = Number(img.getAttribute('height'));
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
      expect(img.classList.contains('w-auto')).toBe(true);
      expect(img.classList.contains('h-auto')).toBe(true);
    }

    const sanipakImages = images.filter((img) =>
      img.getAttribute('src')?.includes('customer-4.svg'),
    );
    expect(sanipakImages.length).toBe(3); // 2 in top marquee + 1 in center showcase
    for (const img of sanipakImages) {
      expect(img.getAttribute('width')).toBe('1619');
      expect(img.getAttribute('height')).toBe('569');
    }
  });

  it('should update showcase img dimensions cleanly when active customer changes', async () => {
    component.selectCustomer(0);
    vi.advanceTimersByTime(20);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const showcaseImg = compiled.querySelector('img.logo-switch-active') as HTMLImageElement | null;
    expect(showcaseImg).toBeTruthy();
    expect(showcaseImg?.getAttribute('src')).toContain('customer-3.svg');
    expect(showcaseImg?.getAttribute('width')).toBe('1678');
    expect(showcaseImg?.getAttribute('height')).toBe('560');
  });
});

describe('Customers center observer & fallback', () => {
  const originalIO = globalThis.IntersectionObserver;

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    globalThis.IntersectionObserver = originalIO;
  });

  it('should select the closest card among all intersecting candidates instead of only callback entries', async () => {
    const holder: {
      hostCb: IntersectionObserverCallback | null;
      centerCb: IntersectionObserverCallback | null;
    } = { hostCb: null, centerCb: null };

    class MockIntersectionObserver {
      constructor(cb: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        if (options?.root) {
          holder.centerCb = cb;
        } else {
          holder.hostCb = cb;
        }
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

    const fixture = await setupCustomersTestingModule();
    const component = fixture.componentInstance;

    // Report host visible so centerObserver starts
    holder.hostCb?.(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(holder.centerCb).toBeTruthy();

    const cards = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>(
      '.top-customer-card',
    );
    const card2 = cards[2];
    const card3 = cards[3];

    const rootBounds = { left: 0, width: 700 } as DOMRectReadOnly;
    let card2Left = 286; // center = 286 + 64 = 350 (exact center)
    let card3Left = 400; // center = 400 + 64 = 464 (edge of strip)

    vi.spyOn(card2, 'getBoundingClientRect').mockImplementation(
      () => ({ left: card2Left, width: 128 }) as DOMRect,
    );
    vi.spyOn(card3, 'getBoundingClientRect').mockImplementation(
      () => ({ left: card3Left, width: 128 }) as DOMRect,
    );

    // Card 2 enters center
    holder.centerCb?.(
      [{ target: card2, isIntersecting: true, rootBounds } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(component.activeCustomerIndex()).toBe(2);

    // Card 3 enters edge of center strip while Card 2 is still closer to center (absent from entries)
    card2Left = 250; // center = 314 (dist 36)
    card3Left = 390; // center = 454 (dist 104)
    holder.centerCb?.(
      [{ target: card3, isIntersecting: true, rootBounds } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(component.activeCustomerIndex()).toBe(2);

    // Card 2 exits center strip; Card 3 remains intersecting and becomes active
    card3Left = 340; // center = 404
    holder.centerCb?.(
      [{ target: card2, isIntersecting: false, rootBounds } as unknown as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    expect(component.activeCustomerIndex()).toBe(3);

    fixture.destroy();
  });

  it('should still advance via timer when IntersectionObserver is unavailable even if container has width', async () => {
    Reflect.deleteProperty(globalThis, 'IntersectionObserver');
    vi.useFakeTimers();

    const fixture = await setupCustomersTestingModule();
    const component = fixture.componentInstance;

    const containerEl = component.topMarqueeContainer()?.nativeElement;
    expect(containerEl).toBeTruthy();
    Object.defineProperty(containerEl!, 'offsetWidth', { value: 700, configurable: true });

    expect(component.activeCustomerIndex()).toBe(2);
    vi.advanceTimersByTime(3200);
    expect(component.activeCustomerIndex()).toBe(3);

    fixture.destroy();
  });
});
