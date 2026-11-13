import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ScheduleDemoMap } from './map';

describe('ScheduleDemoMap', () => {
  let component: ScheduleDemoMap;
  let fixture: ComponentFixture<ScheduleDemoMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleDemoMap],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleDemoMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the map container section with rounded card and shadow classes', () => {
    const sectionEl = fixture.debugElement.query(By.css('section'));
    expect(sectionEl).toBeTruthy();
    expect(sectionEl.nativeElement.classList.contains('rounded-3xl')).toBe(true);
    expect(sectionEl.nativeElement.classList.contains('overflow-hidden')).toBe(true);
    expect(sectionEl.nativeElement.classList.contains('border')).toBe(true);
  });

  it('should render the Google Maps iframe with the verified PT Inforsys Indonesia embed URL', () => {
    const iframeEl = fixture.debugElement.query(By.css('iframe'));
    expect(iframeEl).toBeTruthy();
    const src = iframeEl.nativeElement.getAttribute('src');
    expect(src).toContain('https://www.google.com/maps/embed');
    expect(src).toContain('Inforsys%20Indonesia');
    expect(src).toContain('104.06526419323218');
    expect(src).toContain('1.1150741817894188');
  });

  it('should configure lazy loading, referrerpolicy, and allowfullscreen attributes for performance & security', () => {
    const iframeEl = fixture.debugElement.query(By.css('iframe'));
    expect(iframeEl).toBeTruthy();
    expect(iframeEl.nativeElement.getAttribute('loading')).toBe('lazy');
    expect(iframeEl.nativeElement.getAttribute('referrerpolicy')).toBe('strict-origin-when-cross-origin');
    expect(iframeEl.nativeElement.hasAttribute('allowfullscreen')).toBe(true);
  });

  it('should have accessible title and aria-label attributes bound from translations', () => {
    const sectionEl = fixture.debugElement.query(By.css('section'));
    const iframeEl = fixture.debugElement.query(By.css('iframe'));
    expect(sectionEl.nativeElement.getAttribute('aria-label')).toBeTruthy();
    expect(iframeEl.nativeElement.getAttribute('title')).toBeTruthy();
  });

  it('should have responsive dimensions with full width and responsive minimum height', () => {
    const iframeEl = fixture.debugElement.query(By.css('iframe'));
    expect(iframeEl.nativeElement.classList.contains('w-full')).toBe(true);
    expect(iframeEl.nativeElement.classList.contains('min-h-[360px]')).toBe(true);
  });
});
