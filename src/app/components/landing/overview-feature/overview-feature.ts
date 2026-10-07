import { Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../systems/lib/language.service';

@Component({
  selector: 'app-overview-feature',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './overview-feature.html',
  styles: `
    @keyframes ring-zoom-fade {
      0% {
        transform: scale(0.5);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      55% {
        opacity: 1;
      }
      80% {
        opacity: 0.45;
      }
      100% {
        transform: scale(1.15);
        opacity: 0;
      }
    }

    @keyframes floating-card-left {
      0%,
      100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(7px) rotate(-0.5deg);
      }
    }

    @keyframes floating-card-right {
      0%,
      100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-7px) rotate(0.5deg);
      }
    }

    @keyframes pulse-ring {
      0%,
      100% {
        opacity: 0.95;
      }
      50% {
        opacity: 1;
        filter: drop-shadow(0 0 6px rgba(29, 68, 235, 0.4));
      }
    }

    .glow-core {
      background: radial-gradient(
        circle closest-side,
        rgba(124, 176, 247, 0) 0%,
        rgba(124, 176, 247, 0) 40%,
        rgba(124, 176, 247, 0.9) 52%,
        rgba(168, 201, 249, 0) 62%
      );
    }

    .glow-ring {
      --ring-duration: 8.4s;
      opacity: 0;
      background: radial-gradient(
        circle closest-side,
        rgba(124, 176, 247, 0) 0%,
        rgba(124, 176, 247, 0) 70%,
        rgba(118, 172, 246, 0.95) 81%,
        rgba(140, 187, 248, 0.8) 92%,
        rgba(160, 198, 249, 0.5) 98%,
        rgba(168, 201, 249, 0) 100%
      );
      animation: ring-zoom-fade var(--ring-duration) linear infinite;
      animation-delay: calc(var(--i) * var(--ring-duration) / -4);
    }

    .animate-floating-card-left {
      animation: floating-card-left 5s ease-in-out infinite 0.5s;
    }

    .animate-floating-card-right {
      animation: floating-card-right 5.5s ease-in-out infinite 1.2s;
    }

    .animate-pulse-ring {
      animation: pulse-ring 3s ease-in-out infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-floating-card-left,
      .animate-floating-card-right,
      .animate-pulse-ring {
        animation: none !important;
        transform: none !important;
      }

      .glow-ring {
        animation: none;
        opacity: 0.6;
        transform: scale(calc(0.55 + var(--i) * 0.15));
      }
    }
  `,
  host: {
    class: 'block w-full',
  },
})
export class OverviewFeature {
  protected readonly languageService = inject(LanguageService);

  protected readonly rings = [0, 1, 2, 3];
}
