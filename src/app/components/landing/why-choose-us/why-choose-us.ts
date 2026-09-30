import { Component, computed, inject, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../../systems/lib/language.service';

export interface WhyChooseUsCard {
  readonly id: number;
  readonly icon: string;
  readonly defaultTitle: string;
  readonly defaultDesc: string;
}

@Component({
  selector: 'app-why-choose-us',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './why-choose-us.html',
  styles: `
    @media (prefers-reduced-motion: reduce) {
      .carousel-card {
        transition-duration: 0.01ms !important;
      }
    }
  `,
  host: {
    class: 'block w-full',
    tabindex: '0',
    role: 'region',
    'aria-roledescription': 'carousel',
    'aria-label': 'Mengapa Perusahaan Memilih SOFICloud',
    '(keydown.arrowLeft)': 'prev()',
    '(keydown.arrowRight)': 'next()',
  },
})
export class WhyChooseUs {
  protected readonly languageService = inject(LanguageService);

  readonly currentIndex = signal<number>(0);
  readonly hoveredIndex = signal<number | null>(null);

  private touchStartX = 0;
  private isMouseDown = false;
  private mouseStartX = 0;

  readonly cards: readonly WhyChooseUsCard[] = [
    {
      id: 1,
      icon: '/images/why-choose-us/calendar.svg',
      defaultTitle: 'Dikembangkan\nSejak 1998',
      defaultDesc:
        'Pengalaman lebih dari dua dekade membentuk SOFICloud menjadi ERP yang matang, stabil, dan terus berkembang mengikuti kebutuhan bisnis.',
    },
    {
      id: 2,
      icon: '/images/why-choose-us/house.svg',
      defaultTitle: 'Teruji dalam Berbagai\nImplementasi',
      defaultDesc:
        'Digunakan oleh berbagai perusahaan dengan karakter bisnis dan proses operasional yang beragam di berbagai industri.',
    },
    {
      id: 3,
      icon: '/images/why-choose-us/screen.svg',
      defaultTitle: 'Modern, Responsif, dan Nyaman\nDigunakan',
      defaultDesc:
        'Antarmuka bersih, cepat, dan mudah dipahami untuk mendukung aktivitas kerja sehari-hari.',
    },
    {
      id: 4,
      icon: '/images/why-choose-us/gear.svg',
      defaultTitle: 'Fleksibel Mengikuti\nProses Bisnis',
      defaultDesc:
        'Alur kerja dan parameter sistem dapat disesuaikan dengan kebutuhan operasional perusahaan.',
    },
    {
      id: 5,
      icon: '/images/why-choose-us/lightbulb.svg',
      defaultTitle: 'Lebih Mudah Dipahami\nPengguna',
      defaultDesc:
        'Struktur menu dan proses kerja membantu pengguna beradaptasi lebih cepat dalam aktivitas operasional.',
    },
    {
      id: 6,
      icon: '/images/why-choose-us/puzzle.svg',
      defaultTitle: 'Modul Lengkap Dalam\nSatu Sistem',
      defaultDesc:
        'Finance, Sales, Procurement, Inventory, Manufacturing, Project, Workflow, dan Analytics saling terhubung.',
    },
    {
      id: 7,
      icon: '/images/why-choose-us/headset.svg',
      defaultTitle: 'Dukungan Purna Jual\nBerkelanjutan',
      defaultDesc:
        'Tim implementasi memahami sistem, proses bisnis, dan kebutuhan pelanggan setelah sistem mulai digunakan.',
    },
    {
      id: 8,
      icon: '/images/why-choose-us/shield.svg',
      defaultTitle: 'Andal, Aman, dan Dapat\nDiandalkan',
      defaultDesc:
        'Infrastruktur cloud yang aman, backup terjadwal, dan standar keamanan data menjaga kelancaran operasional.',
    },
    {
      id: 9,
      icon: '/images/why-choose-us/chart.svg',
      defaultTitle: 'Mendukung Keputusan\nBerbasis Data',
      defaultDesc:
        'Laporan real-time, dashboard interaktif, dan analitik membantu management mengambil keputusan lebih tepat.',
    },
  ];

  readonly totalCards = computed(() => this.cards.length);

  /**
   * Computes shortest circular distance from current active index
   * e.g. for 9 items, returns range [-4, 4]
   */
  getShortestOffset(targetIndex: number): number {
    const total = this.cards.length;
    const current = this.currentIndex();
    let diff = targetIndex - current;
    while (diff > total / 2) diff -= total;
    while (diff <= -total / 2) diff += total;
    return diff;
  }

  getCardTransform(offset: number): string {
    if (offset === 0) {
      return 'translate(-50%, -50%) scale(1)';
    }

    // Horizontal center distance: 385px creates a clear ~35px gap without overlap
    const baseSpacing = 385;
    const xTranslate = offset * baseSpacing;
    const scale = Math.max(0.82, 1 - Math.abs(offset) * 0.06);

    return `translate(calc(-50% + ${xTranslate}px), -50%) scale(${scale})`;
  }

  getCardOpacity(offset: number): number {
    const abs = Math.abs(offset);
    if (abs === 0) return 1;
    if (abs === 1) return 0.7;
    if (abs === 2) return 0.35;
    return 0;
  }

  getCardZIndex(offset: number): number {
    const abs = Math.abs(offset);
    return 30 - abs * 5;
  }

  getCardFilter(offset: number): string {
    const abs = Math.abs(offset);
    if (abs === 0) return 'none';
    if (abs === 1) return 'blur(2.8px)';
    return 'blur(6px)';
  }

  next(): void {
    this.currentIndex.update((prev) => (prev + 1) % this.cards.length);
  }

  prev(): void {
    this.currentIndex.update(
      (prev) => (prev - 1 + this.cards.length) % this.cards.length,
    );
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.cards.length) {
      this.currentIndex.set(index);
    }
  }

  onCardClick(index: number, offset: number): void {
    if (offset !== 0) {
      this.goTo(index);
    }
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    const touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe(this.touchStartX, touchEndX);
  }

  onMouseDown(event: MouseEvent): void {
    this.isMouseDown = true;
    this.mouseStartX = event.clientX;
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isMouseDown) return;
    this.isMouseDown = false;
    const mouseEndX = event.clientX;
    this.handleSwipe(this.mouseStartX, mouseEndX);
  }

  private handleSwipe(startX: number, endX: number): void {
    const threshold = 35;
    const diff = endX - startX;
    if (diff > threshold) {
      this.prev();
    } else if (diff < -threshold) {
      this.next();
    }
  }
}
