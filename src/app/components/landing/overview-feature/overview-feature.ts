import { Component, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../systems/lib/language.service';

@Component({
  selector: 'app-overview-feature',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './overview-feature.html',
  styles: `
    @keyframes floating-monitor {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
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

    .animate-floating-monitor {
      animation: floating-monitor 6s ease-in-out infinite;
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
      .animate-floating-monitor,
      .animate-floating-card-left,
      .animate-floating-card-right,
      .animate-pulse-ring {
        animation: none !important;
        transform: none !important;
      }
    }
  `,
  host: {
    class: 'block w-full',
  },
})
export class OverviewFeature {
  protected readonly languageService = inject(LanguageService);

  readonly hoveredCard = signal<string | null>(null);

  setHoveredCard(card: string | null): void {
    this.hoveredCard.set(card);
  }
}
