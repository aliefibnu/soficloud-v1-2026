import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { VisibilityFunction } from './visibility-function';

describe('BusinessRealtime VisibilityFunction', () => {
  let component: VisibilityFunction;
  let fixture: ComponentFixture<VisibilityFunction>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisibilityFunction],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      BUSINESS_REALTIME: {
        VISIBILITY_FUNCTION: {
          TITLE: 'VISIBILITAS LINTAS FUNGSI',
          SUBTITLE:
            'Mulai dari pesanan pelanggan sampai posisi keuangan, manajemen melihat indikator yang relevan pada tiap proses. Enam tampilan berikut menunjukkan bagaimana tim membaca peluang, hambatan, dan pekerjaan yang masih terbuka.',
          TABS: {
            SALES_PERFORMANCE: 'SALES PERFORMANCE',
            PROCUREMENT_CONTROL: 'PROCUREMENT CONTROL',
            MATERIAL_READINESS: 'MATERIAL READINESS',
            ORDER_PIPELINE: 'ORDER PIPELINE',
            FINANCIAL_VISIBILITY: 'FINANCIAL VISIBILITY',
          },
          ALTS: {
            SALES_PERFORMANCE: 'Pratinjau Dashboard Sales Performance',
            PROCUREMENT_CONTROL: 'Pratinjau Dashboard Procurement Control',
            MATERIAL_READINESS: 'Pratinjau Dashboard Material Readiness',
            ORDER_PIPELINE: 'Pratinjau Dashboard Order Pipeline',
            FINANCIAL_VISIBILITY: 'Pratinjau Dashboard Financial Visibility',
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(VisibilityFunction);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the visibility-function component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title with Inter bold and correct color', () => {
    const heading = fixture.debugElement.query(By.css('h2'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.trim()).toBe('VISIBILITAS LINTAS FUNGSI');
    expect(heading.nativeElement.classList.contains('font-inter')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-bold')).toBe(true);
    expect(heading.nativeElement.classList.contains('text-[#23244E]')).toBe(true);
  });

  it('should render the subtitle with DM Sans regular, 17px size, and correct color', () => {
    const subtitle = fixture.debugElement.query(By.css('p'));
    expect(subtitle).toBeTruthy();
    expect(subtitle.nativeElement.textContent).toContain(
      'Mulai dari pesanan pelanggan sampai posisi keuangan',
    );
    expect(subtitle.nativeElement.classList.contains('font-dm-sans')).toBe(true);
    expect(subtitle.nativeElement.classList.contains('font-normal')).toBe(true);
    expect(subtitle.nativeElement.classList.contains('text-[#23244E]')).toBe(true);
    expect(subtitle.nativeElement.classList.contains('text-[17px]')).toBe(true);
  });

  it('should render 5 tab buttons with tablist ARIA role', () => {
    const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
    expect(tablist).toBeTruthy();

    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(tabs.length).toBe(5);
    expect(tabs[0].nativeElement.textContent.trim()).toBe('SALES PERFORMANCE');
    expect(tabs[1].nativeElement.textContent.trim()).toBe('PROCUREMENT CONTROL');
    expect(tabs[2].nativeElement.textContent.trim()).toBe('MATERIAL READINESS');
    expect(tabs[3].nativeElement.textContent.trim()).toBe('ORDER PIPELINE');
    expect(tabs[4].nativeElement.textContent.trim()).toBe('FINANCIAL VISIBILITY');
  });

  it('should have sales-performance active by default with correct styles', () => {
    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    expect(component.activeTabId()).toBe('sales-performance');
    expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].nativeElement.getAttribute('tabindex')).toBe('0');
    expect(tabs[0].nativeElement.style.color).toBe('rgb(35, 36, 78)');

    expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('false');
    expect(tabs[1].nativeElement.getAttribute('tabindex')).toBe('-1');
  });

  it('should switch tabs on button click', () => {
    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));
    tabs[1].nativeElement.click();
    fixture.detectChanges();

    expect(component.activeTabId()).toBe('procurement-control');
    expect(tabs[1].nativeElement.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('false');
  });

  it('should navigate tabs using arrow keys', () => {
    const tabs = fixture.debugElement.queryAll(By.css('[role="tab"]'));

    // Press ArrowRight on tab 0 -> should move to tab 1
    const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    tabs[0].nativeElement.dispatchEvent(eventRight);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('procurement-control');

    // Press ArrowLeft on tab 1 -> should move back to tab 0
    const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    tabs[1].nativeElement.dispatchEvent(eventLeft);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('sales-performance');

    // Press End -> should move to last tab
    const eventEnd = new KeyboardEvent('keydown', { key: 'End' });
    tabs[0].nativeElement.dispatchEvent(eventEnd);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('financial-visibility');

    // Press Home -> should move to first tab
    const eventHome = new KeyboardEvent('keydown', { key: 'Home' });
    tabs[4].nativeElement.dispatchEvent(eventHome);
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('sales-performance');
  });

  it('should render the tablist with padding to provide leftover space on both sides of the line', () => {
    const tablist = fixture.debugElement.query(By.css('[role="tablist"]'));
    expect(tablist).toBeTruthy();
    expect(tablist.nativeElement.classList.contains('lg:px-[70px]')).toBe(true);
    expect(tablist.nativeElement.classList.contains('sm:px-10')).toBe(true);
    expect(tablist.nativeElement.classList.contains('px-6')).toBe(true);
  });

  it('should render the base line with overflow-hidden and highlighted indicator', () => {
    const baseLine = fixture.debugElement.query(By.css('.bg-\\[\\#D9D9D9\\]'));
    expect(baseLine).toBeTruthy();
    expect(baseLine.nativeElement.classList.contains('overflow-hidden')).toBe(true);

    const indicator = fixture.debugElement.query(By.css('.bg-\\[\\#365AD2\\]'));
    expect(indicator).toBeTruthy();
  });

  it('should render sales-performance SVG image when first tab is active', () => {
    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeTruthy();
    expect(img.nativeElement.getAttribute('src')).toContain('sales-performance.svg');
    expect(img.nativeElement.getAttribute('alt')).toBe(
      'Pratinjau Dashboard Sales Performance',
    );
  });

  it('should render fallback panel for tabs without images', () => {
    component.selectTab('procurement-control');
    fixture.detectChanges();

    const img = fixture.debugElement.query(By.css('img'));
    expect(img).toBeNull();

    const fallbackHeading = fixture.debugElement.query(By.css('h3'));
    expect(fallbackHeading).toBeTruthy();
    expect(fallbackHeading.nativeElement.textContent.trim()).toBe('PROCUREMENT CONTROL');
  });
});
