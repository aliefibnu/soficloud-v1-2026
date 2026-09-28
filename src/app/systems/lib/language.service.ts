import { computed, inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

export type Language = 'en' | 'id' | 'zh' | 'ja' | 'ko';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

@Service()
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  readonly supportedLanguages: readonly Language[] = ['en', 'id', 'zh', 'ja', 'ko'];
  readonly languages: readonly LanguageOption[] = LANGUAGE_OPTIONS;
  private readonly storageKey = 'app-lang';

  readonly currentLanguage = signal<Language>('en');
  readonly selectedLanguageOption = computed<LanguageOption>(() => {
    const current = this.currentLanguage();
    return this.languages.find((lang) => lang.code === current) ?? this.languages[0];
  });

  init(): Observable<unknown> {
    this.translate.addLangs([...this.supportedLanguages]);
    this.translate.setFallbackLang('en');

    let language = 'en';

    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      const savedLang = localStorage.getItem(this.storageKey);
      const browserLang = this.translate.getBrowserLang();
      language = savedLang ?? browserLang ?? 'en';
    }

    const selected = this.supportedLanguages.includes(language as Language)
      ? (language as Language)
      : 'en';

    this.currentLanguage.set(selected);
    if (this.document?.documentElement) {
      this.document.documentElement.lang = selected;
    }
    return this.translate.use(selected);
  }

  setLanguage(language: Language): void {
    this.currentLanguage.set(language);
    if (this.document?.documentElement) {
      this.document.documentElement.lang = language;
    }
    this.translate.use(language);
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      localStorage.setItem(this.storageKey, language);
    }
  }

  getLanguage(): Language {
    return this.currentLanguage();
  }
}
