import {
  Component,
  computed,
  signal,
  viewChild,
  ElementRef,
  inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  DestroyRef,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

export interface ProcessTab {
  readonly id: string;
  readonly titleKey: string;
  readonly defaultTitle: string;
}

@Component({
  selector: 'app-process-tabs',
  imports: [TranslatePipe],
  templateUrl: './process-tabs.html',
  host: {
    class:
      'block w-full sticky top-[68px] sm:top-[72px] lg:top-[76px] my-4 sm:my-6 lg:my-8 z-30 [overflow-anchor:none]',
    '(window:resize)': 'onWindowResize()',
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class ProcessTabs implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly tabsListRef = viewChild<ElementRef<HTMLElement>>('tabsListRef');

  private resizeObserver?: ResizeObserver;
  readonly isSticky = signal<boolean>(false);
  readonly isStickyTransitioning = signal<boolean>(false);
  private scrollRafId: number | null = null;
  private stickyTransitionRafId: number | null = null;
  private stickyTransitionTimeout?: ReturnType<typeof setTimeout>;
  private isUserClicking = false;
  private userClickTimeout?: ReturnType<typeof setTimeout>;

  readonly tabs: readonly ProcessTab[] = [
    {
      id: 'satu-data',
      titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.SATU_DATA',
      defaultTitle: 'SATU DATA',
    },
    {
      id: 'alur-transaksi',
      titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.ALUR_TRANSAKSI',
      defaultTitle: 'ALUR TRANSAKSI',
    },
    {
      id: 'dampak-akuntansi',
      titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.DAMPAK_AKUNTANSI',
      defaultTitle: 'DAMPAK AKUNTANSI',
    },
    {
      id: 'laporan',
      titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.LAPORAN',
      defaultTitle: 'LAPORAN',
    },
    {
      id: 'peta-lengkap',
      titleKey: 'CONNECTED_PROCESS.PROCESS_TABS.PETA_LENGKAP',
      defaultTitle: 'PETA LENGKAP',
    },
  ];

  readonly activeTabId = signal<string>('satu-data');
  readonly indicatorLeft = signal<number>(0);
  readonly indicatorWidth = signal<number>(140);

  readonly activeTabIndex = computed<number>(() => {
    const idx = this.tabs.findIndex((t) => t.id === this.activeTabId());
    return idx >= 0 ? idx : 0;
  });

  readonly activeTab = computed<ProcessTab>(() => {
    return this.tabs[this.activeTabIndex()] ?? this.tabs[0];
  });

  constructor() {
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.isBrowser) {
          requestAnimationFrame(() => this.updateIndicator());
          setTimeout(() => this.updateIndicator(), 50);
        }
      });

    this.translate.onTranslationChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.isBrowser) {
          requestAnimationFrame(() => this.updateIndicator());
          setTimeout(() => this.updateIndicator(), 50);
        }
      });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.updateIndicator();
      requestAnimationFrame(() => this.updateIndicator());
      setTimeout(() => this.updateIndicator(), 50);

      const listEl = this.tabsListRef()?.nativeElement;
      if (typeof ResizeObserver !== 'undefined' && listEl) {
        this.resizeObserver = new ResizeObserver(() => {
          this.updateIndicator();
        });
        this.resizeObserver.observe(listEl);
        const buttons = listEl.querySelectorAll('[role="tab"]');
        buttons.forEach((btn) => this.resizeObserver?.observe(btn));
      }

      if (typeof document !== 'undefined' && document.fonts?.ready) {
        document.fonts.ready.then(() => {
          this.updateIndicator();
        });
      }

      this.checkStickyState();
      this.updateActiveSectionByScroll();
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    if (this.scrollRafId !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(this.scrollRafId);
    }
    if (this.stickyTransitionRafId !== null && typeof window !== 'undefined') {
      window.cancelAnimationFrame(this.stickyTransitionRafId);
    }
    if (this.stickyTransitionTimeout) {
      clearTimeout(this.stickyTransitionTimeout);
    }
    if (this.userClickTimeout) {
      clearTimeout(this.userClickTimeout);
    }
  }

  onWindowResize(): void {
    if (this.isBrowser) {
      this.updateIndicator();
      this.checkStickyState();
      this.updateActiveSectionByScroll();
    }
  }

  onWindowScroll(): void {
    if (this.isBrowser) {
      this.checkStickyState();
      if (this.scrollRafId !== null) return;
      this.scrollRafId = window.requestAnimationFrame(() => {
        this.scrollRafId = null;
        this.updateActiveSectionByScroll();
      });
    }
  }

  private checkStickyState(): void {
    if (!this.isBrowser) return;
    const hostEl = this.elementRef.nativeElement;
    const rect = hostEl.getBoundingClientRect();
    const stickyTop = window.innerWidth >= 1024 ? 76 : window.innerWidth >= 640 ? 72 : 68;
    // Apply a hysteresis band around stickyTop so subpixel scroll adjustments or trackpad jitter
    // at the threshold cannot oscillate the sticky state back and forth.
    const currentlySticky = this.isSticky();
    const sticky = currentlySticky ? rect.top <= stickyTop + 5 : rect.top <= stickyTop + 1;

    if (currentlySticky !== sticky) {
      this.isSticky.set(sticky);
      this.syncIndicatorDuringStickyTransition();
    }
  }

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

  updateActiveSectionByScroll(): void {
    if (!this.isBrowser || this.isUserClicking) return;

    const windowH = window.innerHeight || 800;
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const docH = document.documentElement.scrollHeight;

    // Check if scrolled near the bottom of the document -> activate last tab
    if (docH > windowH && scrollY + windowH >= docH - 80) {
      const lastTabId = this.tabs[this.tabs.length - 1].id;
      if (this.activeTabId() !== lastTabId) {
        this.activeTabId.set(lastTabId);
        this.updateIndicator();
      }
      return;
    }

    // Natural reading line: placed around 38% of the viewport (eye focus level below sticky headers)
    const stickyHeaderOffset = window.innerWidth >= 1024 ? 135 : 120;
    const readingLine = Math.max(stickyHeaderOffset + 60, Math.floor(windowH * 0.38));

    // Find the section that covers the reading line
    for (const tab of this.tabs) {
      const el = document.getElementById(tab.id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= readingLine && rect.bottom > readingLine) {
        if (this.activeTabId() !== tab.id) {
          this.activeTabId.set(tab.id);
          this.updateIndicator();
        }
        return;
      }
    }

    // Fallback: If above the first section's reading line, default to first tab
    const firstEl = document.getElementById(this.tabs[0].id);
    if (firstEl && firstEl.getBoundingClientRect().top > readingLine) {
      if (this.activeTabId() !== this.tabs[0].id) {
        this.activeTabId.set(this.tabs[0].id);
        this.updateIndicator();
      }
    }
  }

  selectTab(id: string): void {
    this.activeTabId.set(id);
    if (this.isBrowser) {
      this.isUserClicking = true;
      if (this.userClickTimeout) {
        clearTimeout(this.userClickTimeout);
      }
      this.userClickTimeout = setTimeout(() => {
        this.isUserClicking = false;
      }, 700);

      this.updateIndicator();
      setTimeout(() => {
        this.updateIndicator();
      }, 0);

      const listEl = this.tabsListRef()?.nativeElement;
      const activeBtn = listEl?.querySelector(
        `[data-tab-id="${id}"]`,
      ) as HTMLElement | null;
      activeBtn?.scrollIntoView?.({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });

      const targetEl = document.getElementById(id);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  updateIndicator(): void {
    if (!this.isBrowser) return;
    const listEl = this.tabsListRef()?.nativeElement;
    if (!listEl) return;

    const firstBtn = listEl.querySelector(
      `[data-tab-id="${this.tabs[0].id}"]`,
    ) as HTMLElement | null;
    const activeBtn = listEl.querySelector(
      `[data-tab-id="${this.activeTabId()}"]`,
    ) as HTMLElement | null;

    if (activeBtn && firstBtn) {
      const firstRect = firstBtn.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      // Calculate relative to the first button (0px at 0% first tab)
      const rawLeft = btnRect.left - firstRect.left;
      const safeLeft = Math.max(0, rawLeft);

      this.indicatorLeft.set(safeLeft);
      this.indicatorWidth.set(btnRect.width);
    }
  }

  onTabKeydown(event: KeyboardEvent, currentIndex: number): void {
    let nextIndex: number | null = null;
    const total = this.tabs.length;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (currentIndex + 1) % total;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (currentIndex - 1 + total) % total;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = total - 1;
        break;
    }

    if (nextIndex !== null) {
      event.preventDefault();
      const nextTab = this.tabs[nextIndex];
      if (nextTab) {
        this.selectTab(nextTab.id);
        if (this.isBrowser) {
          const targetBtn = document.getElementById(`tab-${nextTab.id}`);
          targetBtn?.focus();
        }
      }
    }
  }
}
