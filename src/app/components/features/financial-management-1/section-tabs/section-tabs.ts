import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  linkedSignal,
  OnDestroy,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface FeatureTab {
  readonly id: string;
  readonly titleKey?: string;
  readonly defaultTitle: string;
}

let nextSectionTabsInstanceId = 0;

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
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly tabs = input.required<readonly FeatureTab[]>();
  readonly navAriaLabel = input<string>('Financial management sections');

  readonly scrollerRef = viewChild<ElementRef<HTMLElement>>('scrollerRef');
  readonly tabsListRef = viewChild<ElementRef<HTMLElement>>('tabsListRef');

  readonly anchorName = `--fm-section-tab-active-${++nextSectionTabsInstanceId}`;
  readonly isSticky = signal<boolean>(false);
  readonly moreStart = signal<boolean>(false);
  readonly moreEnd = signal<boolean>(false);

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

  private scrollRafId: number | null = null;
  private isUserClicking = false;
  private userClickTimeout?: ReturnType<typeof setTimeout>;
  private edgeFadeObserver?: IntersectionObserver;
  private scrollendCleanup?: () => void;

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.slice(1);
      if (this.tabs().some((t) => t.id === hashId)) {
        this.activeTabId.set(hashId);
      }
    }

    this.setupScrollTargetGroupSync();
    this.setupEdgeFadeFallback();
    this.checkStickyState();
    this.updateActiveSectionByScroll();
  }

  ngOnDestroy(): void {
    this.edgeFadeObserver?.disconnect();
    this.scrollendCleanup?.();
    if (this.scrollRafId !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(this.scrollRafId);
    }
    if (this.userClickTimeout) {
      clearTimeout(this.userClickTimeout);
    }
  }

  onWindowResize(): void {
    if (!this.isBrowser) return;
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

    const scrollBehavior: ScrollBehavior = this.prefersReducedMotion() ? 'auto' : 'smooth';

    const listEl = this.tabsListRef()?.nativeElement;
    const activeLink = listEl?.querySelector(`[data-tab-id="${id}"]`) as HTMLElement | null;
    activeLink?.scrollIntoView?.({
      behavior: scrollBehavior,
      block: 'nearest',
      inline: 'nearest',
      container: 'nearest',
    } as ScrollIntoViewOptions);

    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView?.({ behavior: scrollBehavior, block: 'start' });
      if (targetEl.hasAttribute('tabindex')) {
        targetEl.focus({ preventScroll: true });
      }
    }

    if (typeof history !== 'undefined' && typeof history.replaceState === 'function') {
      history.replaceState(null, '', `#${id}`);
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
        }
        return;
      }
    }

    const firstSection = existingSections[0];
    if (firstSection.el.getBoundingClientRect().top > readingLine) {
      if (this.activeTabId() !== firstSection.tab.id) {
        this.activeTabId.set(firstSection.tab.id);
      }
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
    }
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

  private setupEdgeFadeFallback(): void {
    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      typeof CSS.supports === 'function' &&
      CSS.supports('animation-timeline', 'scroll()');

    if (supportsScrollTimeline || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const scrollerEl = this.scrollerRef()?.nativeElement;
    const listEl = this.tabsListRef()?.nativeElement;
    if (!scrollerEl || !listEl) return;

    const firstItem = listEl.firstElementChild;
    const lastItem = listEl.lastElementChild;
    if (!firstItem || !lastItem) return;

    this.edgeFadeObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === firstItem) {
            this.moreStart.set(entry.intersectionRatio < 1);
          }
          if (entry.target === lastItem) {
            this.moreEnd.set(entry.intersectionRatio < 1);
          }
        }
      },
      { root: scrollerEl, threshold: 1, rootMargin: '1px' },
    );

    this.edgeFadeObserver.observe(firstItem);
    this.edgeFadeObserver.observe(lastItem);
  }

  private prefersReducedMotion(): boolean {
    return (
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }
}
