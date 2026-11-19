import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { vi, describe, it, expect, afterEach } from 'vitest';
import { listenWindowScrollRaf, observeHostViewport } from './viewport-observer';

describe('viewport-observer', () => {
  const originalIO = globalThis.IntersectionObserver;

  afterEach(() => {
    globalThis.IntersectionObserver = originalIO;
    vi.restoreAllMocks();
  });

  it('observeHostViewport should report visible=true immediately when IntersectionObserver is unavailable', () => {
    Reflect.deleteProperty(globalThis, 'IntersectionObserver');

    @Component({
      selector: 'app-test-viewport-fallback',
      template: '',
    })
    class TestFallbackComponent {
      readonly visible = signal(false);
      constructor() {
        observeHostViewport((v) => this.visible.set(v));
      }
    }

    const fixture = TestBed.createComponent(TestFallbackComponent);
    expect(fixture.componentInstance.visible()).toBe(true);
  });

  it('observeHostViewport should observe host element, deduplicate states, and disconnect on destroy', () => {
    const holder: { cb: IntersectionObserverCallback | null } = { cb: null };
    const observeSpy = vi.fn();
    const disconnectSpy = vi.fn();

    class MockIntersectionObserver {
      constructor(cb: IntersectionObserverCallback) {
        holder.cb = cb;
      }
      observe = observeSpy;
      disconnect = disconnectSpy;
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
      root = null;
      rootMargin = '';
      thresholds = [];
    }

    globalThis.IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;

    @Component({
      selector: 'app-test-viewport-observer',
      template: '',
    })
    class TestObserverComponent {
      readonly calls: boolean[] = [];
      constructor() {
        observeHostViewport((v) => this.calls.push(v), '50px 0px');
      }
    }

    const fixture = TestBed.createComponent(TestObserverComponent);
    const comp = fixture.componentInstance;

    expect(observeSpy).toHaveBeenCalledWith(fixture.nativeElement);
    expect(holder.cb).toBeTruthy();

    holder.cb?.(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    holder.cb?.(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
    holder.cb?.(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );

    expect(comp.calls).toEqual([false, true]);

    fixture.destroy();
    expect(disconnectSpy).toHaveBeenCalledTimes(1);
  });

  it('listenWindowScrollRaf should register passive listener, coalesce via rAF, and clean up on destroy', () => {
    const rafHolder: { cb: FrameRequestCallback | null } = { cb: null };
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafHolder.cb = cb;
      return 42;
    });
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {});
    const addSpy = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    @Component({
      selector: 'app-test-scroll-raf',
      template: '',
    })
    class TestScrollComponent {
      count = 0;
      constructor() {
        listenWindowScrollRaf(() => {
          this.count++;
        });
      }
    }

    const fixture = TestBed.createComponent(TestScrollComponent);
    const comp = fixture.componentInstance;

    const scrollCall = addSpy.mock.calls.find(([type]) => type === 'scroll');
    expect(scrollCall).toBeTruthy();
    expect(scrollCall?.[2]).toEqual({ passive: true });

    window.dispatchEvent(new Event('scroll'));
    window.dispatchEvent(new Event('scroll'));
    expect(comp.count).toBe(0);

    rafHolder.cb?.(16);
    expect(comp.count).toBe(1);

    // Schedule another frame and destroy before it fires
    window.dispatchEvent(new Event('scroll'));
    fixture.destroy();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(cancelSpy).toHaveBeenCalledWith(42);
  });
});
