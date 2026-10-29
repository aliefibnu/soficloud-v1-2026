import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ProcurementControl } from './procurement-control';
import { VisibilitySectionShell } from '../visibility-section-shell/visibility-section-shell';

describe('ProcurementControl', () => {
  let fixture: ComponentFixture<ProcurementControl>;
  let component: ProcurementControl;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcurementControl],
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
          PROCUREMENT_CONTROL: {
            TITLE: 'Temukan Transaksi Pembelian\nYang Tertahan',
            DESCRIPTION:
              'Ringkasan ini menunjukkan dokumen MPR dan PO yang belum melangkah ke tahap berikutnya: PO, GRN, hingga\nsupplier invoice. Grafik jumlah MPR dan PO memberi gambaran aktivitas pembelian dari bulan ke bulan.',
            DECISION_TEXT:
              'Prioritaskan PO dan penerimaan barang yang belum selesai',
            MOCKUP: {
              WINDOW_TITLE: 'Procurement ( Demo Construction )',
              CARDS: {
                MPR_NEED_RUNNING: 'MPR NEED TO RUNNING (GM)',
                OUTSTANDING_MPR_PO: 'OUTSTANDING MPR AGAINST PO',
                OUTSTANDING_MPR_GRN: 'OUTSTANDING MPR AGAINST GRN',
                PO_NEED_RUNNING: 'PO NEED RUNNING',
                OUTSTANDING_PO_GRN: 'OUTSTANDING PO AGAINST GRN',
                OUTSTANDING_PO_SI: 'OUTSTANDING PO AGAINST SI',
                SI_NEED_CONFIRM: 'SI NEED TO CONFIRM',
                SI_NEED_RUNNING: 'SI NEED TO RUNNING',
              },
              CHARTS: {
                NUMBER_OF_MPR: 'NUMBER OF MPR (-)',
                NUMBER_OF_PO: 'NUMBER OF PO (-)',
              },
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(ProcurementControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the procurement-control component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the outer shell with sectionId procurement-control and translated title', () => {
    const section = fixture.debugElement.query(
      By.css('section#procurement-control'),
    );
    expect(section).toBeTruthy();

    const heading = fixture.debugElement.query(
      By.css('h3#procurement-control-heading'),
    );
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Temukan Transaksi Pembelian Yang Tertahan',
    );
  });

  it('should render the ERP window chrome with module title and active procurement pill', () => {
    const chrome = fixture.debugElement.query(By.css('app-erp-window-chrome'));
    expect(chrome).toBeTruthy();

    const activePill = chrome.query(By.css('.bg-\\[\\#EAF1FD\\]'));
    expect(activePill).toBeTruthy();
    expect(activePill.nativeElement.textContent.trim()).toBe('Procurement');

    expect(chrome.nativeElement.textContent).toContain(
      'Procurement ( Demo Construction )',
    );
  });

  it('should render all 8 status metric cards with labels and numbers', () => {
    const articles = fixture.debugElement.queryAll(By.css('article'));
    // 8 metric cards + 2 charts = 10 articles
    expect(articles.length).toBe(10);

    const first8Articles = articles.slice(0, 8);
    const cardTexts = first8Articles.map((a) =>
      a.nativeElement.textContent.trim(),
    );

    expect(cardTexts[0]).toContain('1');
    expect(cardTexts[0]).toContain('MPR NEED TO RUNNING (GM)');

    expect(cardTexts[1]).toContain('3');
    expect(cardTexts[1]).toContain('OUTSTANDING MPR AGAINST PO');

    expect(cardTexts[2]).toContain('0');
    expect(cardTexts[2]).toContain('OUTSTANDING MPR AGAINST GRN');

    expect(cardTexts[3]).toContain('0');
    expect(cardTexts[3]).toContain('PO NEED RUNNING');

    expect(cardTexts[4]).toContain('3');
    expect(cardTexts[4]).toContain('OUTSTANDING PO AGAINST GRN');

    expect(cardTexts[5]).toContain('0');
    expect(cardTexts[5]).toContain('OUTSTANDING PO AGAINST SI');

    expect(cardTexts[6]).toContain('0');
    expect(cardTexts[6]).toContain('SI NEED TO CONFIRM');

    expect(cardTexts[7]).toContain('0');
    expect(cardTexts[7]).toContain('SI NEED TO RUNNING');
  });

  it('should render both bar chart cards with titles', () => {
    const chartHeadings = fixture.debugElement.queryAll(By.css('h4'));
    expect(chartHeadings.length).toBe(2);
    expect(chartHeadings[0].nativeElement.textContent.trim()).toBe(
      'NUMBER OF MPR (-)',
    );
    expect(chartHeadings[1].nativeElement.textContent.trim()).toBe(
      'NUMBER OF PO (-)',
    );
  });

  it('should render SVGs marked with aria-hidden for accessibility', () => {
    const svgs = fixture.debugElement.queryAll(
      By.css('svg[aria-hidden="true"]'),
    );
    expect(svgs.length).toBeGreaterThanOrEqual(10);
  });

  it('should render the decision card with decision text', () => {
    const shellEl = fixture.debugElement.query(
      By.directive(VisibilitySectionShell),
    );
    expect(shellEl).toBeTruthy();
    expect(shellEl.nativeElement.textContent).toContain('Untuk keputusan:');
    expect(shellEl.nativeElement.textContent).toContain(
      'Prioritaskan PO dan penerimaan barang yang belum selesai',
    );
  });
});
