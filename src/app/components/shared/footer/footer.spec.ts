import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      FOOTER: {
        COMPANY_NAME: 'PT Inforsys Indonesia',
        ADDRESS_LINE1: 'Orchard Park Blok C No.18',
        ADDRESS_LINE2: 'Agung Podomoro Land Batam',
        ADDRESS_LINE3: 'Kepulauan Riau 29464, Indonesia',
        PHONE: '+62 778 416 0250',
        EMAIL: 'hello@inforsys.co.id',
        ABOUT_US: {
          TITLE: 'About Us',
          KENALI: 'Kenali SofiCloud',
          ABOUT: 'About Inforsys',
          TERMS: 'Terms & Conditions',
          PRIVACY: 'Privacy Policy',
        },
        CUSTOMERS: {
          TITLE: 'Customers',
          MANUFACTURING: 'Manufacturing',
          DISTRIBUTION: 'Distribution',
          CONSTRUCTION: 'Construction & Project',
          SERVICES: 'Services',
        },
        SUPPORT: {
          TITLE: 'Support',
          IMPLEMENTATION: 'Software Implementation',
          TRAINING: 'Training & Re-Implementation',
          MAINTENANCE: 'Annual Software Maintenance',
          CUSTOMIZE: 'Customize Module',
        },
        COPYRIGHT: '© 1998 – 2026 PT Inforsys Indonesia',
        ARIA: {
          SECTION: 'Footer Situs SOFICloud',
          PHONE: 'Hubungi telepon +62 778 416 0250',
          EMAIL: 'Kirim email ke hello@inforsys.co.id',
          LOGO: 'Logo SOFICloud',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render company information and contact links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('PT Inforsys Indonesia');
    expect(compiled.textContent).toContain('Orchard Park Blok C No.18');
    expect(compiled.textContent).toContain('Agung Podomoro Land Batam');
    expect(compiled.textContent).toContain('Kepulauan Riau 29464, Indonesia');
    expect(compiled.textContent).toContain('+62 778 416 0250');
    expect(compiled.textContent).toContain('hello@inforsys.co.id');

    const phoneLink = compiled.querySelector<HTMLAnchorElement>('a[href^="tel:"]');
    expect(phoneLink?.href).toContain('tel:+627784160250');

    const emailLink = compiled.querySelector<HTMLAnchorElement>('a[href^="mailto:"]');
    expect(emailLink?.href).toContain('mailto:hello@inforsys.co.id');
  });

  it('should render navigation columns for About Us, Customers, and Support', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('About Us');
    expect(compiled.textContent).toContain('Kenali SofiCloud');
    expect(compiled.textContent).toContain('About Inforsys');
    expect(compiled.textContent).toContain('Terms & Conditions');
    expect(compiled.textContent).toContain('Privacy Policy');

    expect(compiled.textContent).toContain('Customers');
    expect(compiled.textContent).toContain('Manufacturing');
    expect(compiled.textContent).toContain('Distribution');
    expect(compiled.textContent).toContain('Construction & Project');
    expect(compiled.textContent).toContain('Services');

    expect(compiled.textContent).toContain('Support');
    expect(compiled.textContent).toContain('Software Implementation');
    expect(compiled.textContent).toContain('Training & Re-Implementation');
    expect(compiled.textContent).toContain('Annual Software Maintenance');
    expect(compiled.textContent).toContain('Customize Module');
  });

  it('should render copyright statement', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('© 1998 – 2026 PT Inforsys Indonesia');
  });
});
