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

export interface VisibilityTab {
  readonly id: string;
  readonly titleKey: string;
  readonly defaultTitle: string;
  readonly altKey: string;
  readonly defaultAlt: string;
}

@Component({
  selector: 'app-visibility-function',
  imports: [TranslatePipe],
  templateUrl: './visibility-function.html',
  host: {
    class: 'block w-full',
    '(window:resize)': 'onWindowResize()',
  },
})
export class VisibilityFunction implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly tabsListRef = viewChild<ElementRef<HTMLElement>>('tabsListRef');

  private resizeObserver?: ResizeObserver;

  readonly tabs: readonly VisibilityTab[] = [
    {
      id: 'sales-performance',
      titleKey: 'BUSINESS_REALTIME.VISIBILITY_FUNCTION.TABS.SALES_PERFORMANCE',
      defaultTitle: 'SALES PERFORMANCE',
      altKey: 'BUSINESS_REALTIME.VISIBILITY_FUNCTION.ALTS.SALES_PERFORMANCE',
      defaultAlt: 'Sales Performance Dashboard',
    },
    {
      id: 'procurement-control',
      titleKey: 'BUSINESS_REALTIME.VISIBILITY_FUNCTION.TABS.PROCUREMENT_CONTROL',
      defaultTitle: 'PROCUREMENT CONTROL',
      altKey: 'BUSINESS_REALTIME.VISIBILITY_FUNCTION.ALTS.PROCUREMENT_CONTROL',
      defaultAlt: 'Procurement Control Dashboard',
    },
    {
      id: 'material-readiness',
      titleKey: 'BUSINESS_REALTIME.VISIBILITY_FUNCTION.TABS.MATERIAL_READINESS',
      defaultTitle: 'MATERIAL READINESS',
      altKey: 'BUSINESS_REALTIME.VISIBILITY_FUNCTION.ALTS.MATERIAL_READINESS',
      defaultAlt: 'Material Readiness Dashboard',
    },
    {
      id: 'order-pipeline',
      titleKey: 'BUSINESS_REALTIME.VISIBILITY_FUNCTION.TABS.ORDER_PIPELINE',
      defaultTitle: 'ORDER PIPELINE',
      altKey: 'BUSINESS_REALTIME.VISIBILITY_FUNCTION.ALTS.ORDER_PIPELINE',
      defaultAlt: 'Order Pipeline Dashboard',
    },
    {
      id: 'financial-visibility',
      titleKey: 'BUSINESS_REALTIME.VISIBILITY_FUNCTION.TABS.FINANCIAL_VISIBILITY',
      defaultTitle: 'FINANCIAL VISIBILITY',
      altKey: 'BUSINESS_REALTIME.VISIBILITY_FUNCTION.ALTS.FINANCIAL_VISIBILITY',
      defaultAlt: 'Financial Visibility Dashboard',
    },
  ];

  readonly activeTabId = signal<string>('sales-performance');
  readonly indicatorLeft = signal<number>(70);
  readonly indicatorWidth = signal<number>(224);

  readonly activeTabIndex = computed<number>(() => {
    const idx = this.tabs.findIndex((t) => t.id === this.activeTabId());
    return idx >= 0 ? idx : 0;
  });

  readonly activeTab = computed<VisibilityTab>(() => {
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
      if (typeof window !== 'undefined' && window.location.hash) {
        const hashId = window.location.hash.slice(1);
        if (this.tabs.some((t) => t.id === hashId)) {
          this.activeTabId.set(hashId);
        }
      }

      this.updateIndicator();
      this.scrollActiveTabIntoView('auto');
      requestAnimationFrame(() => {
        this.updateIndicator();
        this.scrollActiveTabIntoView('auto');
      });
      setTimeout(() => {
        this.updateIndicator();
        this.scrollActiveTabIntoView('auto');
      }, 50);

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
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  onWindowResize(): void {
    if (this.isBrowser) {
      this.updateIndicator();
    }
  }

  scrollActiveTabIntoView(behavior: ScrollBehavior = 'smooth'): void {
    if (!this.isBrowser) return;
    const listEl = this.tabsListRef()?.nativeElement;
    const activeBtn = listEl?.querySelector(
      `[data-tab-id="${this.activeTabId()}"]`,
    ) as HTMLElement | null;
    activeBtn?.scrollIntoView?.({
      behavior,
      block: 'nearest',
      inline: 'center',
    });
  }

  selectTab(id: string): void {
    this.activeTabId.set(id);
    if (this.isBrowser) {
      this.updateIndicator();
      setTimeout(() => {
        this.updateIndicator();
      }, 0);

      this.scrollActiveTabIntoView('smooth');

      const targetEl = document.getElementById(id);
      if (targetEl) {
        targetEl.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
      }

      if (typeof history !== 'undefined' && history.replaceState) {
        history.replaceState(null, '', `#${id}`);
      }
    }
  }

  updateIndicator(): void {
    if (!this.isBrowser) return;
    const listEl = this.tabsListRef()?.nativeElement;
    if (!listEl) return;

    const activeBtn = listEl.querySelector(
      `[data-tab-id="${this.activeTabId()}"]`,
    ) as HTMLElement | null;

    if (activeBtn) {
      const listRect = listEl.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const rawLeft = btnRect.left - listRect.left;
      const safeLeft = Math.max(0, rawLeft);
      const safeWidth = Math.min(btnRect.width, Math.max(0, listRect.width - safeLeft));

      this.indicatorLeft.set(safeLeft);
      this.indicatorWidth.set(safeWidth);
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
