import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';

export interface RoleReportTier {
  readonly id: 'operational' | 'financial' | 'management';
  readonly number: string;
  readonly pillGradientClass: string;
  readonly titleKey: string;
  readonly subtitleKey: string;
  readonly descriptionKey: string;
  readonly tagsKey: string;
}

@Component({
  selector: 'app-role-reports',
  imports: [ProcessSectionShell, TranslatePipe],
  templateUrl: './role-reports.html',
})
export class RoleReports {
  readonly tiers: readonly RoleReportTier[] = [
    {
      id: 'operational',
      number: '01',
      pillGradientClass: 'bg-gradient-to-b from-[#EAF1FB] to-[#C4D8F7]',
      titleKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.OPERATIONAL.TITLE',
      subtitleKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.OPERATIONAL.SUBTITLE',
      descriptionKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.OPERATIONAL.DESCRIPTION',
      tagsKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.OPERATIONAL.TAGS',
    },
    {
      id: 'financial',
      number: '02',
      pillGradientClass: 'bg-gradient-to-b from-[#FEEBEA] to-[#FCCFC9]',
      titleKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.FINANCIAL.TITLE',
      subtitleKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.FINANCIAL.SUBTITLE',
      descriptionKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.FINANCIAL.DESCRIPTION',
      tagsKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.FINANCIAL.TAGS',
    },
    {
      id: 'management',
      number: '03',
      pillGradientClass: 'bg-gradient-to-b from-[#B9E5E5] to-[#20C2C5]',
      titleKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.MANAGEMENT.TITLE',
      subtitleKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.MANAGEMENT.SUBTITLE',
      descriptionKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.MANAGEMENT.DESCRIPTION',
      tagsKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.MANAGEMENT.TAGS',
    },
  ];

  asArray(val: unknown): string[] {
    return Array.isArray(val) ? (val as string[]) : [];
  }
}
