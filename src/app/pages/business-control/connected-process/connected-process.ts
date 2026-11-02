import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Hero } from '../../../components/business-control//connected-process/hero/hero';
import { ProcessTabs } from '../../../components/business-control//connected-process/process-tabs/process-tabs';
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

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }
}
