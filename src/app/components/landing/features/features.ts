import { Component, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

export interface FeatureLayer {
  name: string;
  src: string;
  w: number;
  h: number;
  z: number;
  leftPct: number;
  topPct?: number;
  bottomPct?: number;
  widthPct: number;
  heightPct: number;
  hoverClass: string;
}

export interface FeatureCard {
  id: number;
  title: string;
  desc: string;
  topBg: string;
  domeBg: string;
  layers: FeatureLayer[];
}

@Component({
  selector: 'app-features',
  imports: [NgOptimizedImage],
  templateUrl: './features.html',
  styles: `
    @media (prefers-reduced-motion: reduce) {
      .group,
      .group * {
        transition-duration: 0.01ms !important;
        transform: none !important;
      }
    }
  `,
  host: {
    class: 'block w-full',
  },
})
export class Features {
  readonly hoveredCard = signal<number | null>(null);

  readonly cards: FeatureCard[] = [
    {
      id: 1,
      title: 'Financial Management & Accounting',
      desc: 'Kelola proses keuangan dan accounting dari transaksi operasional hingga laporan keuangan, cash control, cost analysis dan management insight.',
      topBg: '#FCD5D0',
      domeBg: '#FFF1EE',
      layers: [
        {
          name: 'Group 9442.png',
          src: '/images/features/1/Group 9442.png',
          w: 174,
          h: 213,
          z: 10,
          leftPct: 28.03,
          bottomPct: 0,
          widthPct: 43.94,
          heightPct: 99.07,
          hoverClass: 'origin-bottom group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9411.png',
          src: '/images/features/1/Group 9411.png',
          w: 138,
          h: 108,
          z: 20,
          leftPct: 18.69,
          bottomPct: 0,
          widthPct: 34.85,
          heightPct: 50.23,
          hoverClass:
            'origin-bottom-left group-hover:scale-105 group-hover:-rotate-3',
        },
        {
          name: 'Group 9409.png',
          src: '/images/features/1/Group 9409.png',
          w: 117,
          h: 85,
          z: 20,
          leftPct: 57.58,
          bottomPct: 0,
          widthPct: 29.55,
          heightPct: 39.53,
          hoverClass:
            'origin-bottom group-hover:translate-x-1.5 group-hover:scale-105',
        },
      ],
    },
    {
      id: 2,
      title: 'Sales & Order Management',
      desc: 'Kelola proses penjualan dari quotation, Sales Order dan pemenuhan pesanan hingga delivery, invoice dan monitoring revenue.',
      topBg: '#CCE0F8',
      domeBg: '#EDF5FE',
      layers: [
        {
          name: 'Group 9440.png',
          src: '/images/features/2/Group 9440.png',
          w: 189,
          h: 206,
          z: 10,
          leftPct: 30.81,
          bottomPct: 0,
          widthPct: 47.73,
          heightPct: 95.81,
          hoverClass: 'origin-bottom group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9638.png',
          src: '/images/features/2/Group 9638.png',
          w: 97,
          h: 92,
          z: 20,
          leftPct: 14.14,
          topPct: 40.93,
          widthPct: 24.49,
          heightPct: 42.79,
          hoverClass:
            'group-hover:-translate-x-3 group-hover:-translate-y-1.5 group-hover:rotate-45 group-hover:scale-105',
        },
        {
          name: 'Group 9637.png',
          src: '/images/features/2/Group 9637.png',
          w: 138,
          h: 49,
          z: 20,
          leftPct: 51.26,
          bottomPct: 0,
          widthPct: 34.85,
          heightPct: 22.79,
          hoverClass:
            'origin-bottom group-hover:translate-x-2 group-hover:scale-105',
        },
      ],
    },
    {
      id: 3,
      title: 'Procurement & Vendor Management',
      desc: 'Kelola kebutuhan pembelian dari Purchase Requisition, approval, vendor, Purchase Order hingga penerimaan barang dan supplier invoice.',
      topBg: '#CBE1E1',
      domeBg: '#EDF6F6',
      layers: [
        {
          name: 'Group 9446.png',
          src: '/images/features/3/Group 9446.png',
          w: 267,
          h: 180,
          z: 10,
          leftPct: 15.66,
          bottomPct: 0,
          widthPct: 67.42,
          heightPct: 83.72,
          hoverClass: 'origin-bottom group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9639.png',
          src: '/images/features/3/Group 9639.png',
          w: 125,
          h: 84,
          z: 20,
          leftPct: 63.13,
          topPct: 27.44,
          widthPct: 31.57,
          heightPct: 39.07,
          hoverClass:
            'group-hover:translate-x-3 group-hover:-translate-y-3.5 group-hover:scale-105',
        },
        {
          name: 'Group 9641.png',
          src: '/images/features/3/Group 9641.png',
          w: 81,
          h: 55,
          z: 20,
          leftPct: 11.11,
          topPct: 64.19,
          widthPct: 20.45,
          heightPct: 25.58,
          hoverClass:
            'group-hover:-translate-x-2.5 group-hover:translate-y-2 group-hover:scale-105',
        },
      ],
    },
    {
      id: 4,
      title: 'Inventory & Warehouse Management',
      desc: 'Pantau stock dan pergerakan barang secara real-time di berbagai gudang, lengkap dengan location, allocation, transfer, opname dan stock control.',
      topBg: '#B4F5F5',
      domeBg: '#E0FAFA',
      layers: [
        {
          name: 'Group 9416.png',
          src: '/images/features/4/Group 9416.png',
          w: 205,
          h: 210,
          z: 10,
          leftPct: 31.31,
          bottomPct: 0,
          widthPct: 51.77,
          heightPct: 97.67,
          hoverClass: 'origin-bottom group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9642.png',
          src: '/images/features/4/Group 9642.png',
          w: 98,
          h: 149,
          z: 20,
          leftPct: 14.39,
          bottomPct: 0,
          widthPct: 24.75,
          heightPct: 69.3,
          hoverClass:
            'origin-bottom group-hover:-translate-x-2 group-hover:scale-105',
        },
        {
          name: 'Group 9417.png',
          src: '/images/features/4/Group 9417.png',
          w: 116,
          h: 93,
          z: 25,
          leftPct: 62.63,
          topPct: 42.79,
          widthPct: 29.29,
          heightPct: 43.26,
          hoverClass:
            'group-hover:translate-x-2.5 group-hover:-translate-y-2.5 group-hover:rotate-6 group-hover:scale-105',
        },
      ],
    },
    {
      id: 5,
      title: 'Manufacturing & Production Control',
      desc: 'Kelola perencanaan dan pelaksanaan produksi dari BOM, Routing dan MRP hingga Production Order, WIP serta analisa biaya produksi.',
      topBg: '#F8C8C8',
      domeBg: '#FDF2F2',
      layers: [
        {
          name: 'Group 9643.png',
          src: '/images/features/5/Group 9643.png',
          w: 257,
          h: 198,
          z: 10,
          leftPct: 17.42,
          bottomPct: 0,
          widthPct: 64.9,
          heightPct: 92.09,
          hoverClass: 'origin-bottom group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9644.png',
          src: '/images/features/5/Group 9644.png',
          w: 131,
          h: 57,
          z: 20,
          leftPct: 44.19,
          topPct: 52.09,
          widthPct: 33.08,
          heightPct: 26.51,
          hoverClass: 'group-hover:translate-x-3.5 group-hover:scale-105',
        },
        {
          name: 'Group 9645.png',
          src: '/images/features/5/Group 9645.png',
          w: 93,
          h: 93,
          z: 20,
          leftPct: 49.24,
          topPct: 8.37,
          widthPct: 23.48,
          heightPct: 43.26,
          hoverClass:
            'group-hover:-translate-y-3 group-hover:rotate-45 group-hover:scale-105',
        },
        {
          name: 'Group 9646.png',
          src: '/images/features/5/Group 9646.png',
          w: 52,
          h: 52,
          z: 25,
          leftPct: 64.39,
          topPct: 23.26,
          widthPct: 13.13,
          heightPct: 24.19,
          hoverClass: 'group-hover:rotate-90',
        },
      ],
    },
    {
      id: 6,
      title: 'Project & Cost Management',
      desc: 'Kelola project budget, progress dan realisasi biaya untuk memantau cost, budget vs actual serta profitability setiap proyek.',
      topBg: '#B8D3F8',
      domeBg: '#E8F1FC',
      layers: [
        {
          name: 'Group 9649.png',
          src: '/images/features/6/Group 9649.png',
          w: 154,
          h: 194,
          z: 10,
          leftPct: 7.58,
          bottomPct: 0,
          widthPct: 38.89,
          heightPct: 90.23,
          hoverClass:
            'origin-bottom group-hover:-translate-x-1.5 group-hover:scale-105',
        },
        {
          name: 'Group 9423.png',
          src: '/images/features/6/Group 9423.png',
          w: 380,
          h: 206,
          z: 15,
          leftPct: 2.02,
          bottomPct: 0,
          widthPct: 95.96,
          heightPct: 95.81,
          hoverClass: 'origin-bottom group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9430.png',
          src: '/images/features/6/Group 9430.png',
          w: 101,
          h: 62,
          z: 20,
          leftPct: 73.74,
          bottomPct: 0,
          widthPct: 25.51,
          heightPct: 28.84,
          hoverClass:
            'origin-bottom group-hover:translate-x-2 group-hover:scale-105',
        },
      ],
    },
    {
      id: 7,
      title: 'Workflow, Approval & Internal Control',
      desc: 'Atur workflow, multi-level approval dan otorisasi sesuai struktur perusahaan, lengkap dengan status proses dan audit trail.',
      topBg: '#BED1F6',
      domeBg: '#EAF1FD',
      layers: [
        {
          name: 'Group 9461.png',
          src: '/images/features/7/Group 9461.png',
          w: 272,
          h: 189,
          z: 10,
          leftPct: 16.41,
          bottomPct: 0,
          widthPct: 68.69,
          heightPct: 87.91,
          hoverClass: 'origin-bottom group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9458.png',
          src: '/images/features/7/Group 9458.png',
          w: 67,
          h: 67,
          z: 20,
          leftPct: 9.6,
          topPct: 21.86,
          widthPct: 16.92,
          heightPct: 31.16,
          hoverClass:
            'group-hover:-translate-x-3 group-hover:-translate-y-3 group-hover:scale-110',
        },
        {
          name: 'Group 9419.png',
          src: '/images/features/7/Group 9419.png',
          w: 142,
          h: 120,
          z: 20,
          leftPct: 69.44,
          topPct: 9.3,
          widthPct: 35.86,
          heightPct: 55.81,
          hoverClass:
            'group-hover:translate-x-2.5 group-hover:-translate-y-2 group-hover:-rotate-6',
        },
        {
          name: 'Group 9420.png',
          src: '/images/features/7/Group 9420.png',
          w: 73,
          h: 39,
          z: 20,
          leftPct: 70.2,
          bottomPct: 0,
          widthPct: 18.43,
          heightPct: 18.14,
          hoverClass: 'origin-bottom group-hover:scale-105',
        },
      ],
    },
    {
      id: 8,
      title: 'Business Analytics & Reporting',
      desc: 'Ubah transaksi harian menjadi dashboard, laporan dan analisa yang membantu management membaca kinerja dan mengambil keputusan.',
      topBg: '#BEE7E7',
      domeBg: '#E7F9F9',
      layers: [
        {
          name: 'Group 9473.png',
          src: '/images/features/8/Group 9473.png',
          w: 280,
          h: 189,
          z: 10,
          leftPct: 10.1,
          bottomPct: 0,
          widthPct: 70.71,
          heightPct: 87.91,
          hoverClass: 'origin-bottom group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9434.png',
          src: '/images/features/8/Group 9434.png',
          w: 125,
          h: 158,
          z: 20,
          leftPct: 7.58,
          bottomPct: 0,
          widthPct: 31.57,
          heightPct: 73.49,
          hoverClass:
            'origin-bottom group-hover:-translate-x-1.5 group-hover:scale-105',
        },
        {
          name: 'Group 9651.png',
          src: '/images/features/8/Group 9651.png',
          w: 110,
          h: 74,
          z: 20,
          leftPct: 63.13,
          topPct: 36.28,
          widthPct: 27.78,
          heightPct: 34.42,
          hoverClass:
            'group-hover:translate-x-3 group-hover:-translate-y-3 group-hover:scale-105',
        },
        {
          name: 'Group 9473 (1).png',
          src: '/images/features/8/Group 9473 (1).png',
          w: 52,
          h: 52,
          z: 25,
          leftPct: 82.83,
          topPct: 51.16,
          widthPct: 13.13,
          heightPct: 24.19,
          hoverClass: 'group-hover:scale-110',
        },
      ],
    },
    {
      id: 9,
      title: 'Security, Cloud & Auditability',
      desc: 'Lindungi akses, data dan histori transaksi melalui role-based authorization, audit trail, cloud access, backup dan monitoring.',
      topBg: '#F7BDBD',
      domeBg: '#FDE8E7',
      layers: [
        {
          name: 'Group 9474 (2).png',
          src: '/images/features/9/Group 9474 (2).png',
          w: 307,
          h: 177,
          z: 10,
          leftPct: 13.13,
          bottomPct: 0,
          widthPct: 77.53,
          heightPct: 82.33,
          hoverClass: 'origin-bottom group-hover:scale-[1.02]',
        },
        {
          name: 'Group 9474.png',
          src: '/images/features/9/Group 9474.png',
          w: 340,
          h: 168,
          z: 20,
          leftPct: 4.29,
          bottomPct: 0,
          widthPct: 85.86,
          heightPct: 78.14,
          hoverClass:
            'origin-bottom group-hover:-translate-x-2 group-hover:scale-105',
        },
        {
          name: 'Group 9474 (1).png',
          src: '/images/features/9/Group 9474 (1).png',
          w: 331,
          h: 167,
          z: 25,
          leftPct: 13.38,
          topPct: 22.33,
          widthPct: 83.59,
          heightPct: 77.67,
          hoverClass:
            'group-hover:translate-x-2.5 group-hover:-translate-y-2 group-hover:scale-105',
        },
      ],
    },
  ];

  setHoveredCard(id: number | null): void {
    this.hoveredCard.set(id);
  }
}
