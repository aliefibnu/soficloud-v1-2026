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

    @keyframes floating-bubble-left {
      0%,
      100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-8px) rotate(-0.6deg);
      }
    }

    @keyframes floating-bubble-right {
      0%,
      100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(7px) rotate(0.6deg);
      }
    }

    .animate-hero-ring-spin {
      animation: hero-ring-spin 28s linear infinite;
      transform-origin: center center;
      will-change: transform;
    }

    .animate-hero-bubble-left {
      animation: floating-bubble-left 5.5s ease-in-out infinite 0.2s;
    }

    .animate-hero-bubble-right {
      animation: floating-bubble-right 6s ease-in-out infinite 0.8s;
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-hero-ring-spin,
      .animate-hero-bubble-left,
      .animate-hero-bubble-right {
        animation: none !important;
        transform: none !important;
      }
    }
  `,
  host: {
    class: 'block w-full pb-6 sm:pb-8',
  },
})
export class ScheduleDemoHero {}
