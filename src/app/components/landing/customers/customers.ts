import {
  Component,
  signal,
  computed,
  inject,
  DestroyRef,
  OnInit,
  viewChild,
  ElementRef,
  PLATFORM_ID,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { observeHostViewport } from '../../../systems/lib/viewport-observer';

export type LogoAspect = 'ultra-wide' | 'wide' | 'standard' | 'square';

export interface CustomerCompany {
  id: number;
  name: string;
  logo: string;
  width: number;
  height: number;
  aspect?: LogoAspect;
}

export interface ClonedCustomerCompany extends CustomerCompany {
  virtualIdx: number;
}

export interface VisibleTopCard {
  offset: number;
  customerIndex: number;
  customer: CustomerCompany;
  isActive: boolean;
}

export const TOP_CUSTOMERS: CustomerCompany[] = [
  { id: 1, name: 'PT. Madeira Threads Indonesia', logo: '/images/landing/customers/customer-3.svg', width: 1678, height: 560, aspect: 'wide' },
  { id: 2, name: 'PT. VMC Fishing Tackle Indonesia', logo: '/images/landing/customers/customer-10.svg', width: 790, height: 805, aspect: 'square' },
  { id: 3, name: 'PT. Sanipak Indonesia', logo: '/images/landing/customers/customer-4.svg', width: 1619, height: 569, aspect: 'wide' },
  { id: 4, name: 'PT Rajawali Sakti Utama', logo: '/images/landing/customers/customer-2.svg', width: 1362, height: 856, aspect: 'standard' },
  { id: 5, name: 'PT. Agro Sarimas Indonesia', logo: '/images/landing/customers/customer-21.svg', width: 1029, height: 900, aspect: 'square' },
  { id: 6, name: 'PT. Fanindo Cipta Propertindo', logo: '/images/landing/customers/customer-5.svg', width: 1000, height: 616, aspect: 'standard' },
  { id: 7, name: 'PT. Suntech Plastics Industries Batam', logo: '/images/landing/customers/customer-16.webp', width: 1273, height: 810, aspect: 'standard' },
  { id: 8, name: 'PT. Bumi Sarimas Indonesia', logo: '/images/landing/customers/customer43.webp', width: 115, height: 117, aspect: 'square' },
  { id: 9, name: 'PT. Inhil Sarimas Kelapa', logo: '/images/landing/customers/customer46.webp', width: 125, height: 119, aspect: 'square' },
  { id: 10, name: 'PT. Adhya Tirta Lampung', logo: '/images/landing/customers/customer36.webp', width: 589, height: 276, aspect: 'standard' },
];

export const BOTTOM_ROW_1: CustomerCompany[] = [
  { id: 11, name: 'PT. Kubota Indonesia', logo: '/images/landing/customers/customer50.webp', width: 1253, height: 266, aspect: 'wide' },
  { id: 12, name: 'PT. Inhil Sarimas Kelapa', logo: '/images/landing/customers/customer46.webp', width: 125, height: 119, aspect: 'square' },
  { id: 13, name: 'PT. Adhya Tirta Lampung', logo: '/images/landing/customers/customer36.webp', width: 589, height: 276, aspect: 'standard' },
  { id: 14, name: 'PT. Bumi Sarimas Indonesia', logo: '/images/landing/customers/customer43.webp', width: 115, height: 117, aspect: 'square' },
  { id: 15, name: 'PT. Katsuyama Finetech Indonesia', logo: '/images/landing/customers/customer-1.svg', width: 1156, height: 624, aspect: 'standard' },
  { id: 16, name: 'PT. ASL Shipyard Indonesia', logo: '/images/landing/customers/customer-6.svg', width: 1290, height: 708, aspect: 'standard' },
  { id: 17, name: 'PT. Cemara Intan Shipyard', logo: '/images/landing/customers/customer-7.svg', width: 1024, height: 459, aspect: 'standard' },
  { id: 18, name: 'PT. Bukti Alam Persada', logo: '/images/landing/customers/customer-8.svg', width: 770, height: 87, aspect: 'ultra-wide' },
  { id: 19, name: 'PT. Sindomas Precast', logo: '/images/landing/customers/customer-11.svg', width: 781, height: 71, aspect: 'ultra-wide' },
  { id: 20, name: 'PT. Yoshikawa Electronics Bintan', logo: '/images/landing/customers/customer-12.svg', width: 1686, height: 355, aspect: 'wide' },
  { id: 21, name: 'PT. Samudera Indonesia Tbk', logo: '/images/landing/customers/customer-13.svg', width: 1263, height: 848, aspect: 'standard' },
  { id: 22, name: 'Sekolah Mondial', logo: '/images/landing/customers/customer-14.svg', width: 1024, height: 1024, aspect: 'square' },
  { id: 23, name: 'PT. Kopegtel Batam', logo: '/images/landing/customers/customer-15.svg', width: 1730, height: 235, aspect: 'ultra-wide' },
  { id: 24, name: 'PT. Amber Karya', logo: '/images/landing/customers/customer-17.svg', width: 1024, height: 922, aspect: 'square' },
  { id: 25, name: 'PT. Agro Sarimas Indonesia', logo: '/images/landing/customers/customer-21.svg', width: 1029, height: 900, aspect: 'square' },
  { id: 26, name: 'PT. Vinnex Coatindo', logo: '/images/landing/customers/customer-19.svg', width: 1024, height: 671, aspect: 'standard' },
  { id: 27, name: 'PT. Venturindo Jaya Batam', logo: '/images/landing/customers/customer20.webp', width: 283, height: 56, aspect: 'ultra-wide' },
  { id: 28, name: 'PT. Nittoh Batam', logo: '/images/landing/customers/customer-22.svg', width: 904, height: 489, aspect: 'standard' },
  { id: 29, name: 'PT. Takamori Indonesia', logo: '/images/landing/customers/customer-23.svg', width: 1024, height: 939, aspect: 'square' },
  { id: 30, name: 'PT. World Wide Equipment South East Asia', logo: '/images/landing/customers/customer-24.svg', width: 602, height: 679, aspect: 'square' },
  { id: 31, name: 'PT. Bahtera Bahari Shipyard', logo: '/images/landing/customers/customer-25.svg', width: 500, height: 630, aspect: 'square' },
  { id: 32, name: 'PT. EX Batam Indonesia', logo: '/images/landing/customers/customer-26.svg', width: 300, height: 200, aspect: 'standard' },
];

export const BOTTOM_ROW_2: CustomerCompany[] = [
  { id: 33, name: 'PT. Batam Teknologi Gas', logo: '/images/landing/customers/customer-9.svg', width: 820, height: 688, aspect: 'square' },
  { id: 34, name: 'PT. Suntech Plastics Indonesia', logo: '/images/landing/customers/customer-16.webp', width: 1273, height: 810, aspect: 'standard' },
  { id: 35, name: 'PT. Fanindo Cipta Propertindo', logo: '/images/landing/customers/customer-5.svg', width: 1000, height: 616, aspect: 'standard' },
  { id: 36, name: 'PT. Lytech Batam', logo: '/images/landing/customers/customer49.webp', width: 220, height: 95, aspect: 'standard' },
  { id: 37, name: 'PT. Takamori Indonesia', logo: '/images/landing/customers/customer-23.svg', width: 1024, height: 939, aspect: 'square' },
  { id: 38, name: 'PT. Kebakkramat Elang Perkasa', logo: '/images/landing/customers/customer28.webp', width: 169, height: 112, aspect: 'standard' },
  { id: 39, name: 'PT. Perkasa Inovasi Logistik', logo: '/images/landing/customers/customer-29.svg', width: 1000, height: 320, aspect: 'wide' },
  { id: 40, name: 'PT. Wahana Idea Cipta', logo: '/images/landing/customers/customer30.webp', width: 180, height: 97, aspect: 'standard' },
  { id: 41, name: 'PT. Primo Microphones Indonesia', logo: '/images/landing/customers/customer-31.svg', width: 1698, height: 397, aspect: 'wide' },
  { id: 42, name: 'PT. Inti Duta Logistik', logo: '/images/landing/customers/customer-33.svg', width: 1024, height: 1024, aspect: 'square' },
  { id: 43, name: 'PT. Sumitomo Wiring Systems Batam', logo: '/images/landing/customers/customer-34.svg', width: 1741, height: 292, aspect: 'ultra-wide' },
  { id: 44, name: 'PT. Lubrikan Jasa Tama', logo: '/images/landing/customers/customer-35.svg', width: 1024, height: 471, aspect: 'standard' },
  { id: 45, name: 'PT. Adhya Tirta Lampung', logo: '/images/landing/customers/customer36.webp', width: 589, height: 276, aspect: 'standard' },
  { id: 46, name: 'Rumah Kita Batam', logo: '/images/landing/customers/customer-37.svg', width: 961, height: 743, aspect: 'square' },
  { id: 47, name: 'PT. Koperasi Karyawan BMW', logo: '/images/landing/customers/customer-38.svg', width: 1000, height: 888, aspect: 'square' },
  { id: 48, name: 'PT. Batam Niaga Perkasa', logo: '/images/landing/customers/customer-39.svg', width: 920, height: 1024, aspect: 'square' },
  { id: 49, name: 'PT. LKD Multi Industri', logo: '/images/landing/customers/customer40.webp', width: 471, height: 73, aspect: 'ultra-wide' },
  { id: 50, name: 'PT. Awak Samudera Transportasi', logo: '/images/landing/customers/customer-41.svg', width: 1446, height: 866, aspect: 'standard' },
  { id: 51, name: 'PT. Soonle Metalindo Perkasa', logo: '/images/landing/customers/customer42.webp', width: 518, height: 126, aspect: 'wide' },
  { id: 52, name: 'PT. Castroindo Perkasa', logo: '/images/landing/customers/customer44.webp', width: 531, height: 70, aspect: 'ultra-wide' },
  { id: 53, name: 'PT. Primetech Indonesia', logo: '/images/landing/customers/customer47.webp', width: 381, height: 79, aspect: 'wide' },
];

@Component({
  imports: [TranslatePipe, NgOptimizedImage],
  selector: 'app-customers',
  styles: `
    /* Flow pulse animations: independent linear loops flowing continuously */
    .pulse-top-horizontal {
      stroke-dasharray: 80 1200;
      stroke-dashoffset: 80;
      animation: pulseFlowTopHoriz 3s linear infinite;
    }

    .pulse-upper-right {
      stroke-dasharray: 40 180;
      stroke-dashoffset: 40;
      animation: pulseFlowRightUp 2.8s linear infinite;
    }

    .pulse-lower-right {
      stroke-dasharray: 50 600;
      stroke-dashoffset: 50;
      animation: pulseFlowRightVert2 3.2s linear infinite;
    }

    .pulse-left {
      stroke-dasharray: 50 600;
      stroke-dashoffset: 50;
      animation: pulseFlowLeftVert2 3.2s linear infinite;
    }

    .pulse-bottom-horizontal {
      stroke-dasharray: 80 1200;
      stroke-dashoffset: 80;
      animation: pulseFlowTopHoriz 3s linear infinite;
    }

    @keyframes pulseFlowTopHoriz {
      0% {
        opacity: 0;
        stroke-dashoffset: 80;
      }
      8% {
        opacity: 1;
      }
      88% {
        opacity: 1;
      }
      96% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        stroke-dashoffset: -710;
      }
    }

    @keyframes pulseFlowRightUp {
      0% {
        opacity: 0;
        stroke-dashoffset: 40;
      }
      10% {
        opacity: 1;
      }
      85% {
        opacity: 1;
      }
      95% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        stroke-dashoffset: -110;
      }
    }

    @keyframes pulseFlowRightVert2 {
      0% {
        opacity: 0;
        stroke-dashoffset: 50;
      }
      10% {
        opacity: 1;
      }
      85% {
        opacity: 1;
      }
      95% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        stroke-dashoffset: -275;
      }
    }

    @keyframes pulseFlowLeftVert2 {
      0% {
        opacity: 0;
        stroke-dashoffset: 50;
      }
      10% {
        opacity: 1;
      }
      85% {
        opacity: 1;
      }
      95% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        stroke-dashoffset: -305;
      }
    }

    /* Rich interactive transition when active PT switches in center showcase card */
    .logo-switch-active {
      animation: logoRichSwitch 0.65s cubic-bezier(0.2, 0.9, 0.3, 1.2) forwards;
    }

    .name-switch-active {
      animation: nameRichSwitch 0.6s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .card-switch-pulse {
      animation: cardHighlightPulse 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes logoRichSwitch {
      0% {
        opacity: 0;
        transform: perspective(500px) rotateX(18deg) translateY(16px) scale(0.85);
        filter: blur(4px);
      }
      50% {
        opacity: 0.95;
        transform: perspective(500px) rotateX(-4deg) translateY(-2px) scale(1.05);
        filter: blur(0px);
      }
      75% {
        transform: perspective(500px) rotateX(1deg) translateY(1px) scale(0.99);
      }
      100% {
        opacity: 1;
        transform: perspective(500px) rotateX(0deg) translateY(0) scale(1);
        filter: blur(0px);
      }
    }

    @keyframes nameRichSwitch {
      0% {
        opacity: 0;
        transform: translateY(10px) scale(0.95);
      }
      60% {
        opacity: 0.9;
        transform: translateY(-1px) scale(1.01);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes cardHighlightPulse {
      0% {
        box-shadow: 0 16px 36px rgba(35, 36, 78, 0.08);
      }
      45% {
        box-shadow: 0 20px 48px rgba(28, 115, 232, 0.22), 0 0 0 2px rgba(28, 115, 232, 0.3);
      }
      100% {
        box-shadow: 0 16px 36px rgba(35, 36, 78, 0.08);
      }
    }

    /* Infinite bottom marquee: Row 1 moves left-to-right, Row 2 moves right-to-left */
    .marquee-track-right {
      display: flex;
      width: max-content;
      animation: marqueeToRight 46s linear infinite;
    }

    .marquee-track-left {
      display: flex;
      width: max-content;
      animation: marqueeToLeft 42s linear infinite;
    }

    @keyframes marqueeToRight {
      0% {
        transform: translateX(-50%);
      }
      100% {
        transform: translateX(0%);
      }
    }

    @keyframes marqueeToLeft {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    /* Infinite top customer marquee: moves right-to-left continuously */
    .marquee-track-top {
      display: flex;
      width: max-content;
      animation: marqueeToLeft 38s linear infinite;
    }

    .marquee-mask {
      mask-image: linear-gradient(
        to right,
        transparent,
        black 4%,
        black 96%,
        transparent
      );
      -webkit-mask-image: linear-gradient(
        to right,
        transparent,
        black 4%,
        black 96%,
        transparent
      );
    }

    .cta-experience-btn,
    .cta-more-btn {
      border-radius: 8px;
      border: 1px solid transparent;
      transition: all 0.25s ease-out;
    }

    .cta-experience-btn {
      width: 200.01px;
      height: 40.82px;
      padding: 10.91px;
      gap: 7.27px;
      background:
        linear-gradient(#ffffff, #ffffff) padding-box,
        linear-gradient(90deg, #1E37E1 0%, #1C7DD8 50%, #6694EB 100%) border-box;
    }

    .cta-experience-btn:hover {
      background:
        linear-gradient(#F0F5FE, #F0F5FE) padding-box,
        linear-gradient(90deg, #1E37E1 0%, #1C7DD8 50%, #6694EB 100%) border-box;
      box-shadow: 0 4px 14px rgba(28, 115, 232, 0.12);
    }

    .cta-more-btn {
      background:
        linear-gradient(#ffffff, #ffffff) padding-box,
        linear-gradient(90deg, #1E37E1 0%, #1C7DD8 69.97%, #6694EB 100%) border-box;
    }

    .cta-more-btn:hover {
      background:
        linear-gradient(#F0F5FE, #F0F5FE) padding-box,
        linear-gradient(90deg, #1E37E1 0%, #1C7DD8 69.97%, #6694EB 100%) border-box;
      box-shadow: 0 4px 14px rgba(28, 115, 232, 0.12);
    }

    .marquee-paused * {
      animation-play-state: paused !important;
    }

    @media (prefers-reduced-motion: reduce) {
      .pulse-top-horizontal,
      .pulse-upper-right,
      .pulse-lower-right,
      .pulse-left,
      .pulse-bottom-horizontal,
      .marquee-track-top,
      .marquee-track-right,
      .marquee-track-left,
      .logo-switch-active,
      .name-switch-active,
      .card-switch-pulse {
        animation: none !important;
        transition: none !important;
      }
    }
  `,
  templateUrl: './customers.html',
})
export class Customers implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  readonly topMarqueeContainer = viewChild<ElementRef<HTMLElement>>('topContainer');
  readonly topMarqueeTrack = viewChild<ElementRef<HTMLElement>>('topTrack');

  private centerObserver: IntersectionObserver | null = null;
  private isInitialized = false;

  readonly isInViewport = signal<boolean>(false);

  constructor() {
    observeHostViewport((visible) => {
      this.isInViewport.set(visible);
      if (!this.isInitialized) return;
      if (visible) {
        this.startRotationTimer();
        this.startCenterObserver();
      } else {
        this.stopRotationTimer();
        this.stopCenterObserver();
      }
    });
  }

  readonly topCustomers = TOP_CUSTOMERS;
  readonly bottomRow1 = BOTTOM_ROW_1;
  readonly bottomRow2 = BOTTOM_ROW_2;

  readonly infiniteTopCustomers: ClonedCustomerCompany[] = Array.from(
    { length: 50 },
    (_, i) => ({
      ...TOP_CUSTOMERS[i % TOP_CUSTOMERS.length],
      virtualIdx: i,
    })
  );

  // Active customer index signal (starts at 2: PT. Sanipak Indonesia)
  readonly activeCustomerIndex = signal<number>(2);

  readonly activeCustomer = computed(
    () => this.topCustomers[this.activeCustomerIndex()]
  );

  // Dynamic circular window: 5 cards to left, 1 active in center, 5 cards to right
  readonly visibleCards = computed<VisibleTopCard[]>(() => {
    const current = this.activeCustomerIndex();
    const N = this.topCustomers.length;
    const offsets = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
    return offsets.map((offset) => {
      const customerIndex = ((current + offset) % N + N) % N;
      return {
        offset,
        customerIndex,
        customer: this.topCustomers[customerIndex],
        isActive: offset === 0,
      };
    });
  });

  // Track position signal starting at index 22 (Sanipak)
  readonly currentVirtual = signal<number>(22);
  readonly virtualIndex = computed(() => this.currentVirtual());
  readonly isSlidingSmooth = signal<boolean>(true);
  readonly isLineAnimating = signal<boolean>(true);
  readonly isLogoTransitioning = signal<boolean>(true);
  readonly isPaused = signal<boolean>(false);

  readonly trackTransform = computed(() => {
    const cardStep = 128;
    const halfCard = 56;
    const offset = this.virtualIndex() * cardStep + halfCard;
    return `translateX(calc(50% - ${offset}px))`;
  });

  readonly indicatorTransform = computed(() => {
    const minX = 30;
    const maxX = 660;
    const step = (maxX - minX) / (this.topCustomers.length - 1);
    const x = minX + this.activeCustomerIndex() * step;
    return `translateX(${x}px)`;
  });

  private timerId: ReturnType<typeof setInterval> | null = null;
  private logoTransitionTimeout: ReturnType<typeof setTimeout> | null = null;
  private lineAnimationTimeout: ReturnType<typeof setTimeout> | null = null;
  private lineCleanupTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.isInitialized = true;
    this.triggerLineAnimation();

    if (isPlatformBrowser(this.platformId) && this.isInViewport()) {
      this.startRotationTimer();
      this.startCenterObserver();
    }

    this.destroyRef.onDestroy(() => {
      this.stopRotationTimer();
      this.stopCenterObserver();
      if (this.logoTransitionTimeout) {
        clearTimeout(this.logoTransitionTimeout);
      }
      if (this.lineAnimationTimeout) {
        clearTimeout(this.lineAnimationTimeout);
      }
      if (this.lineCleanupTimeout) {
        clearTimeout(this.lineCleanupTimeout);
      }
    });
  }

  selectCustomer(target: number): void {
    const N = this.topCustomers.length;
    const targetIdx = ((target % N) + N) % N;
    if (this.activeCustomerIndex() === targetIdx) {
      return;
    }
    this.activeCustomerIndex.set(targetIdx);
    this.currentVirtual.set(20 + targetIdx);
    this.triggerLogoTransition();
    this.restartRotationTimer();
  }

  pauseRotation(): void {
    this.isPaused.set(true);
  }

  resumeRotation(): void {
    this.isPaused.set(false);
  }

  private startCenterObserver(): void {
    if (!isPlatformBrowser(this.platformId) || typeof IntersectionObserver === 'undefined') {
      return;
    }
    this.stopCenterObserver();

    const containerEl = this.topMarqueeContainer()?.nativeElement;
    const trackEl = this.topMarqueeTrack()?.nativeElement;
    if (!containerEl || !trackEl) {
      return;
    }

    const cards = trackEl.querySelectorAll<HTMLElement>('.top-customer-card');
    if (!cards.length) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const intersectingCards = new Set<Element>();
      this.centerObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              intersectingCards.add(entry.target);
            } else {
              intersectingCards.delete(entry.target);
            }
          }
          if (this.isPaused() || !this.isInViewport()) {
            return;
          }
          const rootRect = entries[0]?.rootBounds ?? containerEl.getBoundingClientRect();
          const rootCenter = rootRect.left + rootRect.width / 2;
          let closestIndex = -1;
          let minDistance = Infinity;

          for (const cardEl of intersectingCards) {
            const cardRect = cardEl.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const dist = Math.abs(cardCenter - rootCenter);
            if (dist < minDistance) {
              minDistance = dist;
              const idx = cardEl.getAttribute('data-index');
              if (idx !== null) {
                closestIndex = Number(idx);
              }
            }
          }

          if (closestIndex !== -1 && closestIndex !== this.activeCustomerIndex()) {
            this.ngZone.run(() => {
              this.activeCustomerIndex.set(closestIndex);
              this.currentVirtual.set(20 + closestIndex);
              this.triggerLogoTransition();
            });
          }
        },
        {
          root: containerEl,
          rootMargin: '0px -48% 0px -48%',
          threshold: 0,
        },
      );

      for (let i = 0; i < cards.length; i++) {
        this.centerObserver.observe(cards[i]);
      }
    });
  }

  private stopCenterObserver(): void {
    if (this.centerObserver) {
      this.centerObserver.disconnect();
      this.centerObserver = null;
    }
  }

  private advanceToNext(): void {
    const containerEl = this.topMarqueeContainer()?.nativeElement;
    if (this.centerObserver && containerEl && containerEl.offsetWidth > 0) {
      return;
    }
    const N = this.topCustomers.length;
    this.activeCustomerIndex.update((i) => (i + 1) % N);
    this.currentVirtual.set(20 + this.activeCustomerIndex());
    this.triggerLogoTransition();
  }

  private startRotationTimer(): void {
    this.stopRotationTimer();
    this.timerId = setInterval(() => {
      if (!this.isPaused()) {
        this.advanceToNext();
      }
    }, 3200);
  }

  private stopRotationTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private restartRotationTimer(): void {
    this.stopRotationTimer();
    this.startRotationTimer();
  }

  private triggerLogoTransition(): void {
    this.isLogoTransitioning.set(false);
    if (this.logoTransitionTimeout) {
      clearTimeout(this.logoTransitionTimeout);
    }
    this.logoTransitionTimeout = setTimeout(() => {
      this.isLogoTransitioning.set(true);
    }, 20);
  }

  private triggerLineAnimation(): void {
    this.isLineAnimating.set(true);
  }
}
