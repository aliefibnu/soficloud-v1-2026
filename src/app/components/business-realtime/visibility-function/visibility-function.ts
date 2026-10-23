import {
  Component,
  computed,
  signal,
  viewChild,
  ElementRef,
  inject,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

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
export class VisibilityFunction implements AfterViewInit {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly tabsListRef = viewChild<ElementRef<HTMLElement>>('tabsListRef');

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

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      // Defer slightly to ensure font metrics and layouts are established
      setTimeout(() => {
        this.updateIndicator();
      }, 50);
    }
  }

  onWindowResize(): void {
    if (this.isBrowser) {
      this.updateIndicator();
    }
  }

  selectTab(id: string): void {
    this.activeTabId.set(id);
    if (this.isBrowser) {
      setTimeout(() => {
        this.updateIndicator();
      }, 0);
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
