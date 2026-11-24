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
        transform: translateY(-12px) rotate(-1.5deg);
      }
    }

    @keyframes floating-bubble-right {
      0%,
      100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(10px) rotate(1.2deg);
      }
    }

    @keyframes hero-bell-ring {
      0%,
      100% {
        transform: rotate(0deg);
      }
      18% {
        transform: rotate(-15deg);
      }
      36% {
        transform: rotate(14deg);
      }
      54% {
        transform: rotate(-9deg);
      }
      72% {
        transform: rotate(6deg);
      }
      88% {
        transform: rotate(-2deg);
      }
    }

    .animate-hero-ring-spin {
      animation: hero-ring-spin 28s linear infinite;
      transform-origin: center center;
      will-change: transform;
    }

    .animate-hero-bubble-left {
      animation: floating-bubble-left 4.2s ease-in-out infinite 0.2s;
    }

    .animate-hero-bubble-right {
      animation: floating-bubble-right 4.8s ease-in-out infinite 0.6s;
    }

    .animate-hero-bell-ring {
      animation: hero-bell-ring 2.2s ease-in-out infinite;
      transform-origin: 64% 12%;
      will-change: transform;
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-hero-ring-spin,
      .animate-hero-bubble-left,
      .animate-hero-bubble-right,
      .animate-hero-bell-ring {
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
