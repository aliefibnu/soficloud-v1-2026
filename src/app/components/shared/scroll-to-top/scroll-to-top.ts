import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-scroll-to-top',
  imports: [TranslatePipe],
  templateUrl: './scroll-to-top.html',
  host: {
    class: 'contents',
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class ScrollToTop {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isVisible = signal(false);

  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      this.isVisible.set(scrollY > 300);
    }
  }

  scrollToHero(): void {
    if (isPlatformBrowser(this.platformId)) {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
}
