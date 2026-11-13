import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Hero } from '../../../components/business-control/smart-workflow/hero/hero';

@Component({
  imports: [Hero],
  selector: 'app-smart-workflow',
  templateUrl: './smart-workflow.html',
})
export class SmartWorkflow implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }
}
