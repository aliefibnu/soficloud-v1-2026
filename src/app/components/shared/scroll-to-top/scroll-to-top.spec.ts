import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { ScrollToTop } from './scroll-to-top';

describe('ScrollToTop', () => {
  let component: ScrollToTop;
  let fixture: ComponentFixture<ScrollToTop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollToTop],
      providers: [provideTranslateService()],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollToTop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isVisible()).toBe(false);
  });

  it('should update visibility when scrolling', () => {
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true });
    component.onWindowScroll();
    expect(component.isVisible()).toBe(true);

    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    component.onWindowScroll();
    expect(component.isVisible()).toBe(false);
  });

  it('should render button with proper accessibility attributes', async () => {
    component.isVisible.set(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('type')).toBe('button');
    expect(button?.getAttribute('aria-label')).toBeTruthy();
  });

  it('should call scrollIntoView if hero element exists, or scrollTo if not', () => {
    const heroMock = document.createElement('div');
    heroMock.id = 'hero';
    heroMock.scrollIntoView = () => {};
    const scrollIntoViewSpy = vi.spyOn(heroMock, 'scrollIntoView');
    document.body.appendChild(heroMock);

    component.scrollToHero();
    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });

    document.body.removeChild(heroMock);

    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});
    component.scrollToHero();
    expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    scrollToSpy.mockRestore();
  });
});
