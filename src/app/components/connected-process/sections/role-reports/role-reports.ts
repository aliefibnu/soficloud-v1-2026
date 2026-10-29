import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';

export interface RoleReportTier {
  readonly id: 'operational' | 'financial' | 'management';
  readonly number: string;
  readonly pillGradientClass: string;
  readonly pillGradient: string;
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
      pillGradientClass: 'bg-[linear-gradient(180deg,#EDF3FB_0%,#C3D7F7_100%)] from-[#EDF3FB] to-[#C3D7F7]',
      pillGradient: 'linear-gradient(180deg, #EDF3FB 0%, #C3D7F7 100%)',
      titleKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.OPERATIONAL.TITLE',
      subtitleKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.OPERATIONAL.SUBTITLE',
      descriptionKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.OPERATIONAL.DESCRIPTION',
      tagsKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.OPERATIONAL.TAGS',
    },
    {
      id: 'financial',
      number: '02',
      pillGradientClass: 'bg-[linear-gradient(180deg,#FFEFED_0%,#FBCBC5_100%)] from-[#FFEFED] to-[#FBCBC5]',
      pillGradient: 'linear-gradient(180deg, #FFEFED 0%, #FBCBC5 100%)',
      titleKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.FINANCIAL.TITLE',
      subtitleKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.FINANCIAL.SUBTITLE',
      descriptionKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.FINANCIAL.DESCRIPTION',
      tagsKey: 'CONNECTED_PROCESS.ROLE_REPORTS.TIERS.FINANCIAL.TAGS',
    },
    {
      id: 'management',
      number: '03',
      pillGradientClass: 'bg-[linear-gradient(0deg,#10BFC1_0%,#C0E7E7_98.58%)] from-[#10BFC1] to-[#C0E7E7]',
      pillGradient: 'linear-gradient(0deg, #10BFC1 0%, #C0E7E7 98.58%)',
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
