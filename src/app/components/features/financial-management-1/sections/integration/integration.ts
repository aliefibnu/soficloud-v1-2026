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

/** Tab metadata and multi-step accounting flow definition. */
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
  prPo: { src: '/images/landing/features/1/PR-PO.svg', width: 120, height: 139 },
  goodsReceipt: { src: '/images/landing/features/1/goods-receipt.svg', width: 110, height: 140 },
  supplierInvoice: {
    src: '/images/landing/features/1/supplier-invoice.svg',
    width: 109,
    height: 140,
  },
  ap: { src: '/images/landing/features/1/AP.svg', width: 103, height: 133 },
  payment: { src: '/images/landing/features/1/claim-request.svg', width: 226, height: 194 },
  generalLedger1: {
    src: '/images/landing/features/1/general-ledger-1.svg',
    width: 112,
    height: 131,
  },
  materialIssue: {
    src: '/images/landing/features/1/material-issue.svg',
    width: 119,
    height: 135,
  },
  wip: { src: '/images/landing/features/1/wip.svg', width: 120, height: 139 },
  finishedGoods: {
    src: '/images/landing/features/1/finished-goods.svg',
    width: 120,
    height: 139,
  },
  productionCost: {
    src: '/images/landing/features/1/production-cost.svg',
    width: 120,
    height: 135,
  },
  cogs: { src: '/images/landing/features/1/delivery.svg', width: 120, height: 137 },
  projectBudget: {
    src: '/images/landing/features/1/project-budget.svg',
    width: 114,
    height: 149,
  },
  materialExpense: {
    src: '/images/landing/features/1/material-expense.svg',
    width: 109,
    height: 131,
  },
  projectCost: {
    src: '/images/landing/features/1/project-cost.svg',
    width: 133,
    height: 144,
  },
  revenue: { src: '/images/landing/features/1/revenue.svg', width: 123, height: 142 },
  profitability: {
    src: '/images/landing/features/1/profitability.svg',
    width: 123,
    height: 135,
  },
  claimAdvance: {
    src: '/images/landing/features/1/claim-advance.svg',
    width: 122,
    height: 138,
  },
  approval: { src: '/images/landing/features/1/approval.svg', width: 120, height: 127 },
  settlement: { src: '/images/landing/features/1/settlement.svg', width: 112, height: 137 },
  costCentre: { src: '/images/landing/features/1/cost-centre.svg', width: 122, height: 127 },
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
        { id: 'pr-po', key: 'PR_PO', icon: 'prPo' },
        { id: 'goods-receipt', key: 'GOODS_RECEIPT', icon: 'goodsReceipt' },
        { id: 'supplier-invoice', key: 'SUPPLIER_INVOICE', icon: 'supplierInvoice' },
        { id: 'ap', key: 'AP', icon: 'ap' },
        { id: 'payment', key: 'PAYMENT', icon: 'payment' },
        { id: 'general-ledger', key: 'GENERAL_LEDGER', icon: 'generalLedger1' },
      ]),
    },
    {
      id: 'manufacture-to-cogs',
      labelKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.MANUFACTURE_TO_COGS.TAB_LABEL',
      headlineKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.MANUFACTURE_TO_COGS.HEADLINE',
      stepsAriaLabelKey:
        'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.MANUFACTURE_TO_COGS.STEPS_ARIA_LABEL',
      steps: buildSteps('MANUFACTURE_TO_COGS', [
        { id: 'material-issue', key: 'MATERIAL_ISSUE', icon: 'materialIssue' },
        { id: 'wip', key: 'WIP', icon: 'wip' },
        { id: 'finished-goods', key: 'FINISHED_GOODS', icon: 'finishedGoods' },
        { id: 'production-cost', key: 'PRODUCTION_COST', icon: 'productionCost' },
        { id: 'cogs', key: 'COGS', icon: 'cogs' },
        { id: 'general-ledger', key: 'GENERAL_LEDGER', icon: 'generalLedger1' },
      ]),
    },
    {
      id: 'project-to-profitability',
      labelKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.PROJECT_TO_PROFITABILITY.TAB_LABEL',
      headlineKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.PROJECT_TO_PROFITABILITY.HEADLINE',
      stepsAriaLabelKey:
        'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.PROJECT_TO_PROFITABILITY.STEPS_ARIA_LABEL',
      steps: buildSteps('PROJECT_TO_PROFITABILITY', [
        { id: 'project-budget', key: 'PROJECT_BUDGET', icon: 'projectBudget' },
        { id: 'material-expense', key: 'MATERIAL_EXPENSE', icon: 'materialExpense' },
        { id: 'project-cost', key: 'PROJECT_COST', icon: 'projectCost' },
        { id: 'revenue', key: 'REVENUE', icon: 'revenue' },
        { id: 'profitability', key: 'PROFITABILITY', icon: 'profitability' },
      ]),
    },
    {
      id: 'expense-to-accounting',
      labelKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.EXPENSE_TO_ACCOUNTING.TAB_LABEL',
      headlineKey: 'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.EXPENSE_TO_ACCOUNTING.HEADLINE',
      stepsAriaLabelKey:
        'FINANCIAL_MANAGEMENT_1.INTEGRATION.FLOWS.EXPENSE_TO_ACCOUNTING.STEPS_ARIA_LABEL',
      steps: buildSteps('EXPENSE_TO_ACCOUNTING', [
        { id: 'claim-advance', key: 'CLAIM_ADVANCE', icon: 'claimAdvance' },
        { id: 'approval', key: 'APPROVAL', icon: 'approval' },
        { id: 'payment', key: 'PAYMENT', icon: 'payment' },
        { id: 'settlement', key: 'SETTLEMENT', icon: 'settlement' },
        { id: 'cost-centre', key: 'COST_CENTRE', icon: 'costCentre' },
        { id: 'general-ledger', key: 'GENERAL_LEDGER', icon: 'generalLedger1' },
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
