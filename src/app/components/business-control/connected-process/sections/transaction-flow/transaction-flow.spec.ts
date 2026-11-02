import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { TransactionFlow } from './transaction-flow';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';
import { provideCustomImageLoader } from '../../../../systems/lib/image-loader';

describe('TransactionFlow', () => {
  let fixture: ComponentFixture<TransactionFlow>;
  let component: TransactionFlow;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFlow],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
        provideCustomImageLoader(),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      CONNECTED_PROCESS: {
        TRANSACTION_FLOW: {
          TITLE: 'Tiga Alur Satu Sistem\nYang Terhubung',
          DESCRIPTION:
            'Pilih contoh transaksi untuk melihat bagaimana modul saling meneruskan informasi. Setiap tahap memiliki dokumen dan tujuan yang berbeda.',
          CYCLES: {
            O2C: {
              NAME: 'Order-to-Cash',
              SUBTITLE: 'Penjualan hingga penerimaan',
            },
            P2P: {
              NAME: 'Procure-to-Pay',
              SUBTITLE: 'Kebutuhan hingga pembayaran',
            },
            P2PR: {
              NAME: 'Plan-to-Produce',
              SUBTITLE: 'Material hingga biaya produksi',
            },
          },
          STEPS: {
            O2C: {
              STEP_1: {
                TITLE: 'Sales Quotation',
                DESC: 'Penawaran ke pelanggan',
              },
              STEP_2: {
                TITLE: 'Sales Order',
                DESC: 'Pesanan terkonfirmasi',
              },
              STEP_3: {
                TITLE: 'Delivery Order',
                DESC: 'Barang diserahkan',
              },
              STEP_4: {
                TITLE: 'Customer Invoice',
                DESC: 'Piutang terbentuk',
              },
              STEP_5: {
                TITLE: 'Receipt',
                DESC: 'Pembayaran diterima',
              },
            },
            P2P: {
              STEP_1: {
                TITLE: 'Purchase Requisition',
                DESC: 'Kebutuhan disetujui',
              },
              STEP_2: {
                TITLE: 'Purchase Order',
                DESC: 'Pesanan ke supplier',
              },
              STEP_3: {
                TITLE: 'Goods Receipt',
                DESC: 'Penerimaan barang',
              },
              STEP_4: {
                TITLE: 'Supplier Invoice',
                DESC: 'Tagihan & AP',
              },
              STEP_5: {
                TITLE: 'Payment',
                DESC: 'Kewajiban dibayar',
              },
            },
            P2PR: {
              STEP_1: {
                TITLE: 'BOM & Routing',
                DESC: 'Struktur dan proses',
              },
              STEP_2: {
                TITLE: 'Planning / MRP',
                DESC: 'Cek kebutuhan material',
              },
              STEP_3: {
                TITLE: 'Procurement',
                DESC: 'Penuhi kekurangan',
              },
              STEP_4: {
                TITLE: 'Manufacturing Order',
                DESC: 'Eksekusi produksi',
              },
              STEP_5: {
                TITLE: 'Costing & Variance',
                DESC: 'Analisis biaya',
              },
            },
          },
          CALLOUT: {
            TITLE: 'TERLIHAT DI LAPORAN',
            TAGS: 'Sales pipeline · Delivery · A/R aging · Cash receipt',
            DISCLAIMER:
              'Dampak jurnal mengikuti transaksi yang diposting dan pengaturan akun perusahaan; Sales Quotation dan Sales Order belum otomatis menjadi pendapatan.',
            CYCLES: {
              O2C: {
                TAGS: 'Sales pipeline · Delivery · A/R aging · Cash receipt',
                DISCLAIMER:
                  'Dampak jurnal mengikuti transaksi yang diposting dan pengaturan akun perusahaan; Sales Quotation dan Sales Order belum otomatis menjadi pendapatan.',
              },
              P2P: {
                TAGS: 'Procurement pipeline · Penerimaan barang · A/P aging · Kas keluar',
                DISCLAIMER:
                  'Penerimaan barang mencatat mutasi persediaan/utang belum difaktur; pembebanan akun dan pengakuan biaya final diposting saat tagihan pemasok.',
              },
              P2PR: {
                TAGS: 'Rencana produksi · Work in Process · Realisasi material · Harga pokok',
                DISCLAIMER:
                  'Perhitungan biaya persediaan dan varians dicatat setelah pelaporan order manufaktur; BOM dan perencanaan belum menghasilkan jurnal mutasi.',
              },
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(TransactionFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the transaction-flow component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the ProcessSectionShell with sectionId alur-transaksi and stageBgClass bg-gradient-to-r from-[#C8DFDC] to-[#AECFD0]', () => {
    const shellEl = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shellEl).toBeTruthy();

    const shellComponent = shellEl.componentInstance as ProcessSectionShell;
    expect(shellComponent.sectionId()).toBe('alur-transaksi');
    expect(shellComponent.stageBgClass()).toBe(
      'bg-gradient-to-r from-[#C8DFDC] to-[#AECFD0]',
    );
    expect(shellComponent.title()).toBe(
      'Tiga Alur Satu Sistem\nYang Terhubung',
    );
    const headingEl = fixture.debugElement.query(By.css('h2'));
    expect(headingEl).toBeTruthy();
    expect(headingEl.nativeElement.classList.contains('lg:max-w-[620px]')).toBe(
      true,
    );
    expect(shellComponent.description()).toContain(
      'Pilih contoh transaksi untuk melihat bagaimana modul saling meneruskan informasi.',
    );
  });

  it('should render 3 cycle selector tabs with accessible ARIA tablist/tab attributes', () => {
    const tablistEl = fixture.debugElement.query(By.css('[role="tablist"]'));
    expect(tablistEl).toBeTruthy();
    expect(tablistEl.nativeElement.getAttribute('aria-label')).toBe(
      'Transaction Cycles',
    );

    const tabs = fixture.debugElement.queryAll(By.css('button[role="tab"]'));
    expect(tabs.length).toBe(3);

    const tab1 = tabs[0].nativeElement;
    const tab2 = tabs[1].nativeElement;
    const tab3 = tabs[2].nativeElement;

    expect(tab1.getAttribute('id')).toBe('tab-cycle-O2C');
    expect(tab2.getAttribute('id')).toBe('tab-cycle-P2P');
    expect(tab3.getAttribute('id')).toBe('tab-cycle-P2PR');

    expect(tab1.getAttribute('aria-selected')).toBe('true');
    expect(tab2.getAttribute('aria-selected')).toBe('false');
    expect(tab3.getAttribute('aria-selected')).toBe('false');
  });

  it('should render distinct, accessible tabs with clear borders, background contrast, and flush left alignment', () => {
    const shelf = fixture.debugElement.query(By.css('[shell-shelf]')).nativeElement;
    expect(shelf.className).toContain('pl-0');
    expect(shelf.className).toContain('mb-0');
    expect(shelf.className).not.toContain('-mb-');

    const tabs = fixture.debugElement.queryAll(By.css('button[role="tab"]'));
    const selectedTab = tabs[0].nativeElement;
    const unselectedTab = tabs[1].nativeElement;

    expect(selectedTab.className).toContain('bg-white');
    expect(selectedTab.className).toContain('border-t');
    expect(selectedTab.className).toContain('border-x');

    expect(unselectedTab.className).toContain('bg-[#F8FAFC]');
    expect(unselectedTab.className).toMatch(/rounded-t-(?:\[24px\]|3xl)/);
    expect(unselectedTab.className).toContain('border-t');
    expect(unselectedTab.className).toContain('border-x');

    const unselectedTitle = tabs[1].query(By.css('span.font-bold')).nativeElement;
    expect(unselectedTitle.className).toContain('text-[#B1B1B1DD]');

    const unselectedSub = tabs[1].query(By.css('span.font-normal')).nativeElement;
    expect(unselectedSub.className).toContain('text-[#B1B1B1DD]');
  });

  it('should render default Order-to-Cash (O2C) 5 pipeline step cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('ol li'));
    expect(cards.length).toBe(5);

    const titles = cards.map((c) =>
      c.query(By.css('span.font-bold')).nativeElement.textContent.trim(),
    );
    expect(titles).toEqual([
      'Sales Quotation',
      'Sales Order',
      'Delivery Order',
      'Customer Invoice',
      'Receipt',
    ]);

    const descriptions = cards.map((c) =>
      c.query(By.css('span.font-normal')).nativeElement.textContent.trim(),
    );
    expect(descriptions).toEqual([
      'Penawaran ke pelanggan',
      'Pesanan terkonfirmasi',
      'Barang diserahkan',
      'Piutang terbentuk',
      'Pembayaran diterima',
    ]);
  });

  it('should render SVG icon images from public/images/connected-process/transaction-flow inside O2C step card badges', () => {
    const badges = fixture.debugElement.queryAll(By.css('ol li div[aria-hidden="true"]'));
    expect(badges.length).toBe(5);

    const images = badges.map((badge) => badge.query(By.css('img')));
    expect(images.every((img) => img !== null)).toBe(true);

    const sources = images.map((img) => img.nativeElement.getAttribute('src') || '');
    expect(sources[0]).toContain('quotation.svg');
    expect(sources[1]).toContain('sales.svg');
    expect(sources[2]).toContain('delivery.svg');
    expect(sources[3]).toContain('invoice.svg');
    expect(sources[4]).toContain('receipt.svg');
  });

  it('should render the connecting gradient pipeline line for desktop view', () => {
    const connectingLine = fixture.debugElement.query(
      By.css('[data-testid="transaction-flow-line"]'),
    );
    expect(connectingLine).toBeTruthy();
    expect(connectingLine.nativeElement.className).toContain('rounded-full');
    expect(connectingLine.nativeElement.className).toContain(
      'bg-[linear-gradient(90deg,#1E37E1_0%,#1C7DD8_69.97%,#6694EB_100%)]',
    );
  });

  it('should render the bottom callout card with title, divider, tags, and disclaimer matching Figma spec', () => {
    const frame = fixture.debugElement.query(By.css('[data-testid="callout-frame"]'));
    expect(frame).toBeTruthy();
    expect(frame.nativeElement.className).toContain('bg-[#FDFDFD]');
    expect(frame.nativeElement.className).toContain('rounded-lg');

    const calloutTitle = fixture.debugElement.query(By.css('[data-testid="callout-title"]'));
    expect(calloutTitle).toBeTruthy();
    expect(calloutTitle.nativeElement.textContent.trim()).toBe('TERLIHAT DI LAPORAN');
    expect(calloutTitle.nativeElement.className).toContain('font-dm-sans');
    expect(calloutTitle.nativeElement.className).toContain('font-bold');
    expect(calloutTitle.nativeElement.className).toContain('text-[#1C73E8]');
    expect(calloutTitle.nativeElement.className).toContain('text-center');
    expect(calloutTitle.nativeElement.className).toContain('lg:text-[34px]');

    const calloutTags = fixture.debugElement.query(By.css('[data-testid="callout-tags"]'));
    expect(calloutTags).toBeTruthy();
    expect(calloutTags.nativeElement.textContent.trim()).toBe(
      'Sales pipeline · Delivery · A/R aging · Cash receipt',
    );
    expect(calloutTags.nativeElement.className).toContain('font-dm-sans');
    expect(calloutTags.nativeElement.className).toContain('font-bold');
    expect(calloutTags.nativeElement.className).toContain('text-[#23244E]');
    expect(calloutTags.nativeElement.className).toContain('text-center');
    expect(calloutTags.nativeElement.className).toContain('text-[11px]');
    expect(calloutTags.nativeElement.className).toContain('mt-1.5');

    const divider = fixture.debugElement.query(By.css('[data-testid="callout-divider"]'));
    expect(divider).toBeTruthy();
    expect(divider.nativeElement.className).toContain('bg-[#365AD2]');

    const disclaimer = fixture.debugElement.query(By.css('[data-testid="callout-disclaimer"]'));
    expect(disclaimer).toBeTruthy();
    expect(disclaimer.nativeElement.textContent.trim()).toContain(
      'Dampak jurnal mengikuti transaksi yang diposting dan pengaturan akun perusahaan',
    );
    expect(disclaimer.nativeElement.className).toContain('font-dm-sans');
    expect(disclaimer.nativeElement.className).toContain('font-normal');
    expect(disclaimer.nativeElement.className).toContain('text-[#23244E]');
    expect(disclaimer.nativeElement.className).toContain('text-justify');
  });

  it('should switch steps and callout dynamically when clicking Procure-to-Pay (P2P)', () => {
    const p2pTabBtn = fixture.debugElement.query(By.css('#tab-cycle-P2P'));
    expect(p2pTabBtn).toBeTruthy();

    p2pTabBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedCycle()).toBe('P2P');
    expect(p2pTabBtn.nativeElement.getAttribute('aria-selected')).toBe('true');

    const cards = fixture.debugElement.queryAll(By.css('ol li'));
    const titles = cards.map((c) =>
      c.query(By.css('span.font-bold')).nativeElement.textContent.trim(),
    );
    expect(titles).toEqual([
      'Purchase Requisition',
      'Purchase Order',
      'Goods Receipt',
      'Supplier Invoice',
      'Payment',
    ]);

    const calloutTags = fixture.debugElement.query(
      By.css('[data-testid="callout-tags"]'),
    );
    expect(calloutTags.nativeElement.textContent.trim()).toBe(
      'Procurement pipeline · Penerimaan barang · A/P aging · Kas keluar',
    );

    const svgs = fixture.debugElement.queryAll(By.css('ol li svg'));
    expect(svgs.length).toBe(0);

    const images = fixture.debugElement.queryAll(By.css('ol li img'));
    expect(images.length).toBe(5);
    images.forEach((img) => {
      expect(img.nativeElement.getAttribute('src')).toContain('calendar.svg');
    });
  });

  it('should switch steps and callout dynamically when clicking Plan-to-Produce (P2PR)', () => {
    const p2prTabBtn = fixture.debugElement.query(By.css('#tab-cycle-P2PR'));
    expect(p2prTabBtn).toBeTruthy();

    p2prTabBtn.nativeElement.click();
    fixture.detectChanges();

    expect(component.selectedCycle()).toBe('P2PR');
    expect(p2prTabBtn.nativeElement.getAttribute('aria-selected')).toBe('true');

    const cards = fixture.debugElement.queryAll(By.css('ol li'));
    const titles = cards.map((c) =>
      c.query(By.css('span.font-bold')).nativeElement.textContent.trim(),
    );
    expect(titles).toEqual([
      'BOM & Routing',
      'Planning / MRP',
      'Procurement',
      'Manufacturing Order',
      'Costing & Variance',
    ]);

    const calloutTags = fixture.debugElement.query(
      By.css('[data-testid="callout-tags"]'),
    );
    expect(calloutTags).toBeTruthy();
    expect(calloutTags.nativeElement.textContent.trim()).toBe(
      'Rencana produksi · Work in Process · Realisasi material · Harga pokok',
    );

    const images = fixture.debugElement.queryAll(By.css('ol li img'));
    expect(images.length).toBe(5);
    images.forEach((img) => {
      expect(img.nativeElement.getAttribute('src')).toContain('calendar.svg');
    });
  });

  it('should support keyboard navigation across tabs (ArrowRight, ArrowLeft, Home, End)', () => {
    const tabs = fixture.debugElement.queryAll(By.css('button[role="tab"]'));

    // ArrowRight from O2C (idx 0) -> P2P
    const eventRight = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    tabs[0].nativeElement.dispatchEvent(eventRight);
    fixture.detectChanges();
    expect(component.selectedCycle()).toBe('P2P');

    // ArrowRight from P2P (idx 1) -> P2PR
    tabs[1].nativeElement.dispatchEvent(eventRight);
    fixture.detectChanges();
    expect(component.selectedCycle()).toBe('P2PR');

    // ArrowLeft from P2PR (idx 2) -> P2P
    const eventLeft = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    tabs[2].nativeElement.dispatchEvent(eventLeft);
    fixture.detectChanges();
    expect(component.selectedCycle()).toBe('P2P');

    // End key -> P2PR
    const eventEnd = new KeyboardEvent('keydown', { key: 'End' });
    tabs[1].nativeElement.dispatchEvent(eventEnd);
    fixture.detectChanges();
    expect(component.selectedCycle()).toBe('P2PR');

    // Home key -> O2C
    const eventHome = new KeyboardEvent('keydown', { key: 'Home' });
    tabs[2].nativeElement.dispatchEvent(eventHome);
    fixture.detectChanges();
    expect(component.selectedCycle()).toBe('O2C');
  });
});
