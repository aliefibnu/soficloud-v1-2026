import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';

export type ProcessStreamId = 'purchasing' | 'manufacturing' | 'general-ledger' | 'sales';
export type ProcessTheme = 'blue' | 'teal' | 'red';
export type ConnectorMarkerMode = 'end' | 'both' | 'none';

export interface ProcessMapNode {
  readonly id: string;
  readonly streamId: ProcessStreamId;
  readonly theme: ProcessTheme;
  readonly labelKey: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
  readonly x: number;
  readonly y: number;
}

export interface ProcessMapStreamGroup {
  readonly id: ProcessStreamId;
  readonly titleKey: string;
  readonly nodes: readonly ProcessMapNode[];
}

export interface ProcessMapConnector {
  readonly id: string;
  readonly theme: ProcessTheme;
  readonly d: string;
  readonly markers: ConnectorMarkerMode;
}

export interface ThemeVisualTokens {
  readonly badgeGradient: string;
  readonly shadowBgClass: string;
  readonly borderClass: string;
  readonly strokeHex: string;
  readonly markerUrl: string;
}

@Component({
  selector: 'app-full-process-map',
  imports: [ProcessSectionShell, TranslatePipe, NgOptimizedImage],
  templateUrl: './full-process-map.html',
})
export class FullProcessMap {
  readonly scrollHintKey = 'CONNECTED_PROCESS.FULL_PROCESS_MAP.HINT_SCROLL';
  readonly ariaRegionLabelKey = 'CONNECTED_PROCESS.FULL_PROCESS_MAP.ARIA_REGION_LABEL';

  readonly themeTokens: Record<ProcessTheme, ThemeVisualTokens> = {
    blue: {
      badgeGradient: 'linear-gradient(180deg, #1C37E1 0%, #386FDB 68%, #588BE1 100%)',
      shadowBgClass: 'bg-[#004FC1]',
      borderClass: 'border-[#1C73F0]',
      strokeHex: '#1C73F0',
      markerUrl: 'url(#fpm-arrow-blue)',
    },
    teal: {
      badgeGradient: 'linear-gradient(180deg, #0D9596 0%, #0EA7A9 65%, #10BABC 100%)',
      shadowBgClass: 'bg-[#0C7F80]',
      borderClass: 'border-[#139496]',
      strokeHex: '#139496',
      markerUrl: 'url(#fpm-arrow-teal)',
    },
    red: {
      badgeGradient: 'linear-gradient(180deg, #A5131A 0%, #C61A25 65%, #E4212F 100%)',
      shadowBgClass: 'bg-[#C31924]',
      borderClass: 'border-[#E4212F]',
      strokeHex: '#E4212F',
      markerUrl: 'url(#fpm-arrow-red)',
    },
  };

