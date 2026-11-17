import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-schedule-demo-hero',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './hero.html',
  styles: `
    @keyframes hero-ring-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    .animate-hero-ring-spin {
      animation: hero-ring-spin 28s linear infinite;
      transform-origin: center center;
      will-change: transform;
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-hero-ring-spin {
        animation: none;
      }
    }
  `,
  host: {
    class: 'block w-full pb-6 sm:pb-8',
  },
})
export class ScheduleDemoHero {}
