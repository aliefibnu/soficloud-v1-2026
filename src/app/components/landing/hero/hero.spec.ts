import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Hero } from './hero';

describe('Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      HERO: {
        BADGE: 'SOFICLOUD ENTERPRISE RESOURCE PLANNING',
        TITLE_LINE_1: 'Software ERP Terintegrasi Untuk',
        TITLE_LINE_2_PREFIX: 'Bisnis Yang ',
        TITLE_LINE_2_HIGHLIGHT: 'Terus Bertumbuh',
        SUBTITLE: 'Kelola seluruh proses bisnis dalam satu sistem yang terhubung, dari operasional hingga keuangan.',
        ACTIONS: {
          CONTACT_US: 'Kontak Kami',
          WATCH_VIDEO: 'Lihat Video',
        },
        ARIA: {
          CONTACT_US: 'Hubungi tim Soficloud',
          WATCH_VIDEO: 'Tonton video demonstrasi Soficloud',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the top badge with correct text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.inline-flex');
    expect(badge?.textContent).toContain('SOFICLOUD ENTERPRISE RESOURCE PLANNING');
  });

  it('should render the H1 headline with Inter Extra Bold styling and highlighted text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1?.classList.contains('font-inter')).toBe(true);
    expect(h1?.classList.contains('font-extrabold')).toBe(true);
    expect(h1?.textContent).toContain('Software ERP Terintegrasi Untuk');
    expect(h1?.textContent).toContain('Bisnis Yang');
    expect(h1?.textContent).toContain('Terus Bertumbuh');

    const highlightedSpan = h1?.querySelector('.text-\\[\\#1d64ec\\]');
    expect(highlightedSpan?.textContent).toContain('Terus Bertumbuh');
  });

  it('should render the subtitle with DM Sans Regular styling', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const subtitle = compiled.querySelector('p');
    expect(subtitle).toBeTruthy();
    expect(subtitle?.classList.contains('font-dm-sans')).toBe(true);
    expect(subtitle?.classList.contains('font-normal')).toBe(true);
    expect(subtitle?.textContent).toContain('Kelola seluruh proses bisnis dalam satu sistem yang terhubung');
  });

  it('should render both CTA buttons with proper styles and ARIA labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const ctaContainer = compiled.querySelector('.mt-6');
    const buttons = ctaContainer?.querySelectorAll('button') ?? [];
    expect(buttons.length).toBe(2);

    const contactButton = buttons[0];
    const videoButton = buttons[1];

    expect(contactButton.textContent).toContain('Kontak Kami');
    expect(contactButton.getAttribute('aria-label')).toBe('Hubungi tim Soficloud');

    expect(videoButton.textContent).toContain('Lihat Video');
    expect(videoButton.getAttribute('aria-label')).toBe('Tonton video demonstrasi Soficloud');
  });

  it('should emit contactClick output when "Kontak Kami" button is clicked', () => {
    let emitted = false;
    component.contactClick.subscribe(() => {
      emitted = true;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const ctaContainer = compiled.querySelector('.mt-6');
    const contactButton = ctaContainer?.querySelectorAll('button')[0];
    contactButton?.click();

    expect(emitted).toBe(true);
  });

  it('should emit videoClick output when "Lihat Video" button is clicked', () => {
    let emitted = false;
    component.videoClick.subscribe(() => {
      emitted = true;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const ctaContainer = compiled.querySelector('.mt-6');
    const videoButton = ctaContainer?.querySelectorAll('button')[1];
    videoButton?.click();

    expect(emitted).toBe(true);
  });

  it('should render the ambient background gradient layer with accessibility and overlay attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const bgContainer = compiled.querySelector('[aria-hidden="true"].pointer-events-none');
    expect(bgContainer).toBeTruthy();
    expect(bgContainer?.classList.contains('-z-10')).toBe(true);
    expect(bgContainer?.classList.contains('overflow-hidden')).toBe(true);
  });

  it('should render the app-ui-mockup component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const uiMockup = compiled.querySelector('app-ui-mockup');
    expect(uiMockup).toBeTruthy();
  });

  it('should include design enhancements like text-balance, play icon, and status dot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1?.classList.contains('text-balance')).toBe(true);

    const videoButton = compiled.querySelectorAll('.mt-6 button')[1];
    const playIcon = videoButton?.querySelector('img');
    expect(playIcon).toBeTruthy();
    expect(playIcon?.getAttribute('aria-hidden')).toBe('true');
    expect(playIcon?.classList.contains('sm:hidden')).toBe(false);

    const badge = compiled.querySelector('.inline-flex');
    const dot = badge?.querySelector('span.rounded-full');
    expect(dot).toBeTruthy();
    expect(dot?.classList.contains('sm:hidden')).toBe(true);
  });
});
