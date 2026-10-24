import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { OrderPipeline } from './order-pipeline';
import { VisibilitySectionShell } from '../visibility-section-shell/visibility-section-shell';

describe('OrderPipeline', () => {
  let fixture: ComponentFixture<OrderPipeline>;
  let component: OrderPipeline;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPipeline],
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
          ORDER_PIPELINE: {
            TITLE: 'Telusuri Satu Pesanan Dari\nOrder Hingga Penerimaan',
            DESCRIPTION:
              'Order Pipeline memperlihatkan hubungan antara customer order, produk, ketersediaan raw material, pembelian dan penerimaan, manufacturing, delivery, sampai invoice dan receipt. Tim dapat melihat tahap yang sudah bergerak dan titik yang masih memerlukan perhatian.',
            DECISION_TEXT:
              'Cek hambatan order berdasarkan posisi proses, bukan sekadar status akhir pesanan',
            MOCKUP: {
              WINDOW_TITLE: 'Order Pipeline ( Demo Manufacture )',
              BACK_TO_LIST: 'Back To List',
              STAGES: {
                CUSTOMER_ORDER: 'CUSTOMER ORDER',
                PRODUCT: 'PRODUCT',
                RAW_MATERIAL_AVAILABLE: 'RAW MATERIAL AVAILABLE',
                PL_INCOMING_STOCK_RECEIPT: 'PL Incoming & Stock Receipt',
                PO_GRN_AVAILABLE_ORDER: 'PO & GRN AVAILABLE ORDER',
                MANUFACTURING: 'MANUFACTURING',
                DELIVERY: 'DELIVERY',
                INVOICE_RECEIPT: 'INVOICE & RECEIPT',
              },
              FIELDS: {
                NO_DATA: 'No Data',
                SO_NO: 'SO No:',
                PO_NO: 'Po No:',
                ORDER: 'Order:',
                REQ_DATE: 'Req. Date:',
                STOCK_ON_HAND: 'Stock On Hand:',
                BOOKING_STOCK: 'Booking Stock:',
                AVAILABILITY_STOCK: 'Availability Stock:',
                MANUFACTURING_ORDER_QTY: 'Manufacturing Order Qty:',
                ASSEMBLY_QTY_RESULT: 'Assembly Qty Result:',
                DELIVERY_LABEL: 'Delivery:',
                OUTSTANDING_QTY: 'Outstanding Qty:',
                INVOICE_AMOUNT: 'Invoice Amount',
                RECEIPT_AMOUNT: 'Receipt Amount',
              },
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(OrderPipeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the order-pipeline component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the outer shell with sectionId order-pipeline and translated title', () => {
    const section = fixture.debugElement.query(By.css('section#order-pipeline'));
    expect(section).toBeTruthy();

    const heading = fixture.debugElement.query(
      By.css('h3#order-pipeline-heading'),
    );
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Telusuri Satu Pesanan Dari Order Hingga Penerimaan',
    );
  });

  it('should render the ERP window chrome with module title and active Order Pipeline sidebar pill', () => {
    const chrome = fixture.debugElement.query(By.css('app-erp-window-chrome'));
    expect(chrome).toBeTruthy();

    const activePill = chrome.query(By.css('.bg-\\[\\#EAF1FD\\]'));
    expect(activePill).toBeTruthy();
    expect(activePill.nativeElement.textContent.trim()).toBe('Order Pipeline');

    expect(chrome.nativeElement.textContent).toContain(
      'Order Pipeline ( Demo Manufacture )',
    );
  });

  it('should not render status pills in ERP window chrome', () => {
    const pillsContainer = fixture.debugElement.query(
      By.css('[aria-label="System status and timestamp"]'),
    );
    expect(pillsContainer).toBeNull();
  });

  it('should render the Back To List button', () => {
    const backBtn = fixture.debugElement.query(By.css('button'));
    expect(backBtn).toBeTruthy();
    expect(backBtn.nativeElement.textContent.trim()).toBe('Back To List');
  });

  it('should render all 8 pipeline stage cards with headers', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    expect(cards.length).toBe(8);

    const headers = fixture.debugElement.queryAll(By.css('article header'));
    expect(headers.length).toBe(8);

    const headerTexts = headers.map((h) => h.nativeElement.textContent.trim());
    expect(headerTexts).toEqual([
      'CUSTOMER ORDER',
      'PRODUCT',
      'RAW MATERIAL AVAILABLE',
      'PL Incoming & Stock Receipt',
      'INVOICE & RECEIPT',
      'DELIVERY',
      'MANUFACTURING',
      'PO & GRN AVAILABLE ORDER',
    ]);
  });

  it('should render correct customer order and SO/PO data in Card 1', () => {
    const card1 = fixture.debugElement.queryAll(By.css('article'))[0];
    const text = card1.nativeElement.textContent;
    expect(text).toContain('PT Trendy Home Design');
    expect(text).toContain('SO-2601-002');
    expect(text).toContain('PO/002/JT');
    expect(text).toContain('(02 Jan 2026)');
  });

  it('should render correct product order and req date in Card 2', () => {
    const card2 = fixture.debugElement.queryAll(By.css('article'))[1];
    const text = card2.nativeElement.textContent;
    expect(text).toContain('Classic Jati-craft Table - FG-c001');
    expect(text).toContain('40 UNIT');
    expect(text).toContain('28 Jul 2026');
  });

  it('should render both raw material items and stocks in Card 3', () => {
    const card3 = fixture.debugElement.queryAll(By.css('article'))[2];
    const text = card3.nativeElement.textContent;
    expect(text).toContain('RM-T001 - Teak Wood Boards');
    expect(text).toContain('RM-T001 - Solid Wood Legs');
    expect(text).toContain('14 UNIT');
    expect(text).toContain('18 UNIT');
    expect(text).toContain('0 UNIT');
  });

  it('should render No Data state for Card 4 and Card 8', () => {
    const card4 = fixture.debugElement.queryAll(By.css('article'))[3];
    expect(card4.nativeElement.textContent).toContain('No Data');

    const card8 = fixture.debugElement.queryAll(By.css('article'))[7];
    expect(card8.nativeElement.textContent).toContain('No Data');
  });

  it('should render correct manufacturing and assembly quantities in Card 7', () => {
    const card7 = fixture.debugElement.queryAll(By.css('article'))[6];
    const text = card7.nativeElement.textContent;
    expect(text).toContain('Manufacturing Order Qty:');
    expect(text).toContain('Assembly Qty Result:');
    expect(text).toContain('25');
  });

  it('should render correct delivery and outstanding quantity in Card 6', () => {
    const card6 = fixture.debugElement.queryAll(By.css('article'))[5];
    const text = card6.nativeElement.textContent;
    expect(text).toContain('Classic Jati-craft Table - FG-c001');
    expect(text).toContain('Delivery: 40 UNIT');
    expect(text).toContain('Outstanding Qty: 0 UNIT');
  });

  it('should render correct invoice and receipt amounts in Card 5', () => {
    const card5 = fixture.debugElement.queryAll(By.css('article'))[4];
    const text = card5.nativeElement.textContent;
    expect(text).toContain('Invoice Amount');
    expect(text).toContain('96,000,000.00');
    expect(text).toContain('Receipt Amount');
    expect(text).toContain('0.00');
  });

  it('should render connector lines between pipeline stages', () => {
    const connectors = fixture.debugElement.queryAll(
      By.css('[aria-hidden="true"].bg-\\[\\#0B63EE\\], [aria-hidden="true"].bg-\\[\\#EE7981\\]'),
    );
    // 3 horizontal in Row 1 + 1 vertical from Card 4 + 3 horizontal in Row 2 = 7 connectors
    expect(connectors.length).toBe(7);
  });

  it('should render the decision card with translated decision text', () => {
    const shellEl = fixture.debugElement.query(
      By.directive(VisibilitySectionShell),
    );
    expect(shellEl).toBeTruthy();
    expect(shellEl.nativeElement.textContent).toContain('Untuk keputusan:');
    expect(shellEl.nativeElement.textContent).toContain(
      'Cek hambatan order berdasarkan posisi proses, bukan sekadar status akhir pesanan',
    );
  });
});