  readonly streamGroups: readonly ProcessMapStreamGroup[] = [
    {
      id: 'purchasing',
      titleKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.STREAMS.PURCHASING',
      nodes: [
        {
          id: 'purchase-requisition',
          streamId: 'purchasing',
          theme: 'blue',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.PURCHASE_REQUISITION',
          iconSrc: '/images/connected-process/full-process-map/purchase-requisition.svg',
          iconWidth: 29,
          iconHeight: 35,
          x: 32,
          y: 28,
        },
        {
          id: 'purchase-quotation',
          streamId: 'purchasing',
          theme: 'blue',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.PURCHASE_QUOTATION',
          iconSrc: '/images/connected-process/full-process-map/purchase-quotation.svg',
          iconWidth: 29,
          iconHeight: 35,
          x: 32,
          y: 93,
        },
        {
          id: 'purchase-order',
          streamId: 'purchasing',
          theme: 'blue',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.PURCHASE_ORDER',
          iconSrc: '/images/connected-process/full-process-map/purchase-order.svg',
          iconWidth: 34,
          iconHeight: 28,
          x: 32,
          y: 158,
        },
        {
          id: 'purchase-return',
          streamId: 'purchasing',
          theme: 'blue',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.PURCHASE_RETURN',
          iconSrc: '/images/connected-process/full-process-map/purchase-return.svg',
          iconWidth: 35,
          iconHeight: 35,
          x: 294,
          y: 58,
        },
        {
          id: 'ap-debit-note',
          streamId: 'purchasing',
          theme: 'blue',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.AP_DEBIT_NOTE',
          iconSrc: '/images/connected-process/full-process-map/ap-debit.svg',
          iconWidth: 31,
          iconHeight: 34,
          x: 534,
          y: 58,
        },
        {
          id: 'ap-statement',
          streamId: 'purchasing',
          theme: 'blue',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.AP_STATEMENT',
          iconSrc: '/images/connected-process/full-process-map/ap-statement.svg',
          iconWidth: 26,
          iconHeight: 33,
          x: 832,
          y: 58,
        },
        {
          id: 'goods-receipt',
          streamId: 'purchasing',
          theme: 'blue',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.GOODS_RECEIPT',
          iconSrc: '/images/connected-process/full-process-map/goods-receipt.svg',
          iconWidth: 31,
          iconHeight: 34,
          x: 294,
          y: 147,
        },
        {
          id: 'supplier-invoice',
          streamId: 'purchasing',
          theme: 'blue',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.SUPPLIER_INVOICE',
          iconSrc: '/images/connected-process/full-process-map/supplier-invoice.svg',
          iconWidth: 27,
          iconHeight: 33,
          x: 534,
          y: 147,
        },
        {
          id: 'payment',
          streamId: 'purchasing',
          theme: 'blue',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.PAYMENT',
          iconSrc: '/images/connected-process/full-process-map/payment.svg',
          iconWidth: 36,
          iconHeight: 31,
          x: 774,
          y: 147,
        },
      ],
    },
    {
      id: 'manufacturing',
      titleKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.STREAMS.MANUFACTURING',
      nodes: [
        {
          id: 'bill-of-material',
          streamId: 'manufacturing',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.BILL_OF_MATERIAL',
          iconSrc: '/images/connected-process/full-process-map/bill-of-material.svg',
          iconWidth: 35,
          iconHeight: 33,
          x: 32,
          y: 234,
        },
        {
          id: 'planning',
          streamId: 'manufacturing',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.PLANNING',
          iconSrc: '/images/connected-process/full-process-map/planning.svg',
          iconWidth: 32,
          iconHeight: 32,
          x: 32,
          y: 299,
        },
        {
          id: 'manufacturing-order',
          streamId: 'manufacturing',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.MANUFACTURING_ORDER',
          iconSrc: '/images/connected-process/full-process-map/manufacturing-order.svg',
          iconWidth: 46,
          iconHeight: 39,
          x: 32,
          y: 364,
        },
        {
          id: 'manufacturing-process',
          streamId: 'manufacturing',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.MANUFACTURING_PROCESS',
          iconSrc: '/images/connected-process/full-process-map/manufacturing-process.svg',
          iconWidth: 33,
          iconHeight: 33,
          x: 32,
          y: 429,
        },
        {
          id: 'standard-costing',
          streamId: 'manufacturing',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.STANDARD_COSTING',
          iconSrc: '/images/connected-process/full-process-map/standard-costing.svg',
          iconWidth: 29,
          iconHeight: 32,
          x: 32,
          y: 494,
        },
        {
          id: 'manufacturing',
          streamId: 'manufacturing',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.MANUFACTURING',
          iconSrc: '/images/connected-process/full-process-map/manufacturing.svg',
          iconWidth: 35,
          iconHeight: 33,
          x: 254,
          y: 364,
        },
      ],
    },
    {
      id: 'general-ledger',
      titleKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.STREAMS.GENERAL_LEDGER',
      nodes: [
        {
          id: 'general-journal',
          streamId: 'general-ledger',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.GENERAL_JOURNAL',
          iconSrc: '/images/connected-process/full-process-map/general-journal.svg',
          iconWidth: 30,
          iconHeight: 33,
          x: 412,
          y: 274,
        },
        {
          id: 'general-ledger',
          streamId: 'general-ledger',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.GENERAL_LEDGER',
          iconSrc: '/images/connected-process/full-process-map/general-ledger.svg',
          iconWidth: 26,
          iconHeight: 33,
          x: 470,
          y: 364,
        },
        {
          id: 'adjustment',
          streamId: 'general-ledger',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.ADJUSTMENT',
          iconSrc: '/images/connected-process/full-process-map/adjustment.svg',
          iconWidth: 36,
          iconHeight: 33,
          x: 412,
          y: 454,
        },
        {
          id: 'trial-balance',
          streamId: 'general-ledger',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.TRIAL_BALANCE',
          iconSrc: '/images/connected-process/full-process-map/trial-balance.svg',
          iconWidth: 37,
          iconHeight: 28,
          x: 686,
          y: 364,
        },
        {
          id: 'cogs',
          streamId: 'general-ledger',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.COGS',
          iconSrc: '/images/connected-process/full-process-map/cogs.svg',
          iconWidth: 32,
          iconHeight: 36,
          x: 904,
          y: 248,
        },
        {
          id: 'profit-loss',
          streamId: 'general-ledger',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.PROFIT_LOSS',
          iconSrc: '/images/connected-process/full-process-map/profit-loss.svg',
          iconWidth: 27,
          iconHeight: 33,
          x: 904,
          y: 310,
        },
        {
          id: 'balance-sheet',
          streamId: 'general-ledger',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.BALANCE_SHEET',
          iconSrc: '/images/connected-process/full-process-map/customer-invoice-balance-sheet.svg',
          iconWidth: 29,
          iconHeight: 33,
          x: 904,
          y: 372,
        },
        {
          id: 'cash-flow',
          streamId: 'general-ledger',
          theme: 'teal',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.CASH_FLOW',
          iconSrc: '/images/connected-process/full-process-map/cash-flow.svg',
          iconWidth: 37,
          iconHeight: 33,
          x: 904,
          y: 434,
        },
      ],
    },
    {
      id: 'sales',
      titleKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.STREAMS.SALES',
      nodes: [
        {
          id: 'sales-order',
          streamId: 'sales',
          theme: 'red',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.SALES_ORDER',
          iconSrc: '/images/connected-process/full-process-map/sales-order.svg',
          iconWidth: 34,
          iconHeight: 32,
          x: 32,
          y: 574,
        },
        {
          id: 'packing-list',
          streamId: 'sales',
          theme: 'red',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.PACKING_LIST',
          iconSrc: '/images/connected-process/full-process-map/packing-list.svg',
          iconWidth: 39,
          iconHeight: 25,
          x: 294,
          y: 574,
        },
        {
          id: 'customer-invoice',
          streamId: 'sales',
          theme: 'red',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.CUSTOMER_INVOICE',
          iconSrc: '/images/connected-process/full-process-map/customer-invoice-balance-sheet.svg',
          iconWidth: 29,
          iconHeight: 33,
          x: 556,
          y: 574,
        },
        {
          id: 'receive',
          streamId: 'sales',
          theme: 'red',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.RECEIVE',
          iconSrc: '/images/connected-process/full-process-map/receive.svg',
          iconWidth: 39,
          iconHeight: 28,
          x: 818,
          y: 574,
        },
        {
          id: 'sales-quotation',
          streamId: 'sales',
          theme: 'red',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.SALES_QUOTATION',
          iconSrc: '/images/connected-process/full-process-map/sales-quotation.svg',
          iconWidth: 33,
          iconHeight: 33,
          x: 32,
          y: 656,
        },
        {
          id: 'return',
          streamId: 'sales',
          theme: 'red',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.RETURN',
          iconSrc: '/images/connected-process/full-process-map/return.svg',
          iconWidth: 37,
          iconHeight: 34,
          x: 294,
          y: 656,
        },
        {
          id: 'ar-credit-note',
          streamId: 'sales',
          theme: 'red',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.AR_CREDIT_NOTE',
          iconSrc: '/images/connected-process/full-process-map/ar-credit.svg',
          iconWidth: 30,
          iconHeight: 34,
          x: 556,
          y: 656,
        },
        {
          id: 'ar-statement',
          streamId: 'sales',
          theme: 'red',
          labelKey: 'CONNECTED_PROCESS.FULL_PROCESS_MAP.NODES.AR_STATEMENT',
          iconSrc: '/images/connected-process/full-process-map/ar-statement.svg',
          iconWidth: 33,
          iconHeight: 35,
          x: 818,
          y: 656,
        },
      ],
    },
  ];

