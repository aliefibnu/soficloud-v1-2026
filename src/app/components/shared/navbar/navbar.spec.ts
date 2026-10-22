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

  it('should have 5 navigation links and language options', () => {
    expect(component.navLinks.length).toBe(5);
    expect(component.navLinks.map((l) => l.key)).toEqual([
      'HEADER.NAV.FEATURES',
      'HEADER.NAV.SOLUTIONS',
      'HEADER.NAV.TESTIMONIALS',
      'HEADER.NAV.PRICING',
      'HEADER.NAV.CONTACT',
    ]);
    expect(component.navLinks.find((l) => l.key === 'HEADER.NAV.TESTIMONIALS')?.href).toBe('#customers');
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

  it('should initialize activeLinkKey as null at the top of the page', () => {
    expect(component.activeLinkKey()).toBeNull();
  });

  it('should update activeLinkKey when onNavClick is called', () => {
    component.onNavClick('HEADER.NAV.FEATURES');
    expect(component.activeLinkKey()).toBe('HEADER.NAV.FEATURES');

    component.onNavClick('HEADER.NAV.SOLUTIONS');
    expect(component.activeLinkKey()).toBe('HEADER.NAV.SOLUTIONS');
  });

  it('should update activeLinkKey and close mobile menu when onMobileNavClick is called', () => {
    component.isMobileMenuOpen.set(true);
    component.onMobileNavClick('HEADER.NAV.TESTIMONIALS');

    expect(component.activeLinkKey()).toBe('HEADER.NAV.TESTIMONIALS');
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should set activeLinkKey to CONTACT when onScheduleDemo is called', () => {
    component.onScheduleDemo();
    expect(component.activeLinkKey()).toBe('HEADER.NAV.CONTACT');
  });

  it('should correctly detect active section on updateActiveSection based on element rects', () => {
    const features = document.createElement('div');
    features.id = 'features';
    const businessModel = document.createElement('div');
    businessModel.id = 'business-model';
    const customers = document.createElement('div');
    customers.id = 'customers';
    const pricing = document.createElement('div');
    pricing.id = 'pricing';
    const cta = document.createElement('div');
    cta.id = 'support';

    document.body.appendChild(features);
    document.body.appendChild(businessModel);
    document.body.appendChild(customers);
    document.body.appendChild(pricing);
    document.body.appendChild(cta);

    try {
      // 1. Above features: features top is > 140
      vi.spyOn(features, 'getBoundingClientRect').mockReturnValue({ top: 300 } as DOMRect);
      component.updateActiveSection();
      expect(component.activeLinkKey()).toBeNull();

      // 2. In features / why-choose-us: features top <= 140, businessModel top > 140
      vi.spyOn(features, 'getBoundingClientRect').mockReturnValue({ top: 100 } as DOMRect);
      vi.spyOn(businessModel, 'getBoundingClientRect').mockReturnValue({ top: 500 } as DOMRect);
      component.updateActiveSection();
      expect(component.activeLinkKey()).toBe('HEADER.NAV.FEATURES');

      // 3. In business-model / solutions: businessModel top <= 140, customers top > 140
      vi.spyOn(businessModel, 'getBoundingClientRect').mockReturnValue({ top: 50 } as DOMRect);
      vi.spyOn(customers, 'getBoundingClientRect').mockReturnValue({ top: 600 } as DOMRect);
      component.updateActiveSection();
      expect(component.activeLinkKey()).toBe('HEADER.NAV.SOLUTIONS');

      // 4. In customers / testimonials: customers top <= 140, pricing top > 140
      vi.spyOn(customers, 'getBoundingClientRect').mockReturnValue({ top: 80 } as DOMRect);
      vi.spyOn(pricing, 'getBoundingClientRect').mockReturnValue({ top: 700 } as DOMRect);
      component.updateActiveSection();
      expect(component.activeLinkKey()).toBe('HEADER.NAV.TESTIMONIALS');

      // 5. In pricing: pricing top <= 140, cta top > 140
      vi.spyOn(pricing, 'getBoundingClientRect').mockReturnValue({ top: 80 } as DOMRect);
      vi.spyOn(cta, 'getBoundingClientRect').mockReturnValue({ top: 800 } as DOMRect);
      component.updateActiveSection();
      expect(component.activeLinkKey()).toBe('HEADER.NAV.PRICING');

      // 6. In CTA / contact: cta top <= 140
      vi.spyOn(cta, 'getBoundingClientRect').mockReturnValue({ top: 100 } as DOMRect);
      component.updateActiveSection();
      expect(component.activeLinkKey()).toBe('HEADER.NAV.CONTACT');

      // 7. Scrolled to bottom of page
      Object.defineProperty(document.documentElement, 'scrollHeight', { value: 3000, configurable: true });
      Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
      Object.defineProperty(window, 'scrollY', { value: 2200 } as PropertyDescriptor); // 2200 + 800 = 3000 >= 3000 - 60
      component.updateActiveSection();
      expect(component.activeLinkKey()).toBe('HEADER.NAV.CONTACT');
    } finally {
      document.body.removeChild(features);
      document.body.removeChild(businessModel);
      document.body.removeChild(customers);
      document.body.removeChild(pricing);
      document.body.removeChild(cta);
    }
  });
});
