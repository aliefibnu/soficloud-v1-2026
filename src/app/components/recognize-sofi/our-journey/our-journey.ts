import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { observeHostViewport } from '../../../systems/lib/viewport-observer';

export interface OurJourneySlide {
  readonly id: 'our-journey' | 'sustainable-development' | 'for-business' | 'our-commitment';
  readonly eyebrowKey: string;
  readonly titleKey: string;
  readonly paragraphKeys: readonly string[];
  readonly imageSrc: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly imageAltKey: string;
}

@Component({
  imports: [NgOptimizedImage, TranslatePipe],
  selector: 'app-our-journey',
  templateUrl: './our-journey.html',
  styles: `
    .editorial-card {
      transition:
        transform 560ms cubic-bezier(0.22, 1, 0.36, 1),
        opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
        filter 560ms cubic-bezier(0.22, 1, 0.36, 1),
        box-shadow 560ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    .editorial-text {
      transition:
        opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
        transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      .editorial-card,
      .editorial-text {
        transition-duration: 0.01ms !important;
      }
    }
  `,
  host: {
    class: 'block w-full',
    tabindex: '0',
    role: 'region',
    'aria-roledescription': 'carousel',
    'aria-label': 'Perjalanan dan Komitmen SOFICloud',
    '(keydown.arrowLeft)': 'prevSlide()',
    '(keydown.arrowRight)': 'nextSlide()',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(focusin)': 'onMouseEnter()',
    '(focusout)': 'onMouseLeave()',
  },
})
export class OurJourney implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly slides: readonly OurJourneySlide[] = [
    {
      id: 'our-journey',
      eyebrowKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_JOURNEY.EYEBROW',
      titleKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_JOURNEY.TITLE',
      paragraphKeys: [
        'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_JOURNEY.PARAGRAPH_1',
        'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_JOURNEY.PARAGRAPH_2',
        'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_JOURNEY.PARAGRAPH_3',
      ],
      imageSrc: '/images/recognize-sofi/our-journey/our-journey.png',
      imageWidth: 317,
      imageHeight: 503,
      imageAltKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_JOURNEY.IMAGE_ALT',
    },
    {
      id: 'sustainable-development',
      eyebrowKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.SUSTAINABLE_DEVELOPMENT.EYEBROW',
      titleKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.SUSTAINABLE_DEVELOPMENT.TITLE',
      paragraphKeys: [
        'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.SUSTAINABLE_DEVELOPMENT.PARAGRAPH_1',
        'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.SUSTAINABLE_DEVELOPMENT.PARAGRAPH_2',
      ],
      imageSrc: '/images/recognize-sofi/our-journey/sustainable-development.png',
      imageWidth: 316,
      imageHeight: 503,
      imageAltKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.SUSTAINABLE_DEVELOPMENT.IMAGE_ALT',
    },
    {
      id: 'for-business',
      eyebrowKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.FOR_BUSINESS.EYEBROW',
      titleKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.FOR_BUSINESS.TITLE',
      paragraphKeys: [
        'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.FOR_BUSINESS.PARAGRAPH_1',
        'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.FOR_BUSINESS.PARAGRAPH_2',
      ],
      imageSrc: '/images/recognize-sofi/our-journey/for-business.png',
      imageWidth: 286,
      imageHeight: 473,
      imageAltKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.FOR_BUSINESS.IMAGE_ALT',
    },
    {
      id: 'our-commitment',
      eyebrowKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_COMMITMENT.EYEBROW',
      titleKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_COMMITMENT.TITLE',
      paragraphKeys: [
        'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_COMMITMENT.PARAGRAPH_1',
        'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_COMMITMENT.PARAGRAPH_2',
      ],
      imageSrc: '/images/recognize-sofi/our-journey/our-commitment.png',
      imageWidth: 286,
      imageHeight: 473,
      imageAltKey: 'RECOGNIZE_SOFI.OUR_JOURNEY.SLIDES.OUR_COMMITMENT.IMAGE_ALT',
    },
  ];

  readonly currentIndex = signal<0 | 1 | 2 | 3>(0);
  readonly activeSlide = computed<0 | 1 | 2 | 3>(() => this.currentIndex());
  readonly isHovered = signal<boolean>(false);
  readonly isInViewport = signal<boolean>(false);

  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;
  readonly autoPlayDelayMs = 6500;

  private touchStartX = 0;
  private touchStartY = 0;
  private isMouseDown = false;
  private mouseStartX = 0;
  private mouseStartY = 0;

  constructor() {
    observeHostViewport((visible) => {
      this.isInViewport.set(visible);
      if (visible && !this.isHovered()) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    if (!this.isBrowser || !this.isInViewport() || this.isHovered()) return;
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (!this.isHovered() && this.isInViewport()) {
        this.nextSlide();
      }
    }, this.autoPlayDelayMs);
  }

  stopAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  resetAutoPlay(): void {
    if (!this.isHovered()) {
      this.startAutoPlay();
    }
  }

  onMouseEnter(): void {
    this.isHovered.set(true);
    this.stopAutoPlay();
  }

  onMouseLeave(): void {
    this.isHovered.set(false);
    this.startAutoPlay();
  }

  goToSlide(index: number): void {
    const total = this.slides.length;
    const normalized = (((index % total) + total) % total) as 0 | 1 | 2 | 3;
    this.currentIndex.set(normalized);
    this.resetAutoPlay();
  }

  nextSlide(): void {
    const total = this.slides.length;
    this.currentIndex.update((prev) => ((prev + 1) % total) as 0 | 1 | 2 | 3);
    this.resetAutoPlay();
  }

  prevSlide(): void {
    const total = this.slides.length;
    this.currentIndex.update((prev) => ((prev + total - 1) % total) as 0 | 1 | 2 | 3);
    this.resetAutoPlay();
  }

  /**
   * Circular editorial slot relative to the active slide:
   * 0 = active foreground card (full color, 100% scale)
   * 1 = left grayscale preview card (84% opacity, 0.836x scale)
   * 2 = off-canvas left standby slot
   * 3 = subtle right editorial exit slot
   */
  getSlideSlot(index: number): 0 | 1 | 2 | 3 {
    const total = this.slides.length;
    return (((index - this.activeSlide()) % total) + total) % total as 0 | 1 | 2 | 3;
  }

  getCardTransform(index: number): string {
    switch (this.getSlideSlot(index)) {
      case 0:
        return 'translate3d(0, 0, 0) scale(1)';
      case 1:
        return 'translate3d(-100%, 0, 0) scale(0.836)';
      case 2:
        return 'translate3d(-192%, 0, 0) scale(0.76)';
      case 3:
        return 'translate3d(22%, 0, 0) scale(0.94)';
    }
  }

  getCardOpacity(index: number): number {
    switch (this.getSlideSlot(index)) {
      case 0:
        return 1;
      case 1:
        return 0.84;
      default:
        return 0;
    }
  }

  getCardFilter(index: number): string {
    switch (this.getSlideSlot(index)) {
      case 0:
        return 'grayscale(0%)';
      case 3:
        return 'grayscale(35%)';
      default:
        return 'grayscale(100%)';
    }
  }

  getCardZIndex(index: number): number {
    switch (this.getSlideSlot(index)) {
      case 0:
        return 30;
      case 1:
        return 20;
      case 3:
        return 10;
      default:
        return 5;
    }
  }

  onCardClick(index: number): void {
    if (this.getSlideSlot(index) === 1) {
      this.goToSlide(index);
    }
  }

  onTouchStart(event: TouchEvent): void {
    if (event.touches.length > 0) {
      this.stopAutoPlay();
      this.touchStartX = event.touches[0].clientX;
      this.touchStartY = event.touches[0].clientY;
    }
  }

  onTouchEnd(event: TouchEvent): void {
    if (event.changedTouches.length === 0) return;
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    this.handleSwipe(this.touchStartX, this.touchStartY, touchEndX, touchEndY);
    if (!this.isHovered()) {
      this.startAutoPlay();
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.stopAutoPlay();
    this.isMouseDown = true;
    this.mouseStartX = event.clientX;
    this.mouseStartY = event.clientY;
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isMouseDown) return;
    this.isMouseDown = false;
    this.handleSwipe(this.mouseStartX, this.mouseStartY, event.clientX, event.clientY);
    if (!this.isHovered()) {
      this.startAutoPlay();
    }
  }

  private handleSwipe(startX: number, startY: number, endX: number, endY: number): void {
    const diffX = endX - startX;
    const diffY = endY - startY;
    const threshold = 40;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
      if (diffX < 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
    }
  }
}
