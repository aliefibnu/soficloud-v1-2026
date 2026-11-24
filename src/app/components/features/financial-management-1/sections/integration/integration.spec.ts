import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Integration } from './integration';

const ID_TRANSLATIONS = {
  FINANCIAL_MANAGEMENT_1: {
    INTEGRATION: {
      TITLE: 'Transaksi bisnis membentuk\naccounting impact',
      SUBTITLE:
        'Finance tidak perlu mencatat ulang transaksi operasional. Pilih alur untuk melihat bagaimana dokumen bisnis bergerak menuju General Ledger.',
      TABS_ARIA_LABEL: 'Alur integrasi akuntansi',
      FLOWS: {
        SALES_TO_CASH: {
          TAB_LABEL: 'Sales to Cash',
          HEADLINE: 'Order yang selesai menjadi receivable,\nreceipt, dan jurnal.',
          STEPS_ARIA_LABEL: 'Tahapan alur Sales to Cash',
          STEPS: {
            SALES_ORDER: 'Sales Order',
            DELIVERY: 'Delivery',
            CUSTOMER_INVOICE: 'Customer Invoice',
            AR: 'AR',
            RECEIPT: 'Receipt',
            GENERAL_LEDGER: 'General Ledger',
          },
        },
        PROCURE_TO_PAY: {
          TAB_LABEL: 'Procure to Pay',
          HEADLINE: 'Pembelian bergerak dari kebutuhan hingga\npembayaran supplier.',
          STEPS_ARIA_LABEL: 'Tahapan alur Procure to Pay',
          STEPS: {
            PR_PO: 'PR / PO',
            GOODS_RECEIPT: 'Goods Receipt',
            SUPPLIER_INVOICE: 'Supplier Invoice',
            AP: 'AP',
            PAYMENT: 'Payment',
            GENERAL_LEDGER: 'General Ledger',
          },
        },
        MANUFACTURE_TO_COGS: {
          TAB_LABEL: 'Manufacture to COGs',
          HEADLINE: 'Material dan hasil produksi membentuk\ninventory value serta COGS.',
          STEPS_ARIA_LABEL: 'Tahapan alur Manufacture to COGs',
          STEPS: {
            MATERIAL_ISSUE: 'Material Issue',
            WIP: 'WIP',
            FINISHED_GOODS: 'Finished Goods',
            PRODUCTION_COST: 'Production Cost',
            COGS: 'COGS',
            GENERAL_LEDGER: 'General Ledger',
          },
        },
        PROJECT_TO_PROFITABILITY: {
          TAB_LABEL: 'Project to Profitability',
          HEADLINE: 'Budget, biaya, dan revenue dibaca sebagai\nmargin proyek.',
          STEPS_ARIA_LABEL: 'Tahapan alur Project to Profitability',
          STEPS: {
            PROJECT_BUDGET: 'Project Budget',
            MATERIAL_EXPENSE: 'Material / Expense',
            PROJECT_COST: 'Project Cost',
            REVENUE: 'Revenue',
            PROFITABILITY: 'Profitability',
          },
        },
        EXPENSE_TO_ACCOUNTING: {
          TAB_LABEL: 'Expense to Accounting',
          HEADLINE: 'Claim dan advance masuk ke cost centre\natau project yang tepat.',
          STEPS_ARIA_LABEL: 'Tahapan alur Expense to Accounting',
          STEPS: {
            CLAIM_ADVANCE: 'Claim / Advance',
            APPROVAL: 'Approval',
            PAYMENT: 'Payment',
            SETTLEMENT: 'Settlement',
            COST_CENTRE: 'Cost Centre / Project',
            GENERAL_LEDGER: 'General Ledger',
          },
        },
      },
    },
  },
};

