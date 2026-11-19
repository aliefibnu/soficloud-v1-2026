import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LandingAnchorService } from './landing-anchor.service';

@Component({ template: '' })
class DummyRouteComponent {}

describe('LandingAnchorService', () => {
  let service: LandingAnchorService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        LandingAnchorService,
        provideRouter([
          { path: '', component: DummyRouteComponent },
          { path: 'business-realtime', component: DummyRouteComponent },
        ]),
      ],
    }).compileComponents();

    service = TestBed.inject(LandingAnchorService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    service.reset();
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('should map canonical anchors and aliases to the expected section order', () => {
    expect(service.getSectionOrder('#business-control')).toBe(1);
    expect(service.getSectionOrder('#features')).toBe(2);
    expect(service.getSectionOrder('about')).toBe(3);
    expect(service.getSectionOrder('why-choose-us')).toBe(3);
    expect(service.getSectionOrder('#solutions')).toBe(4);
    expect(service.getSectionOrder('business-model')).toBe(4);
    expect(service.getSectionOrder('resources')).toBe(4);
    expect(service.getSectionOrder('customers')).toBe(5);
    expect(service.getSectionOrder('#pricing')).toBe(6);
    expect(service.getSectionOrder('contact')).toBe(7);
    expect(service.getSectionOrder('support')).toBe(7);
    expect(service.getSectionOrder('schedule-demo-form')).toBe(0);
  });

  it('should update requiredOrder monotonically and reset back to 0', () => {
    expect(service.requiredOrder()).toBe(0);

    service.revealUpToAnchor('pricing');
    expect(service.requiredOrder()).toBe(6);

    service.revealUpToAnchor('features');
    expect(service.requiredOrder()).toBe(6);

    service.revealUpToAnchor('contact');
    expect(service.requiredOrder()).toBe(7);

    service.reset();
    expect(service.requiredOrder()).toBe(0);
  });

  it('should resolve direct IDs and fallback aliases', () => {
    const support = document.createElement('div');
    support.id = 'support';
    const businessModel = document.createElement('div');
    businessModel.id = 'business-model';
    document.body.append(support, businessModel);

    expect(service.resolveTargetElement('contact')).toBe(support);
    expect(service.resolveTargetElement('#solutions')).toBe(businessModel);
  });

  it('should wait for deferred placeholders to clear before scrolling to a landing anchor', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(16);
      return 1;
    });
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    const placeholder1 = document.createElement('div');
    placeholder1.setAttribute('data-landing-placeholder', '1');
    const placeholder2 = document.createElement('div');
    placeholder2.setAttribute('data-landing-placeholder', '2');
    placeholder2.id = 'features';
    document.body.append(placeholder1, placeholder2);

    const scrollPromise = service.scrollToAnchor('features');
    await Promise.resolve();

    // Should not scroll while placeholders 1 and 2 are still present
    expect(scrollSpy).not.toHaveBeenCalled();
    expect(service.requiredOrder()).toBe(2);

    // Simulate deferred blocks mounting and replacing placeholders
    placeholder1.remove();
    placeholder2.remove();
    const realFeatures = document.createElement('section');
    realFeatures.id = 'features';
    vi.spyOn(realFeatures, 'getBoundingClientRect').mockReturnValue({ top: 1200 } as DOMRect);
    document.body.append(realFeatures);

    await scrollPromise;

    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy).toHaveBeenCalledWith({
      top: 1112, // 1200 - 88 fallback header height
      behavior: 'smooth',
    });
  });

  it('should cancel an older scroll request when a newer anchor scroll starts', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      setTimeout(() => cb(16), 0);
      return 1;
    });
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    const placeholder2 = document.createElement('div');
    placeholder2.setAttribute('data-landing-placeholder', '2');
    placeholder2.id = 'features';
    const pricing = document.createElement('section');
    pricing.id = 'pricing';
    vi.spyOn(pricing, 'getBoundingClientRect').mockReturnValue({ top: 2500 } as DOMRect);
    document.body.append(placeholder2, pricing);

    const first = service.scrollToAnchor('features');
    const second = service.scrollToAnchor('pricing');

    // Clear placeholder so both loops can finish
    placeholder2.remove();
    const features = document.createElement('section');
    features.id = 'features';
    vi.spyOn(features, 'getBoundingClientRect').mockReturnValue({ top: 900 } as DOMRect);
    document.body.append(features);

    await Promise.all([first, second]);

    expect(scrollSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy).toHaveBeenCalledWith({
      top: 2412,
      behavior: 'smooth',
    });
  });

  it('should navigate to root fragment without prematurely mutating requiredOrder when called from another route', async () => {
    await router.navigateByUrl('/business-realtime');
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const event = new MouseEvent('click');
    const preventSpy = vi.spyOn(event, 'preventDefault');

    service.navigateOrScrollToAnchor('#pricing', event);

    expect(preventSpy).toHaveBeenCalled();
    expect(service.requiredOrder()).toBe(0);
    expect(navSpy).toHaveBeenCalledWith(['/'], { fragment: 'pricing' });
  });

  it('should preserve browser default behavior for modified clicks on landing and non-landing routes', async () => {
    const scrollSpy = vi.spyOn(service, 'scrollToAnchor').mockResolvedValue();
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);
    const pushStateSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {});

    const modifiedEvents: MouseEvent[] = [
      new MouseEvent('click', { ctrlKey: true }),
      new MouseEvent('click', { metaKey: true }),
      new MouseEvent('click', { shiftKey: true }),
      new MouseEvent('click', { altKey: true }),
      new MouseEvent('click', { button: 1 }),
    ];

    for (const event of modifiedEvents) {
      const preventSpy = vi.spyOn(event, 'preventDefault');
      service.navigateOrScrollToAnchor('features', event);
      expect(preventSpy).not.toHaveBeenCalled();
    }

    const alreadyPrevented = new MouseEvent('click', { cancelable: true });
    alreadyPrevented.preventDefault();
    service.navigateOrScrollToAnchor('features', alreadyPrevented);

    expect(scrollSpy).not.toHaveBeenCalled();
    expect(pushStateSpy).not.toHaveBeenCalled();
    expect(service.requiredOrder()).toBe(0);

    await router.navigateByUrl('/business-realtime');
    const ctrlClickOffLanding = new MouseEvent('click', { ctrlKey: true });
    const preventOffLandingSpy = vi.spyOn(ctrlClickOffLanding, 'preventDefault');

    service.navigateOrScrollToAnchor('features', ctrlClickOffLanding);

    expect(preventOffLandingSpy).not.toHaveBeenCalled();
    expect(navSpy).not.toHaveBeenCalled();
    expect(service.requiredOrder()).toBe(0);
  });

  it('should handle plain primary clicks and keyboard-triggered clicks normally', () => {
    const scrollSpy = vi.spyOn(service, 'scrollToAnchor').mockResolvedValue();
    const pushStateSpy = vi.spyOn(window.history, 'pushState').mockImplementation(() => {});

    const plainClick = new MouseEvent('click', { button: 0, detail: 1 });
    const plainPreventSpy = vi.spyOn(plainClick, 'preventDefault');
    service.navigateOrScrollToAnchor('features', plainClick);

    expect(plainPreventSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy).toHaveBeenCalledWith('features');
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '#features');

    const keyboardClick = new MouseEvent('click', { button: 0, detail: 0 });
    const keyboardPreventSpy = vi.spyOn(keyboardClick, 'preventDefault');
    service.navigateOrScrollToAnchor('contact', keyboardClick);

    expect(keyboardPreventSpy).toHaveBeenCalledTimes(1);
    expect(scrollSpy).toHaveBeenCalledWith('contact');
    expect(pushStateSpy).toHaveBeenCalledWith(null, '', '#contact');
  });
});
