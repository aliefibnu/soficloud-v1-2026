import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';

export interface CapabilityItem {
  readonly id: string;
  readonly number: string;
  readonly iconSrc: string;
  readonly iconWidth: number;
  readonly iconHeight: number;
  readonly iconOffsetClass?: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
}

@Component({
  selector: 'app-capabilities',
  imports: [ProcessSectionShell, TranslatePipe, NgOptimizedImage],
  templateUrl: './capabilities.html',
})
export class Capabilities {
  readonly capabilities: readonly CapabilityItem[] = [
    {
      id: 'role-access',
      number: '01',
      iconSrc: '/images/smart-workflow/capability/1.svg',
      iconWidth: 46,
      iconHeight: 56,
      iconOffsetClass: '-translate-y-[1px]',
      titleKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_1.TITLE',
      descriptionKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_1.DESCRIPTION',
    },
    {
      id: 'status-amount-control',
      number: '02',
      iconSrc: '/images/smart-workflow/capability/2.svg',
      iconWidth: 41,
      iconHeight: 55,
      iconOffsetClass: '-translate-y-[1px]',
      titleKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_2.TITLE',
      descriptionKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_2.DESCRIPTION',
    },
    {
      id: 'tiered-approval',
      number: '03',
      iconSrc: '/images/smart-workflow/capability/3.svg',
      iconWidth: 56,
      iconHeight: 43,
      titleKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_3.TITLE',
      descriptionKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_3.DESCRIPTION',
    },
    {
      id: 'approval-tracking',
      number: '04',
      iconSrc: '/images/smart-workflow/capability/4.svg',
      iconWidth: 44,
      iconHeight: 52,
      iconOffsetClass: '-translate-x-[1px] translate-y-[1px]',
      titleKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_4.TITLE',
      descriptionKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_4.DESCRIPTION',
    },
    {
      id: 'approval-history',
      number: '05',
      iconSrc: '/images/smart-workflow/capability/5.svg',
      iconWidth: 56,
      iconHeight: 56,
      iconOffsetClass: 'translate-x-[3px]',
      titleKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_5.TITLE',
      descriptionKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_5.DESCRIPTION',
    },
    {
      id: 'email-whatsapp-notifications',
      number: '06',
      iconSrc: '/images/smart-workflow/capability/6.svg',
      iconWidth: 65,
      iconHeight: 44,
      iconOffsetClass: 'translate-x-[3px] -translate-y-[2px]',
      titleKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_6.TITLE',
      descriptionKey: 'SMART_WORKFLOW.CAPABILITIES.CARDS.CARD_6.DESCRIPTION',
    },
  ];
}
