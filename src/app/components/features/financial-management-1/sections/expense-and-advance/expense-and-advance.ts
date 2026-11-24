import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** Supported shelf tab identifiers in the Expense & Advance section. */
export type ExpenseAdvanceTabId = 'reimbursement' | 'cash-advance';

/** Interactive shelf tab metadata and workflow steps displayed on the stage. */
export interface ExpenseAdvanceTab {
  readonly id: ExpenseAdvanceTabId;
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly flowTitleKey: string;
  readonly steps: readonly ExpenseAdvanceStep[];
}

/** Decorative SVG layer inside the composite workflow illustration. */
export interface ExpenseIllustrationLayer {
  readonly id: string;
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly className: string;
}

/** Workflow step card rendered in sequential 01-06 DOM order with desktop snake placement. */
export interface ExpenseAdvanceStep {
  readonly id: string;
  readonly number: string;
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly illustration: 'claim-request' | 'workflow-board';
  readonly desktopGridClass: string;
}

export const CLAIM_REQUEST_IMAGE = {
  src: '/images/landing/features/1/claim-request.svg',
  width: 226,
  height: 194,
} as const;

export const WORKFLOW_BOARD_LAYERS: readonly ExpenseIllustrationLayer[] = [
  {
    id: 'board',
    src: '/images/landing/features/7/Group 10258.svg',
    width: 608,
    height: 464,
    className: 'expense-workflow-layer-board',
  },
  {
    id: 'check-badge',
    src: '/images/landing/features/7/Group 9458.svg',
    width: 152,
    height: 152,
    className: 'expense-workflow-layer-check',
  },
  {
    id: 'pencil',
    src: '/images/landing/features/7/Group 9419.svg',
    width: 320,
    height: 270,
    className: 'expense-workflow-layer-pencil',
  },
  {
    id: 'slip',
    src: '/images/landing/features/7/Group 9420.svg',
    width: 165,
    height: 153,
    className: 'expense-workflow-layer-slip',
  },
];

function buildWorkflowSteps(
  sectionKey: 'REIMBURSEMENT' | 'CASH_ADVANCE',
): readonly ExpenseAdvanceStep[] {
  const prefix = `FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.${sectionKey}.STEPS`;
  return [
    {
      id: 'claim-request',
      number: '01',
      titleKey: `${prefix}.CLAIM_REQUEST.TITLE`,
      subtitleKey: `${prefix}.CLAIM_REQUEST.SUBTITLE`,
      illustration: 'claim-request',
      desktopGridClass: 'lg:col-start-1 lg:row-start-1',
    },
    {
      id: 'notification',
      number: '02',
      titleKey: `${prefix}.NOTIFICATION.TITLE`,
      subtitleKey: `${prefix}.NOTIFICATION.SUBTITLE`,
      illustration: 'workflow-board',
      desktopGridClass: 'lg:col-start-2 lg:row-start-1',
    },
    {
      id: 'layered-approval',
      number: '03',
      titleKey: `${prefix}.LAYERED_APPROVAL.TITLE`,
      subtitleKey: `${prefix}.LAYERED_APPROVAL.SUBTITLE`,
      illustration: 'workflow-board',
      desktopGridClass: 'lg:col-start-3 lg:row-start-1',
    },
    {
      id: 'monitoring',
      number: '04',
      titleKey: `${prefix}.MONITORING.TITLE`,
      subtitleKey: `${prefix}.MONITORING.SUBTITLE`,
      illustration: 'workflow-board',
      desktopGridClass: 'lg:col-start-3 lg:row-start-2',
    },
    {
      id: 'payment',
      number: '05',
      titleKey: `${prefix}.PAYMENT.TITLE`,
      subtitleKey: `${prefix}.PAYMENT.SUBTITLE`,
      illustration: 'workflow-board',
      desktopGridClass: 'lg:col-start-2 lg:row-start-2',
    },
    {
      id: 'account-payable',
      number: '06',
      titleKey: `${prefix}.ACCOUNT_PAYABLE.TITLE`,
      subtitleKey: `${prefix}.ACCOUNT_PAYABLE.SUBTITLE`,
      illustration: 'workflow-board',
      desktopGridClass: 'lg:col-start-1 lg:row-start-2',
    },
  ];
}

@Component({
  selector: 'app-expense-and-advance',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './expense-and-advance.html',
  styleUrl: './expense-and-advance.css',
  host: {
    class: 'block w-full',
  },
})
export class ExpenseAndAdvance {
  readonly claimRequestImage = CLAIM_REQUEST_IMAGE;
  readonly workflowBoardLayers = WORKFLOW_BOARD_LAYERS;

  readonly activeTabId = signal<ExpenseAdvanceTabId>('reimbursement');

  readonly tabs: readonly ExpenseAdvanceTab[] = [
    {
      id: 'reimbursement',
      titleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.TABS.REIMBURSEMENT.TITLE',
      subtitleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.TABS.REIMBURSEMENT.SUBTITLE',
      flowTitleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.FLOW_TITLE',
      steps: buildWorkflowSteps('REIMBURSEMENT'),
    },
    {
      id: 'cash-advance',
      titleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.TABS.CASH_ADVANCE.TITLE',
      subtitleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.TABS.CASH_ADVANCE.SUBTITLE',
      flowTitleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.CASH_ADVANCE.FLOW_TITLE',
      steps: buildWorkflowSteps('CASH_ADVANCE'),
    },
  ];

  /** Selects a workflow shelf tab and keeps it visible inside horizontal scroll containers. */
  selectTab(tabId: ExpenseAdvanceTabId): void {
    this.activeTabId.set(tabId);
    if (typeof document !== 'undefined') {
      const btn = document.getElementById(`tab-expense-${tabId}`);
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
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % total;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
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
          document.getElementById(`tab-expense-${targetTab.id}`)?.focus();
        }
      }
    }
  }
}
