import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageOption, LanguageService } from '../../../systems/lib/language.service';

export interface NavLink {
  key: string;
  href: string;
}

@Component({
  selector: 'app-navbar',
  imports: [TranslatePipe],
  templateUrl: './navbar.html',
  host: {
    class: 'block sticky top-0 z-50',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeMenus()',
  },
})
export class Navbar {
  private readonly elementRef = inject(ElementRef);
  private readonly languageService = inject(LanguageService);

  readonly mobileSheetRef = viewChild<ElementRef<HTMLElement>>('mobileSheet');

  readonly navLinks: readonly NavLink[] = [
    { key: 'HEADER.NAV.FEATURES', href: '#features' },
    { key: 'HEADER.NAV.RESOURCES', href: '#resources' },
    { key: 'HEADER.NAV.SUPPORT', href: '#support' },
  ];

  readonly isLangMenuOpen = signal(false);
  readonly isMobileMenuOpen = signal(false);
  readonly isMobileLangSheetOpen = signal(false);

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

  onScheduleDemo(): void {
    // Demo scheduling trigger
  }
}
