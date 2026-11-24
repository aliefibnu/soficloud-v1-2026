import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NavigationEnd,
  NavigationSkipped,
  NavigationSkippedCode,
  provideRouter,
  Router,
  Scroll,
} from '@angular/router';
import { Subject } from 'rxjs';
import { provideTranslateService } from '@ngx-translate/core';
import { LanguageOption, LanguageService } from '../../../systems/lib/language.service';
import { LandingAnchorService } from '../../../systems/lib/landing-anchor.service';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;
  let languageService: LanguageService;
  let anchorService: LandingAnchorService;
  let router: Router;
  let originalUrl: string;

  beforeEach(async () => {
    originalUrl = window.location.pathname + window.location.search + window.location.hash;
    window.history.replaceState(null, '', '/');

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [
        provideTranslateService(),
        LanguageService,
        LandingAnchorService,
        provideRouter([
          { path: '', component: Navbar },
          { path: 'business-realtime', component: Navbar },
          { path: 'schedule-demo', component: Navbar },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    languageService = TestBed.inject(LanguageService);
    anchorService = TestBed.inject(LandingAnchorService);
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  afterEach(() => {
    anchorService.reset();
    vi.restoreAllMocks();
    window.history.replaceState(null, '', originalUrl || '/');
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

  it('should not render checkmark icon on active language in desktop dropdown or mobile sheet', () => {
    // Open desktop dropdown
    component.isLangMenuOpen.set(true);
    fixture.detectChanges();

    const selectedDesktopOption = fixture.nativeElement.querySelector('ul[role="listbox"] button[aria-selected="true"]');
    expect(selectedDesktopOption).toBeTruthy();
    expect(selectedDesktopOption.classList.contains('text-[#1d44eb]')).toBe(true);
    expect(selectedDesktopOption.querySelector('svg[viewBox="0 0 16 16"]')).toBeNull();

    // Open mobile language sheet
    component.openMobileLangSheet();
    fixture.detectChanges();

    const selectedMobileOption = fixture.nativeElement.querySelector('div[role="listbox"] button[aria-selected="true"]');
    expect(selectedMobileOption).toBeTruthy();
    expect(selectedMobileOption.classList.contains('text-[#1d44eb]')).toBe(true);
    expect(selectedMobileOption.querySelector('svg[viewBox="0 0 16 16"]')).toBeNull();
  });

  it('should toggle and close mobile menu', () => {
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(true);

    component.closeMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should keep header flush and layer top bar above mobile dropdown and backdrop when open', () => {
    const header = fixture.nativeElement.querySelector('header') as HTMLElement;
    const topBar = header.firstElementChild as HTMLElement;
    const mobileMenu = fixture.nativeElement.querySelector('#mobile-menu') as HTMLElement;

    expect(header.classList.contains('border-x')).toBe(false);
    expect(topBar.classList.contains('z-30')).toBe(true);
    expect(topBar.classList.contains('bg-white')).toBe(true);
    expect(topBar.classList.contains('rounded-b-4xl')).toBe(true);
    expect(topBar.classList.contains('max-lg:border-b-transparent')).toBe(false);
    expect(topBar.classList.contains('max-lg:shadow-none')).toBe(false);
    expect(mobileMenu.classList.contains('z-20')).toBe(true);
    expect(mobileMenu.classList.contains('top-[calc(100%-1px)]')).toBe(true);
    expect(mobileMenu.classList.contains('bg-white')).toBe(true);

    component.toggleMobileMenu();
    fixture.detectChanges();

    const backdrop = header.querySelector('.fixed.inset-0.top-0') as HTMLElement;
    expect(topBar.classList.contains('rounded-b-4xl')).toBe(false);
    expect(topBar.classList.contains('rounded-b-none')).toBe(true);
    expect(topBar.classList.contains('max-lg:border-b-transparent')).toBe(true);
    expect(topBar.classList.contains('max-lg:shadow-none')).toBe(true);
    expect(backdrop).toBeTruthy();
    expect(backdrop.classList.contains('z-10')).toBe(true);

    component.closeMobileMenu();
    fixture.detectChanges();

    expect(topBar.classList.contains('rounded-b-4xl')).toBe(true);
    expect(topBar.classList.contains('max-lg:border-b-transparent')).toBe(false);
    expect(topBar.classList.contains('max-lg:shadow-none')).toBe(false);
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

  it('should navigate to /schedule-demo when onScheduleDemo is called from another page', () => {
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    component.onScheduleDemo();
    expect(navSpy).toHaveBeenCalledWith(['/schedule-demo']);
    navSpy.mockRestore();
  });

  it('should scroll to schedule-demo-form anchor when onScheduleDemo is called while already on /schedule-demo', () => {
    component.isScheduleDemoPage.set(true);
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    const formEl = document.createElement('div');
    formEl.id = 'schedule-demo-form';
    document.body.appendChild(formEl);

    component.onScheduleDemo();

    expect(scrollSpy).toHaveBeenCalled();
    formEl.remove();
    scrollSpy.mockRestore();
  });

  it('should navigate to root with fragment when onNavClick or onMobileNavClick is called on non-landing page', () => {
    component.isLandingPage.set(false);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const event = new MouseEvent('click');
    const preventDefaultSpy = vi.spyOn(event, 'preventDefault');

    component.onNavClick('HEADER.NAV.CONTACT', '#contact', event);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(navSpy).toHaveBeenCalledWith(['/'], { fragment: 'contact' });

    component.isMobileMenuOpen.set(true);
    component.onMobileNavClick('HEADER.NAV.FEATURES', '#features', event);
    expect(navSpy).toHaveBeenCalledWith(['/'], { fragment: 'features' });
    expect(component.isMobileMenuOpen()).toBe(false);

    component.onScheduleDemo();
    expect(navSpy).toHaveBeenCalledWith(['/schedule-demo']);

    navSpy.mockRestore();
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

  describe('Route-scoped highlight state', () => {
    it('should identify landing page correctly and render anchor-only hrefs', () => {
      expect(component.isLandingPage()).toBe(true);

      const navAnchor = fixture.nativeElement.querySelector('nav a') as HTMLAnchorElement;
      expect(navAnchor.getAttribute('href')).toBe('#features');
    });

    it('should disable highlight state completely when navigated to /business-realtime', async () => {
      await router.navigateByUrl('/business-realtime');
      fixture.detectChanges();

      expect(component.isLandingPage()).toBe(false);
      expect(component.activeLinkKey()).toBeNull();

      // Desktop links should now prefix with /
      const navAnchor = fixture.nativeElement.querySelector('nav a') as HTMLAnchorElement;
      expect(navAnchor.getAttribute('href')).toBe('/#features');

      // Calling onNavClick or onScheduleDemo on non-landing page should not set activeLinkKey
      component.onNavClick('HEADER.NAV.FEATURES');
      expect(component.activeLinkKey()).toBeNull();

      component.onScheduleDemo();
      expect(component.activeLinkKey()).toBeNull();

      component.onMobileNavClick('HEADER.NAV.TESTIMONIALS');
      expect(component.activeLinkKey()).toBeNull();

      // Even when scrolled to the bottom of the page with support/contact present
      const cta = document.createElement('div');
      cta.id = 'support';
      document.body.appendChild(cta);

      try {
        Object.defineProperty(document.documentElement, 'scrollHeight', { value: 3000, configurable: true });
        Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true });
        Object.defineProperty(window, 'scrollY', { value: 2500 } as PropertyDescriptor);

        component.updateActiveSection();
        expect(component.activeLinkKey()).toBeNull();

        component.onWindowScroll();
        expect(component.activeLinkKey()).toBeNull();
      } finally {
        document.body.removeChild(cta);
      }
    });

    it('should re-enable highlight state when navigating back to landing page', async () => {
      await router.navigateByUrl('/business-realtime');
      expect(component.isLandingPage()).toBe(false);

      await router.navigateByUrl('/');
      expect(component.isLandingPage()).toBe(true);

      component.onNavClick('HEADER.NAV.PRICING');
      expect(component.activeLinkKey()).toBe('HEADER.NAV.PRICING');
    });

    it('should reveal deferred landing sections only after landing navigation succeeds when navigating from another page', async () => {
      const revealSpy = vi.spyOn(anchorService, 'revealUpToAnchor');
      const scrollSpy = vi.spyOn(anchorService, 'scrollToAnchor').mockResolvedValue();

      await router.navigateByUrl('/business-realtime');
      expect(component.isLandingPage()).toBe(false);

      const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
      component.onNavClick('HEADER.NAV.PRICING', '#pricing', new MouseEvent('click'));
      expect(revealSpy).not.toHaveBeenCalled();
      expect(anchorService.requiredOrder()).toBe(0);
      expect(navSpy).toHaveBeenCalledWith(['/'], { fragment: 'pricing' });
      navSpy.mockRestore();

      await router.navigate(['/'], { fragment: 'pricing' });
      await new Promise((resolve) => setTimeout(resolve, 150));

      expect(revealSpy).toHaveBeenCalledWith('pricing');
      expect(anchorService.requiredOrder()).toBe(6);
      expect(scrollSpy).toHaveBeenCalledWith('pricing', expect.any(Function));
    });

    it('should not leak requiredOrder when cross-route landing navigation is cancelled', async () => {
      const revealSpy = vi.spyOn(anchorService, 'revealUpToAnchor');

      await router.navigateByUrl('/business-realtime');
      expect(component.isLandingPage()).toBe(false);

      const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(false);
      component.onNavClick('HEADER.NAV.PRICING', '#pricing', new MouseEvent('click'));
      await Promise.resolve();
      navSpy.mockRestore();

      expect(revealSpy).not.toHaveBeenCalled();
      expect(anchorService.requiredOrder()).toBe(0);

      await router.navigateByUrl('/');
      expect(anchorService.requiredOrder()).toBe(0);
    });

    it('should restore pricing fragment scroll when Back produces a same-URL NavigationSkipped event', async () => {
      const revealSpy = vi.spyOn(anchorService, 'revealUpToAnchor');
      const scrollSpy = vi.spyOn(anchorService, 'scrollToAnchor').mockResolvedValue();
      const pushStateSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {});
      const events$ = router.events as unknown as Subject<unknown>;

      try {
        await router.navigateByUrl('/#pricing');
        await new Promise((resolve) => setTimeout(resolve, 150));

        expect(revealSpy).toHaveBeenCalledWith('pricing');
        expect(scrollSpy).toHaveBeenCalledWith('pricing', expect.any(Function));

        revealSpy.mockClear();
        scrollSpy.mockClear();

        // In-page click uses pushState, leaving Router URL at /#pricing
        component.onNavClick('HEADER.NAV.FEATURES', '#features', new MouseEvent('click', { button: 0 }));
        expect(pushStateSpy).toHaveBeenCalledWith(null, '', '#features');
        expect(scrollSpy).toHaveBeenCalledWith('features', expect.any(Function), true);

        revealSpy.mockClear();
        scrollSpy.mockClear();

        // Capture the real NavigationSkipped emitted when navigating back to /#pricing
        let skippedEvent: NavigationSkipped | null = null;
        const sub = router.events.subscribe((e) => {
          if (e instanceof NavigationSkipped) {
            skippedEvent = e;
          }
        });

        await router.navigateByUrl('/#pricing');
        sub.unsubscribe();

        expect(skippedEvent).not.toBeNull();
        expect(skippedEvent!.code).toBe(NavigationSkippedCode.IgnoredSameUrlNavigation);

        // Dispatch the Scroll event that RouterScroller emits for IgnoredSameUrlNavigation
        events$.next(new Scroll(skippedEvent!, null, 'pricing'));

        expect(revealSpy).toHaveBeenCalledWith('pricing');
        expect(scrollSpy).toHaveBeenCalledWith('pricing', expect.any(Function));
      } finally {
        pushStateSpy.mockRestore();
      }
    });

    it('should ignore stale Scroll events and NavigationSkipped events from UrlHandlingStrategy', async () => {
      const revealSpy = vi.spyOn(anchorService, 'revealUpToAnchor');
      const scrollSpy = vi.spyOn(anchorService, 'scrollToAnchor').mockResolvedValue();
      const events$ = router.events as unknown as Subject<unknown>;

      // Unregistered / stale Scroll event should be discarded
      const staleSkipped = new NavigationSkipped(
        999,
        '/#pricing',
        'stale',
        NavigationSkippedCode.IgnoredSameUrlNavigation,
      );
      events$.next(new Scroll(staleSkipped, null, 'pricing'));

      // NavigationSkipped with IgnoredByUrlHandlingStrategy should not schedule fragment scroll
      const ignoredStrategy = new NavigationSkipped(
        1000,
        '/#pricing',
        'ignored by strategy',
        NavigationSkippedCode.IgnoredByUrlHandlingStrategy,
      );
      events$.next(ignoredStrategy);
      events$.next(new Scroll(ignoredStrategy, null, 'pricing'));

      await new Promise((resolve) => setTimeout(resolve, 150));

      expect(revealSpy).not.toHaveBeenCalled();
      expect(scrollSpy).not.toHaveBeenCalled();
    });

    it('should cancel pending fragment fallback and Scroll when user clicks a newer navbar anchor', async () => {
      const scrollSpy = vi.spyOn(anchorService, 'scrollToAnchor').mockResolvedValue();
      const pushStateSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {});
      const events$ = router.events as unknown as Subject<unknown>;

      try {
        let navEndEvent: NavigationEnd | null = null;
        const sub = router.events.subscribe((e) => {
          if (e instanceof NavigationEnd) {
            navEndEvent = e;
          }
        });

        await router.navigateByUrl('/#pricing');
        sub.unsubscribe();
        expect(navEndEvent).not.toBeNull();

        // User clicks Features before the 120ms fallback or Scroll event fires
        component.onNavClick('HEADER.NAV.FEATURES', '#features', new MouseEvent('click', { button: 0 }));
        expect(pushStateSpy).toHaveBeenCalledWith(null, '', '#features');
        expect(scrollSpy).toHaveBeenCalledTimes(1);
        expect(scrollSpy).toHaveBeenCalledWith('features', expect.any(Function), true);

        // Even if the pending Scroll event arrives and the 120ms fallback window passes,
        // the older /#pricing fragment must not override the newer #features click
        events$.next(new Scroll(navEndEvent!, null, 'pricing'));
        await new Promise((resolve) => setTimeout(resolve, 150));

        expect(scrollSpy).toHaveBeenCalledTimes(1);
      } finally {
        pushStateSpy.mockRestore();
      }
    });

    it('should invalidate pending fragment scroll when an external in-page anchor action starts', async () => {
      const pushStateSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {});
      const windowScrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
      const featuresEl = document.createElement('div');
      featuresEl.id = 'features';
      document.body.appendChild(featuresEl);
      const events$ = router.events as unknown as Subject<unknown>;

      try {
        let navEndEvent: NavigationEnd | null = null;
        const sub = router.events.subscribe((e) => {
          if (e instanceof NavigationEnd) {
            navEndEvent = e;
          }
        });

        await router.navigateByUrl('/#pricing');
        sub.unsubscribe();
        expect(navEndEvent).not.toBeNull();

        const scrollSpy = vi.spyOn(anchorService, 'scrollToAnchor');

        // External component (e.g., Hero or Footer) starts an in-page anchor action
        anchorService.navigateOrScrollToAnchor('features', new MouseEvent('click', { button: 0 }));
        expect(scrollSpy).toHaveBeenCalledTimes(1);
        expect(scrollSpy).toHaveBeenCalledWith('features');

        // Pending Scroll event and 120ms fallback timer for /#pricing must both be aborted
        events$.next(new Scroll(navEndEvent!, null, 'pricing'));
        await new Promise((resolve) => setTimeout(resolve, 150));

        expect(scrollSpy).toHaveBeenCalledTimes(1);
      } finally {
        featuresEl.remove();
        pushStateSpy.mockRestore();
        windowScrollSpy.mockRestore();
      }
    });

    it('should preserve browser default behavior for modified clicks on desktop and mobile nav links', async () => {
      const scrollSpy = vi.spyOn(anchorService, 'scrollToAnchor').mockResolvedValue();
      const pushStateSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {});
      const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

      const modifiedEvents: MouseEvent[] = [
        new MouseEvent('click', { ctrlKey: true }),
        new MouseEvent('click', { metaKey: true }),
        new MouseEvent('click', { shiftKey: true }),
        new MouseEvent('click', { altKey: true }),
        new MouseEvent('click', { button: 1 }),
      ];

      const initialActiveKey = component.activeLinkKey();
      expect(initialActiveKey).not.toBe('HEADER.NAV.FEATURES');

      component.isMobileMenuOpen.set(true);
      for (const event of modifiedEvents) {
        const preventSpy = vi.spyOn(event, 'preventDefault');
        component.onNavClick('HEADER.NAV.FEATURES', '#features', event);
        component.onMobileNavClick('HEADER.NAV.FEATURES', '#features', event);
        expect(preventSpy).not.toHaveBeenCalled();
      }

      const alreadyPrevented = new MouseEvent('click', { cancelable: true });
      alreadyPrevented.preventDefault();
      component.onNavClick('HEADER.NAV.FEATURES', '#features', alreadyPrevented);
      component.onMobileNavClick('HEADER.NAV.FEATURES', '#features', alreadyPrevented);

      expect(component.activeLinkKey()).toBe(initialActiveKey);
      expect(component.isMobileMenuOpen()).toBe(true);
      expect(scrollSpy).not.toHaveBeenCalled();
      expect(pushStateSpy).not.toHaveBeenCalled();
      expect(navSpy).not.toHaveBeenCalled();

      // Non-landing route modified clicks
      component.isLandingPage.set(false);
      anchorService.reset();
      const ctrlOffLanding = new MouseEvent('click', { ctrlKey: true });
      const preventOffLandingSpy = vi.spyOn(ctrlOffLanding, 'preventDefault');
      component.onNavClick('HEADER.NAV.PRICING', '#pricing', ctrlOffLanding);
      component.onMobileNavClick('HEADER.NAV.PRICING', '#pricing', ctrlOffLanding);

      expect(preventOffLandingSpy).not.toHaveBeenCalled();
      expect(anchorService.requiredOrder()).toBe(0);
      expect(navSpy).not.toHaveBeenCalled();
      expect(component.isMobileMenuOpen()).toBe(true);
    });

    it('should handle plain primary clicks and keyboard-triggered clicks in navbar normally', () => {
      const scrollSpy = vi.spyOn(anchorService, 'scrollToAnchor').mockResolvedValue();
      const pushStateSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {});

      const plainClick = new MouseEvent('click', { button: 0, detail: 1 });
      const plainPreventSpy = vi.spyOn(plainClick, 'preventDefault');
      component.onNavClick('HEADER.NAV.FEATURES', '#features', plainClick);

      expect(plainPreventSpy).toHaveBeenCalledTimes(1);
      expect(component.activeLinkKey()).toBe('HEADER.NAV.FEATURES');
      expect(scrollSpy).toHaveBeenCalledWith('features', expect.any(Function), true);
      expect(pushStateSpy).toHaveBeenCalledWith(null, '', '#features');

      component.isMobileMenuOpen.set(true);
      const keyboardClick = new MouseEvent('click', { button: 0, detail: 0 });
      const keyboardPreventSpy = vi.spyOn(keyboardClick, 'preventDefault');
      component.onMobileNavClick('HEADER.NAV.CONTACT', '#contact', keyboardClick);

      expect(keyboardPreventSpy).toHaveBeenCalledTimes(1);
      expect(component.activeLinkKey()).toBe('HEADER.NAV.CONTACT');
      expect(component.isMobileMenuOpen()).toBe(false);
      expect(scrollSpy).toHaveBeenCalledWith('contact', expect.any(Function), true);
      expect(pushStateSpy).toHaveBeenCalledWith(null, '', '#contact');
    });

    it('should still scroll without pushing duplicate history entries when clicking the current fragment', () => {
      const scrollSpy = vi.spyOn(anchorService, 'scrollToAnchor').mockResolvedValue();
      const pushStateSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {});
      pushStateSpy.mockClear();
      const originalUrl = window.location.pathname + window.location.search + window.location.hash;

      try {
        window.location.hash = '#features';
        const click = new MouseEvent('click', { button: 0, cancelable: true });
        component.onNavClick('HEADER.NAV.FEATURES', '#features', click);

        expect(scrollSpy).toHaveBeenCalledWith('features', expect.any(Function), true);
        expect(pushStateSpy).not.toHaveBeenCalled();

        component.isLandingPage.set(false);
        component.isScheduleDemoPage.set(true);
        window.location.hash = '#schedule-demo-form';
        component.onScheduleDemo();

        expect(scrollSpy).toHaveBeenCalledWith('schedule-demo-form');
        expect(pushStateSpy).not.toHaveBeenCalled();
      } finally {
        pushStateSpy.mockRestore();
        window.history.replaceState(null, '', originalUrl || '/');
      }
    });
  });
});
