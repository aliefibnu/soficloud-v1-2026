import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** Supported accounting integration flow tab identifiers. */
export type IntegrationTabId =
  | 'sales-to-cash'
  | 'procure-to-pay'
  | 'manufacture-to-cogs'
  | 'project-to-profitability'
  | 'expense-to-accounting';

/** Single workflow step tile inside an accounting integration pipeline. */
export interface IntegrationStep {
  readonly id: string;
  readonly labelKey: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
}

/** Tab metadata and 6-step accounting flow definition. */
export interface IntegrationFlowTab {
  readonly id: IntegrationTabId;
  readonly labelKey: string;
  readonly headlineKey: string;
  readonly stepsAriaLabelKey: string;
  readonly steps: readonly IntegrationStep[];
}

const STAGE_ICONS = {
  salesOrder: { src: '/images/landing/features/1/sales-order.svg', width: 115, height: 145 },
  delivery: { src: '/images/landing/features/1/delivery.svg', width: 120, height: 137 },
  customerInvoice: {
    src: '/images/landing/features/1/customer-invoice.svg',
    width: 124,
    height: 132,
  },
  ar: { src: '/images/landing/features/1/AR.svg', width: 123, height: 129 },
  receipt: { src: '/images/landing/features/1/receipt.svg', width: 116, height: 127 },
  generalLedger: {
    src: '/images/landing/features/1/general-ledger-2.svg',
    width: 119,
    height: 135,
  },
} as const;

type StageIconKey = keyof typeof STAGE_ICONS;

function buildSteps(
  flowKey: string,
  stepDefs: readonly { readonly id: string; readonly key: string; readonly icon: StageIconKey }[],
): readonly IntegrationStep[] {
  const prefix = `FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.${flowKey}.STEPS`;
  return stepDefs.map((step) => {
    const asset = STAGE_ICONS[step.icon];
    return {
      id: step.id,
      labelKey: `${prefix}.${step.key}`,
      iconSrc: asset.src,
      iconWidth: asset.width,
      iconHeight: asset.height,
    };
  });
}

@Component({
  selector: 'app-integration',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './integration.html',
  styleUrl: './integration.css',
  host: {
    class: 'block w-full',
  },
})
export class Integration {
  readonly activeTabId = signal<IntegrationTabId>('sales-to-cash');

