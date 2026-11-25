import { Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../../systems/lib/language.service';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './hero.html',
  styles: `
    @keyframes ring-zoom-fade {
      0% {
        transform: scale(0.18);
        opacity: 1;
        z-index: 8;
      }
      14.29% {
        transform: scale(0.31);
        opacity: 1;
        z-index: 7;
      }
      28.57% {
        transform: scale(0.44);
        opacity: 1;
        z-index: 6;
      }
      42.86% {
        transform: scale(0.57);
        opacity: 1;
        z-index: 5;
      }
      57.14% {
        transform: scale(0.71);
        opacity: 1;
        z-index: 4;
      }
      71.43% {
        transform: scale(0.84);
        opacity: 1;
        z-index: 3;
      }
      85.71% {
        transform: scale(0.97);
        opacity: 1;
        z-index: 2;
      }
      100% {
        transform: scale(1.1);
        opacity: 0;
        z-index: 1;
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

    .glow-core {
      position: absolute;
      z-index: 10;
      transform: scale(0.2);
      background: linear-gradient(135deg, #eaf2ff 0%, #d0e4fc 100%);
      box-shadow: 0 0 16px rgba(12, 45, 130, 0.4), 0 3px 10px rgba(12, 45, 130, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.6);
    }

    .glow-ring {
      --ring-duration: 8.4s;
      position: absolute;
      box-sizing: border-box;
      border-radius: 9999px;
      background: linear-gradient(135deg, #9ec8fa 0%, #82b5f7 100%);
      box-shadow: 0 0 16px rgba(12, 45, 130, 0.38), 0 3px 10px rgba(12, 45, 130, 0.22);
      border: 1px solid rgba(220, 238, 255, 0.4);
      animation: ring-zoom-fade var(--ring-duration) linear infinite;
      animation-delay: calc(var(--i) * var(--ring-duration) / -7);
    }

    .animate-floating-card-left {
      animation: floating-card-left 5s ease-in-out infinite 0.5s;
    }

    .animate-floating-card-right {
      animation: floating-card-right 5.5s ease-in-out infinite 1.2s;
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-floating-card-left,
      .animate-floating-card-right {
        animation: none !important;
        transform: none !important;
      }

      .glow-ring {
        animation: none;
        opacity: 1;
        transform: scale(calc(0.31 + var(--i) * 0.13));
        z-index: calc(8 - var(--i));
      }
    }
  `,
  host: {
    class: 'block w-full',
  },
})
export class Hero {
  protected readonly languageService = inject(LanguageService);
  protected readonly translate = inject(TranslateService);

  protected readonly rings = [0, 1, 2, 3, 4, 5, 6];

  protected readonly titleLine1 = computed(() => {
    const key = 'RECOGNIZE_SOFI.HERO.TITLE_LINE_1';
    const val = this.translate.instant(key);
    if (val && val !== key) {
      return val;
    }
    return this.languageService.currentLanguage() === 'en' ? 'Getting to Know' : 'Mengenal';
  });

  protected readonly titleLine2 = computed(() => {
    const key = 'RECOGNIZE_SOFI.HERO.TITLE_LINE_2';
    const val = this.translate.instant(key);
    if (val && val !== key) {
      return val;
    }
    return 'SofiCloud';
  });

  protected readonly titleLine3 = computed(() => {
    const key = 'RECOGNIZE_SOFI.HERO.TITLE_LINE_3';
    const val = this.translate.instant(key);
    if (val && val !== key) {
      return val;
    }
    return this.languageService.currentLanguage() === 'en' ? 'More Closely' : 'Lebih Dekat';
  });

  protected readonly description = computed(() => {
    const key = 'RECOGNIZE_SOFI.HERO.DESCRIPTION';
    const val = this.translate.instant(key);
    if (val && val !== key) {
      return val;
    }
    return this.languageService.currentLanguage() === 'en'
      ? 'Get to know SofiCloud as a technology solution that helps companies manage business processes in a more integrated, efficient, and structured manner.'
      : 'Kenali SofiCloud sebagai solusi teknologi yang membantu perusahaan mengelola proses bisnis secara lebih terintegrasi, efisien, dan terstruktur.';
  });
}
