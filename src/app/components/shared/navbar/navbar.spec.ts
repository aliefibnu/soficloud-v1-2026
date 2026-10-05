import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { LanguageOption, LanguageService } from '../../../systems/lib/language.service';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideTranslateService(), LanguageService],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isLangMenuOpen()).toBe(false);
    expect(component.isMobileMenuOpen()).toBe(false);
    expect(component.isMobileLangSheetOpen()).toBe(false);
  });

  it('should have navigation links and language options', () => {
    expect(component.navLinks.length).toBeGreaterThan(0);
    expect(component.languages.length).toBe(5);
    expect(component.selectedLang.code).toBe('id');
  });

  it('should toggle and close language dropdown menu', () => {
    component.toggleLangMenu();
    expect(component.isLangMenuOpen()).toBe(true);

    component.toggleLangMenu();
    expect(component.isLangMenuOpen()).toBe(false);
  });

  it('should select language and close language menu', () => {
    const targetLang: LanguageOption = { code: 'en', label: 'English', flag: '🇬🇧' };
    component.isLangMenuOpen.set(true);

    component.selectLang(targetLang);

    expect(languageService.getLanguage()).toBe('en');
    expect(component.selectedLang.code).toBe('en');
    expect(component.isLangMenuOpen()).toBe(false);
  });

  it('should toggle and close mobile menu', () => {
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(true);

    component.closeMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should open and close mobile language sheet', () => {
    component.openMobileLangSheet();
    expect(component.isMobileLangSheetOpen()).toBe(true);

    component.closeMobileLangSheet();
    expect(component.isMobileLangSheetOpen()).toBe(false);
  });

  it('should close all menus on escape key', () => {
    component.isMobileMenuOpen.set(true);
    component.isLangMenuOpen.set(true);
    component.isMobileLangSheetOpen.set(true);

    component.closeMenus();

    expect(component.isMobileMenuOpen()).toBe(false);
    expect(component.isLangMenuOpen()).toBe(false);
    expect(component.isMobileLangSheetOpen()).toBe(false);
  });

  it('should close language menu on outside click', () => {
    component.isLangMenuOpen.set(true);
    const outsideElement = document.createElement('div');
    const mouseEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(mouseEvent, 'target', { value: outsideElement });

    component.onDocumentClick(mouseEvent);

    expect(component.isLangMenuOpen()).toBe(false);
  });
});
