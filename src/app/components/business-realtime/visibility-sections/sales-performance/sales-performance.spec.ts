import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { SalesPerformance } from './sales-performance';
import { VisibilitySectionShell } from '../visibility-section-shell/visibility-section-shell';

describe('SalesPerformance', () => {
  let fixture: ComponentFixture<SalesPerformance>;
  let component: SalesPerformance;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesPerformance],
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
        VISIBILITY_SECTIONS: {
          COMMON: {
            DECISION_LABEL: 'Untuk keputusan:',
            DASHBOARD: 'Dashboard',
            ADMIN: 'Admin',
            SIDEBAR: {
              PROCUREMENT: 'Procurement',
              SALES: 'Sales',
              MRP: 'MRP',
              FINANCE: 'Finance',
              ORDER_PIPELINE: 'Order Pipeline',
            },
          },
          SALES_PERFORMANCE: {
            TITLE: 'Lihat Arah Penjualan\nSejak Awal',
            DESCRIPTION:
              'Nilai open sales order memperlihatkan pesanan yang masih berjalan.',
            DECISION_TEXT:
              'Pantau perubahan pipeline dan selidiki bulan ketika kinerja mulai melemah',
            MOCKUP: {
              WINDOW_TITLE: 'Sales (PT INFORSYS INDONESIA )',
              OPEN_SO_VALUE_TITLE: 'OPEN SO VALUE (IDR)',
              ACTIVE_CUSTOMERS_TITLE: 'NUMBER OF ACTIVE CUSTOMER (IDR)',
              SALES_ANALYSIS_TITLE: 'SALES ANALYSIS (IDR)',
              SELECT_VIEW_CHART: 'SELECT VIEW CHART',
              LINE_CHART: 'LINE CHART',
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(SalesPerformance);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the sales-performance component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the outer shell with sectionId sales-performance and translated title', () => {
    const section = fixture.debugElement.query(By.css('section#sales-performance'));
    expect(section).toBeTruthy();

    const heading = fixture.debugElement.query(By.css('h3#sales-performance-heading'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Lihat Arah Penjualan Sejak Awal',
    );
  });

  it('should render the ERP window chrome with module title and active sales pill', () => {
    const chrome = fixture.debugElement.query(By.css('app-erp-window-chrome'));
    expect(chrome).toBeTruthy();

    const activePill = chrome.query(By.css('.bg-\\[\\#EAF1FD\\]'));
    expect(activePill).toBeTruthy();
    expect(activePill.nativeElement.textContent.trim()).toBe('Sales');

    expect(chrome.nativeElement.textContent).toContain('Sales (PT INFORSYS INDONESIA )');
  });

  it('should render all 3 mockup dashboard cards', () => {
    const cardHeadings = fixture.debugElement.queryAll(By.css('h4'));
    expect(cardHeadings.length).toBe(3);
    expect(cardHeadings[0].nativeElement.textContent.trim()).toBe('OPEN SO VALUE (IDR)');
    expect(cardHeadings[1].nativeElement.textContent.trim()).toBe('NUMBER OF ACTIVE CUSTOMER (IDR)');
    expect(cardHeadings[2].nativeElement.textContent.trim()).toBe('SALES ANALYSIS (IDR)');
  });

  it('should render chart SVGs marked with aria-hidden for accessibility', () => {
    const svgs = fixture.debugElement.queryAll(By.css('svg[aria-hidden="true"]'));
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });

  it('should render the dual line chart legend for 2026 and 2025 and center Card 3', () => {
    const card3 = fixture.debugElement.queryAll(By.css('article'))[2];
    expect(card3).toBeTruthy();
    expect(card3.nativeElement.textContent).toContain('2026');
    expect(card3.nativeElement.textContent).toContain('2025');
    expect(card3.nativeElement.classList.contains('max-w-135')).toBe(true);
    expect(card3.nativeElement.classList.contains('mx-auto')).toBe(true);
  });

  it('should render the decision card with decision text', () => {
    const shellEl = fixture.debugElement.query(By.directive(VisibilitySectionShell));
    expect(shellEl).toBeTruthy();
    expect(shellEl.nativeElement.textContent).toContain('Untuk keputusan:');
    expect(shellEl.nativeElement.textContent).toContain(
      'Pantau perubahan pipeline dan selidiki bulan ketika kinerja mulai melemah',
    );
  });
});
