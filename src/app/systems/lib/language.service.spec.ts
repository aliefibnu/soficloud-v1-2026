import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    const storageMock = {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, value: string) => {
        mockStorage[key] = value;
      },
      removeItem: (key: string) => {
        delete mockStorage[key];
      },
      clear: () => {
        mockStorage = {};
      },
    };

    Object.defineProperty(globalThis, 'localStorage', {
      value: storageMock,
      writable: true,
      configurable: true,
    });

    TestBed.configureTestingModule({
      providers: [provideTranslateService(), LanguageService],
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with default language "id" when no saved language is in localStorage', () => {
    const init$ = service.init();
    expect(init$).toBeTruthy();
    expect(service.getLanguage()).toBe('id');
    expect(service.currentLanguage()).toBe('id');
    expect(service.selectedLanguageOption().code).toBe('id');
  });

  it('should initialize with saved language and return observable when present in localStorage', () => {
    mockStorage['app-lang'] = 'en';
    const init$ = service.init();
    expect(init$).toBeTruthy();
    expect(service.getLanguage()).toBe('en');
    expect(service.currentLanguage()).toBe('en');
    expect(service.selectedLanguageOption().code).toBe('en');
  });

  it('should fallback to "id" when invalid language is stored in localStorage', () => {
    mockStorage['app-lang'] = 'invalid-code';
    const init$ = service.init();
    expect(init$).toBeTruthy();
    expect(service.getLanguage()).toBe('id');
    expect(service.currentLanguage()).toBe('id');
  });

  it('should update currentLanguage on setLanguage and persist to localStorage', () => {
    service.setLanguage('en');
    expect(service.getLanguage()).toBe('en');
    expect(service.currentLanguage()).toBe('en');
    expect(mockStorage['app-lang']).toBe('en');

    service.setLanguage('id');
    expect(service.getLanguage()).toBe('id');
    expect(service.currentLanguage()).toBe('id');
    expect(mockStorage['app-lang']).toBe('id');
  });
});