  readonly connectors: readonly ProcessMapConnector[] = [
    // Purchasing Stream (10 Connectors - Blue)
    { id: 'pr-to-pq', theme: 'blue', markers: 'end', d: 'M 142 72 L 142 89' },
    { id: 'pq-to-po', theme: 'blue', markers: 'end', d: 'M 142 137 L 142 154' },
    { id: 'po-to-gr', theme: 'blue', markers: 'end', d: 'M 216 174 L 286 174' },
    { id: 'gr-to-pret', theme: 'blue', markers: 'end', d: 'M 398 147 L 398 106' },
    { id: 'pret-to-apdn', theme: 'blue', markers: 'end', d: 'M 478 80 L 526 80' },
    { id: 'apdn-to-aps', theme: 'blue', markers: 'end', d: 'M 718 76 L 824 76' },
    { id: 'gr-to-si', theme: 'blue', markers: 'end', d: 'M 478 169 L 526 169' },
    {
      id: 'si-bi-aps',
      theme: 'blue',
      markers: 'both',
      d: 'M 594 143 L 594 127 Q 594 122 599 122 L 769 122 Q 774 122 774 117 L 774 95 Q 774 90 779 90 L 824 90',
    },
    { id: 'si-to-pay', theme: 'blue', markers: 'end', d: 'M 718 169 L 766 169' },
    {
      id: 'pay-to-aps',
      theme: 'blue',
      markers: 'end',
      d: 'M 958 169 L 969 169 Q 974 169 974 164 L 974 106',
    },

    // Manufacturing & General Ledger Stream (15 Connectors - Teal)
    { id: 'gr-to-mfg', theme: 'teal', markers: 'end', d: 'M 362 191 L 362 360' },
    { id: 'pl-to-mfg', theme: 'teal', markers: 'end', d: 'M 362 574 L 362 412' },
    { id: 'mfg-bi-gl-top', theme: 'teal', markers: 'both', d: 'M 443 380 L 461 380' },
    { id: 'mfg-bi-gl-bot', theme: 'teal', markers: 'both', d: 'M 443 394 L 461 394' },
    { id: 'gj-to-gl', theme: 'teal', markers: 'end', d: 'M 526 318 L 526 360' },
    { id: 'adj-to-gl', theme: 'teal', markers: 'end', d: 'M 526 454 L 526 412' },
    { id: 'si-to-gl', theme: 'teal', markers: 'end', d: 'M 622 191 L 622 360' },
    {
      id: 'pay-to-gl',
      theme: 'teal',
      markers: 'end',
      d: 'M 886 191 L 886 217 Q 886 222 881 222 L 645 222 Q 640 222 640 227 L 640 360',
    },
    { id: 'ci-to-gl', theme: 'teal', markers: 'end', d: 'M 632 574 L 632 412' },
    { id: 'gl-to-tb', theme: 'teal', markers: 'end', d: 'M 654 386 L 678 386' },
    {
      id: 'tb-to-cogs',
      theme: 'teal',
      markers: 'end',
      d: 'M 816 364 L 816 275 Q 816 270 821 270 L 896 270',
    },
    {
      id: 'tb-to-pl',
      theme: 'teal',
      markers: 'end',
      d: 'M 844 364 L 844 337 Q 844 332 849 332 L 896 332',
    },
    { id: 'tb-to-bs', theme: 'teal', markers: 'end', d: 'M 870 394 L 896 394' },
    {
      id: 'tb-to-cf',
      theme: 'teal',
      markers: 'end',
      d: 'M 844 408 L 844 451 Q 844 456 849 456 L 896 456',
    },
    {
      id: 'rec-to-tb',
      theme: 'teal',
      markers: 'none',
      d: 'M 918 574 L 918 521 Q 918 516 913 516 L 821 516 Q 816 516 816 511 L 816 408',
    },

    // Sales Stream (9 Connectors - Red)
    { id: 'so-to-pl', theme: 'red', markers: 'end', d: 'M 216 596 L 286 596' },
    { id: 'sq-to-ret', theme: 'red', markers: 'end', d: 'M 216 678 L 286 678' },
    { id: 'pl-to-ret', theme: 'red', markers: 'end', d: 'M 402 618 L 402 652' },
    { id: 'pl-to-ci', theme: 'red', markers: 'end', d: 'M 478 596 L 548 596' },
    { id: 'ret-to-arcn', theme: 'red', markers: 'end', d: 'M 478 678 L 548 678' },
    { id: 'ci-to-rec', theme: 'red', markers: 'end', d: 'M 740 596 L 810 596' },
    {
      id: 'ci-bridge-rec',
      theme: 'red',
      markers: 'none',
      d: 'M 656 574 L 656 555 Q 656 550 661 550 L 895 550 Q 900 550 900 555 L 900 574',
    },
    {
      id: 'ci-to-ars',
      theme: 'red',
      markers: 'end',
      d: 'M 740 604 L 793 667 Q 796 670 800 670 L 810 670',
    },
    { id: 'arcn-to-ars', theme: 'red', markers: 'end', d: 'M 740 682 L 810 682' },
  ];

  readonly scrollViewport = viewChild<ElementRef<HTMLElement>>('scrollViewport');
  readonly isDragging = signal(false);
  private dragStartX = 0;
  private dragStartScrollLeft = 0;

  onPointerDown(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || event.button !== 0) {
      return;
    }
    const el = this.scrollViewport()?.nativeElement;
    if (!el || el.scrollWidth <= el.clientWidth) {
      return;
    }
    this.isDragging.set(true);
    this.dragStartX = event.clientX;
    this.dragStartScrollLeft = el.scrollLeft;
    el.setPointerCapture?.(event.pointerId);
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.isDragging()) {
      return;
    }
    const el = this.scrollViewport()?.nativeElement;
    if (!el) {
      return;
    }
    const deltaX = event.clientX - this.dragStartX;
    el.scrollLeft = this.dragStartScrollLeft - deltaX;
  }

  onPointerUp(event: PointerEvent): void {
    if (!this.isDragging()) {
      return;
    }
    this.isDragging.set(false);
    const el = this.scrollViewport()?.nativeElement;
    el?.releasePointerCapture?.(event.pointerId);
  }
}
