import { DOCUMENT, isPlatformBrowser, PlatformLocation } from '@angular/common';
import { ApplicationRef, inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Maps every landing page anchor ID (including legacy/fallback aliases)
 * to the 1-based order of its `@defer` block in `Landing`.
 */
export const LANDING_ANCHOR_ORDER: Readonly<Record<string, number>> = {
  'business-control': 1,
  features: 2,
  'why-choose-us': 3,
  about: 3,
  solutions: 4,
  'business-model': 4,
  resources: 4,
  customers: 5,
  pricing: 6,
  contact: 7,
  support: 7,
};

const ANCHOR_FALLBACKS: Readonly<Record<string, readonly string[]>> = {
  contact: ['support'],
  solutions: ['business-model', 'resources'],
};

/**
 * Coordinates deferred section revelation and layout-settled smooth scrolling
 * for landing page anchors across both in-page and cross-route navigation.
 */
@Service()
export class LandingAnchorService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly appRef = inject(ApplicationRef);
  private readonly router = inject(Router, { optional: true });
  private readonly platformLocation = inject(PlatformLocation, { optional: true });
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** Highest `@defer` block order (1..7) that must render/hydrate immediately. */
  readonly requiredOrder = signal<number>(0);

  private activeRequestId = 0;
  private cleanupScrollListeners: (() => void) | null = null;
  private cleanupPendingInterruption: (() => void) | null = null;
  private postScrollTimer: ReturnType<typeof setTimeout> | null = null;
  private pendingFocusAnchorId: string | null = null;

  /** Monotonically increasing counter incremented on each anchor scroll or reset. */
  get currentRequestId(): number {
    return this.activeRequestId;
  }

  /** Normalizes an anchor string by stripping a leading `#` and trimming whitespace. */
  normalizeAnchor(anchorId: string): string {
    return anchorId.replace(/^#/, '').trim();
  }

  /** Returns the 1-based deferred section order for a landing anchor, or `0` if none. */
  getSectionOrder(anchorId: string): number {
    const cleanId = this.normalizeAnchor(anchorId);
    return Object.hasOwn(LANDING_ANCHOR_ORDER, cleanId) ? LANDING_ANCHOR_ORDER[cleanId] : 0;
  }

  /**
   * Requests all `@defer` blocks up to the section containing `anchorId`
   * to load and hydrate immediately without affecting blocks below it.
   */
  revealUpToAnchor(anchorId: string): number {
    const order = this.getSectionOrder(anchorId);
    if (order > this.requiredOrder()) {
      this.requiredOrder.set(order);
    }
    return order;
  }

  /** Resets eager revelation state when leaving the landing route. */
  reset(): void {
    this.activeRequestId++;
    this.pendingFocusAnchorId = null;
    this.clearPendingInterruption();
    this.clearPostScrollWatch();
    this.requiredOrder.set(0);
  }

  /** Resolves an anchor ID (with legacy alias fallbacks) to its DOM element. */
  resolveTargetElement(anchorId: string): HTMLElement | null {
    const cleanId = this.normalizeAnchor(anchorId);
    if (!cleanId) {
      return null;
    }

    const direct = this.document.getElementById(cleanId);
    if (direct) {
      return direct;
    }

    const fallbacks = Object.hasOwn(ANCHOR_FALLBACKS, cleanId)
      ? ANCHOR_FALLBACKS[cleanId]
      : undefined;
    if (fallbacks) {
      for (const fallbackId of fallbacks) {
        const el = this.document.getElementById(fallbackId);
        if (el) {
          return el;
        }
      }
    }

    return null;
  }

  /** Returns the current sticky navbar height, falling back to 88px. */
  getNavbarHeight(): number {
    if (!this.isBrowser) {
      return 88;
    }
    const header = this.document.querySelector('app-navbar header');
    return header ? header.getBoundingClientRect().height : 88;
  }

  /**
   * Navigates to `/` with `anchorId` as fragment when on a non-landing route,
   * or reveals deferred sections and scrolls smoothly when already on `/`.
   * Leaves modified clicks (Ctrl/Cmd/Shift/Alt, non-primary button, or already prevented)
   * to the browser's native link handling.
   */
  navigateOrScrollToAnchor(
    anchorId: string,
    event?: Event,
    updateHash = true,
    focusTarget = false,
  ): void {
    if (this.isModifiedClick(event)) {
      return;
    }

    const cleanId = this.normalizeAnchor(anchorId);
    if (!cleanId) {
      return;
    }

    const rawPath =
      this.router?.url && this.router.url !== '/'
        ? this.router.url
        : this.platformLocation?.pathname || '/';
    const currentPath = rawPath.split(/[?#]/)[0];
    const isLanding = currentPath === '' || currentPath === '/';

    if (isLanding || !this.router) {
      this.pendingFocusAnchorId = null;
      event?.preventDefault();
      if (focusTarget) {
        void this.scrollToAnchor(cleanId, undefined, true);
      } else {
        void this.scrollToAnchor(cleanId);
      }
      if (updateHash) {
        this.pushHashIfChanged(cleanId);
      }
      return;
    }

    event?.preventDefault();
    this.pendingFocusAnchorId = focusTarget ? cleanId : null;
    void this.router.navigate(['/'], { fragment: cleanId });
  }

  /** Consumes a focus request carried by an explicit cross-route anchor activation. */
  consumePendingFocusRequest(anchorId: string): boolean {
    const cleanId = this.normalizeAnchor(anchorId);
    if (this.pendingFocusAnchorId === null) {
      return false;
    }
    const matches = this.pendingFocusAnchorId === cleanId;
    this.pendingFocusAnchorId = null;
    return matches;
  }

  /** Updates the browser URL hash without pushing a duplicate entry for the current fragment. */
  pushHashIfChanged(anchorId: string): void {
    if (!this.isBrowser || typeof window === 'undefined' || !window.history?.pushState) {
      return;
    }
    const cleanId = this.normalizeAnchor(anchorId);
    if (!cleanId) {
      return;
    }
    const targetHash = `#${cleanId}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
  }

  /**
   * Reveals any deferred landing blocks up to `anchorId`, waits for their
   * placeholders to be replaced and layout to stabilize, then scrolls smoothly
   * to the target offset beneath the sticky navbar.
   */
  async scrollToAnchor(
    anchorId: string,
    onComplete?: () => void,
    focusTarget = false,
  ): Promise<void> {
    if (!this.isBrowser || typeof window === 'undefined') {
      return;
    }

    const cleanId = this.normalizeAnchor(anchorId);
    if (!cleanId) {
      return;
    }

    const requestId = ++this.activeRequestId;
    this.clearPendingInterruption();
    this.clearPostScrollWatch();
    let resolveInterrupted!: () => void;
    let userInterrupted = false;
    const interrupted = new Promise<void>((resolve) => {
      resolveInterrupted = resolve;
    });
    const cancelPendingRequest = () => {
      if (!userInterrupted) {
        userInterrupted = true;
        resolveInterrupted();
      }
    };
    const interruptionEvents: readonly (keyof WindowEventMap)[] = [
      'wheel',
      'touchstart',
      'pointerdown',
    ];
    for (const eventName of interruptionEvents) {
      window.addEventListener(eventName, cancelPendingRequest, { passive: true, once: true });
    }
    const onInterruptionKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
        cancelPendingRequest();
      }
    };
    window.addEventListener('keydown', onInterruptionKeyDown, { passive: true });
    let cleanupRequestInterruption!: () => void;
    cleanupRequestInterruption = () => {
      resolveInterrupted();
      for (const eventName of interruptionEvents) {
        window.removeEventListener(eventName, cancelPendingRequest);
      }
      window.removeEventListener('keydown', onInterruptionKeyDown);
      if (this.cleanupPendingInterruption === cleanupRequestInterruption) {
        this.cleanupPendingInterruption = null;
      }
    };
    this.cleanupPendingInterruption = cleanupRequestInterruption;

    try {
      const order = this.revealUpToAnchor(cleanId);
      if (order > 0 || !this.resolveTargetElement(cleanId)) {
        const ready = await Promise.race([
          this.waitForTargetReady(cleanId, order, requestId, () => userInterrupted),
          interrupted.then(() => false),
        ]);
        if (!ready || requestId !== this.activeRequestId || userInterrupted) {
          return;
        }
      }

      const target = this.resolveTargetElement(cleanId);
      if (!target || userInterrupted) {
        return;
      }

      if (focusTarget) {
        target.focus({ preventScroll: true });
      }

      // Switch to the post-scroll watcher synchronously so there is no gap in input tracking.
      this.clearPendingInterruption();
      const behavior = this.prefersReducedMotion() ? 'auto' : 'smooth';
      const targetTop = this.computeTargetScrollTop(target);
      window.scrollTo({ top: targetTop, behavior });

      if (behavior === 'auto' || Math.abs(window.scrollY - targetTop) <= 2) {
        onComplete?.();
        return;
      }

      this.watchPostScrollDrift(cleanId, requestId, onComplete);
    } finally {
      cleanupRequestInterruption();
    }
  }

  /**
   * Returns `true` when a click event should be left to the browser's default
   * navigation (e.g., Ctrl/Cmd/Shift/Alt-click, middle-click, or already handled).
   */
  isModifiedClick(event?: Event): boolean {
    if (!event) {
      return false;
    }
    if (event.defaultPrevented) {
      return true;
    }
    if (typeof MouseEvent !== 'undefined' && event instanceof MouseEvent) {
      return (
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      );
    }
    return false;
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  private computeTargetScrollTop(target: HTMLElement): number {
    const navHeight = this.getNavbarHeight();
    return Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight);
  }

  private hasPendingPlaceholder(maxOrder: number): boolean {
    for (let i = 1; i <= maxOrder; i++) {
      if (this.document.querySelector(`[data-landing-placeholder="${i}"]`)) {
        return true;
      }
    }
    return false;
  }

  private async waitForTargetReady(
    cleanId: string,
    maxOrder: number,
    requestId: number,
    isInterrupted: () => boolean,
  ): Promise<boolean> {
    const deadline = Date.now() + 4000;

    while (requestId === this.activeRequestId && !isInterrupted()) {
      await this.appRef.whenStable();
      if (requestId !== this.activeRequestId || isInterrupted()) {
        return false;
      }

      const target = this.resolveTargetElement(cleanId);
      const pendingPlaceholders = maxOrder > 0 && this.hasPendingPlaceholder(maxOrder);

      if (!pendingPlaceholders && target) {
        // Wait for layout stabilization across two animation frames after defer swap
        return this.waitForLayoutStabilization(cleanId, requestId, isInterrupted);
      }

      // Non-landing target that does not exist in DOM — bail out immediately
      if (maxOrder === 0 && !target) {
        return false;
      }

      if (Date.now() >= deadline) {
        return target !== null;
      }

      await this.waitNextFrameOrTick();
    }

    return false;
  }

  private async waitForLayoutStabilization(
    cleanId: string,
    requestId: number,
    isInterrupted: () => boolean,
  ): Promise<boolean> {
    let previousTop: number | null = null;
    for (let frame = 0; frame < 8; frame++) {
      await this.waitNextFrameOrTick();
      if (requestId !== this.activeRequestId || isInterrupted()) {
        return false;
      }
      const target = this.resolveTargetElement(cleanId);
      if (!target) {
        return false;
      }
      const currentTop = Math.round(target.getBoundingClientRect().top);
      if (previousTop !== null && Math.abs(currentTop - previousTop) <= 1) {
        return true;
      }
      previousTop = currentTop;
    }
    return true;
  }

  private watchPostScrollDrift(
    cleanId: string,
    requestId: number,
    onComplete?: () => void,
  ): void {
    let userInterrupted = false;
    const cancel = () => {
      userInterrupted = true;
      this.clearPostScrollWatch();
    };

    const events: readonly (keyof WindowEventMap)[] = ['wheel', 'touchstart', 'pointerdown'];
    for (const evt of events) {
      window.addEventListener(evt, cancel, { passive: true, once: true });
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
        cancel();
      }
    };
    window.addEventListener('keydown', onKeyDown, { passive: true });

    const finish = () => {
      if (userInterrupted || requestId !== this.activeRequestId) {
        return;
      }
      this.clearPostScrollWatch();

      const target = this.resolveTargetElement(cleanId);
      if (target) {
        const navHeight = this.getNavbarHeight();
        const delta = target.getBoundingClientRect().top - navHeight;
        const atBottom =
          window.scrollY + window.innerHeight >= this.document.documentElement.scrollHeight - 4;
        if (Math.abs(delta) > 12 && !(delta > 0 && atBottom)) {
          window.scrollTo({
            top: this.computeTargetScrollTop(target),
            behavior: 'smooth',
          });
        }
      }
      onComplete?.();
    };

    const onScrollEnd = () => finish();
    window.addEventListener('scrollend', onScrollEnd, { once: true });
    this.postScrollTimer = setTimeout(finish, 900);

    this.cleanupScrollListeners = () => {
      for (const evt of events) {
        window.removeEventListener(evt, cancel);
      }
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scrollend', onScrollEnd);
    };
  }

  private clearPostScrollWatch(): void {
    if (this.postScrollTimer !== null) {
      clearTimeout(this.postScrollTimer);
      this.postScrollTimer = null;
    }
    this.cleanupScrollListeners?.();
    this.cleanupScrollListeners = null;
  }

  private clearPendingInterruption(): void {
    this.cleanupPendingInterruption?.();
  }

  private waitNextFrameOrTick(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => resolve());
      } else {
        setTimeout(resolve, 16);
      }
    });
  }
}