describe('Integration', () => {
  let fixture: ComponentFixture<Integration>;
  let component: Integration;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Integration],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', ID_TRANSLATIONS);
    translateService.use('id');

    fixture = TestBed.createComponent(Integration);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the integration section component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the #integration landmark with translated heading and subtitle', () => {
    const section = fixture.debugElement.query(By.css('section#integration'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.getAttribute('tabindex')).toBe('-1');
    expect(section.nativeElement.getAttribute('aria-labelledby')).toBe('integration-heading');
    expect(section.nativeElement.classList.contains('bg-transparent')).toBe(true);
    expect(section.nativeElement.classList.contains('bg-white')).toBe(false);

    const heading = fixture.debugElement.query(By.css('h2#integration-heading'));
    expect(heading.nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Transaksi bisnis membentuk accounting impact',
    );

    const subtitle = section.query(By.css('p'));
    expect(subtitle.nativeElement.textContent.trim()).toContain(
      'Finance tidak perlu mencatat ulang transaksi operasional.',
    );
  });

  it('should render all 5 accounting integration tabs with Sales to Cash selected by default', () => {
    const tabs = fixture.debugElement.queryAll(By.css('[role="tablist"] button[role="tab"]'));
    expect(tabs.length).toBe(5);
    expect(tabs.map((t) => t.nativeElement.textContent.trim())).toEqual([
      'Sales to Cash',
      'Procure to Pay',
      'Manufacture to COGs',
      'Project to Profitability',
      'Expense to Accounting',
    ]);

    expect(tabs[0].nativeElement.getAttribute('aria-selected')).toBe('true');
    expect(tabs[0].nativeElement.getAttribute('tabindex')).toBe('0');
    for (let i = 1; i < tabs.length; i++) {
      expect(tabs[i].nativeElement.getAttribute('aria-selected')).toBe('false');
      expect(tabs[i].nativeElement.getAttribute('tabindex')).toBe('-1');
    }

    const panels = fixture.debugElement.queryAll(By.css('[role="tabpanel"]'));
    expect(panels.length).toBe(5);
    expect(panels[0].nativeElement.getAttribute('hidden')).toBeNull();
    expect(panels[0].nativeElement.getAttribute('tabindex')).toBe('0');
    for (let i = 1; i < panels.length; i++) {
      expect(panels[i].nativeElement.getAttribute('hidden')).toBe('until-found');
      expect(panels[i].nativeElement.getAttribute('tabindex')).toBeNull();
    }
  });

  it('should render the 6 Sales to Cash steps with the provided SVG assets and 5 arrow connectors', () => {
    const panel = fixture.debugElement.query(By.css('[data-tab-panel="sales-to-cash"]'));
    expect(panel).toBeTruthy();
    expect(panel.query(By.css('h3')).nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Order yang selesai menjadi receivable, receipt, dan jurnal.',
    );

    const steps = panel.queryAll(By.css('ol > li[data-step-id]'));
    expect(steps.length).toBe(6);
    expect(steps.map((s) => s.query(By.css('span')).nativeElement.textContent.trim())).toEqual([
      'Sales Order',
      'Delivery',
      'Customer Invoice',
      'AR',
      'Receipt',
      'General Ledger',
    ]);

    const imgs = panel.queryAll(By.css('ol img.integration-step-icon'));
    expect(imgs.length).toBe(6);
    expect(imgs.map((img) => img.nativeElement.getAttribute('src'))).toEqual([
      '/images/landing/features/1/sales-order.svg',
      '/images/landing/features/1/delivery.svg',
      '/images/landing/features/1/customer-invoice.svg',
      '/images/landing/features/1/AR.svg',
      '/images/landing/features/1/receipt.svg',
      '/images/landing/features/1/general-ledger-2.svg',
    ]);

    const arrows = panel.queryAll(By.css('.integration-step-arrow img'));
    expect(arrows.length).toBe(5);
    for (const arrow of arrows) {
      expect(arrow.nativeElement.getAttribute('src')).toBe('/images/landing/features/1/arrow.svg');
    }
  });

  it('should switch active tab and panel on click', () => {
    const procureTab = fixture.debugElement.query(By.css('button[data-tab-id="procure-to-pay"]'));
    procureTab.nativeElement.click();
    fixture.detectChanges();

    expect(component.activeTabId()).toBe('procure-to-pay');
    expect(procureTab.nativeElement.getAttribute('aria-selected')).toBe('true');

    const salesPanel = fixture.debugElement.query(By.css('[data-tab-panel="sales-to-cash"]'));
    const procurePanel = fixture.debugElement.query(By.css('[data-tab-panel="procure-to-pay"]'));
    expect(salesPanel.nativeElement.getAttribute('hidden')).toBe('until-found');
    expect(procurePanel.nativeElement.getAttribute('hidden')).toBeNull();
    expect(procurePanel.nativeElement.textContent).toContain('PR / PO');
    expect(procurePanel.nativeElement.textContent).toContain('Supplier Invoice');
  });

  it('should render the 6 Procure to Pay steps with dedicated SVG assets and 5 arrow connectors', () => {
    const procureTab = fixture.debugElement.query(By.css('button[data-tab-id="procure-to-pay"]'));
    procureTab.nativeElement.click();
    fixture.detectChanges();

    const panel = fixture.debugElement.query(By.css('[data-tab-panel="procure-to-pay"]'));
    expect(panel).toBeTruthy();
    expect(panel.query(By.css('h3')).nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Pembelian bergerak dari kebutuhan hingga pembayaran supplier.',
    );

    const steps = panel.queryAll(By.css('ol > li[data-step-id]'));
    expect(steps.length).toBe(6);
    expect(steps.map((s) => s.query(By.css('span')).nativeElement.textContent.trim())).toEqual([
      'PR / PO',
      'Goods Receipt',
      'Supplier Invoice',
      'AP',
      'Payment',
      'General Ledger',
    ]);

    const imgs = panel.queryAll(By.css('ol img.integration-step-icon'));
    expect(imgs.length).toBe(6);
    expect(imgs.map((img) => img.nativeElement.getAttribute('src'))).toEqual([
      '/images/landing/features/1/PR-PO.svg',
      '/images/landing/features/1/goods-receipt.svg',
      '/images/landing/features/1/supplier-invoice.svg',
      '/images/landing/features/1/AP.svg',
      '/images/landing/features/1/claim-request.svg',
      '/images/landing/features/1/general-ledger-1.svg',
    ]);

    const arrows = panel.queryAll(By.css('.integration-step-arrow img'));
    expect(arrows.length).toBe(5);
    for (const arrow of arrows) {
      expect(arrow.nativeElement.getAttribute('src')).toBe('/images/landing/features/1/arrow.svg');
    }
  });

  it('should render the 6 Manufacture to COGs steps with dedicated SVG assets and 5 arrow connectors', () => {
    const manufactureTab = fixture.debugElement.query(
      By.css('button[data-tab-id="manufacture-to-cogs"]'),
    );
    manufactureTab.nativeElement.click();
    fixture.detectChanges();

    const panel = fixture.debugElement.query(By.css('[data-tab-panel="manufacture-to-cogs"]'));
    expect(panel).toBeTruthy();
    expect(panel.query(By.css('h3')).nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Material dan hasil produksi membentuk inventory value serta COGS.',
    );

    const steps = panel.queryAll(By.css('ol > li[data-step-id]'));
    expect(steps.length).toBe(6);
    expect(steps.map((s) => s.query(By.css('span')).nativeElement.textContent.trim())).toEqual([
      'Material Issue',
      'WIP',
      'Finished Goods',
      'Production Cost',
      'COGS',
      'General Ledger',
    ]);

    const imgs = panel.queryAll(By.css('ol img.integration-step-icon'));
    expect(imgs.length).toBe(6);
    expect(imgs.map((img) => img.nativeElement.getAttribute('src'))).toEqual([
      '/images/landing/features/1/material-issue.svg',
      '/images/landing/features/1/wip.svg',
      '/images/landing/features/1/finished-goods.svg',
      '/images/landing/features/1/production-cost.svg',
      '/images/landing/features/1/delivery.svg',
      '/images/landing/features/1/general-ledger-1.svg',
    ]);

    const arrows = panel.queryAll(By.css('.integration-step-arrow img'));
    expect(arrows.length).toBe(5);
    for (const arrow of arrows) {
      expect(arrow.nativeElement.getAttribute('src')).toBe('/images/landing/features/1/arrow.svg');
    }
  });

  it('should support WAI-ARIA keyboard navigation with ArrowRight, ArrowLeft, End, and Home', () => {
    const tabs = fixture.debugElement.queryAll(By.css('button[role="tab"]'));

    tabs[0].triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('procure-to-pay');

    tabs[1].triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'End' }));
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('expense-to-accounting');

    tabs[4].triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('sales-to-cash');

    tabs[0].triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('expense-to-accounting');

    tabs[4].triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'Home' }));
    fixture.detectChanges();
    expect(component.activeTabId()).toBe('sales-to-cash');
  });

  it('should activate matching tab when beforematch fires on a hidden tabpanel', () => {
    const projectPanel = fixture.debugElement.query(
      By.css('[data-tab-panel="project-to-profitability"]'),
    );
    projectPanel.nativeElement.dispatchEvent(new Event('beforematch'));
    fixture.detectChanges();

    expect(component.activeTabId()).toBe('project-to-profitability');
    expect(projectPanel.nativeElement.getAttribute('hidden')).toBeNull();
  });

  it('should render the 5 Project to Profitability steps with dedicated SVG assets and 4 arrow connectors', () => {
    const projectTab = fixture.debugElement.query(
      By.css('button[data-tab-id="project-to-profitability"]'),
    );
    projectTab.nativeElement.click();
    fixture.detectChanges();

    const panel = fixture.debugElement.query(By.css('[data-tab-panel="project-to-profitability"]'));
    expect(panel).toBeTruthy();
    expect(panel.query(By.css('h3')).nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Budget, biaya, dan revenue dibaca sebagai margin proyek.',
    );

    const steps = panel.queryAll(By.css('ol > li[data-step-id]'));
    expect(steps.length).toBe(5);
    expect(steps.map((s) => s.query(By.css('span')).nativeElement.textContent.trim())).toEqual([
      'Project Budget',
      'Material / Expense',
      'Project Cost',
      'Revenue',
      'Profitability',
    ]);

    const imgs = panel.queryAll(By.css('ol img.integration-step-icon'));
    expect(imgs.length).toBe(5);
    expect(imgs.map((img) => img.nativeElement.getAttribute('src'))).toEqual([
      '/images/landing/features/1/project-budget.svg',
      '/images/landing/features/1/material-expense.svg',
      '/images/landing/features/1/project-cost.svg',
      '/images/landing/features/1/revenue.svg',
      '/images/landing/features/1/profitability.svg',
    ]);

    const arrows = panel.queryAll(By.css('.integration-step-arrow img'));
    expect(arrows.length).toBe(4);
    for (const arrow of arrows) {
      expect(arrow.nativeElement.getAttribute('src')).toBe('/images/landing/features/1/arrow.svg');
    }
  });

  it('should render the 6 Expense to Accounting steps with dedicated SVG assets and 5 arrow connectors', () => {
    const expenseTab = fixture.debugElement.query(
      By.css('button[data-tab-id="expense-to-accounting"]'),
    );
    expenseTab.nativeElement.click();
    fixture.detectChanges();

    const panel = fixture.debugElement.query(By.css('[data-tab-panel="expense-to-accounting"]'));
    expect(panel).toBeTruthy();
    expect(panel.query(By.css('h3')).nativeElement.textContent.replace(/\s+/g, ' ').trim()).toBe(
      'Claim dan advance masuk ke cost centre atau project yang tepat.',
    );

    const steps = panel.queryAll(By.css('ol > li[data-step-id]'));
    expect(steps.length).toBe(6);
    expect(steps.map((s) => s.query(By.css('span')).nativeElement.textContent.trim())).toEqual([
      'Claim / Advance',
      'Approval',
      'Payment',
      'Settlement',
      'Cost Centre / Project',
      'General Ledger',
    ]);

    const imgs = panel.queryAll(By.css('ol img.integration-step-icon'));
    expect(imgs.length).toBe(6);
    expect(imgs.map((img) => img.nativeElement.getAttribute('src'))).toEqual([
      '/images/landing/features/1/claim-advance.svg',
      '/images/landing/features/1/approval.svg',
      '/images/landing/features/1/claim-request.svg',
      '/images/landing/features/1/settlement.svg',
      '/images/landing/features/1/cost-centre.svg',
      '/images/landing/features/1/general-ledger-1.svg',
    ]);

    const arrows = panel.queryAll(By.css('.integration-step-arrow img'));
    expect(arrows.length).toBe(5);
    for (const arrow of arrows) {
      expect(arrow.nativeElement.getAttribute('src')).toBe('/images/landing/features/1/arrow.svg');
    }
  });

  it('should position step icons out of flow inside uniform aspect-ratio tiles', () => {
    const tiles = fixture.debugElement.queryAll(
      By.css('[data-tab-panel="sales-to-cash"] .integration-step-tile'),
    );
    expect(tiles.length).toBe(6);

    for (const tile of tiles) {
      const tileEl = tile.nativeElement as HTMLElement;
      const tileStyle = getComputedStyle(tileEl);
      expect(tileStyle.position).toBe('relative');
      expect(tileStyle.aspectRatio).toBe('95 / 112');

      const iconEl = tile.query(By.css('img.integration-step-icon')).nativeElement as HTMLElement;
      const iconStyle = getComputedStyle(iconEl);
      expect(iconStyle.position).toBe('absolute');
    }
  });
});
