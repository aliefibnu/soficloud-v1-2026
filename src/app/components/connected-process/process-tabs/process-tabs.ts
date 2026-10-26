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
    class: 'block w-full',
    '(window:resize)': 'onWindowResize()',
  },
})
export class ProcessTabs implements AfterViewInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  readonly isBrowser = isPlatformBrowser(this.platformId);

  readonly tabsListRef = viewChild<ElementRef<HTMLElement>>('tabsListRef');

  private resizeObserver?: ResizeObserver;

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
  readonly indicatorLeft = signal<number>(70);
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

  selectTab(id: string): void {
    this.activeTabId.set(id);
    if (this.isBrowser) {
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
