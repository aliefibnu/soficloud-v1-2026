import { Component, computed, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';

export type TransactionCycleId = 'O2C' | 'P2P' | 'P2PR';

export interface TransactionCycle {
  readonly id: TransactionCycleId;
  readonly nameKey: string;
  readonly subtitleKey: string;
}

export interface TransactionStep {
  readonly id: string;
  readonly stepNumber: number;
  readonly icon?: string;
  readonly imageSrc?: string;
  readonly imageWidth?: number;
  readonly imageHeight?: number;
  readonly titleKey: string;
  readonly descKey: string;
}

@Component({
  selector: 'app-transaction-flow',
  imports: [ProcessSectionShell, TranslatePipe, NgOptimizedImage],
  templateUrl: './transaction-flow.html',
})
export class TransactionFlow {
  readonly selectedCycle = signal<TransactionCycleId>('O2C');

  readonly cycles: readonly TransactionCycle[] = [
    {
      id: 'O2C',
      nameKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.CYCLES.O2C.NAME',
      subtitleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.CYCLES.O2C.SUBTITLE',
    },
    {
      id: 'P2P',
      nameKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.CYCLES.P2P.NAME',
      subtitleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.CYCLES.P2P.SUBTITLE',
    },
    {
      id: 'P2PR',
      nameKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.CYCLES.P2PR.NAME',
      subtitleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.CYCLES.P2PR.SUBTITLE',
    },
  ];

  private readonly stepsMap: Record<TransactionCycleId, readonly TransactionStep[]> = {
    O2C: [
      {
        id: 'sales-quotation',
        stepNumber: 1,
        imageSrc: '/images/connected-process/transaction-flow/quotation.svg',
        imageWidth: 32,
        imageHeight: 32,
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.O2C.STEP_1.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.O2C.STEP_1.DESC',
      },
      {
        id: 'sales-order',
        stepNumber: 2,
        imageSrc: '/images/connected-process/transaction-flow/sales.svg',
        imageWidth: 38,
        imageHeight: 35,
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.O2C.STEP_2.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.O2C.STEP_2.DESC',
      },
      {
        id: 'delivery-order',
        stepNumber: 3,
        imageSrc: '/images/connected-process/transaction-flow/delivery.svg',
        imageWidth: 42,
        imageHeight: 26,
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.O2C.STEP_3.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.O2C.STEP_3.DESC',
      },
      {
        id: 'customer-invoice',
        stepNumber: 4,
        imageSrc: '/images/connected-process/transaction-flow/invoice.svg',
        imageWidth: 33,
        imageHeight: 37,
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.O2C.STEP_4.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.O2C.STEP_4.DESC',
      },
      {
        id: 'receipt',
        stepNumber: 5,
        imageSrc: '/images/connected-process/transaction-flow/receipt.svg',
        imageWidth: 35,
        imageHeight: 37,
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.O2C.STEP_5.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.O2C.STEP_5.DESC',
      },
    ],
    P2P: [
      {
        id: 'purchase-requisition',
        stepNumber: 1,
        icon: 'requisition',
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2P.STEP_1.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2P.STEP_1.DESC',
      },
      {
        id: 'purchase-order',
        stepNumber: 2,
        icon: 'cart-order',
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2P.STEP_2.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2P.STEP_2.DESC',
      },
      {
        id: 'goods-receipt',
        stepNumber: 3,
        icon: 'goods-receipt',
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2P.STEP_3.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2P.STEP_3.DESC',
      },
      {
        id: 'supplier-invoice',
        stepNumber: 4,
        icon: 'supplier-invoice',
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2P.STEP_4.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2P.STEP_4.DESC',
      },
      {
        id: 'payment',
        stepNumber: 5,
        icon: 'payment',
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2P.STEP_5.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2P.STEP_5.DESC',
      },
    ],
    P2PR: [
      {
        id: 'bom-routing',
        stepNumber: 1,
        icon: 'bom-routing',
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2PR.STEP_1.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2PR.STEP_1.DESC',
      },
      {
        id: 'production-planning',
        stepNumber: 2,
        icon: 'production-planning',
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2PR.STEP_2.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2PR.STEP_2.DESC',
      },
      {
        id: 'manufacturing-order',
        stepNumber: 3,
        icon: 'manufacturing-order',
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2PR.STEP_3.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2PR.STEP_3.DESC',
      },
      {
        id: 'manufacturing-process',
        stepNumber: 4,
        icon: 'manufacturing-process',
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2PR.STEP_4.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2PR.STEP_4.DESC',
      },
      {
        id: 'standard-costing',
        stepNumber: 5,
        icon: 'standard-costing',
        titleKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2PR.STEP_5.TITLE',
        descKey: 'CONNECTED_PROCESS.TRANSACTION_FLOW.STEPS.P2PR.STEP_5.DESC',
      },
    ],
  };

  readonly currentSteps = computed<readonly TransactionStep[]>(() => {
    return this.stepsMap[this.selectedCycle()] ?? this.stepsMap.O2C;
  });

  readonly calloutTitleKey = 'CONNECTED_PROCESS.TRANSACTION_FLOW.CALLOUT.TITLE';

  readonly calloutTagsKey = computed<string>(() => {
    return `CONNECTED_PROCESS.TRANSACTION_FLOW.CALLOUT.CYCLES.${this.selectedCycle()}.TAGS`;
  });

  readonly calloutDisclaimerKey = computed<string>(() => {
    return `CONNECTED_PROCESS.TRANSACTION_FLOW.CALLOUT.CYCLES.${this.selectedCycle()}.DISCLAIMER`;
  });

  selectCycle(cycle: TransactionCycleId): void {
    this.selectedCycle.set(cycle);
  }

  onTabKeydown(event: KeyboardEvent, currentIndex: number): void {
    let nextIndex: number | null = null;
    const total = this.cycles.length;

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
      const targetCycle = this.cycles[nextIndex];
      if (targetCycle) {
        this.selectCycle(targetCycle.id);
        if (typeof document !== 'undefined') {
          const btn = document.getElementById(`tab-cycle-${targetCycle.id}`);
          btn?.focus();
        }
      }
    }
  }
}
