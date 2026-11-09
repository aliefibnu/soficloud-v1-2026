import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-demo',
  imports: [TranslatePipe],
  templateUrl: './schedule-demo.html',
  host: {
    class: 'block min-h-screen bg-linear-to-b from-[#eaf2ff] via-[#f3f7fd] to-white',
  },
})
export class ScheduleDemo implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && !window.location.hash) {
      window.scrollTo(0, 0);
    }
  }
}
