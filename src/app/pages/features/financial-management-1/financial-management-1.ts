import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Hero } from '../../../components/features/financial-management-1/hero/hero';
import {
  FeatureTab,
  SectionTabs,
} from '../../../components/features/financial-management-1/section-tabs/section-tabs';
import { ExpenseAndAdvance } from '../../../components/features/financial-management-1/sections/expense-and-advance/expense-and-advance';
import { FinancialControl } from '../../../components/features/financial-management-1/sections/financial-control/financial-control';
import { RealDashboard } from '../../../components/features/financial-management-1/sections/real-dashboard/real-dashboard';
import { TenCapabilities } from '../../../components/features/financial-management-1/sections/ten-capabilities/ten-capabilities';

@Component({
  imports: [
    Hero,
    SectionTabs,
    FinancialControl,
    TenCapabilities,
    ExpenseAndAdvance,
    RealDashboard,
    TranslatePipe,
  ],
  selector: 'app-financial-management-1',
  templateUrl: './financial-management-1.html',
})
export class FinancialManagement1 implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  readonly tabs: readonly FeatureTab[] = [
    {
      id: 'financial-control',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TABS.FINANCIAL_CONTROL',
      defaultTitle: 'FINANCIAL CONTROL',
    },
    {
      id: 'capabilities',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TABS.TEN_CAPABILITIES',
      defaultTitle: '10 CAPABILITIES',
    },
    {
      id: 'expense-advance',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TABS.EXPENSE_ADVANCE',
      defaultTitle: 'EXPENSE & ADVANCE',
    },
    {
      id: 'reporting',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TABS.REPORTING',
      defaultTitle: 'REPORTING',
    },
    {
      id: 'integration',
      titleKey: 'FINANCIAL_MANAGEMENT_1.TABS.INTEGRATION',
      defaultTitle: 'INTEGRATION',
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }
}
