import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Customers } from './customers';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('Customers', () => {
  let component: Customers;
  let fixture: ComponentFixture<Customers>;
  let translateService: TranslateService;

  beforeEach(async () => {
    vi.useFakeTimers();

    await TestBed.configureTestingModule({
      imports: [Customers],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
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
        CTA_EXPERIENCE: 'Lihat Pengalaman Bisnis',
        ARIA: {
          SECTION: 'Pelanggan SOFICloud',
          CUSTOMER_CARD: 'Perusahaan pelanggan {{name}}',
          SELECT_CUSTOMER: 'Pilih perusahaan {{name}}',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(Customers);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
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
    component.selectCustomer(7); // PT. Bandar Sumatra Indonesia
    expect(component.activeCustomerIndex()).toBe(7);
    expect(component.activeCustomer().name).toBe(
      'PT. Bandar Sumatra Indonesia'
    );
  });
});
