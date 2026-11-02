import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { MaterialReadiness } from './material-readiness';
import { VisibilitySectionShell } from '../visibility-section-shell/visibility-section-shell';

describe('MaterialReadiness', () => {
  let fixture: ComponentFixture<MaterialReadiness>;
  let component: MaterialReadiness;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialReadiness],
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
          MATERIAL_READINESS: {
            TITLE: 'Cek Ketersediaan Bahan\nSebelum Produksi',
            DESCRIPTION:
              'Tampilan MRP merinci stok fisik, stok yang sudah dipesan, stok tersedia, pesanan pemasok, dan perkiraan stok per part. Filter part dan BOM membantu PPIC meninjau kebutuhan produk yang akan dibuat.',
            DECISION_TEXT:
              'Identifikasi kekurangan material, lalu ajukan pembelian atau jadwal ulang',
            MOCKUP: {
              WINDOW_TITLE: 'MRP (PT INFORSYS INDONESIA )',
              CARD_TITLE: 'Material Requirement Planning (MRP)',
              AS_OF: 'As of Jul 28, 2026',
              FILTERS: {
                PART: 'Part',
                PART_CATEGORY_1: 'Part Category 1',
                PART_CATEGORY_2: 'Part Category 2',
                PROJECT_BUDGETED: 'Project Budgeted',
                SUPPLIER: 'Supplier',
                PART_CATEGORY_3: 'Part Category 3',
                FINISHED_GOODS_BOM: 'Finished Goods & BoM',
                PART_GROUP: 'Part Group',
                PART_TYPE: 'Part Type',
                CLASSIFICATION: 'Classification',
                SELECT_ALL: 'Select All',
                TRADING_PART: 'Trading Part',
                SAMPLE_BOM: 'Classic jati-craft Table - FG-c001',
                PRIORITY: 'Priority',
                SHOW_STOCK: 'Show stock',
              },
              SEARCH_PLACEHOLDER: 'Search Part Detail',
              ACTIONS: {
                CREATE_MPR: 'Create MPR',
                CREATE_STOCK_ISSUE: 'Create Stock Issue',
                CREATE_PACKING_LIST: 'Create Packing List',
                CREATE_TRANSFER: 'Create Transfer',
              },
              TABLE: {
                PART_CODE: 'Part Code',
                PART_NAME: 'Part Name',
                GROUP: 'Group',
                UNIT: 'Unit',
                STOCK_ON_HAND: 'Stock On Hand',
                BOOKING_STOCK: 'Booking Stock',
                AVAILABILITY_STOCK: 'Availability stock',
                ORDER_STOCK: 'Order Stock',
                EXPECTED_STOCK: 'Expected Stock',
              },
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(MaterialReadiness);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the material-readiness component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the outer shell with sectionId material-readiness and translated title', () => {
    const section = fixture.debugElement.query(
      By.css('section#material-readiness'),
    );
    expect(section).toBeTruthy();

    const heading = fixture.debugElement.query(
      By.css('h3#material-readiness-heading'),
    );
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Cek Ketersediaan Bahan Sebelum Produksi',
    );
  });

  it('should render the ERP window chrome with module title and active MRP sidebar pill', () => {
    const chrome = fixture.debugElement.query(By.css('app-erp-window-chrome'));
    expect(chrome).toBeTruthy();

    const activePill = chrome.query(By.css('.bg-\\[\\#EAF1FD\\]'));
    expect(activePill).toBeTruthy();
    expect(activePill.nativeElement.textContent.trim()).toBe('MRP');

    expect(chrome.nativeElement.textContent).toContain(
      'MRP (PT INFORSYS INDONESIA )',
    );
  });

  it('should not render the status pills in ERP window chrome for MRP', () => {
    const pillsContainer = fixture.debugElement.query(
      By.css('[aria-label="System status and timestamp"]'),
    );
    expect(pillsContainer).toBeNull();
  });

  it('should render the MRP filters card with title, as-of date, and filter controls', () => {
    const filterCard = fixture.debugElement.query(By.css('article'));
    expect(filterCard).toBeTruthy();

    const heading = filterCard.query(By.css('h4'));
    expect(heading.nativeElement.textContent.trim()).toBe(
      'Material Requirement Planning (MRP)',
    );

    const cardText = filterCard.nativeElement.textContent;
    expect(cardText).toContain('As of Jul 28, 2026');
    expect(cardText).toContain('Finished Goods & BoM');
    expect(cardText).toContain('Priority');
    expect(cardText).toContain('Show stock');

    const inputs = filterCard.queryAll(By.css('input'));
    const inputValues = inputs.map((i) => i.nativeElement.value);
    expect(inputValues).toContain('Classic jati-craft Table - FG-c001');
    expect(inputValues).toContain('Trading Part');
    expect(inputValues).toContain('Select All');
  });

  it('should render search input with placeholder and 4 action buttons', () => {
    const searchInput = fixture.debugElement.query(
      By.css('input[placeholder="Search Part Detail"]'),
    );
    expect(searchInput).toBeTruthy();

    const buttons = fixture.debugElement.queryAll(
      By.css('button.bg-\\[\\#0B63EE\\]'),
    );
    expect(buttons.length).toBe(4);
    const buttonTexts = buttons.map((b) => b.nativeElement.textContent.trim());
    expect(buttonTexts).toEqual([
      'Create MPR',
      'Create Stock Issue',
      'Create Packing List',
      'Create Transfer',
    ]);
  });

  it('should render the MRP data table with exactly 9 rows matching the dataset', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();

    const headers = table.queryAll(By.css('th'));
    expect(headers.length).toBe(10);
    const headerTexts = headers.map((h) => h.nativeElement.textContent.trim());
    expect(headerTexts).toContain('Part Code');
    expect(headerTexts).toContain('Part Name');
    expect(headerTexts).toContain('Group');
    expect(headerTexts).toContain('Unit');
    expect(headerTexts).toContain('Stock On Hand');
    expect(headerTexts).toContain('Expected Stock');

    const rows = table.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(9);

    // Verify row 1: RM-T001 (unchecked)
    expect(rows[0].nativeElement.textContent).toContain('RM-T001');
    expect(rows[0].nativeElement.textContent).toContain('Teak Wood Boards');
    expect(rows[0].nativeElement.textContent).toContain('RAW MATERIAL');
    expect(rows[0].nativeElement.textContent).toContain('14');
    expect(rows[0].query(By.css('[aria-label="Selected"]'))).toBeNull();
    expect(rows[0].query(By.css('[aria-label="Not selected"]'))).toBeTruthy();

    // Verify row 2: RM-S001 (checked)
    expect(rows[1].nativeElement.textContent).toContain('RM-S001');
    expect(rows[1].nativeElement.textContent).toContain('Solid Wood Legs');
    expect(rows[1].nativeElement.textContent).toContain('18');
    expect(rows[1].query(By.css('[aria-label="Selected"]'))).toBeTruthy();

    // Verify row 7: WIP-W001 (unchecked, WORK IN PROCESS)
    expect(rows[6].nativeElement.textContent).toContain('WIP-W001');
    expect(rows[6].nativeElement.textContent).toContain('WIP - Jaticraft Table Assembly Process');
    expect(rows[6].nativeElement.textContent).toContain('WORK IN PROCESS');
  });

  it('should render the decision card with translated decision text', () => {
    const shellEl = fixture.debugElement.query(
      By.directive(VisibilitySectionShell),
    );
    expect(shellEl).toBeTruthy();
    expect(shellEl.nativeElement.textContent).toContain('Untuk keputusan:');
    expect(shellEl.nativeElement.textContent).toContain(
      'Identifikasi kekurangan material, lalu ajukan pembelian atau jadwal ulang',
    );
  });
});
