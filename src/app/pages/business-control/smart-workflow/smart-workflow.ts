import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Hero } from '../../../components/business-control/smart-workflow/hero/hero';
import {
  ProcessTab,
  ProcessTabs,
} from '../../../components/business-control/shared/process-tabs/process-tabs';
import { Capabilities } from '../../../components/business-control/smart-workflow/sections/capabilities/capabilities';
import { ExploreViews } from '../../../components/business-control/smart-workflow/sections/explore-views/explore-views';
import { StatusAndFlow } from '../../../components/business-control/smart-workflow/sections/status-and-flow/status-and-flow';
import { Subfooter } from '../../../components/business-control/smart-workflow/subfooter/subfooter';

@Component({
  imports: [
    Hero,
    ProcessTabs,
    Capabilities,
    ExploreViews,
    StatusAndFlow,
    Subfooter,
  ],
  selector: 'app-smart-workflow',
  templateUrl: './smart-workflow.html',
})
export class SmartWorkflow implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  readonly tabs: readonly ProcessTab[] = [
    {
      id: 'kapabilitas',
      titleKey: 'SMART_WORKFLOW.PROCESS_TABS.KAPABILITAS',
      defaultTitle: 'KAPABILITAS',
    },
    {
      id: 'jelajahi-tampilan',
      titleKey: 'SMART_WORKFLOW.PROCESS_TABS.JELAJAHI_TAMPILAN',
      defaultTitle: 'JELAJAHI TAMPILAN',
    },
    {
      id: 'status-dan-alur',
      titleKey: 'SMART_WORKFLOW.PROCESS_TABS.STATUS_DAN_ALUR',
      defaultTitle: 'STATUS DAN ALUR',
    },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }
}
