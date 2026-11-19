import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { listenWindowScrollRaf } from '../../../systems/lib/viewport-observer';

@Component({
  selector: 'app-scroll-to-top',
  imports: [TranslatePipe, NgOptimizedImage],
  templateUrl: './scroll-to-top.html',
  host: {
    class: 'contents',
  },
})
export class ScrollToTop {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isVisible = signal(false);

  constructor() {
    listenWindowScrollRaf(() => this.onWindowScroll());
  }

  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const next = scrollY > 300;
      if (next !== this.isVisible()) {
        this.isVisible.set(next);
      }
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
