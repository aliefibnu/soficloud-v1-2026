import { isPlatformBrowser, PlatformLocation } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  OnDestroy,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { filter, merge } from 'rxjs';

export interface FeatureTab {
  readonly id: string;
  readonly titleKey?: string;
  readonly defaultTitle: string;
}

@Component({
  selector: 'app-section-tabs',
  imports: [TranslatePipe],
  templateUrl: './section-tabs.html',
  styleUrl: './section-tabs.css',
  host: {
    class:
      'block w-full sticky top-[68px] sm:top-[72px] lg:top-[76px] my-4 sm:my-6 lg:my-8 z-30 [overflow-anchor:none]',
    '(window:resize)': 'onWindowResize()',
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class SectionTabs implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly router = inject(Router, { optional: true });
  private readonly platformLocation = inject(PlatformLocation, { optional: true });
  private readonly translate = inject(TranslateService, { optional: true });
  private readonly destroyRef = inject(DestroyRef);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly tabs = input.required<readonly FeatureTab[]>();
  readonly navAriaLabel = input<string>('Financial management sections');
  readonly listMinWidthClass = input<string>('min-w-270 xl:min-w-0');

  readonly tabsListRef = viewChild<ElementRef<HTMLElement>>('tabsListRef');

  readonly isSticky = signal<boolean>(false);
  readonly isStickyTransitioning = signal<boolean>(false);
  readonly indicatorLeft = signal<number>(0);
  readonly indicatorWidth = signal<number>(140);
  private readonly currentBaseUrl = signal<string>(this.resolveBaseUrl());

  readonly activeTabId = linkedSignal<readonly FeatureTab[], string>({
    source: this.tabs,
    computation: (tabs) => tabs[0]?.id ?? '',
  });

  readonly activeTabIndex = computed<number>(() => {
    const idx = this.tabs().findIndex((t) => t.id === this.activeTabId());
    return idx >= 0 ? idx : 0;
  });

  readonly activeTab = computed<FeatureTab | undefined>(() => {
    const currentTabs = this.tabs();
    return currentTabs[this.activeTabIndex()] ?? currentTabs[0];
  });

  private resizeObserver?: ResizeObserver;
  private scrollRafId: number | null = null;
  private indicatorRafId: number | null = null;
  private stickyTransitionRafId: number | null = null;
  private stickyTransitionTimeout?: ReturnType<typeof setTimeout>;
  private indicatorTimeout?: ReturnType<typeof setTimeout>;
  private isUserClicking = false;
  private userClickTimeout?: ReturnType<typeof setTimeout>;
  private initialHashScrollTimeout?: ReturnType<typeof setTimeout>;
  private scrollendCleanup?: () => void;

  constructor() {
    effect(() => {
      const currentTabs = this.tabs();
      const activeId = this.activeTabId();
      if (this.isBrowser && currentTabs.length > 0 && activeId) {
        this.scheduleIndicatorUpdate();
      }
    });

    if (this.translate) {
      merge(this.translate.onLangChange, this.translate.onTranslationChange)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          if (this.isBrowser) {
            this.scheduleIndicatorUpdate(50);
          }
        });
    }

    this.router?.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        const basePath = event.urlAfterRedirects.split('#')[0];
        if (basePath) {
          this.currentBaseUrl.set(basePath);
        }
      });
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.slice(1);
      if (this.tabs().some((t) => t.id === hashId)) {
        this.activeTabId.set(hashId);
        const scrollBehavior: ScrollBehavior = this.prefersReducedMotion() ? 'auto' : 'smooth';
        this.initialHashScrollTimeout = setTimeout(() => {
          this.scrollTargetIntoView(hashId, scrollBehavior);
        }, 50);
      }
    }

    this.updateIndicator();
    this.scheduleIndicatorUpdate(50);

    const listEl = this.tabsListRef()?.nativeElement;
    if (typeof ResizeObserver !== 'undefined' && listEl) {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateIndicator();
      });
      this.resizeObserver.observe(listEl);
      const tabLinks = listEl.querySelectorAll('[data-tab-id]');
      tabLinks.forEach((link) => this.resizeObserver?.observe(link));
    }

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        this.updateIndicator();
      });
    }

    this.setupScrollTargetGroupSync();
    this.checkStickyState();
    this.updateActiveSectionByScroll();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.scrollendCleanup?.();
    if (typeof window !== 'undefined') {
      if (this.scrollRafId !== null) {
        window.cancelAnimationFrame(this.scrollRafId);
      }
      if (this.indicatorRafId !== null) {
        window.cancelAnimationFrame(this.indicatorRafId);
      }
      if (this.stickyTransitionRafId !== null) {
        window.cancelAnimationFrame(this.stickyTransitionRafId);
      }
    }
    if (this.stickyTransitionTimeout) {
      clearTimeout(this.stickyTransitionTimeout);
    }
    if (this.indicatorTimeout) {
      clearTimeout(this.indicatorTimeout);
    }
    if (this.userClickTimeout) {
      clearTimeout(this.userClickTimeout);
    }
    if (this.initialHashScrollTimeout) {
      clearTimeout(this.initialHashScrollTimeout);
    }
  }

  getTabHref(id: string): string {
    return `${this.currentBaseUrl()}#${id}`;
  }

  onWindowResize(): void {
    if (!this.isBrowser) return;
    this.updateIndicator();
    this.checkStickyState();
    this.updateActiveSectionByScroll();
  }

  onWindowScroll(): void {
    if (!this.isBrowser) return;
    this.checkStickyState();
    if (this.scrollRafId !== null) return;
    this.scrollRafId = window.requestAnimationFrame(() => {
      this.scrollRafId = null;
      this.updateActiveSectionByScroll();
    });
  }

  onTabClick(event: MouseEvent, id: string): void {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    this.selectTab(id);
  }

  selectTab(id: string): void {
    this.activeTabId.set(id);
    if (!this.isBrowser) return;

    this.isUserClicking = true;
    if (this.userClickTimeout) {
      clearTimeout(this.userClickTimeout);
    }
    this.userClickTimeout = setTimeout(() => {
      this.isUserClicking = false;
    }, 700);

    this.updateIndicator();
    this.scheduleIndicatorUpdate(0);

    const scrollBehavior: ScrollBehavior = this.prefersReducedMotion() ? 'auto' : 'smooth';

    const listEl = this.tabsListRef()?.nativeElement;
    const activeLink = listEl?.querySelector(`[data-tab-id="${id}"]`) as HTMLElement | null;
    activeLink?.scrollIntoView?.({
      behavior: scrollBehavior,
      block: 'nearest',
      inline: 'nearest',
      container: 'nearest',
    } as ScrollIntoViewOptions);

    this.scrollTargetIntoView(id, scrollBehavior);

    if (typeof history !== 'undefined' && typeof history.replaceState === 'function') {
      history.replaceState(null, '', this.getTabHref(id));
    }
  }

  /**
   * Aligns the 3px sliding pill indicator beneath the active tab link relative to the first tab.
   */
  updateIndicator(): void {
    const currentTabs = this.tabs();
    if (!this.isBrowser || currentTabs.length === 0) return;
    const listEl = this.tabsListRef()?.nativeElement;
    if (!listEl) return;

    const firstLink = listEl.querySelector(
      `[data-tab-id="${currentTabs[0].id}"]`,
    ) as HTMLElement | null;
    const activeLink = listEl.querySelector(
      `[data-tab-id="${this.activeTabId()}"]`,
    ) as HTMLElement | null;

    if (activeLink && firstLink) {
      const firstRect = firstLink.getBoundingClientRect();
      const activeRect = activeLink.getBoundingClientRect();
      const safeLeft = Math.max(0, activeRect.left - firstRect.left);

      this.indicatorLeft.set(safeLeft);
      this.indicatorWidth.set(activeRect.width);
    }
  }

  updateActiveSectionByScroll(): void {
    const currentTabs = this.tabs();
    if (!this.isBrowser || this.isUserClicking || currentTabs.length === 0) return;

    const existingSections = currentTabs
      .map((tab) => ({ tab, el: document.getElementById(tab.id) }))
      .filter((item): item is { tab: FeatureTab; el: HTMLElement } => item.el !== null);

    if (existingSections.length === 0) return;

    const windowH = window.innerHeight || 800;
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const docH = document.documentElement.scrollHeight;

    if (docH > windowH && scrollY + windowH >= docH - 80) {
      const lastTabId = existingSections[existingSections.length - 1].tab.id;
      if (this.activeTabId() !== lastTabId) {
        this.activeTabId.set(lastTabId);
        this.updateIndicator();
      }
      return;
    }

    const stickyHeaderOffset = window.innerWidth >= 1024 ? 135 : 120;
    const readingLine = Math.max(stickyHeaderOffset + 60, Math.floor(windowH * 0.38));

    for (const { tab, el } of existingSections) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= readingLine && rect.bottom > readingLine) {
        if (this.activeTabId() !== tab.id) {
          this.activeTabId.set(tab.id);
          this.updateIndicator();
        }
        return;
      }
    }

    const firstSection = existingSections[0];
    if (firstSection.el.getBoundingClientRect().top > readingLine) {
      if (this.activeTabId() !== firstSection.tab.id) {
        this.activeTabId.set(firstSection.tab.id);
        this.updateIndicator();
      }
    }
  }

  private scheduleIndicatorUpdate(delayMs?: number): void {
    if (typeof window !== 'undefined') {
      if (this.indicatorRafId !== null) {
        window.cancelAnimationFrame(this.indicatorRafId);
      }
      this.indicatorRafId = window.requestAnimationFrame(() => {
        this.indicatorRafId = null;
        this.updateIndicator();
      });
    }
    if (delayMs !== undefined) {
      if (this.indicatorTimeout) {
        clearTimeout(this.indicatorTimeout);
      }
      this.indicatorTimeout = setTimeout(() => {
        this.indicatorTimeout = undefined;
        this.updateIndicator();
      }, delayMs);
    }
  }

  private checkStickyState(): void {
    if (!this.isBrowser) return;
    const hostEl = this.elementRef.nativeElement;
    const rect = hostEl.getBoundingClientRect();
    const stickyTop = window.innerWidth >= 1024 ? 76 : window.innerWidth >= 640 ? 72 : 68;
    const currentlySticky = this.isSticky();
    const sticky = currentlySticky ? rect.top <= stickyTop + 5 : rect.top <= stickyTop + 1;

    if (currentlySticky !== sticky) {
      this.isSticky.set(sticky);
      this.syncIndicatorDuringStickyTransition();
    }
  }

  /**
   * Tracks tab positions on every animation frame while the dynamic-island max-width transitions,
   * temporarily disabling the CSS transition on the pill so it stays locked to the active tab.
   */
  private syncIndicatorDuringStickyTransition(): void {
    if (!this.isBrowser) return;
    this.isStickyTransitioning.set(true);
    this.updateIndicator();

    if (this.stickyTransitionRafId !== null) {
      window.cancelAnimationFrame(this.stickyTransitionRafId);
      this.stickyTransitionRafId = null;
    }
    if (this.stickyTransitionTimeout) {
      clearTimeout(this.stickyTransitionTimeout);
    }

    const step = (): void => {
      this.updateIndicator();
      if (this.isStickyTransitioning()) {
        this.stickyTransitionRafId = window.requestAnimationFrame(step);
      }
    };
    this.stickyTransitionRafId = window.requestAnimationFrame(step);

    this.stickyTransitionTimeout = setTimeout(() => {
      if (this.stickyTransitionRafId !== null) {
        window.cancelAnimationFrame(this.stickyTransitionRafId);
        this.stickyTransitionRafId = null;
      }
      this.isStickyTransitioning.set(false);
      this.updateIndicator();
    }, 320);
  }

  private setupScrollTargetGroupSync(): void {
    if (
      typeof CSS === 'undefined' ||
      typeof CSS.supports !== 'function' ||
      !CSS.supports('scroll-target-group: auto')
    ) {
      return;
    }

    const syncFromTargetCurrent = (): void => {
      if (this.isUserClicking) return;
      const listEl = this.tabsListRef()?.nativeElement;
      if (!listEl) return;
      try {
        const currentLink = listEl.querySelector('a:target-current') as HTMLElement | null;
        const tabId = currentLink?.getAttribute('data-tab-id');
        if (tabId && this.activeTabId() !== tabId) {
          this.activeTabId.set(tabId);
          this.updateIndicator();
        }
      } catch {
        // Ignore if :target-current selector is unsupported by the runtime selector engine.
      }
    };

    document.addEventListener('scrollend', syncFromTargetCurrent);
    this.scrollendCleanup = () => {
      document.removeEventListener('scrollend', syncFromTargetCurrent);
    };
  }

  private scrollTargetIntoView(id: string, behavior: ScrollBehavior): void {
    const targetEl = document.getElementById(id);
    if (!targetEl) return;
    targetEl.scrollIntoView?.({ behavior, block: 'start' });
    if (targetEl.hasAttribute('tabindex')) {
      targetEl.focus({ preventScroll: true });
    }
  }

  private resolveBaseUrl(): string {
    if (this.router && (this.router.navigated || !this.isBrowser)) {
      const routerPath = this.router.url.split('#')[0];
      if (routerPath) return routerPath;
    }
    if (this.isBrowser) {
      return `${window.location.pathname}${window.location.search}`;
    }
    return this.platformLocation?.pathname || '';
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
