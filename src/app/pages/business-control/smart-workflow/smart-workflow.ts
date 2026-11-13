import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Hero } from '../../../components/business-control/smart-workflow/hero/hero';
import {
  ProcessTab,
  ProcessTabs,
} from '../../../components/business-control/shared/process-tabs/process-tabs';
import { WorkflowSection1 } from '../../../components/business-control/smart-workflow/sections/workflow-section-1/workflow-section-1';
import { WorkflowSection2 } from '../../../components/business-control/smart-workflow/sections/workflow-section-2/workflow-section-2';
import { WorkflowSection3 } from '../../../components/business-control/smart-workflow/sections/workflow-section-3/workflow-section-3';
import { Subfooter } from '../../../components/business-control/smart-workflow/subfooter/subfooter';

@Component({
  imports: [
    Hero,
    ProcessTabs,
    WorkflowSection1,
    WorkflowSection2,
    WorkflowSection3,
    Subfooter,
  ],
  selector: 'app-smart-workflow',
  templateUrl: './smart-workflow.html',
})
export class SmartWorkflow implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  readonly tabs: readonly ProcessTab[] = [
    { id: 'workflow-section-1', defaultTitle: 'SECTION 1' },
    { id: 'workflow-section-2', defaultTitle: 'SECTION 2' },
    { id: 'workflow-section-3', defaultTitle: 'SECTION 3' },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }
}
