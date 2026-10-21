import { Component, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { UiMockup } from './ui-mockup/ui-mockup';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, UiMockup, NgOptimizedImage],
  templateUrl: './hero.html',
  host: {
    class: 'relative block w-full overflow-hidden -mt-[77px] sm:mt-0',
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
    if (typeof document !== 'undefined') {
      const target = document.getElementById('features') || document.getElementById('why-choose-us');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
