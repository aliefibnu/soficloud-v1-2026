import { Component } from '@angular/core';

export interface NavMenuItem {
  readonly id: string;
  readonly label: string;
  readonly active?: boolean;
}

export interface HighlightItem {
  readonly label: string;
  readonly value: string;
}

@Component({
  selector: 'app-ui-mockup',
  templateUrl: './ui-mockup.html',
  host: {
    class: 'relative block w-full text-left font-dm-sans',
  },
})
export class UiMockup {
  readonly navItems: readonly NavMenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', active: true },
    { id: 'procurement', label: 'Procurement' },
    { id: 'service', label: 'Service' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'mfg-planning', label: 'Manufacturing Planning' },
    { id: 'manufacturing', label: 'Manufacturing' },
    { id: 'sales', label: 'Sales' },
    { id: 'gl', label: 'General Ledger' },
    { id: 'ap', label: 'Account Payable' },
    { id: 'ar', label: 'Account Receivable' },
    { id: 'cash-bank', label: 'Cash & Bank' },
    { id: 'process', label: 'Process' },
    { id: 'report', label: 'Report' },
    { id: 'static-data', label: 'Static Data' },
    { id: 'miscellaneous', label: 'Miscellaneous' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'setting-fav', label: 'Setting Favorite Menu' },
    { id: 'upload-report', label: 'Upload Report Menu' },
    { id: 'manual-book', label: 'Manual Book' },
  ];

  readonly highlights: readonly HighlightItem[] = [
    { label: 'Outstanding Sales Orders', value: 'Rp 3,250,000,000.-' },
    { label: 'OPEX Budget vs Actual', value: 'Rp 2,800,000,000.-' },
    { label: 'Operating Cash Coverage', value: '2.4 months' },
    { label: 'Production Plan vs Actual', value: '12,500 (80.4%)' },
    { label: 'Orders at Risk', value: '5 orders' },
  ];
}
