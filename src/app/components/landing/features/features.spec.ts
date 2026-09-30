import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Features } from './features';

describe('Features', () => {
  let component: Features;
  let fixture: ComponentFixture<Features>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Features],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      FEATURES: {
        HEADING: '9 Fitur Utama SOFICloud',
        SUBTITLE: 'Kapabilitas yang saling terhubung untuk menjalankan proses operasional dan menghasilkan informasi management yang konsisten.',
        CTA_LEARN_MORE: 'Pelajari Selengkapnya',
        CARDS: {
          FINANCIAL: {
            TITLE: 'Financial Management & Accounting',
            DESC: 'Kelola proses keuangan dan accounting dari transaksi operasional hingga laporan keuangan, cash control, cost analysis dan management insight.',
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(Features);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the features component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main section heading and subtitle', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#features-heading');
    expect(heading).toBeTruthy();
    expect(heading?.textContent?.trim()).toBe('9 Fitur Utama SOFICloud');

    const subtitle = compiled.querySelector('p');
    expect(subtitle?.textContent).toContain('Kapabilitas yang saling terhubung');
  });

  it('should render exactly 9 feature cards', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const articles = compiled.querySelectorAll('article');
    expect(articles.length).toBe(9);
  });

  it('should render correct title and button on the first card', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const firstTitle = compiled.querySelector('article h3');
    expect(firstTitle?.textContent?.trim()).toBe('Financial Management & Accounting');

    const firstBtn = compiled.querySelector('article a');
    expect(firstBtn?.textContent?.trim()).toBe('Pelajari Selengkapnya');
  });

  it('should update hoveredCard state when setHoveredCard is called', () => {
    expect(component.hoveredCard()).toBeNull();
    component.setHoveredCard(1);
    expect(component.hoveredCard()).toBe(1);
    component.setHoveredCard(5);
    expect(component.hoveredCard()).toBe(5);
    component.setHoveredCard(null);
    expect(component.hoveredCard()).toBeNull();
  });

  it('should ensure all bottom-anchored layers use origin-bottom and no upward translateY', () => {
    for (const card of component.cards) {
      const bottomLayers = card.layers.filter((l) => l.bottomPct === 0);
      expect(bottomLayers.length).toBeGreaterThan(0);
      for (const layer of bottomLayers) {
        expect(layer.hoverClass).toContain('origin-bottom');
        expect(layer.hoverClass).not.toContain('-translate-y');
      }
    }
  });
});
