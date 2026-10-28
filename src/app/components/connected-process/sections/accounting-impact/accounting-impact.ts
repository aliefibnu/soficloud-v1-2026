import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';

export interface AccountingPillItem {
  readonly id: string;
  readonly labelKey: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
}

export interface AccountingPostingStep {
  readonly id: string;
  readonly labelKey: string;
}

@Component({
  selector: 'app-accounting-impact',
  imports: [ProcessSectionShell, TranslatePipe, NgOptimizedImage],
  templateUrl: './accounting-impact.html',
})
export class AccountingImpact {
  readonly col1TitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.TITLE';
  readonly col1SubtitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.SUBTITLE';

  readonly sourceDocuments: readonly AccountingPillItem[] = [
    {
      id: 'customer-invoice',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.ITEMS.0',
      iconSrc: '/images/connected-process/accounting-impact/customer-invoice.svg',
      iconWidth: 20,
      iconHeight: 23,
    },
    {
      id: 'supplier-invoice',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.ITEMS.1',
      iconSrc: '/images/connected-process/accounting-impact/supplier-invoice.svg',
      iconWidth: 20,
      iconHeight: 24,
    },
    {
      id: 'inventory-manufacturing',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.ITEMS.2',
      iconSrc: '/images/connected-process/accounting-impact/inventory-manufacturing.svg',
      iconWidth: 21,
      iconHeight: 19,
    },
    {
      id: 'receipt-payment',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_1.ITEMS.3',
      iconSrc: '/images/connected-process/accounting-impact/receipt-payment.svg',
      iconWidth: 21,
      iconHeight: 15,
    },
  ];

  readonly col2TitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_2.TITLE';
  readonly col2SubtitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_2.SUBTITLE';

  readonly postingSteps: readonly AccountingPostingStep[] = [
    {
      id: 'journal',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_2.ITEMS.0',
    },
    {
      id: 'trial-balance',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_2.ITEMS.1',
    },
    {
      id: 'general-ledger',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_2.ITEMS.2',
    },
  ];

  readonly col3TitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.TITLE';
  readonly col3SubtitleKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.SUBTITLE';

  readonly financialResults: readonly AccountingPillItem[] = [
    {
      id: 'profit-loss',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.ITEMS.0',
      iconSrc: '/images/connected-process/accounting-impact/profit-loss.svg',
      iconWidth: 19,
      iconHeight: 23,
    },
    {
      id: 'balance-sheet',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.ITEMS.1',
      iconSrc: '/images/connected-process/accounting-impact/balance-sheet.svg',
      iconWidth: 18,
      iconHeight: 21,
    },
    {
      id: 'cash-flow',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.ITEMS.2',
      iconSrc: '/images/connected-process/accounting-impact/cash-flow.svg',
      iconWidth: 24,
      iconHeight: 22,
    },
    {
      id: 'subledger-apar',
      labelKey: 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.COLUMN_3.ITEMS.3',
      iconSrc: '/images/connected-process/accounting-impact/subledger-apar.svg',
      iconWidth: 20,
      iconHeight: 22,
    },
  ];

  readonly disclaimerLabelKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.DISCLAIMER_LABEL';
  readonly disclaimerTextKey = 'CONNECTED_PROCESS.ACCOUNTING_IMPACT.DISCLAIMER_TEXT';
}
