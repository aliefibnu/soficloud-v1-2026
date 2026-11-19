import { Component, inject, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
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
  private readonly router = inject(Router);

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
    void this.router.navigate(['/recognize-sofi']);
  }
}
