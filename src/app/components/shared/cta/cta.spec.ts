import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Cta } from './cta';

describe('Cta', () => {
  let component: Cta;
  let fixture: ComponentFixture<Cta>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cta],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      CTA: {
        TITLE: 'Tertarik Dengan\nSOFICloud ERP?',
        DESCRIPTION:
          'SOFICloud siap membantu perusahaan mengelola proses bisnis secara lebih terintegrasi, terkontrol, dan mudah dipantau. Hubungi tim kami untuk berdiskusi mengenai kebutuhan ERP perusahaan Anda.',
        SCHEDULE_DEMO: 'Jadwalkan Demo',
        CONTACT_US: 'Kontak kami',
        PHONE_LABEL: 'Phone',
        PHONE_VALUE: '+62 778 416 0250',
        WHATSAPP_LABEL: 'WhatsApp',
        WHATSAPP_VALUE: '+62 811 7774 744',
        EMAIL_LABEL: 'Email',
        EMAIL_VALUE: 'hello@inforsys.co.id',
        IMAGE_ALT: 'Representatif SOFICloud ERP siap membantu kebutuhan bisnis Anda',
        ARIA: {
          SECTION: 'Ajakan Bertindak SOFICloud ERP',
          SCHEDULE_DEMO: 'Jadwalkan Demo SOFICloud ERP',
          CONTACT_US: 'Hubungi tim SOFICloud ERP',
          PHONE: 'Telepon kantor SOFICloud di +62 778 416 0250',
          WHATSAPP: 'Hubungi WhatsApp SOFICloud di +62 811 7774 744',
          EMAIL: 'Kirim email ke hello@inforsys.co.id',
        },
      },
    });

    fixture = TestBed.createComponent(Cta);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading and description with correct typography classes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#cta-heading');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Tertarik Dengan');
    expect(heading?.textContent).toContain('SOFICloud ERP?');
    expect(heading?.classList.contains('font-dm-sans')).toBe(true);
    expect(heading?.classList.contains('font-bold')).toBe(true);

    const desc = compiled.querySelector('p');
    expect(desc).toBeTruthy();
    expect(desc?.textContent).toContain('SOFICloud siap membantu perusahaan');
    expect(desc?.classList.contains('font-dm-sans')).toBe(true);
    expect(desc?.classList.contains('font-normal')).toBe(true);
  });

  it('should render card with rounded-xl border radius and spacious container', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.querySelector('.max-w-7xl');
    expect(container).toBeTruthy();

    const card = compiled.querySelector('.rounded-xl');
    expect(card).toBeTruthy();
  });

  it('should render decorative background wave with z-0 above section background', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const waveContainer = compiled.querySelector('.z-0');
    expect(waveContainer).toBeTruthy();

    const svg = waveContainer?.querySelector('svg');
    expect(svg).toBeTruthy();

    const path = svg?.querySelector('path');
    expect(path?.getAttribute('fill')).toBe('#3874db');
  });

  it('should render primary and secondary buttons with DM Sans and emit events on click', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBe(2);

    const scheduleDemoBtn = buttons[0];
    expect(scheduleDemoBtn.textContent?.trim()).toContain('Jadwalkan Demo');
    expect(scheduleDemoBtn.classList.contains('font-dm-sans')).toBe(true);
    expect(scheduleDemoBtn.classList.contains('font-semibold')).toBe(true);

    const contactUsBtn = buttons[1];
    expect(contactUsBtn.textContent?.trim()).toContain('Kontak kami');
    expect(contactUsBtn.classList.contains('font-dm-sans')).toBe(true);
    expect(contactUsBtn.classList.contains('font-semibold')).toBe(true);

    let demoEmitted = false;
    component.scheduleDemo.subscribe(() => {
      demoEmitted = true;
    });
    scheduleDemoBtn.click();
    expect(demoEmitted).toBe(true);

    let contactEmitted = false;
    component.contactUs.subscribe(() => {
      contactEmitted = true;
    });
    contactUsBtn.click();
    expect(contactEmitted).toBe(true);
  });

  it('should render contact information items with telephone, whatsapp, and email links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const phoneLink = compiled.querySelector('a[href^="tel:"]');
    expect(phoneLink).toBeTruthy();
    expect(phoneLink?.getAttribute('href')).toBe('tel:+627784160250');
    expect(phoneLink?.textContent?.trim()).toBe('+62 778 416 0250');

    const waLink = compiled.querySelector('a[href*="wa.me"]');
    expect(waLink).toBeTruthy();
    expect(waLink?.getAttribute('href')).toContain('wa.me/628117774744');
    expect(waLink?.textContent?.trim()).toBe('+62 811 7774 744');

    const emailLink = compiled.querySelector('a[href^="mailto:"]');
    expect(emailLink).toBeTruthy();
    expect(emailLink?.getAttribute('href')).toBe('mailto:hello@inforsys.co.id');
    expect(emailLink?.textContent?.trim()).toBe('hello@inforsys.co.id');
  });

  it('should render optimized WebP image with proper alt text and dimensions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const img = compiled.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('ngsrc')).toContain('cta_image.webp');
    expect(img?.getAttribute('width')).toBe('528');
    expect(img?.getAttribute('height')).toBe('704');
    expect(img?.getAttribute('alt')).toBeTruthy();
  });

  it('should have proper accessibility attributes and semantic structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const section = compiled.querySelector('section');
    expect(section?.getAttribute('aria-labelledby')).toBe('cta-heading');

    const buttons = compiled.querySelectorAll('button');
    buttons.forEach((btn) => {
      expect(btn.getAttribute('type')).toBe('button');
      expect(btn.getAttribute('aria-label')).toBeTruthy();
    });

    const links = compiled.querySelectorAll('a');
    links.forEach((link) => {
      expect(link.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('should have responsive layout classes for mobile, tablet, and desktop', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const card = compiled.querySelector('.rounded-xl');
    expect(card?.classList.contains('flex-col')).toBe(true);
    expect(card?.classList.contains('md:flex-row')).toBe(true);

    const imageCol = compiled.querySelector('img')?.parentElement;
    expect(imageCol?.classList.contains('w-full')).toBe(true);
    expect(imageCol?.classList.contains('md:w-[42%]')).toBe(true);
    expect(
      imageCol?.classList.contains('xl:w-[528px]') ||
        imageCol?.classList.contains('xl:w-132')
    ).toBe(true);

    const buttonGroup = compiled.querySelector('button')?.parentElement;
    expect(buttonGroup?.classList.contains('flex-col')).toBe(true);
    expect(buttonGroup?.classList.contains('sm:flex-row')).toBe(true);

    const buttons = compiled.querySelectorAll('button');
    buttons.forEach((btn) => {
      expect(btn.classList.contains('w-full')).toBe(true);
      expect(btn.classList.contains('sm:w-auto')).toBe(true);
    });
  });
});
