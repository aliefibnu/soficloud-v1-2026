import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [NgOptimizedImage, TranslatePipe],
  selector: 'app-hero',
  templateUrl: './hero.html',
  styles: `
    @media (prefers-reduced-motion: reduce) {
      .hero-illustration,
      .hero-illustration * {
        transition-duration: 0.01ms !important;
      }
    }
  `,
  host: {
    class: 'block w-full',
  },
})
export class Hero {
  readonly heroBackground = 'linear-gradient(180deg, #FFEFED 0%, #FBCBC5 100%)';
  readonly badgeBackground = 'linear-gradient(90deg, #FFFFFF 0%, #EEF2F9 100%)';
}
