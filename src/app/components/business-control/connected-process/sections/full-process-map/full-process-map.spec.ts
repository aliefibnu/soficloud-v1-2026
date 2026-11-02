import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { FullProcessMap } from './full-process-map';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';
import { provideCustomImageLoader } from '../../../../systems/lib/image-loader';

describe('FullProcessMap', () => {
  let fixture: ComponentFixture<FullProcessMap>;
  let component: FullProcessMap;
  let translateService: TranslateService;

  const idTranslations = {
    CONNECTED_PROCESS: {
      FULL_PROCESS_MAP: {
        TITLE: 'Lihat Hubungan Proses\nLebih Lengkap',
        DESCRIPTION:
          'Diagram ini merangkum alur pembelian, produksi, penjualan, General Ledger, dan keluaran laporan sebagai referensi kemampuan produk.',
        HINT_SCROLL: 'Gulir horizontal untuk melihat peta lengkap',
        ARIA_REGION_LABEL: 'Diagram arsitektur hubungan proses lengkap SOFICloud',
        STREAMS: {
          PURCHASING: 'Purchasing & AP Stream',
          MANUFACTURING: 'Manufacturing & Costing Stream',
          SALES: 'Sales & AR Stream',
          GENERAL_LEDGER: 'General Ledger & Financial Output',
        },
        NODES: {
          PURCHASE_REQUISITION: 'Purchase\nRequisition',
          PURCHASE_QUOTATION: 'Purchase\nQuotation',
          PURCHASE_ORDER: 'Purchase\nOrder',
          PURCHASE_RETURN: 'Purchase Return',
          AP_DEBIT_NOTE: 'A/P Debit Note',
          AP_STATEMENT: 'A/P Statement',
          GOODS_RECEIPT: 'Goods Receipt',
          SUPPLIER_INVOICE: 'Supplier Invoice',
          PAYMENT: 'Payment',
          BILL_OF_MATERIAL: 'Bill Of Material &\nRouting',
          PLANNING: 'Planning',
          MANUFACTURING_ORDER: 'Manufacturing\nOrder',
          MANUFACTURING_PROCESS: 'Manufacturing\nProcess',
          STANDARD_COSTING: 'Standard Costing\n& Variance',
          MANUFACTURING: 'Manufacturing',
          GENERAL_JOURNAL: 'General Journal',
          GENERAL_LEDGER: 'General Ledger',
          ADJUSTMENT: 'Adjustment',
          TRIAL_BALANCE: 'Trial Balance',
          COGS: 'COGS',
          PROFIT_LOSS: 'Profit Loss',
          BALANCE_SHEET: 'Balance Sheet',
          CASH_FLOW: 'Cash Flow',
          SALES_ORDER: 'Sales Order',
          PACKING_LIST: 'Packing List &\nDelivery Order',
          CUSTOMER_INVOICE: 'Customer Invoice',
          RECEIVE: 'Receive',
          SALES_QUOTATION: 'Sales Quotation',
          RETURN: 'Return',
          AR_CREDIT_NOTE: 'A/R Credit Note',
          AR_STATEMENT: 'A/R Statement',
        },
      },
    },
  };

  const enTranslations = {
    CONNECTED_PROCESS: {
      FULL_PROCESS_MAP: {
        TITLE: 'See the Complete\nProcess Architecture',
        DESCRIPTION:
          'This architectural diagram summarizes purchasing, manufacturing, sales, general ledger postings, and financial statement outputs as an enterprise capability blueprint.',
        HINT_SCROLL: 'Scroll horizontally to view the full diagram',
        ARIA_REGION_LABEL: 'SOFICloud complete connected process architecture diagram',
        STREAMS: {
          PURCHASING: 'Purchasing & AP Stream (EN)',
          MANUFACTURING: 'Manufacturing & Costing Stream (EN)',
          SALES: 'Sales & AR Stream (EN)',
          GENERAL_LEDGER: 'General Ledger & Financial Output (EN)',
        },
        NODES: {
          PURCHASE_REQUISITION: 'Purchase\nRequisition (EN)',
          PURCHASE_QUOTATION: 'Purchase\nQuotation (EN)',
          PURCHASE_ORDER: 'Purchase\nOrder (EN)',
          PURCHASE_RETURN: 'Purchase Return (EN)',
          AP_DEBIT_NOTE: 'A/P Debit Note (EN)',
          AP_STATEMENT: 'A/P Statement (EN)',
          GOODS_RECEIPT: 'Goods Receipt (EN)',
          SUPPLIER_INVOICE: 'Supplier Invoice (EN)',
          PAYMENT: 'Payment (EN)',
          BILL_OF_MATERIAL: 'Bill Of Material &\nRouting (EN)',
          PLANNING: 'Planning (EN)',
          MANUFACTURING_ORDER: 'Manufacturing\nOrder (EN)',
          MANUFACTURING_PROCESS: 'Manufacturing\nProcess (EN)',
          STANDARD_COSTING: 'Standard Costing\n& Variance (EN)',
          MANUFACTURING: 'Manufacturing (EN)',
          GENERAL_JOURNAL: 'General Journal (EN)',
          GENERAL_LEDGER: 'General Ledger (EN)',
          ADJUSTMENT: 'Adjustment (EN)',
          TRIAL_BALANCE: 'Trial Balance (EN)',
          COGS: 'COGS (EN)',
          PROFIT_LOSS: 'Profit Loss (EN)',
          BALANCE_SHEET: 'Balance Sheet (EN)',
          CASH_FLOW: 'Cash Flow (EN)',
          SALES_ORDER: 'Sales Order (EN)',
          PACKING_LIST: 'Packing List &\nDelivery Order (EN)',
          CUSTOMER_INVOICE: 'Customer Invoice (EN)',
          RECEIVE: 'Receive (EN)',
          SALES_QUOTATION: 'Sales Quotation (EN)',
          RETURN: 'Return (EN)',
          AR_CREDIT_NOTE: 'A/R Credit Note (EN)',
          AR_STATEMENT: 'A/R Statement (EN)',
        },
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullProcessMap],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
        provideCustomImageLoader(),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', idTranslations);
    translateService.setTranslation('en', enTranslations);
    translateService.use('id');

    fixture = TestBed.createComponent(FullProcessMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the FullProcessMap component', () => {
    expect(component).toBeTruthy();
  });

  it('should configure ProcessSectionShell with sectionId "peta-lengkap" and correct design tokens', () => {
    const shellEl = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shellEl).toBeTruthy();

    const shell = shellEl.componentInstance as ProcessSectionShell;
    expect(shell.sectionId()).toBe('peta-lengkap');
    expect(shell.stageBgClass()).toBe(
      'bg-[linear-gradient(135deg,#C9DEDE_0%,#A3D0D0_48%,#DBE8E8_100%)]',
    );
    expect(shell.titleMaxWidthClass()).toBe('max-w-xl sm:max-w-2xl lg:max-w-[660px]');
    expect(shell.descriptionMaxWidthClass()).toBe('max-w-xl sm:max-w-2xl lg:max-w-[740px]');
    expect(shell.title()).toBe('Lihat Hubungan Proses\nLebih Lengkap');
    expect(shell.description()).toContain('Diagram ini merangkum alur pembelian');
  });

  it('should render the mobile/tablet scroll hint pill with xl:hidden class and translated text', () => {
    const hintEl = fixture.debugElement.query(By.css('[data-testid="fpm-scroll-hint"]'));
    expect(hintEl).toBeTruthy();
    expect(hintEl.nativeElement.className).toContain('xl:hidden');
    expect(hintEl.nativeElement.textContent).toContain(
      'Gulir horizontal untuk melihat peta lengkap',
    );
  });

  it('should render 4 semantic stream groups and 31 process node cards', () => {
    // Assert 4 stream groups
    const streamPurchasing = fixture.debugElement.query(
      By.css('[data-testid="fpm-stream-purchasing"]'),
    );
    const streamMfg = fixture.debugElement.query(
      By.css('[data-testid="fpm-stream-manufacturing"]'),
    );
    const streamGL = fixture.debugElement.query(
      By.css('[data-testid="fpm-stream-general-ledger"]'),
    );
    const streamSales = fixture.debugElement.query(
      By.css('[data-testid="fpm-stream-sales"]'),
    );

    expect(streamPurchasing).toBeTruthy();
    expect(streamMfg).toBeTruthy();
    expect(streamGL).toBeTruthy();
    expect(streamSales).toBeTruthy();

    // Node counts per stream: 9 + 6 + 8 + 8 = 31
    const purchasingNodes = streamPurchasing.queryAll(By.css('li'));
    const mfgNodes = streamMfg.queryAll(By.css('li'));
    const glNodes = streamGL.queryAll(By.css('li'));
    const salesNodes = streamSales.queryAll(By.css('li'));

    expect(purchasingNodes.length).toBe(9);
    expect(mfgNodes.length).toBe(6);
    expect(glNodes.length).toBe(8);
    expect(salesNodes.length).toBe(8);

    // Verify all 31 nodes have an img with alt="" and static SVG path
    const allNodeImages = fixture.debugElement.queryAll(
      By.css('[data-testid^="fpm-node-"] img'),
    );
    expect(allNodeImages.length).toBe(31);
    for (const img of allNodeImages) {
      expect(img.nativeElement.getAttribute('alt')).toBe('');
      expect(img.nativeElement.getAttribute('src')).toMatch(
        /^\/images\/connected-process\/full-process-map\/.*\.svg$/,
      );
      expect(img.nativeElement.className).toContain('w-full');
      expect(img.nativeElement.className).toContain('h-full');
      expect(img.nativeElement.className).toContain('p-1');
      expect(img.nativeElement.className).toContain('object-contain');
      expect(img.nativeElement.className).not.toContain('max-w-6.5');
      expect(img.nativeElement.className).not.toContain('max-h-6.5');
    }
  });

  it('should correctly position nodes and share customer-invoice-balance-sheet.svg between Customer Invoice and Balance Sheet', () => {
    // Node #22 Balance Sheet (Teal theme, GL stream)
    const balanceSheet = fixture.debugElement.query(
      By.css('[data-testid="fpm-node-balance-sheet"]'),
    );
    expect(balanceSheet).toBeTruthy();
    expect(balanceSheet.nativeElement.style.left).toBe('904px');
    expect(balanceSheet.nativeElement.style.top).toBe('372px');
    const bsImg = balanceSheet.query(By.css('img'));
    expect(bsImg.nativeElement.getAttribute('src')).toBe(
      '/images/connected-process/full-process-map/customer-invoice-balance-sheet.svg',
    );

    // Node #26 Customer Invoice (Red theme, Sales stream)
    const customerInvoice = fixture.debugElement.query(
      By.css('[data-testid="fpm-node-customer-invoice"]'),
    );
    expect(customerInvoice).toBeTruthy();
    expect(customerInvoice.nativeElement.style.left).toBe('556px');
    expect(customerInvoice.nativeElement.style.top).toBe('574px');
    const ciImg = customerInvoice.query(By.css('img'));
    expect(ciImg.nativeElement.getAttribute('src')).toBe(
      '/images/connected-process/full-process-map/customer-invoice-balance-sheet.svg',
    );
  });

  it('should render the unified SVG connector overlay with 34 paths and arrowhead markers', () => {
    const svgEl = fixture.debugElement.query(By.css('[data-testid="fpm-connectors-svg"]'));
    expect(svgEl).toBeTruthy();
    expect(svgEl.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(svgEl.nativeElement.getAttribute('viewBox')).toBe('0 0 1120 728');

    // 3 markers
    const markerBlue = svgEl.query(By.css('#fpm-arrow-blue'));
    const markerTeal = svgEl.query(By.css('#fpm-arrow-teal'));
    const markerRed = svgEl.query(By.css('#fpm-arrow-red'));
    expect(markerBlue).toBeTruthy();
    expect(markerTeal).toBeTruthy();
    expect(markerRed).toBeTruthy();

    // Exactly 34 path elements
    const paths = svgEl.queryAll(By.css('path[id^="fpm-conn-"]'));
    expect(paths.length).toBe(34);

    // Verify bidirectional connectors have marker-start and marker-end
    const siBiAps = svgEl.query(By.css('#fpm-conn-si-bi-aps'));
    expect(siBiAps.nativeElement.getAttribute('marker-start')).toBe('url(#fpm-arrow-blue)');
    expect(siBiAps.nativeElement.getAttribute('marker-end')).toBe('url(#fpm-arrow-blue)');

    const mfgBiGlTop = svgEl.query(By.css('#fpm-conn-mfg-bi-gl-top'));
    expect(mfgBiGlTop.nativeElement.getAttribute('marker-start')).toBe('url(#fpm-arrow-teal)');
    expect(mfgBiGlTop.nativeElement.getAttribute('marker-end')).toBe('url(#fpm-arrow-teal)');

    // Verify markerless bridges (no marker-end)
    const recToTb = svgEl.query(By.css('#fpm-conn-rec-to-tb'));
    expect(recToTb.nativeElement.getAttribute('marker-end')).toBeNull();

    const ciBridgeRec = svgEl.query(By.css('#fpm-conn-ci-bridge-rec'));
    expect(ciBridgeRec.nativeElement.getAttribute('marker-end')).toBeNull();
  });

  it('should render an accessible scroll viewport and handle pointer drag-to-pan state', () => {
    const viewportEl = fixture.debugElement.query(
      By.css('[data-testid="fpm-scroll-viewport"]'),
    );
    expect(viewportEl).toBeTruthy();
    expect(viewportEl.nativeElement.getAttribute('role')).toBe('region');
    expect(viewportEl.nativeElement.getAttribute('tabindex')).toBe('0');
    expect(viewportEl.nativeElement.getAttribute('aria-label')).toBe(
      'Diagram arsitektur hubungan proses lengkap SOFICloud',
    );

    const el = viewportEl.nativeElement as HTMLElement;
    // Mock scrollWidth > clientWidth to enable drag
    Object.defineProperty(el, 'scrollWidth', { value: 1120, configurable: true });
    Object.defineProperty(el, 'clientWidth', { value: 800, configurable: true });
    el.scrollLeft = 0;

    // Simulate pointer down (left mouse button)
    const downEvent = new PointerEvent('pointerdown', {
      pointerType: 'mouse',
      button: 0,
      clientX: 200,
    });
    component.onPointerDown(downEvent);
    expect(component.isDragging()).toBe(true);

    // Simulate pointer move
    const moveEvent = new PointerEvent('pointermove', {
      pointerType: 'mouse',
      clientX: 150,
    });
    component.onPointerMove(moveEvent);
    expect(el.scrollLeft).toBe(50); // Moved 50px right

    // Simulate pointer up
    const upEvent = new PointerEvent('pointerup', {
      pointerType: 'mouse',
      clientX: 150,
    });
    component.onPointerUp(upEvent);
    expect(component.isDragging()).toBe(false);

    // Non-mouse events (e.g. touch) should be ignored
    const touchEvent = new PointerEvent('pointerdown', {
      pointerType: 'touch',
      button: 0,
      clientX: 200,
    });
    component.onPointerDown(touchEvent);
    expect(component.isDragging()).toBe(false);
  });

  it('should update translations when active language switches to en', () => {
    translateService.use('en');
    fixture.detectChanges();

    const shellEl = fixture.debugElement.query(By.directive(ProcessSectionShell));
    const shell = shellEl.componentInstance as ProcessSectionShell;
    expect(shell.title()).toBe('See the Complete\nProcess Architecture');
    expect(shell.description()).toContain('This architectural diagram summarizes');

    const hintEl = fixture.debugElement.query(By.css('[data-testid="fpm-scroll-hint"]'));
    expect(hintEl.nativeElement.textContent).toContain(
      'Scroll horizontally to view the full diagram',
    );

    const viewportEl = fixture.debugElement.query(
      By.css('[data-testid="fpm-scroll-viewport"]'),
    );
    expect(viewportEl.nativeElement.getAttribute('aria-label')).toBe(
      'SOFICloud complete connected process architecture diagram',
    );

    const prNode = fixture.debugElement.query(
      By.css('[data-testid="fpm-node-purchase-requisition"] span'),
    );
    expect(prNode.nativeElement.textContent).toContain('Purchase\nRequisition (EN)');
  });
});
