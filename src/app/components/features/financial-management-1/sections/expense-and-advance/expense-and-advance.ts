import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

/** Supported shelf tab identifiers in the Expense & Advance section. */
export type ExpenseAdvanceTabId = 'reimbursement' | 'cash-advance';

/** Visual shelf tab metadata displayed above the workflow stage. */
export interface ExpenseAdvanceTab {
  readonly id: ExpenseAdvanceTabId;
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly active: boolean;
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

  readonly tabs: readonly ExpenseAdvanceTab[] = [
    {
      id: 'reimbursement',
      titleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.TABS.REIMBURSEMENT.TITLE',
      subtitleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.TABS.REIMBURSEMENT.SUBTITLE',
      active: true,
    },
    {
      id: 'cash-advance',
      titleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.TABS.CASH_ADVANCE.TITLE',
      subtitleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.TABS.CASH_ADVANCE.SUBTITLE',
      active: false,
    },
  ];

  readonly steps: readonly ExpenseAdvanceStep[] = [
    {
      id: 'claim-request',
      number: '01',
      titleKey:
        'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.CLAIM_REQUEST.TITLE',
      subtitleKey:
        'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.CLAIM_REQUEST.SUBTITLE',
      illustration: 'claim-request',
      desktopGridClass: 'lg:col-start-1 lg:row-start-1',
    },
    {
      id: 'notification',
      number: '02',
      titleKey:
        'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.NOTIFICATION.TITLE',
      subtitleKey:
        'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.NOTIFICATION.SUBTITLE',
      illustration: 'workflow-board',
      desktopGridClass: 'lg:col-start-2 lg:row-start-1',
    },
    {
      id: 'layered-approval',
      number: '03',
      titleKey:
        'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.LAYERED_APPROVAL.TITLE',
      subtitleKey:
        'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.LAYERED_APPROVAL.SUBTITLE',
      illustration: 'workflow-board',
      desktopGridClass: 'lg:col-start-3 lg:row-start-1',
    },
    {
      id: 'monitoring',
      number: '04',
      titleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.MONITORING.TITLE',
      subtitleKey:
        'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.MONITORING.SUBTITLE',
      illustration: 'workflow-board',
      desktopGridClass: 'lg:col-start-3 lg:row-start-2',
    },
    {
      id: 'payment',
      number: '05',
      titleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.PAYMENT.TITLE',
      subtitleKey: 'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.PAYMENT.SUBTITLE',
      illustration: 'workflow-board',
      desktopGridClass: 'lg:col-start-2 lg:row-start-2',
    },
    {
      id: 'account-payable',
      number: '06',
      titleKey:
        'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.ACCOUNT_PAYABLE.TITLE',
      subtitleKey:
        'FINANCIAL_MANAGEMENT_1.EXPENSE_AND_ADVANCE.REIMBURSEMENT.STEPS.ACCOUNT_PAYABLE.SUBTITLE',
      illustration: 'workflow-board',
      desktopGridClass: 'lg:col-start-1 lg:row-start-2',
    },
  ];
}
