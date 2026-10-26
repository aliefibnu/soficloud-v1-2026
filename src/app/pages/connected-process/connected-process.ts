import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Hero } from '../../components/connected-process/hero/hero';
import { ProcessTabs } from '../../components/connected-process/process-tabs/process-tabs';
import { SatuData } from '../../components/connected-process/sections/satu-data/satu-data';
import { TransactionFlow } from '../../components/connected-process/sections/transaction-flow/transaction-flow';
import { RoleReports } from '../../components/connected-process/sections/role-reports/role-reports';
import { Subfooter } from '../../components/connected-process/subfooter/subfooter';

@Component({
  imports: [Hero, ProcessTabs, SatuData, TransactionFlow, RoleReports, Subfooter],
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
