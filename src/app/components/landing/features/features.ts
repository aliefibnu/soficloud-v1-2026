import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

export interface FeatureLayer {
  name: string;
  src: string;
  w: number;
  h: number;
  z: number;
  leftPct: number;
  topPct?: number;
  bottomPct?: number;
  widthPct: number;
  heightPct: number;
  hoverClass: string;
}

export interface FeatureCard {
  id: number;
  titleKey: string;
  descKey: string;
  topBg: string;
  domeBg: string;
  layers: FeatureLayer[];
}

@Component({
  selector: 'app-features',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './features.html',
  styles: `
    @media (prefers-reduced-motion: reduce) {
      .group,
      .group * {
        transition-duration: 0.01ms !important;
        transform: none !important;
      }
    }
  `,
  host: {
    class: 'block w-full',
  },
})
export class Features {
  readonly hoveredCard = signal<number | null>(null);

  readonly cards: FeatureCard[] = [
    {
      id: 1,
      titleKey: 'FEATURES.CARDS.FINANCIAL.TITLE',
      descKey: 'FEATURES.CARDS.FINANCIAL.DESC',
      topBg: 'linear-gradient(180deg, #FFEFED 0%, #FBCBC5 100%)',
      domeBg: '#FFDFDC',
      layers: [
        {
          name: 'Group 10124.svg',
          src: '/images/features/1/Group 10124.svg',
          w: 323,
          h: 501,
          z: 10,
          leftPct: 24,
          bottomPct: 0,
          widthPct: 48,
          heightPct: 98,
          hoverClass:
            'origin-bottom -rotate-[8.76deg] group-hover:-rotate-[5deg] group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9411.svg',
          src: '/images/features/1/Group 9411.svg',
          w: 272,
          h: 297,
          z: 20,
          leftPct: 20,
          topPct: 44,
          widthPct: 34,
          heightPct: 58,
          hoverClass:
            '-rotate-[8.76deg] group-hover:scale-105 group-hover:-rotate-12 group-hover:-translate-x-1',
        },
        {
          name: 'Group 9409.svg',
          src: '/images/features/1/Group 9409.svg',
          w: 152,
          h: 173,
          z: 25,
          leftPct: 56,
          bottomPct: 0,
          widthPct: 26,
          heightPct: 46,
          hoverClass:
            'origin-bottom -rotate-[8.76deg] group-hover:-rotate-[4deg] group-hover:translate-x-1 group-hover:scale-105',
        },
      ],
    },
    {
      id: 2,
      titleKey: 'FEATURES.CARDS.SALES.TITLE',
      descKey: 'FEATURES.CARDS.SALES.DESC',
      topBg: 'linear-gradient(180deg, #EDF3FB 0%, #C3D7F7 100%)',
      domeBg: '#EBF2FD',
      layers: [
        {
          name: 'Group 10127.svg',
          src: '/images/features/2/Group 10127.svg',
          w: 331,
          h: 509,
          z: 15,
          leftPct: 20,
          bottomPct: 0,
          widthPct: 58,
          heightPct: 98,
          hoverClass:
            'origin-bottom rotate-[2.13deg] group-hover:rotate-[4deg] group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9638.svg',
          src: '/images/features/2/Group 9638.svg',
          w: 208,
          h: 197,
          z: 20,
          leftPct: 10,
          topPct: 36,
          widthPct: 28,
          heightPct: 46,
          hoverClass:
            'rotate-[2.13deg] group-hover:rotate-45 group-hover:-translate-x-1.5 group-hover:scale-105',
        },
        {
          name: 'Group 10126.svg',
          src: '/images/features/2/Group 10126.svg',
          w: 300,
          h: 165,
          z: 20,
          leftPct: 48,
          bottomPct: 0,
          widthPct: 46,
          heightPct: 36,
          hoverClass:
            'origin-bottom rotate-[2.13deg] group-hover:translate-x-1.5 group-hover:scale-105',
        },
      ],
    },
    {
      id: 3,
      titleKey: 'FEATURES.CARDS.PROCUREMENT.TITLE',
      descKey: 'FEATURES.CARDS.PROCUREMENT.DESC',
      topBg: 'linear-gradient(180deg, #DBE9E9 0%, #C9DEDE 100%)',
      domeBg: '#EDF4F4',
      layers: [
        {
          name: 'Group 10129.svg',
          src: '/images/features/3/Group 10129.svg',
          w: 643,
          h: 481,
          z: 10,
          leftPct: 9,
          bottomPct: 0,
          widthPct: 84,
          heightPct: 98,
          hoverClass:
            'origin-bottom rotate-[2.87deg] group-hover:rotate-[5deg] group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9639.svg',
          src: '/images/features/3/Group 9639.svg',
          w: 305,
          h: 195,
          z: 20,
          leftPct: 62,
          topPct: 22,
          widthPct: 36,
          heightPct: 40,
          hoverClass:
            'rotate-[2.87deg] group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:rotate-6 group-hover:scale-105',
        },
        {
          name: 'Group 9641.svg',
          src: '/images/features/3/Group 9641.svg',
          w: 197,
          h: 126,
          z: 20,
          leftPct: 8,
          topPct: 62,
          widthPct: 25,
          heightPct: 28,
          hoverClass:
            'rotate-[2.87deg] group-hover:-translate-x-2 group-hover:translate-y-1.5 group-hover:scale-105',
        },
      ],
    },
    {
      id: 4,
      titleKey: 'FEATURES.CARDS.INVENTORY.TITLE',
      descKey: 'FEATURES.CARDS.INVENTORY.DESC',
      topBg: 'linear-gradient(166.99deg, #DEFCFC -7.22%, #1EEBEB 140.68%)',
      domeBg: '#C2FAFA',
      layers: [
        {
          name: 'Group 9642.svg',
          src: '/images/features/4/Group 9642.svg',
          w: 183,
          h: 311,
          z: 10,
          leftPct: 10,
          bottomPct: 0,
          widthPct: 30,
          heightPct: 82,
          hoverClass:
            'origin-bottom rotate-[2.38deg] group-hover:-translate-x-1.5 group-hover:scale-105',
        },
        {
          name: 'Group 9416.svg',
          src: '/images/features/4/Group 9416.svg',
          w: 392,
          h: 551,
          z: 15,
          leftPct: 26,
          bottomPct: 0,
          widthPct: 56,
          heightPct: 98,
          hoverClass:
            'origin-bottom rotate-[2.38deg] group-hover:rotate-[4.5deg] group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9417.svg',
          src: '/images/features/4/Group 9417.svg',
          w: 234,
          h: 193,
          z: 25,
          leftPct: 64,
          topPct: 26,
          widthPct: 30,
          heightPct: 54,
          hoverClass:
            'rotate-[2.38deg] group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:rotate-6 group-hover:scale-110',
        },
      ],
    },
    {
      id: 5,
      titleKey: 'FEATURES.CARDS.MANUFACTURING.TITLE',
      descKey: 'FEATURES.CARDS.MANUFACTURING.DESC',
      topBg: 'linear-gradient(180deg, #FDF1F1 -5.61%, #F7BABB 111.68%)',
      domeBg: '#FBDADB',
      layers: [
        {
          name: 'Group 9643.svg',
          src: '/images/features/5/Group 9643.svg',
          w: 609,
          h: 476,
          z: 10,
          leftPct: 12,
          bottomPct: 0,
          widthPct: 74,
          heightPct: 96,
          hoverClass:
            'origin-bottom -rotate-[1.63deg] group-hover:-rotate-[3deg] group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9644.svg',
          src: '/images/features/5/Group 9644.svg',
          w: 328,
          h: 134,
          z: 20,
          leftPct: 41,
          topPct: 44,
          widthPct: 38,
          heightPct: 28,
          hoverClass:
            '-rotate-[1.63deg] group-hover:translate-x-2 group-hover:scale-105',
        },
        {
          name: 'Group 9645.svg',
          src: '/images/features/5/Group 9645.svg',
          w: 217,
          h: 217,
          z: 25,
          leftPct: 48,
          topPct: 0,
          widthPct: 26,
          heightPct: 44,
          hoverClass:
            '-rotate-[1.63deg] group-hover:rotate-45 group-hover:scale-105',
        },
        {
          name: 'Group 9646.svg',
          src: '/images/features/5/Group 9646.svg',
          w: 121,
          h: 121,
          z: 20,
          leftPct: 65,
          topPct: 14,
          widthPct: 15,
          heightPct: 25,
          hoverClass:
            '-rotate-[1.63deg] group-hover:-rotate-45 group-hover:scale-105',
        },
      ],
    },
    {
      id: 6,
      titleKey: 'FEATURES.CARDS.PROJECT.TITLE',
      descKey: 'FEATURES.CARDS.PROJECT.DESC',
      topBg: 'linear-gradient(163.31deg, #D7E4FA 5.52%, #72A0ED 134.92%)',
      domeBg: '#DBE7FA',
      layers: [
        {
          name: 'Group 10135.svg',
          src: '/images/features/6/Group 10135.svg',
          w: 275,
          h: 384,
          z: 10,
          leftPct: 5,
          bottomPct: 0,
          widthPct: 44,
          heightPct: 98,
          hoverClass:
            'origin-bottom -rotate-[2.69deg] group-hover:-translate-x-1.5 group-hover:scale-105',
        },
        {
          name: 'Group 10134.svg',
          src: '/images/features/6/Group 10134.svg',
          w: 451,
          h: 276,
          z: 15,
          leftPct: 24,
          bottomPct: 0,
          widthPct: 58,
          heightPct: 66,
          hoverClass:
            'origin-bottom -rotate-[2.69deg] group-hover:-rotate-[1deg] group-hover:scale-105 group-hover:brightness-105',
        },
        {
          name: 'Group 10133.svg',
          src: '/images/features/6/Group 10133.svg',
          w: 183,
          h: 183,
          z: 20,
          leftPct: 72,
          bottomPct: 0,
          widthPct: 26,
          heightPct: 46,
          hoverClass:
            'origin-bottom -rotate-[2.69deg] group-hover:translate-x-1.5 group-hover:scale-110',
        },
      ],
    },
    {
      id: 7,
      titleKey: 'FEATURES.CARDS.WORKFLOW.TITLE',
      descKey: 'FEATURES.CARDS.WORKFLOW.DESC',
      topBg: 'linear-gradient(163.31deg, #D7E4FA 5.52%, #828AC9 134.92%)',
      domeBg: '#DBE7FA',
      layers: [
        {
          name: 'Group 10137.svg',
          src: '/images/features/7/Group 10137.svg',
          w: 588,
          h: 434,
          z: 10,
          leftPct: 14,
          bottomPct: 0,
          widthPct: 76,
          heightPct: 96,
          hoverClass:
            'origin-bottom rotate-[2.50deg] group-hover:rotate-[4deg] group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9458.svg',
          src: '/images/features/7/Group 9458.svg',
          w: 144,
          h: 144,
          z: 20,
          leftPct: 7,
          topPct: 14,
          widthPct: 20,
          heightPct: 34,
          hoverClass:
            'rotate-[2.50deg] group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:scale-110',
        },
        {
          name: 'Group 9419.svg',
          src: '/images/features/7/Group 9419.svg',
          w: 318,
          h: 274,
          z: 25,
          leftPct: 66,
          topPct: 2,
          widthPct: 30,
          heightPct: 62,
          hoverClass:
            'group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:-rotate-6 group-hover:scale-105',
        },
        {
          name: 'Group 9420.svg',
          src: '/images/features/7/Group 9420.svg',
          w: 157,
          h: 145,
          z: 20,
          leftPct: 72,
          bottomPct: 0,
          widthPct: 21,
          heightPct: 32,
          hoverClass:
            'origin-bottom rotate-[2.50deg] group-hover:translate-x-1.5 group-hover:scale-105',
        },
      ],
    },
    {
      id: 8,
      titleKey: 'FEATURES.CARDS.ANALYTICS.TITLE',
      descKey: 'FEATURES.CARDS.ANALYTICS.DESC',
      topBg: 'linear-gradient(179.52deg, #DBE9E9 -22.27%, #A1E8E8 130.9%)',
      domeBg: '#D9F7F7',
      layers: [
        {
          name: 'Group 10140.svg',
          src: '/images/features/8/Group 10140.svg',
          w: 565,
          h: 403,
          z: 10,
          leftPct: 6,
          bottomPct: 0,
          widthPct: 80,
          heightPct: 96,
          hoverClass:
            'origin-bottom -rotate-[2.89deg] group-hover:-rotate-[5deg] group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9434.svg',
          src: '/images/features/8/Group 9434.svg',
          w: 115,
          h: 345,
          z: 20,
          leftPct: 5,
          bottomPct: 0,
          widthPct: 8,
          heightPct: 88,
          hoverClass:
            'origin-bottom rotate-[2deg] group-hover:-translate-x-1 group-hover:scale-105',
        },
        {
          name: 'Group 9651.svg',
          src: '/images/features/8/Group 9651.svg',
          w: 223,
          h: 143,
          z: 20,
          leftPct: 60,
          topPct: 32,
          widthPct: 32,
          heightPct: 36,
          hoverClass:
            '-rotate-[2.89deg] group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-105',
        },
        {
          name: 'Group 10139.svg',
          src: '/images/features/8/Group 10139.svg',
          w: 104,
          h: 104,
          z: 25,
          leftPct: 80,
          topPct: 45,
          widthPct: 16,
          heightPct: 28,
          hoverClass: '-rotate-[2.89deg] group-hover:scale-115',
        },
      ],
    },
    {
      id: 9,
      titleKey: 'FEATURES.CARDS.SECURITY.TITLE',
      descKey: 'FEATURES.CARDS.SECURITY.DESC',
      topBg: 'linear-gradient(171.95deg, #FAD1D1 -11.18%, #F7ADAC 121.85%)',
      domeBg: '#FFDAD6',
      layers: [
        {
          name: 'Group 10143.svg',
          src: '/images/features/9/Group 10143.svg',
          w: 608,
          h: 463,
          z: 10,
          leftPct: 16,
          bottomPct: 0,
          widthPct: 78,
          heightPct: 96,
          hoverClass:
            'origin-bottom rotate-[2.15deg] group-hover:rotate-[4deg] group-hover:scale-[1.02]',
        },
        {
          name: 'Group 10142.svg',
          src: '/images/features/9/Group 10142.svg',
          w: 253,
          h: 276,
          z: 25,
          leftPct: 2,
          topPct: 34,
          widthPct: 33,
          heightPct: 64,
          hoverClass:
            'rotate-[2.15deg] group-hover:-translate-x-1.5 group-hover:scale-105 group-hover:rotate-[5deg]',
        },
        {
          name: 'Group 9459.svg',
          src: '/images/features/9/Group 9459.svg',
          w: 262,
          h: 79,
          z: 20,
          leftPct: 66,
          topPct: 18,
          widthPct: 33,
          heightPct: 19,
          hoverClass:
            'rotate-[2.15deg] group-hover:translate-x-2 group-hover:-translate-y-1.5 group-hover:scale-105',
        },
      ],
    },
  ];

  setHoveredCard(id: number | null): void {
    this.hoveredCard.set(id);
  }
}
