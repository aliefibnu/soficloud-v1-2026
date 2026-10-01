import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { BusinessModel } from './business-model';
import { LanguageService } from '../../../systems/lib/language.service';

describe('BusinessModel', () => {
  let component: BusinessModel;
  let fixture: ComponentFixture<BusinessModel>;
  let translateService: TranslateService;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessModel],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
        LanguageService,
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    languageService = TestBed.inject(LanguageService);

    translateService.setTranslation('id', {
      BUSINESS_MODEL: {
        HEADING: 'SOFICloud untuk Berbagai\nModel Bisnis',
        SUBTITLE:
          'Satu platform ERP yang dapat dikonfigurasi mengikuti karakter proses bisnis, struktur organisasi, dan kebutuhan operasional setiap perusahaan.',
        CTA_LEARN_MORE: 'Pelajari Selengkapnya',
        ARIA: {
          SECTION: 'Model Bisnis',
          CARD: 'Model bisnis {{title}}',
          LEARN_MORE: 'Pelajari selengkapnya tentang solusi {{title}}',
        },
        CARDS: {
          MANUFACTURING: {
            TITLE: 'Manufacturing',
            DESC: 'Material planning, procurement, inventory, BOM, routing, production order, shop floor, costing, hingga finance yang saling terintegrasi.',
          },
          DISTRIBUTION: {
            TITLE: 'Distribution & Trading',
            DESC: 'Sales order, purchasing, multi-warehouse inventory, delivery, invoicing, serta monitoring piutang dan hutang dalam satu alur kerja.',
          },
          CONSTRUCTION: {
            TITLE: 'Construction & Project',
            DESC: 'Hubungkan RFQ, project budget, pengadaan, pelaksanaan pekerjaan, progress billing, dan pembayaran. Pantau status serta biaya setiap proyek dalam satu alur.',
          },
          SERVICES: {
            TITLE: 'Services',
            DESC: 'Project, contract, operational billing, approval, cash flow, dan profitability analysis untuk bisnis jasa yang lebih tertata.',
          },
        },
      },
    });

    translateService.setTranslation('en', {
      BUSINESS_MODEL: {
        HEADING: 'SOFICloud for Diverse\nBusiness Models',
        SUBTITLE:
          'A single ERP platform configurable to match the business process character, organizational structure, and operational needs of every company.',
        CTA_LEARN_MORE: 'Learn More',
        ARIA: {
          SECTION: 'Business Models',
          CARD: '{{title}} business model',
          LEARN_MORE: 'Learn more about {{title}} solutions',
        },
        CARDS: {
          MANUFACTURING: {
            TITLE: 'Manufacturing',
            DESC: 'Material planning, procurement, inventory, BOM, routing, production order, shop floor, costing, to seamlessly integrated finance.',
          },
          DISTRIBUTION: {
            TITLE: 'Distribution & Trading',
            DESC: 'Sales orders, purchasing, multi-warehouse inventory, delivery, invoicing, and receivables & payables monitoring in one workflow.',
          },
          CONSTRUCTION: {
            TITLE: 'Construction & Project',
            DESC: 'Connect RFQ, project budget, procurement, execution, progress billing, and payments. Monitor status and costs of every project in one flow.',
          },
          SERVICES: {
            TITLE: 'Services',
            DESC: 'Projects, contracts, operational billing, approvals, cash flow, and profitability analysis for more structured service businesses.',
          },
        },
      },
    });

    translateService.use('id');

    fixture = TestBed.createComponent(BusinessModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the BusinessModel component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading and subtitle correctly', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#business-model-heading');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('SOFICloud untuk Berbagai');
    expect(heading?.textContent).toContain('Model Bisnis');

    const subtitle = compiled.querySelector('p');
    expect(subtitle?.textContent).toContain(
      'Satu platform ERP yang dapat dikonfigurasi',
    );
  });

  it('should render exactly 4 business model cards with numbers 01 to 04', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const articles = compiled.querySelectorAll('article');
    expect(articles.length).toBe(4);

    const cardNumbers = Array.from(articles).map(
      (article) => article.querySelector('span')?.textContent?.trim(),
    );
    expect(cardNumbers).toEqual(['01', '02', '03', '04']);
  });

  it('should render card titles and webp illustrations correctly', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = Array.from(compiled.querySelectorAll('h3')).map((h3) =>
      h3.textContent?.trim(),
    );
    expect(titles).toEqual([
      'Manufacturing',
      'Distribution & Trading',
      'Construction & Project',
      'Services',
    ]);

    const images = Array.from(compiled.querySelectorAll('img'));
    expect(images.length).toBe(4);

    const srcList = images.map((img) => img.getAttribute('src'));
    expect(srcList.some((src) => src?.includes('manufacturing.webp'))).toBe(true);
    expect(
      srcList.some((src) => src?.includes('distribution-trading.webp')),
    ).toBe(true);
    expect(
      srcList.some((src) => src?.includes('construction-project.webp')),
    ).toBe(true);
    expect(srcList.some((src) => src?.includes('services.webp'))).toBe(true);
  });

  it('should render CTA buttons for each card', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('article a');
    expect(buttons.length).toBe(4);
    buttons.forEach((btn) => {
      expect(btn.textContent?.trim()).toBe('Pelajari Selengkapnya');
    });
  });

  it('should update content when language changes via LanguageService', () => {
    languageService.setLanguage('en');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#business-model-heading');
    expect(heading?.textContent).toContain('SOFICloud for Diverse');

    const buttons = compiled.querySelectorAll('article a');
    expect(buttons[0]?.textContent?.trim()).toBe('Learn More');
  });
});
