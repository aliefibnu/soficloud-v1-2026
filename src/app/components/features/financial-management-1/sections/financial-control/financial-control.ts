import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface AccountingFlowStep {
  readonly id: string;
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly indent: 'start' | 'end';
  readonly connectorDirection?: 'right-down' | 'left-down';
}

export interface PaymentPriorityRow {
  readonly id: string;
  readonly vendorKey: string;
  readonly dueDateKey: string;
  readonly amountKey: string;
  readonly statusKey: string;
}

export interface ApprovalHistoryStep {
  readonly id: string;
  readonly stepNumber: number;
  readonly roleKey: string;
  readonly metaKey: string;
  readonly state: 'approved' | 'pending';
}

@Component({
  selector: 'app-financial-control',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './financial-control.html',
  styleUrl: './financial-control.css',
  host: {
    class: 'block w-full',
  },
})
export class FinancialControl {
  readonly ribbonBackground =
    'linear-gradient(108.08deg, #D7E4FA 12.76%, #EBF2FD 69.26%, rgba(169, 196, 241, 0.4) 111.44%)';
  readonly statusPillGradient = 'linear-gradient(90deg, #0D9596 0%, #10BFC1 100%)';

  readonly flowSteps: readonly AccountingFlowStep[] = [
    {
      id: 'transaction',
      titleKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.REPORTING_CARD.STEPS.TRANSACTION.TITLE',
      subtitleKey:
        'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.REPORTING_CARD.STEPS.TRANSACTION.SUBTITLE',
      indent: 'start',
      connectorDirection: 'right-down',
    },
    {
      id: 'journal',
      titleKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.REPORTING_CARD.STEPS.JOURNAL.TITLE',
      subtitleKey:
        'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.REPORTING_CARD.STEPS.JOURNAL.SUBTITLE',
      indent: 'end',
      connectorDirection: 'left-down',
    },
    {
      id: 'general-ledger',
      titleKey:
        'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.REPORTING_CARD.STEPS.GENERAL_LEDGER.TITLE',
      subtitleKey:
        'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.REPORTING_CARD.STEPS.GENERAL_LEDGER.SUBTITLE',
      indent: 'start',
      connectorDirection: 'right-down',
    },
    {
      id: 'statement-insight',
      titleKey:
        'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.REPORTING_CARD.STEPS.STATEMENT_INSIGHT.TITLE',
      subtitleKey:
        'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.REPORTING_CARD.STEPS.STATEMENT_INSIGHT.SUBTITLE',
      indent: 'end',
    },
  ];

  readonly paymentRows: readonly PaymentPriorityRow[] = [
    {
      id: 'supplier-material-a',
      vendorKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_1.VENDOR',
      dueDateKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_1.DUE_DATE',
      amountKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_1.AMOUNT',
      statusKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_1.STATUS',
    },
    {
      id: 'logistic-partner',
      vendorKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_2.VENDOR',
      dueDateKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_2.DUE_DATE',
      amountKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_2.AMOUNT',
      statusKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_2.STATUS',
    },
    {
      id: 'service-vendor',
      vendorKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_3.VENDOR',
      dueDateKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_3.DUE_DATE',
      amountKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_3.AMOUNT',
      statusKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.CASH_CONTROL_CARD.ROWS.ROW_3.STATUS',
    },
  ];

  readonly approvalSteps: readonly ApprovalHistoryStep[] = [
    {
      id: 'finance-supervisor',
      stepNumber: 1,
      roleKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.APPROVAL_CARD.STEPS.SUPERVISOR.ROLE',
      metaKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.APPROVAL_CARD.STEPS.SUPERVISOR.META',
      state: 'approved',
    },
    {
      id: 'finance-manager',
      stepNumber: 2,
      roleKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.APPROVAL_CARD.STEPS.MANAGER.ROLE',
      metaKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.APPROVAL_CARD.STEPS.MANAGER.META',
      state: 'approved',
    },
    {
      id: 'finance-director',
      stepNumber: 3,
      roleKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.APPROVAL_CARD.STEPS.DIRECTOR.ROLE',
      metaKey: 'FINANCIAL_MANAGEMENT_1.FINANCIAL_CONTROL.APPROVAL_CARD.STEPS.DIRECTOR.META',
      state: 'pending',
    },
  ];
}
