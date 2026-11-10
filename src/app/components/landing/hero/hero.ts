import { Component, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { UiMockup } from './ui-mockup/ui-mockup';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, UiMockup, NgOptimizedImage],
  templateUrl: './hero.html',
  host: {
    class: 'relative block w-full overflow-hidden -mt-[67px] sm:-mt-[73px] md:-mt-[77px]',
  },
})
export class Hero {
  readonly contactClick = output<void>();
  readonly videoClick = output<void>();
  readonly aboutClick = output<void>();

  onContact(): void {
    this.contactClick.emit();
  }

  onWatchVideo(): void {
    this.videoClick.emit();
  }

  onAbout(): void {
    this.aboutClick.emit();
    this.contactClick.emit();
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      const target = document.getElementById('features') || document.getElementById('why-choose-us');
      if (target) {
        const header = document.querySelector('app-navbar header');
        const navHeight = header ? header.getBoundingClientRect().height : 88;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
        if (window.history?.pushState) {
          window.history.pushState(null, '', '#features');
        }
      }
    }
  }
}
