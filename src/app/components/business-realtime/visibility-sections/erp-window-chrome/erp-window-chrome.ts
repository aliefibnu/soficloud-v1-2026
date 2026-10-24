import { Component, input } from '@angular/core';
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
})
export class ErpWindowChrome {
  readonly activeModule = input<ErpModuleType>('sales');
  readonly moduleTitle = input.required<string>();

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
}