  readonly tabs: readonly IntegrationFlowTab[] = [
    {
      id: 'sales-to-cash',
      labelKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.SALES_TO_CASH.TAB_LABEL',
      headlineKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.SALES_TO_CASH.HEADLINE',
      stepsAriaLabelKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.SALES_TO_CASH.STEPS_ARIA_LABEL',
      steps: buildSteps('SALES_TO_CASH', [
        { id: 'sales-order', key: 'SALES_ORDER', icon: 'salesOrder' },
        { id: 'delivery', key: 'DELIVERY', icon: 'delivery' },
        { id: 'customer-invoice', key: 'CUSTOMER_INVOICE', icon: 'customerInvoice' },
        { id: 'ar', key: 'AR', icon: 'ar' },
        { id: 'receipt', key: 'RECEIPT', icon: 'receipt' },
        { id: 'general-ledger', key: 'GENERAL_LEDGER', icon: 'generalLedger' },
      ]),
    },
    {
      id: 'procure-to-pay',
      labelKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.PROCURE_TO_PAY.TAB_LABEL',
      headlineKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.PROCURE_TO_PAY.HEADLINE',
      stepsAriaLabelKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.PROCURE_TO_PAY.STEPS_ARIA_LABEL',
      steps: buildSteps('PROCURE_TO_PAY', [
        { id: 'purchase-order', key: 'PURCHASE_ORDER', icon: 'salesOrder' },
        { id: 'goods-receipt', key: 'GOODS_RECEIPT', icon: 'delivery' },
        { id: 'supplier-invoice', key: 'SUPPLIER_INVOICE', icon: 'customerInvoice' },
        { id: 'ap', key: 'AP', icon: 'ar' },
        { id: 'payment', key: 'PAYMENT', icon: 'receipt' },
        { id: 'general-ledger', key: 'GENERAL_LEDGER', icon: 'generalLedger' },
      ]),
    },
    {
      id: 'manufacture-to-cogs',
      labelKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.MANUFACTURE_TO_COGS.TAB_LABEL',
      headlineKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.MANUFACTURE_TO_COGS.HEADLINE',
      stepsAriaLabelKey:
        'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.MANUFACTURE_TO_COGS.STEPS_ARIA_LABEL',
      steps: buildSteps('MANUFACTURE_TO_COGS', [
        { id: 'bom-routing', key: 'BOM_ROUTING', icon: 'salesOrder' },
        { id: 'material-issue', key: 'MATERIAL_ISSUE', icon: 'delivery' },
        { id: 'work-order', key: 'WORK_ORDER', icon: 'customerInvoice' },
        { id: 'finished-goods', key: 'FINISHED_GOODS', icon: 'ar' },
        { id: 'cogs', key: 'COGS', icon: 'receipt' },
        { id: 'general-ledger', key: 'GENERAL_LEDGER', icon: 'generalLedger' },
      ]),
    },
    {
      id: 'project-to-profitability',
      labelKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.PROJECT_TO_PROFITABILITY.TAB_LABEL',
      headlineKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.PROJECT_TO_PROFITABILITY.HEADLINE',
      stepsAriaLabelKey:
        'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.PROJECT_TO_PROFITABILITY.STEPS_ARIA_LABEL',
      steps: buildSteps('PROJECT_TO_PROFITABILITY', [
        { id: 'project-budget', key: 'PROJECT_BUDGET', icon: 'salesOrder' },
        { id: 'cost-allocation', key: 'COST_ALLOCATION', icon: 'delivery' },
        { id: 'progress-billing', key: 'PROGRESS_BILLING', icon: 'customerInvoice' },
        { id: 'project-revenue', key: 'PROJECT_REVENUE', icon: 'ar' },
        { id: 'profitability', key: 'PROFITABILITY', icon: 'receipt' },
        { id: 'general-ledger', key: 'GENERAL_LEDGER', icon: 'generalLedger' },
      ]),
    },
    {
      id: 'expense-to-accounting',
      labelKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.EXPENSE_TO_ACCOUNTING.TAB_LABEL',
      headlineKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.EXPENSE_TO_ACCOUNTING.HEADLINE',
      stepsAriaLabelKey:
        'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.EXPENSE_TO_ACCOUNTING.STEPS_ARIA_LABEL',
      steps: buildSteps('EXPENSE_TO_ACCOUNTING', [
        { id: 'expense-claim', key: 'EXPENSE_CLAIM', icon: 'salesOrder' },
        { id: 'approval', key: 'APPROVAL', icon: 'delivery' },
        { id: 'cash-advance', key: 'CASH_ADVANCE', icon: 'customerInvoice' },
        { id: 'settlement', key: 'SETTLEMENT', icon: 'ar' },
        { id: 'ap-bank', key: 'AP_BANK', icon: 'receipt' },
        { id: 'general-ledger', key: 'GENERAL_LEDGER', icon: 'generalLedger' },
      ]),
    },
  ];

  /** Selects an integration flow tab and keeps it visible inside horizontal scroll containers. */
  selectTab(tabId: IntegrationTabId): void {
    this.activeTabId.set(tabId);
    if (typeof document !== 'undefined') {
      const btn = document.getElementById(`tab-integration-${tabId}`);
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      btn?.scrollIntoView?.({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }

  /** Handles WAI-ARIA horizontal tablist keyboard navigation with selection following focus. */
  onTabKeydown(event: KeyboardEvent, currentIndex: number): void {
    let nextIndex: number | null = null;
    const total = this.tabs.length;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % total;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + total) % total;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = total - 1;
        break;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const targetTab = this.tabs[nextIndex];
      if (targetTab) {
        this.selectTab(targetTab.id);
        if (typeof document !== 'undefined') {
          document.getElementById(`tab-integration-${targetTab.id}`)?.focus();
        }
      }
    }
  }
}
