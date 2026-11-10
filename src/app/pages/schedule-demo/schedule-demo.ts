import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ScheduleDemoHero } from '../../components/schedule-demo/hero/hero';
import { ScheduleDemoCompanyInfo } from '../../components/schedule-demo/company-info/company-info';
import { ScheduleDemoForm } from '../../components/schedule-demo/form/form';
import { ScheduleDemoMap } from '../../components/schedule-demo/map/map';

@Component({
  selector: 'app-schedule-demo',
  imports: [
    ScheduleDemoHero,
    ScheduleDemoCompanyInfo,
    ScheduleDemoForm,
    ScheduleDemoMap,
  ],
  templateUrl: './schedule-demo.html',
  host: {
    class: 'block min-h-screen bg-linear-to-b from-[#eaf2ff] via-[#f3f7fd] to-white',
  },
})
export class ScheduleDemo implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      } else {
        const targetId = window.location.hash.replace(/^#/, '');
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    }
  }
}
