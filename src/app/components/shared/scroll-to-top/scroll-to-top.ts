import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-scroll-to-top',
  imports: [TranslatePipe, NgOptimizedImage],
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
      // If business-control handles smooth 900ms cubic easeInOut navigation via document click,
      // avoid firing native scrollIntoView which causes conflicting browser scroll animations.
      const hasBusinessControl =
        typeof document !== 'undefined' && !!document.querySelector('app-business-control');
      if (!hasBusinessControl) {
        if (heroEl) {
          heroEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  }
}
