import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  PLATFORM_ID,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageOption, LanguageService } from '../../../systems/lib/language.service';

export interface NavLink {
  key: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe, NgOptimizedImage],
  templateUrl: './navbar.html',
  host: {
    class: 'block sticky top-0 z-50',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeMenus()',
    '(window:scroll)': 'onWindowScroll()',
  },
})
export class Navbar {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);
  private readonly languageService = inject(LanguageService);

  readonly mobileSheetRef = viewChild<ElementRef<HTMLElement>>('mobileSheet');

  readonly navLinks: readonly NavLink[] = [
    { key: 'HEADER.NAV.FEATURES', href: '#features' },
    { key: 'HEADER.NAV.SOLUTIONS', href: '#solutions' },
    { key: 'HEADER.NAV.TESTIMONIALS', href: '#customers' },
    { key: 'HEADER.NAV.PRICING', href: '#pricing' },
    { key: 'HEADER.NAV.CONTACT', href: '#contact' },
  ];

  readonly activeLinkKey = signal<string | null>(null);
  readonly isLangMenuOpen = signal(false);
  readonly isMobileMenuOpen = signal(false);
  readonly isMobileLangSheetOpen = signal(false);

  private scrollRafId: number | null = null;

  constructor() {
    if (this.isBrowser) {
      afterNextRender(() => {
        this.updateActiveSection();
      });

      this.destroyRef.onDestroy(() => {
        if (this.scrollRafId !== null && typeof cancelAnimationFrame !== 'undefined') {
          cancelAnimationFrame(this.scrollRafId);
          this.scrollRafId = null;
        }
      });
    }
  }

  get languages(): readonly LanguageOption[] {
    return this.languageService.languages;
  }

  get selectedLang(): LanguageOption {
    return this.languageService.selectedLanguageOption();
  }

  toggleLangMenu(event?: MouseEvent): void {
    event?.stopPropagation();
    this.isLangMenuOpen.update((open) => !open);
  }

  selectLang(lang: LanguageOption): void {
    this.languageService.setLanguage(lang.code);
    this.isLangMenuOpen.set(false);
  }

  openMobileLangSheet(): void {
    this.isMobileLangSheetOpen.set(true);
    setTimeout(() => {
      const sheetEl = this.mobileSheetRef()?.nativeElement;
      if (sheetEl) {
        const selectedBtn =
          (sheetEl.querySelector('button[role="option"][aria-selected="true"]') as HTMLElement) ||
          (sheetEl.querySelector('button[role="option"]') as HTMLElement);
        selectedBtn?.focus();
      }
    }, 50);
  }

  closeMobileLangSheet(): void {
    this.isMobileLangSheetOpen.set(false);
  }

  selectMobileLang(lang: LanguageOption): void {
    this.languageService.setLanguage(lang.code);
    setTimeout(() => {
      this.closeMobileLangSheet();
    }, 200);
  }

  onSheetKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      const sheetEl = this.mobileSheetRef()?.nativeElement;
      if (!sheetEl) return;
      const focusables = sheetEl.querySelectorAll<HTMLElement>('button:not([disabled])');
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
    this.isLangMenuOpen.set(false);
    if (!this.isMobileMenuOpen()) {
      this.isMobileLangSheetOpen.set(false);
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
    this.isMobileLangSheetOpen.set(false);
  }

  onDocumentClick(event: MouseEvent): void {
    if (this.isLangMenuOpen() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isLangMenuOpen.set(false);
    }
  }

  closeMenus(): void {
    this.isMobileMenuOpen.set(false);
    this.isLangMenuOpen.set(false);
    this.isMobileLangSheetOpen.set(false);
  }

  onNavClick(linkKey: string): void {
    this.activeLinkKey.set(linkKey);
  }

  onMobileNavClick(linkKey: string): void {
    this.activeLinkKey.set(linkKey);
    this.closeMobileMenu();
  }

  onScheduleDemo(): void {
    this.activeLinkKey.set('HEADER.NAV.CONTACT');
    if (typeof document !== 'undefined') {
      const el = document.getElementById('support') || document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onWindowScroll(): void {
    if (!this.isBrowser) return;
    if (this.scrollRafId !== null) return;
    this.scrollRafId = window.requestAnimationFrame(() => {
      this.scrollRafId = null;
      this.updateActiveSection();
    });
  }

  updateActiveSection(): void {
    if (!this.isBrowser) return;
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;

    // Scrolled near the bottom of a scrollable page -> activate Kontak
    if (docH > windowH && scrollY + windowH >= docH - 60) {
      this.activeLinkKey.set('HEADER.NAV.CONTACT');
      return;
    }

    const threshold = 140; // Reference reading line just beneath the navbar
    const featuresEl = document.getElementById('features');
    const businessModelEl =
      document.getElementById('business-model') || document.getElementById('resources');
    const customersEl = document.getElementById('customers');
    const pricingEl = document.getElementById('pricing');
    const ctaEl = document.getElementById('support') || document.getElementById('contact');

    if (!featuresEl) return;

    const featuresTop = featuresEl.getBoundingClientRect().top;
    // Above features (Hero or Business Control interactive canvas)
    if (featuresTop > threshold) {
      this.activeLinkKey.set(null);
      return;
    }

    const businessModelTop = businessModelEl?.getBoundingClientRect().top ?? Infinity;
    if (businessModelTop > threshold) {
      // Inside features or why-choose-us
      this.activeLinkKey.set('HEADER.NAV.FEATURES');
      return;
    }

    const customersTop = customersEl?.getBoundingClientRect().top ?? Infinity;
    if (customersTop > threshold) {
      // Inside business-model / solutions
      this.activeLinkKey.set('HEADER.NAV.SOLUTIONS');
      return;
    }

    const pricingTop = pricingEl?.getBoundingClientRect().top;
    if (pricingTop !== undefined && pricingTop > threshold) {
      // Inside customers / testimonials
      this.activeLinkKey.set('HEADER.NAV.TESTIMONIALS');
      return;
    }

    const ctaTop = ctaEl?.getBoundingClientRect().top ?? Infinity;
    if (ctaTop > threshold) {
      // Inside pricing
      this.activeLinkKey.set(pricingEl ? 'HEADER.NAV.PRICING' : 'HEADER.NAV.TESTIMONIALS');
      return;
    }

    // Inside CTA / Contact
    this.activeLinkKey.set('HEADER.NAV.CONTACT');
  }
}
