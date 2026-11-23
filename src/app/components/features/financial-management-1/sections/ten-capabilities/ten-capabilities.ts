import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface CapabilityItem {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly imageSrc: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly illustrationWidthCqi: string;
  readonly offsetX: string;
  readonly offsetY: string;
}

@Component({
  selector: 'app-ten-capabilities',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './ten-capabilities.html',
  styleUrl: './ten-capabilities.css',
  host: {
    class: 'block w-full',
  },
})
export class TenCapabilities {
  readonly capabilities: readonly CapabilityItem[] = [
    {
      id: 'general-ledger',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.GENERAL_LEDGER.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.GENERAL_LEDGER.DESCRIPTION',
      imageSrc: '/images/landing/features/1/general-ledger.svg',
      imageWidth: 299,
      imageHeight: 287,
      illustrationWidthCqi: '43cqi',
      offsetX: '13.5%',
      offsetY: '15%',
    },
    {
      id: 'account-receivable',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.ACCOUNT_RECEIVABLE.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.ACCOUNT_RECEIVABLE.DESCRIPTION',
      imageSrc: '/images/landing/features/1/account-receivable.svg',
      imageWidth: 266,
      imageHeight: 277,
      illustrationWidthCqi: '42cqi',
      offsetX: '14%',
      offsetY: '9%',
    },
    {
      id: 'account-payable',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.ACCOUNT_PAYABLE.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.ACCOUNT_PAYABLE.DESCRIPTION',
      imageSrc: '/images/landing/features/1/account-payable.svg',
      imageWidth: 247,
      imageHeight: 244,
      illustrationWidthCqi: '38.5cqi',
      offsetX: '1%',
      offsetY: '5%',
    },
    {
      id: 'cash-and-bank',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.CASH_AND_BANK.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.CASH_AND_BANK.DESCRIPTION',
      imageSrc: '/images/landing/features/1/cash-and-bank.svg',
      imageWidth: 297,
      imageHeight: 285,
      illustrationWidthCqi: '46cqi',
      offsetX: '5%',
      offsetY: '5%',
    },
    {
      id: 'expense-reimbursement',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.EXPENSE_REIMBURSEMENT.TITLE',
      descriptionKey:
        'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.EXPENSE_REIMBURSEMENT.DESCRIPTION',
      imageSrc: '/images/landing/features/1/expense.svg',
      imageWidth: 259,
      imageHeight: 215,
      illustrationWidthCqi: '42cqi',
      offsetX: '3.5%',
      offsetY: '1.5%',
    },
    {
      id: 'payment-planning',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.PAYMENT_PLANNING.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.PAYMENT_PLANNING.DESCRIPTION',
      imageSrc: '/images/landing/features/1/payment-planning.svg',
      imageWidth: 319,
      imageHeight: 251,
      illustrationWidthCqi: '48.5cqi',
      offsetX: '23%',
      offsetY: '7%',
    },
    {
      id: 'fixed-asset',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.FIXED_ASSET.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.FIXED_ASSET.DESCRIPTION',
      imageSrc: '/images/landing/features/1/fixed-asset.svg',
      imageWidth: 291,
      imageHeight: 234,
      illustrationWidthCqi: '47cqi',
      offsetX: '22%',
      offsetY: '3%',
    },
    {
      id: 'cost-and-management',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.COST_AND_MANAGEMENT.TITLE',
      descriptionKey:
        'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.COST_AND_MANAGEMENT.DESCRIPTION',
      imageSrc: '/images/landing/features/1/cost-and-management.svg',
      imageWidth: 287,
      imageHeight: 208,
      illustrationWidthCqi: '50cqi',
      offsetX: '5%',
      offsetY: '1%',
    },
    {
      id: 'multi-currency',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.MULTI_CURRENCY.TITLE',
      descriptionKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.MULTI_CURRENCY.DESCRIPTION',
      imageSrc: '/images/landing/features/1/multi-currency.svg',
      imageWidth: 247,
      imageHeight: 254,
      illustrationWidthCqi: '39.5cqi',
      offsetX: '6.5%',
      offsetY: '3.5%',
    },
    {
      id: 'accounting-automation',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.ACCOUNTING_AUTOMATION.TITLE',
      descriptionKey:
        'FINANCIAL_MANAGEMENT_1.TEN_CAPABILITIES.CARDS.ACCOUNTING_AUTOMATION.DESCRIPTION',
      imageSrc: '/images/landing/features/1/accounting-automation.svg',
      imageWidth: 281,
      imageHeight: 198,
      illustrationWidthCqi: '49cqi',
      offsetX: '5.5%',
      offsetY: '1%',
    },
  ];
}
