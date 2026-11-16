import { Component, computed, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';

/** Supported shelf tab identifiers in the Explore the Look section. */
export type ExploreLookTabId =
  | 'kewenangan'
  | 'status-approval'
  | 'riwayat'
  | 'notifikasi';

/** Metadata for a shelf tab in the Explore the Look section. */
export interface ExploreLookTab {
  readonly id: ExploreLookTabId;
  readonly nameKey: string;
  readonly subtitleKey: string;
}

/** Read-only context field displayed at the top of the Permission Strategy preview. */
export interface AccessContextField {
  readonly id: string;
  readonly labelKey: string;
  readonly valueKey: string;
}

/** Static permission checkbox item displayed inside the Permission Strategy preview. */
export interface PermissionFlag {
  readonly id: string;
  readonly labelKey: string;
  readonly checked: boolean;
}

/** Key-value nominal amount range row displayed in the Permission Strategy preview. */
export interface AmountLimitRow {
  readonly id: string;
  readonly labelKey: string;
  readonly valueKey: string;
}

/**
 * Interactive tabbed preview section for Smart Workflow ("Jelajahi Tampilan"),
 * showcasing role-based permission strategy and upcoming workflow stage views.
 */
@Component({
  selector: 'app-explore-the-look',
  imports: [ProcessSectionShell, TranslatePipe],
  templateUrl: './explore-the-look.html',
})
export class ExploreTheLook {
  readonly selectedTab = signal<ExploreLookTabId>('kewenangan');

  readonly tabs: readonly ExploreLookTab[] = [
    {
      id: 'kewenangan',
      nameKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.TABS.KEWENANGAN.NAME',
      subtitleKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.TABS.KEWENANGAN.SUBTITLE',
    },
    {
      id: 'status-approval',
      nameKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.TABS.STATUS_APPROVAL.NAME',
      subtitleKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.TABS.STATUS_APPROVAL.SUBTITLE',
    },
    {
      id: 'riwayat',
      nameKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.TABS.RIWAYAT.NAME',
      subtitleKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.TABS.RIWAYAT.SUBTITLE',
    },
    {
      id: 'notifikasi',
      nameKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.TABS.NOTIFIKASI.NAME',
      subtitleKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.TABS.NOTIFIKASI.SUBTITLE',
    },
  ];

  readonly placeholderTabs = computed<readonly ExploreLookTab[]>(() =>
    this.tabs.filter((tab) => tab.id !== 'kewenangan'),
  );

  readonly contextFields: readonly AccessContextField[] = [
    {
      id: 'access-group',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.CONTEXT.ACCESS_GROUP.LABEL',
      valueKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.CONTEXT.ACCESS_GROUP.VALUE',
    },
    {
      id: 'access-category',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.CONTEXT.ACCESS_CATEGORY.LABEL',
      valueKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.CONTEXT.ACCESS_CATEGORY.VALUE',
    },
    {
      id: 'access-item',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.CONTEXT.ACCESS_ITEM.LABEL',
      valueKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.CONTEXT.ACCESS_ITEM.VALUE',
    },
  ];

  readonly formEntryPermissions: readonly PermissionFlag[] = [
    {
      id: 'read',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.FORM_ENTRY.ITEMS.READ',
      checked: true,
    },
    {
      id: 'add',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.FORM_ENTRY.ITEMS.ADD',
      checked: true,
    },
    {
      id: 'edit',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.FORM_ENTRY.ITEMS.EDIT',
      checked: true,
    },
    {
      id: 'delete',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.FORM_ENTRY.ITEMS.DELETE',
      checked: false,
    },
    {
      id: 'print',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.FORM_ENTRY.ITEMS.PRINT',
      checked: true,
    },
    {
      id: 'export',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.FORM_ENTRY.ITEMS.EXPORT',
      checked: true,
    },
  ];

  readonly statusChangePermissions: readonly PermissionFlag[] = [
    {
      id: 'entry-confirm',
      labelKey:
        'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.STATUS_CHANGE.ITEMS.ENTRY_CONFIRM',
      checked: true,
    },
    {
      id: 'run-revise',
      labelKey:
        'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.STATUS_CHANGE.ITEMS.RUN_REVISE',
      checked: true,
    },
    {
      id: 'entry-verify',
      labelKey:
        'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.STATUS_CHANGE.ITEMS.ENTRY_VERIFY',
      checked: false,
    },
    {
      id: 'run-cancel',
      labelKey:
        'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.STATUS_CHANGE.ITEMS.RUN_CANCEL',
      checked: false,
    },
  ];

  readonly amountLimits: readonly AmountLimitRow[] = [
    {
      id: 'amount-from',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.AMOUNT_RANGE.FROM_LABEL',
      valueKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.AMOUNT_RANGE.FROM_VALUE',
    },
    {
      id: 'amount-to',
      labelKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.AMOUNT_RANGE.TO_LABEL',
      valueKey: 'SMART_WORKFLOW.EXPLORE_THE_LOOK.PERMISSION_STRATEGY.AMOUNT_RANGE.TO_VALUE',
    },
  ];

  /** Selects a workflow look tab and keeps it visible in horizontal scroll containers. */
  selectTab(tabId: ExploreLookTabId): void {
    this.selectedTab.set(tabId);
    if (typeof document !== 'undefined') {
      const btn = document.getElementById(`tab-look-${tabId}`);
      btn?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
    }
  }

  /** Handles WAI-ARIA horizontal tablist keyboard navigation (Arrow, Home, End). */
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
          const btn = document.getElementById(`tab-look-${targetTab.id}`);
          btn?.focus();
        }
      }
    }
  }
}
