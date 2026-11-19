import { DestroyRef, ElementRef, inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Observes the host element's intersection with the viewport and invokes
 * `onVisibilityChange` whenever visibility changes. Must be called inside an
 * injection context. Immediately reports `true` when `IntersectionObserver` is unavailable.
 */
export function observeHostViewport(
  onVisibilityChange: (visible: boolean) => void,
  rootMargin = '100px 0px',
): void {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return;
  }

  if (typeof IntersectionObserver === 'undefined') {
    onVisibilityChange(true);
    return;
  }

  const elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  const ngZone = inject(NgZone);
  const destroyRef = inject(DestroyRef);

  let lastVisible: boolean | null = null;
  let observer: IntersectionObserver | null = null;

  ngZone.runOutsideAngular(() => {
    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible === lastVisible) {
          return;
        }
        lastVisible = visible;
        ngZone.run(() => onVisibilityChange(visible));
      },
      { rootMargin },
    );
    observer.observe(elementRef.nativeElement);
  });

  destroyRef.onDestroy(() => {
    observer?.disconnect();
    observer = null;
  });
}

/**
 * Registers a passive `window` scroll listener outside Angular's zone,
 * coalescing callbacks with `requestAnimationFrame` and cleaning up on destroy.
 * Must be called inside an injection context.
 */
export function listenWindowScrollRaf(onFrame: () => void): void {
  const platformId = inject(PLATFORM_ID);
  if (!isPlatformBrowser(platformId)) {
    return;
  }

  const ngZone = inject(NgZone);
  const destroyRef = inject(DestroyRef);
  let rafId: number | null = null;

  const handler = () => {
    if (rafId !== null) {
      return;
    }
    rafId = window.requestAnimationFrame(() => {
      rafId = null;
      onFrame();
    });
  };

  ngZone.runOutsideAngular(() => {
    window.addEventListener('scroll', handler, { passive: true });
  });

  destroyRef.onDestroy(() => {
    window.removeEventListener('scroll', handler);
    if (rafId !== null && typeof cancelAnimationFrame !== 'undefined') {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  });
}
