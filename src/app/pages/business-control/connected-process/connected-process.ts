import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Hero } from '../../../components/business-control//connected-process/hero/hero';
import {
  ProcessTab,
  ProcessTabs,
} from '../../../components/business-control/shared/process-tabs/process-tabs';
import { SatuData } from '../../../components/business-control//connected-process/sections/satu-data/satu-data';
import { TransactionFlow } from '../../../components/business-control//connected-process/sections/transaction-flow/transaction-flow';
import { AccountingImpact } from '../../../components/business-control//connected-process/sections/accounting-impact/accounting-impact';
import { RoleReports } from '../../../components/business-control//connected-process/sections/role-reports/role-reports';
import { FullProcessMap } from '../../../components/business-control//connected-process/sections/full-process-map/full-process-map';
import { Subfooter } from '../../../components/business-control//connected-process/subfooter/subfooter';

@Component({
  imports: [
    Hero,
    ProcessTabs,
    SatuData,
    TransactionFlow,
    AccountingImpact,
    RoleReports,
    FullProcessMap,
    Subfooter,
  ],
  selector: 'app-connected-process',
  templateUrl: './connected-process.html',
})
export class ConnectedProcess implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  readonly tabs: readonly ProcessTab[] = [
    {
      id: 'satu-data',
      titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.SATU_DATA',
      defaultTitle: 'SATU DATA',
    },
    {
      id: 'alur-transaksi',
      titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.ALUR_TRANSAKSI',
      defaultTitle: 'ALUR TRANSAKSI',
    },
    {
      id: 'dampak-akuntansi',
      titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.DAMPAK_AKUNTANSI',
      defaultTitle: 'DAMPAK AKUNTANSI',
    },
    {
      id: 'laporan',
      titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.LAPORAN',
      defaultTitle: 'LAPORAN',
    },
    {
      id: 'peta-lengkap',
      titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.PETA_LENGKAP',
      defaultTitle: 'PETA LENGKAP',
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }
}
