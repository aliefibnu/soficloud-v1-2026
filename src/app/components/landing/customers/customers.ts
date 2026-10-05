import {
  Component,
  signal,
  computed,
  inject,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export interface CustomerCompany {
  id: number;
  name: string;
  logo: string;
}

export interface ClonedCustomerCompany extends CustomerCompany {
  virtualIdx: number;
}

export const TOP_CUSTOMERS: CustomerCompany[] = [
  { id: 1, name: 'PT. Madeira Threads Indonesia', logo: 'images/customers/customer3.png' },
  { id: 2, name: 'PT. VMC Fishing Tackle Indonesia', logo: 'images/customers/customer10.png' },
  { id: 3, name: 'PT. Sanipak Indonesia', logo: 'images/customers/customer4.png' },
  { id: 4, name: 'PT Rajawali Sakti Utama', logo: 'images/customers/customer2.jpeg' },
  { id: 5, name: 'PT. Salam Jaya Lestari', logo: 'images/customers/customer21.png' },
  { id: 6, name: 'PT. Fanindo Cipta Propertindo', logo: 'images/customers/customer5.png' },
  { id: 7, name: 'PT. Suntech Plastics Industries Batam', logo: 'images/customers/customer16.png' },
  { id: 8, name: 'PT. Bandar Sumatra Indonesia', logo: 'images/customers/customer43.png' },
  { id: 9, name: 'PT. Inhil Sarimas Kelapa', logo: 'images/customers/customer46.png' },
  { id: 10, name: 'PT. Adhya Tirta Lampung', logo: 'images/customers/customer_atl.png' },
];

// Row 1 starts with Kubota, ISK, ATL, BSI to match the screenshot exactly
export const BOTTOM_ROW_1: CustomerCompany[] = [
  { id: 11, name: 'PT. Kubota Indonesia', logo: 'images/customers/customer50.jpeg' },
  { id: 12, name: 'PT. Inhil Sarimas Kelapa', logo: 'images/customers/customer46.png' },
  { id: 13, name: 'PT. Asia Talent Lestari', logo: 'images/customers/customer_atl.png' },
  { id: 14, name: 'PT. Bandar Sumatra Indonesia', logo: 'images/customers/customer43.png' },
  { id: 15, name: 'PT. Indofood Fortuna Makmur', logo: 'images/customers/customer1.png' },
  { id: 16, name: 'PT. Megah Surya Pertiwi', logo: 'images/customers/customer6.png' },
  { id: 17, name: 'PT. Citra Tubindo', logo: 'images/customers/customer7.jpeg' },
  { id: 18, name: 'PT. Global Chemindo Megatrading', logo: 'images/customers/customer8.png' },
  { id: 19, name: 'PT. Pelayaran Bahtera Karunia Mandiri', logo: 'images/customers/customer11.jpeg' },
  { id: 20, name: 'PT. Batamindo Investment Cakrawala', logo: 'images/customers/customer12.jpeg' },
  { id: 21, name: 'PT. Sumber Graha Sejahtera', logo: 'images/customers/customer13.png' },
  { id: 22, name: 'PT. Berau Coal', logo: 'images/customers/customer14.png' },
  { id: 23, name: 'PT. McDermott Indonesia', logo: 'images/customers/customer15.jpeg' },
  { id: 24, name: 'PT. Schneider Electric Manufacturing', logo: 'images/customers/customer17.png' },
  { id: 25, name: 'PT. Shimano Batam', logo: 'images/customers/customer18.png' },
  { id: 26, name: 'PT. TDK Electronics Indonesia', logo: 'images/customers/customer19.jpeg' },
  { id: 27, name: 'PT. Epson Batam', logo: 'images/customers/customer20.png' },
  { id: 28, name: 'PT. Sat Nusapersada', logo: 'images/customers/customer22.jpeg' },
  { id: 29, name: 'PT. Caterindo Jaya Gemilang', logo: 'images/customers/customer23.jpeg' },
  { id: 30, name: 'PT. SMOE Indonesia', logo: 'images/customers/customer24.png' },
  { id: 31, name: 'PT. Nexus Engineering Indonesia', logo: 'images/customers/customer25.png' },
  { id: 32, name: 'PT. Austin Engineering Indonesia', logo: 'images/customers/customer26.png' },
];

// Row 2 starts with Eagle (KSP), Suntech, Fanindo, Lytech to match the screenshot exactly
export const BOTTOM_ROW_2: CustomerCompany[] = [
  { id: 33, name: 'PT. KSP Indonesia', logo: 'images/customers/customer9.png' },
  { id: 34, name: 'PT. Suntech Plastics Indonesia', logo: 'images/customers/customer16.png' },
  { id: 35, name: 'PT. Fanindo Cipta Investama', logo: 'images/customers/customer5.png' },
  { id: 36, name: 'PT. Lytech Batam', logo: 'images/customers/customer49.jpeg' },
  { id: 37, name: 'PT. Caterpillar Indonesia Batam', logo: 'images/customers/customer27.jpeg' },
  { id: 38, name: 'PT. Siemens Energy Indonesia', logo: 'images/customers/customer28.jpeg' },
  { id: 39, name: 'PT. Dynacast Indonesia', logo: 'images/customers/customer29.jpeg' },
  { id: 40, name: 'PT. Cladtek Bi-Metal Manufacturing', logo: 'images/customers/customer30.jpeg' },
  { id: 41, name: 'PT. Alcon Batam', logo: 'images/customers/customer31.png' },
  { id: 42, name: 'PT. Excelitas Technologies Batam', logo: 'images/customers/customer33.jpg' },
  { id: 43, name: 'PT. Infineon Technologies Batam', logo: 'images/customers/customer34.png' },
  { id: 44, name: 'PT. Pegatron Technology Indonesia', logo: 'images/customers/customer35.jpg' },
  { id: 45, name: 'PT. Toyokanetsu Indonesia', logo: 'images/customers/customer36.png' },
  { id: 46, name: 'PT. Meitech Egemac', logo: 'images/customers/customer37.jpeg' },
  { id: 47, name: 'PT. Rubycon Indonesia', logo: 'images/customers/customer38.jpeg' },
  { id: 48, name: 'PT. Flextronics Technology Indonesia', logo: 'images/customers/customer39.jpeg' },
  { id: 49, name: 'PT. Sumitomo Wiring Systems Batam', logo: 'images/customers/customer40.jpeg' },
  { id: 50, name: 'PT. Foster Electric Indonesia', logo: 'images/customers/customer41.jpg' },
  { id: 51, name: 'PT. Ciba Vision Batam', logo: 'images/customers/customer42.jpeg' },
  { id: 52, name: 'PT. Honeywell Indonesia', logo: 'images/customers/customer44.jpeg' },
  { id: 53, name: 'PT. Bredero Shaw Indonesia', logo: 'images/customers/customer45.png' },
  { id: 54, name: 'PT. Halliburton Logging Services', logo: 'images/customers/customer47.jpeg' },
];

@Component({
  imports: [TranslatePipe],
  selector: 'app-customers',
  styles: `
    /* Flow pulse animations: linear (steady constant speed), runs ONCE to destination, then fades out */
    .pulse-upper-right {
      stroke-dasharray: 40 180;
      stroke-dashoffset: 40;
      animation: pulseFlowRightUp 2.4s linear forwards;
    }

    .pulse-lower-right {
      stroke-dasharray: 50 600;
      stroke-dashoffset: 50;
      animation: pulseFlowRightVert2 2.4s linear forwards;
    }

    .pulse-left {
      stroke-dasharray: 50 600;
      stroke-dashoffset: 50;
      animation: pulseFlowLeftVert2 2.4s linear forwards;
    }

    .pulse-bottom-horizontal {
      stroke-dasharray: 80 1200;
      stroke-dashoffset: 80;
      animation: pulseFlowBottomHoriz 2.4s linear forwards;
    }

    @keyframes pulseFlowRightUp {
      0% {
        opacity: 0;
        stroke-dashoffset: 40;
      }
      8% {
        opacity: 1;
      }
      85% {
        opacity: 1;
      }
      96% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        stroke-dashoffset: -110;
      }
    }

    @keyframes pulseFlowRightVert2 {
      0% {
        opacity: 0;
        stroke-dashoffset: 50;
      }
      8% {
        opacity: 1;
      }
      85% {
        opacity: 1;
      }
      96% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        stroke-dashoffset: -275;
      }
    }

    @keyframes pulseFlowLeftVert2 {
      0% {
        opacity: 0;
        stroke-dashoffset: 50;
      }
      8% {
        opacity: 1;
      }
      85% {
        opacity: 1;
      }
      96% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        stroke-dashoffset: -305;
      }
    }

    @keyframes pulseFlowBottomHoriz {
      0% {
        opacity: 0;
        stroke-dashoffset: 80;
      }
      6% {
        opacity: 1;
      }
      88% {
        opacity: 1;
      }
      97% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        stroke-dashoffset: -710;
      }
    }

    /* Interactive logo transition in center card */
    .logo-switch-active {
      animation: logoPop 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    @keyframes logoPop {
      0% {
        opacity: 0;
        transform: scale(0.85) translateY(4px);
      }
      50% {
        opacity: 0.95;
        transform: scale(1.03) translateY(-1px);
      }
      100% {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    /* Infinite bottom marquee: Row 1 moves left-to-right, Row 2 moves right-to-left */
    .marquee-track-right {
      display: flex;
      width: max-content;
      animation: marqueeToRight 46s linear infinite;
    }

    .marquee-track-left {
      display: flex;
      width: max-content;
      animation: marqueeToLeft 42s linear infinite;
    }

    @keyframes marqueeToRight {
      0% {
        transform: translateX(-50%);
      }
      100% {
        transform: translateX(0%);
      }
    }

    @keyframes marqueeToLeft {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-50%);
      }
    }

    .marquee-mask {
      mask-image: linear-gradient(
        to right,
        transparent,
        black 4%,
        black 96%,
        transparent
      );
      -webkit-mask-image: linear-gradient(
        to right,
        transparent,
        black 4%,
        black 96%,
        transparent
      );
    }
  `,
  templateUrl: './customers.html',
})
export class Customers implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly topCustomers = TOP_CUSTOMERS;
  readonly bottomRow1 = BOTTOM_ROW_1;
  readonly bottomRow2 = BOTTOM_ROW_2;

  // Cloned array for infinite carousel in top row (5 sets of 10 = 50 items)
  readonly infiniteTopCustomers: ClonedCustomerCompany[] = Array.from(
    { length: 50 },
    (_, i) => ({
      ...TOP_CUSTOMERS[i % TOP_CUSTOMERS.length],
      virtualIdx: i,
    })
  );

  // Virtual index starts at 22 (set 2, index 2 = PT. Sanipak Indonesia)
  readonly virtualIndex = signal<number>(22);
  readonly isSlidingSmooth = signal<boolean>(true);
  readonly isLineAnimating = signal<boolean>(true);
  readonly isLogoTransitioning = signal<boolean>(true);
  readonly isPaused = signal<boolean>(false);

  readonly activeCustomerIndex = computed(
    () => this.virtualIndex() % this.topCustomers.length
  );

  readonly activeCustomer = computed(
    () => this.topCustomers[this.activeCustomerIndex()]
  );

  // Computes exact horizontal shift so the active card aligns inside the fixed center spotlight
  readonly trackTransform = computed(() => {
    const cardStep = 128; // 112px width + 16px gap
    const halfCard = 56; // 112px / 2
    const offset = this.virtualIndex() * cardStep + halfCard;
    return `translateX(calc(50% - ${offset}px))`;
  });

  // Top line indicator position: smoothly slides across the top horizontal line as PT changes
  readonly indicatorTransform = computed(() => {
    const minX = 30;
    const maxX = 660;
    const step = (maxX - minX) / (this.topCustomers.length - 1);
    const x = minX + this.activeCustomerIndex() * step;
    return `translateX(${x}px)`;
  });

  private timerId: ReturnType<typeof setInterval> | null = null;
  private logoTransitionTimeout: ReturnType<typeof setTimeout> | null = null;
  private lineAnimationTimeout: ReturnType<typeof setTimeout> | null = null;
  private lineCleanupTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.startRotationTimer();
    this.triggerLineAnimation();

    this.destroyRef.onDestroy(() => {
      this.stopRotationTimer();
      if (this.logoTransitionTimeout) {
        clearTimeout(this.logoTransitionTimeout);
      }
      if (this.lineAnimationTimeout) {
        clearTimeout(this.lineAnimationTimeout);
      }
      if (this.lineCleanupTimeout) {
        clearTimeout(this.lineCleanupTimeout);
      }
    });
  }

  selectCustomer(virtualIdx: number): void {
    if (this.virtualIndex() === virtualIdx) {
      return;
    }
    this.virtualIndex.set(virtualIdx);
    this.triggerLogoTransition();
    this.triggerLineAnimation();
    this.restartRotationTimer();
  }

  pauseRotation(): void {
    this.isPaused.set(true);
  }

  resumeRotation(): void {
    this.isPaused.set(false);
  }

  private advanceToNext(): void {
    this.virtualIndex.update((i) => i + 1);
    this.triggerLogoTransition();
    this.triggerLineAnimation();

    // Silently normalize back by 20 items (2 full loops) if advancing far, ensuring endless infinite flow
    if (this.virtualIndex() >= 40) {
      setTimeout(() => {
        this.isSlidingSmooth.set(false);
        this.virtualIndex.update((i) => i - 20);
        setTimeout(() => {
          this.isSlidingSmooth.set(true);
        }, 50);
      }, 750);
    }
  }

  private startRotationTimer(): void {
    this.stopRotationTimer();
    // Rotate every 3.2 seconds
    this.timerId = setInterval(() => {
      if (!this.isPaused()) {
        this.advanceToNext();
      }
    }, 3200);
  }

  private stopRotationTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  private restartRotationTimer(): void {
    this.stopRotationTimer();
    this.startRotationTimer();
  }

  private triggerLogoTransition(): void {
    this.isLogoTransitioning.set(false);
    if (this.logoTransitionTimeout) {
      clearTimeout(this.logoTransitionTimeout);
    }
    this.logoTransitionTimeout = setTimeout(() => {
      this.isLogoTransitioning.set(true);
    }, 20);
  }

  private triggerLineAnimation(): void {
    this.isLineAnimating.set(false);
    if (this.lineAnimationTimeout) {
      clearTimeout(this.lineAnimationTimeout);
    }
    if (this.lineCleanupTimeout) {
      clearTimeout(this.lineCleanupTimeout);
    }
    // Re-mount to play single flow animation
    this.lineAnimationTimeout = setTimeout(() => {
      this.isLineAnimating.set(true);
      // After animation completes (2.4s), unmount to ensure 0 lingering blue lines
      this.lineCleanupTimeout = setTimeout(() => {
        this.isLineAnimating.set(false);
      }, 2450);
    }, 20);
  }
}
