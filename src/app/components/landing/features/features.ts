  import { Component, signal } from '@angular/core';
  import { NgOptimizedImage } from '@angular/common';
  import { TranslatePipe } from '@ngx-translate/core';

  export interface FeatureLayer {
    name: string;
    src: string;
    w: number;
    h: number;
    z: number;
    leftPct?: number;
    topPct?: number;
    bottomPct?: number;
    widthPct?: number;
    heightPct?: number;
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
            name: 'Group 10284.svg',
            src: '/images/features/1/Group 10284.svg',
            w: 383,
            h: 521,
            z: 10,
            leftPct: 24,
            bottomPct: -13,
            widthPct: 43,
            heightPct: 108,
            hoverClass:
              'origin-bottom group-hover:scale-[1.02]',
          },
          {
            name: 'Group 9410.svg',
            src: '/images/features/1/Group 9410.svg',
            w: 312,
            h: 332,
            z: 20,
            leftPct: 13,
            bottomPct: -26,
            widthPct: 42,
            heightPct: 82,
            hoverClass:
              'origin-bottom group-hover:scale-105 group-hover:-rotate-3 group-hover:-translate-x-1',
          },
          {
            name: 'Group 9409.svg',
            src: '/images/features/1/Group 9409.svg',
            w: 174,
            h: 191,
            z: 25,
            leftPct: 54,
            bottomPct: -15,
            widthPct: 30,
            heightPct: 60,
            hoverClass:
              'origin-bottom group-hover:scale-105 group-hover:rotate-3 group-hover:translate-x-1',
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
            name: 'Group 10279.svg',
            src: '/images/features/2/Group 10279.svg',
            w: 352,
            h: 527,
            z: 10,
            leftPct: 33,
            bottomPct: -12,
            widthPct: 39,
            heightPct: 109,
            hoverClass:
              'origin-bottom group-hover:scale-[1.02]',
          },
          {
            name: 'Group 10277.svg',
            src: '/images/features/2/Group 10277.svg',
            w: 157,
            h: 158,
            z: 20,
            leftPct: 22,
            topPct: 55,
            widthPct: 18,
            heightPct: 33,
            hoverClass:
              'group-hover:rotate-15 group-hover:-translate-x-1 group-hover:scale-105',
          },
          {
            name: 'Group 10276.svg',
            src: '/images/features/2/Group 10276.svg',
            w: 102,
            h: 102,
            z: 25,
            leftPct: 19,
            topPct: 39,
            widthPct: 11,
            heightPct: 21,
            hoverClass:
              'group-hover:-rotate-60 group-hover:scale-110',
          },
          {
            name: 'Group 10275.svg',
            src: '/images/features/2/Group 10275.svg',
            w: 308,
            h: 173,
            z: 20,
            leftPct: 54,
            bottomPct: -14,
            widthPct: 35,
            heightPct: 36,
            hoverClass:
              'origin-bottom group-hover:translate-x-1.5 group-hover:scale-105',
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
            name: 'Group 10263.svg',
            src: '/images/features/3/Group 10263.svg',
            w: 640,
            h: 455,
            z: 10,
            leftPct: 12,
            bottomPct: -9,
            widthPct: 72,
            heightPct: 94,
            hoverClass:
              'origin-bottom group-hover:scale-[1.02]',
          },
          {
            name: 'Group 9639.svg',
            src: '/images/features/3/Group 9639.svg',
            w: 284,
            h: 190,
            z: 20,
            leftPct: 63,
            topPct: 28,
            widthPct: 32,
            heightPct: 39,
            hoverClass:
              'group-hover:translate-x-2 group-hover:rotate-3 group-hover:scale-105',
          },
          {
            name: 'Group 9641.svg',
            src: '/images/features/3/Group 9641.svg',
            w: 183,
            h: 123,
            z: 20,
            leftPct: 11,
            topPct: 63,
            widthPct: 20,
            heightPct: 25,
            hoverClass:
              'group-hover:-translate-x-1.5 group-hover:scale-105',
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
            name: 'Group 10269.svg',
            src: '/images/features/4/Group 10269.svg',
            w: 220,
            h: 355,
            z: 10,
            leftPct: 14,
            bottomPct: -3,
            widthPct: 24,
            heightPct: 72,
            hoverClass:
              'origin-bottom group-hover:-translate-x-1.5 group-hover:scale-105',
          },
          {
            name: 'Group 9416.svg',
            src: '/images/features/4/Group 9416.svg',
            w: 461,
            h: 630,
            z: 15,
            leftPct: 30,
            bottomPct: -32,
            widthPct: 52,
            heightPct: 130,
            hoverClass:
              'origin-bottom group-hover:scale-[1.02]',
          },
          {
            name: 'Group 9417.svg',
            src: '/images/features/4/Group 9417.svg',
            w: 260,
            h: 209,
            z: 25,
            leftPct: 63,
            topPct: 43,
            widthPct: 29,
            heightPct: 43,
            hoverClass:
              'group-hover:translate-x-1.5 group-hover:rotate-6 group-hover:scale-105',
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
            w: 581,
            h: 461,
            z: 10,
            leftPct: 17,
            bottomPct: -2,
            widthPct: 66,
            heightPct: 96,
            hoverClass:
              'origin-bottom group-hover:scale-[1.02]',
          },
          {
            name: 'Group 9644.svg',
            src: '/images/features/5/Group 9644.svg',
            w: 311,
            h: 134,
            z: 20,
            leftPct: 44,
            topPct: 47,
            widthPct: 33,
            heightPct: 26,
            hoverClass:
              'group-hover:translate-x-2 group-hover:scale-105',
          },
          {
            name: 'Group 9645.svg',
            src: '/images/features/5/Group 9645.svg',
            w: 209,
            h: 209,
            z: 25,
            leftPct: 46,
            topPct: 2,
            widthPct: 23,
            heightPct: 43,
            hoverClass:
              'group-hover:rotate-45 group-hover:scale-105',
          },
          {
            name: 'Group 9646.svg',
            src: '/images/features/5/Group 9646.svg',
            w: 116,
            h: 116,
            z: 20,
            leftPct: 63,
            topPct: 19,
            widthPct: 13,
            heightPct: 24,
            hoverClass:
              'group-hover:-rotate-45 group-hover:scale-105',
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
            name: 'Group 9649.svg',
            src: '/images/features/6/Group 9649.svg',
            w: 347,
            h: 471,
            z: 10,
            leftPct: 7,
            bottomPct: -7,
            widthPct: 39,
            heightPct: 98,
            hoverClass:
              'origin-bottom group-hover:-translate-x-1 group-hover:scale-[1.02]',
          },
          {
            name: 'Group 10248.svg',
            src: '/images/features/6/Group 10248.svg',
            w: 537,
            h: 504,
            z: 15,
            leftPct: 27,
            bottomPct: -43,
            widthPct: 53,
            heightPct: 92,
            hoverClass:
              'origin-bottom group-hover:scale-105 group-hover:brightness-105',
          },
          {
            name: 'Group 9430.svg',
            src: '/images/features/6/Group 9430.svg',
            w: 228,
            h: 228,
            z: 20,
            leftPct: 73,
            bottomPct: -18,
            widthPct: 26,
            heightPct: 48,
            hoverClass:
              'origin-bottom group-hover:translate-x-1 group-hover:scale-110',
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
            name: 'Group 10258.svg',
            src: '/images/features/7/Group 10258.svg',
            w: 608,
            h: 464,
            z: 10,
            leftPct: 17,
            bottomPct: -8,
            widthPct: 68,
            heightPct: 96,
            hoverClass:
              'origin-bottom group-hover:scale-[1.02]',
          },
          {
            name: 'Group 9419.svg',
            src: '/images/features/7/Group 9419.svg',
            w: 320,
            h: 270,
            z: 25,
            leftPct: 62,
            topPct: 9,
            widthPct: 36,
            heightPct: 57,
            hoverClass:
              'group-hover:translate-x-1 group-hover:scale-110',
          },
          {
            name: 'Group 9458.svg',
            src: '/images/features/7/Group 9458.svg',
            w: 152,
            h: 152,
            z: 20,
            leftPct: 10,
            topPct: 21,
            widthPct: 17,
            heightPct: 31,
            hoverClass:
              'group-hover:-translate-x-1 group-hover:-rotate-6 group-hover:scale-105',
          },
          {
            name: 'Group 9420.svg',
            src: '/images/features/7/Group 9420.svg',
            w: 165,
            h: 153,
            z: 20,
            leftPct: 71,
            bottomPct: -13,
            widthPct: 18,
            heightPct: 31,
            hoverClass:
              'origin-bottom group-hover:translate-x-1 group-hover:scale-105',
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
            name: 'Group 10254.svg',
            src: '/images/features/8/Group 10254.svg',
            w: 631,
            h: 466,
            z: 10,
            leftPct: 10,
            bottomPct: -8,
            widthPct: 71,
            heightPct: 97,
            hoverClass:
              'origin-bottom group-hover:scale-[1.02]',
          },
          {
            name: 'Group 10253.svg',
            src: '/images/features/8/Group 10253.svg',
            w: 118,
            h: 118,
            z: 25,
            leftPct: 83,
            topPct: 52,
            widthPct: 14,
            heightPct: 26,
            hoverClass:
              'group-hover:translate-x-1 group-hover:scale-110',
          },
          {
            name: 'Group 9434.svg',
            src: '/images/features/8/Group 9434.svg',
            w: 366,
            h: 384,
            z: 20,
            leftPct: -11,
            bottomPct: -7,
            widthPct: 43,
            heightPct: 83,
            hoverClass:
              'origin-bottom group-hover:-translate-x-1 group-hover:scale-105',
          },
          {
            name: 'Group 9651.svg',
            src: '/images/features/8/Group 9651.svg',
            w: 248,
            h: 166,
            z: 20,
            leftPct: 64,
            topPct: 39,
            widthPct: 28,
            heightPct: 34,
            hoverClass:
              'group-hover:scale-110',
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
            name: 'Group 10247.svg',
            src: '/images/features/9/Group 10247.svg',
            w: 587,
            h: 453,
            z: 10,
            leftPct: 22,
            bottomPct: -11,
            widthPct: 66,
            heightPct: 94,
            hoverClass:
              'origin-bottom group-hover:scale-[1.02]',
          },
          {
            name: 'Group 10244.svg',
            src: '/images/features/9/Group 10244.svg',
            w: 249,
            h: 270,
            z: 25,
            leftPct: 4,
            topPct: 39,
            widthPct: 28,
            heightPct: 56,
            hoverClass:
              'group-hover:-translate-x-1 group-hover:scale-105',
          },
          {
            name: 'Group 10246.svg',
            src: '/images/features/9/Group 10246.svg',
            w: 250,
            h: 77,
            z: 20,
            leftPct: 69,
            topPct: 27,
            widthPct: 28,
            heightPct: 16,
            hoverClass:
              'group-hover:translate-x-1.5 group-hover:scale-105',
          },
        ],
      },
    ];

    setHoveredCard(id: number | null): void {
      this.hoveredCard.set(id);
    }
  } 