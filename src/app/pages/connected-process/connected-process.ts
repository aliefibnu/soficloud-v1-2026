import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Hero } from '../../components/connected-process/hero/hero';
import { ProcessTabs } from '../../components/connected-process/process-tabs/process-tabs';
import { Subfooter } from '../../components/connected-process/subfooter/subfooter';

@Component({
  imports: [Hero, ProcessTabs, Subfooter],
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
