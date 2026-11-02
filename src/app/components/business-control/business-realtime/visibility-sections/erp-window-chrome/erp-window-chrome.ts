import { Component, input, signal, OnDestroy } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export type ErpModuleType =
  | 'procurement'
  | 'sales'
  | 'mrp'
  | 'finance'
  | 'order-pipeline';

export interface ErpSidebarItem {
  readonly id: ErpModuleType;
  readonly labelKey: string;
  readonly defaultLabel: string;
}

@Component({
  selector: 'app-erp-window-chrome',
  imports: [TranslatePipe],
  templateUrl: './erp-window-chrome.html',
  host: {
    '(document:click)': 'onDocumentClick()',
    '(document:keydown.escape)': 'closeAllDropdowns()',
  },
})
export class ErpWindowChrome implements OnDestroy {
  private static readonly instances = new Set<ErpWindowChrome>();

  readonly activeModule = input<ErpModuleType>('sales');
  readonly moduleTitle = input.required<string>();
  readonly showStatusPills = input<boolean>(true);

  readonly avatarInitial = input<string>('A');
  readonly profileNameKey = input<string>(
    'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.PROFILE.NAME',
  );
  readonly profileRoleKey = input<string>(
    'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.PROFILE.ROLE',
  );
  readonly profileStatusKey = input<string>(
    'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.PROFILE.STATUS',
  );
  readonly profileBadgeKey = input<string>(
    'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.PROFILE.BADGE',
  );
  readonly profileAriaKey = input<string>(
    'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.PROFILE.ARIA',
  );

  readonly isProfileOpen = signal<boolean>(false);

  readonly sidebarItems: readonly ErpSidebarItem[] = [
    {
      id: 'procurement',
      labelKey:
        'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.SIDEBAR.PROCUREMENT',
      defaultLabel: 'Procurement',
    },
    {
      id: 'sales',
      labelKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.SIDEBAR.SALES',
      defaultLabel: 'Sales',
    },
    {
      id: 'mrp',
      labelKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.SIDEBAR.MRP',
      defaultLabel: 'MRP',
    },
    {
      id: 'finance',
      labelKey: 'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.SIDEBAR.FINANCE',
      defaultLabel: 'Finance',
    },
    {
      id: 'order-pipeline',
      labelKey:
        'BUSINESS_REALTIME.VISIBILITY_SECTIONS.COMMON.SIDEBAR.ORDER_PIPELINE',
      defaultLabel: 'Order Pipeline',
    },
  ];

  constructor() {
    ErpWindowChrome.instances.add(this);
  }

  ngOnDestroy(): void {
    ErpWindowChrome.instances.delete(this);
  }

  toggleProfile(event?: Event): void {
    event?.stopPropagation();
    const nextState = !this.isProfileOpen();
    for (const instance of ErpWindowChrome.instances) {
      instance.closeAllDropdowns();
    }
    this.isProfileOpen.set(nextState);
  }

  closeAllDropdowns(): void {
    this.isProfileOpen.set(false);
  }

  onDocumentClick(): void {
    this.closeAllDropdowns();
  }
}
