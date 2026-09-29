import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { BusinessControl } from './business-control';
import { LanguageService } from '../../../systems/lib/language.service';

describe('BusinessControl', () => {
  let component: BusinessControl;
  let fixture: ComponentFixture<BusinessControl>;
  let languageService: LanguageService;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessControl],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
        LanguageService,
      ],
    }).compileComponents();

    languageService = TestBed.inject(LanguageService);
    translateService = TestBed.inject(TranslateService);

    translateService.setTranslation('id', {
      BUSINESS_CONTROL: {
        HEADER_TITLE: 'Kendalikan Bisnis Dari Satu Tempat',
        HEADER_SUBTITLE: 'Pilih area yang ingin dilihat. Setiap proses terhubung ke data yang sama dan selalu dapat ditelusuri.',
        CARD_TITLE: 'Real-Time Business Control',
        CARD_BADGE: 'REAL-TIME',
        CHART_TITLE: 'INCOME AND EXPENSIVE (IDR)',
        EXPENSE: 'Expense',
        INCOME: 'Income',
        CONTENT_TITLE: 'Pantau Bisnis Secara Real-Time Untuk Keputusan Yang Lebih Cepat',
        CONTENT_DESC: 'Sales, cash position, inventory alert, outstanding process, production, project, dan KPI bisnis tersedia dalam satu management view.',
        CTA_BUTTON: 'Lihat Kapabilitas',
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(BusinessControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle expense visibility correctly', () => {
    expect(component.isExpenseVisible()).toBe(true);
    component.toggleExpense();
    expect(component.isExpenseVisible()).toBe(false);
    component.toggleExpense();
    expect(component.isExpenseVisible()).toBe(true);
  });

  it('should toggle income visibility correctly', () => {
    expect(component.isIncomeVisible()).toBe(true);
    component.toggleIncome();
    expect(component.isIncomeVisible()).toBe(false);
    component.toggleIncome();
    expect(component.isIncomeVisible()).toBe(true);
  });

  it('should update hoveredIndex and compute activePoint', () => {
    component.setHoveredIndex(3);
    expect(component.hoveredIndex()).toBe(3);
    expect(component.activePointIndex()).toBe(3);
    expect(component.activePoint()?.id).toBe(3);

    component.setHoveredIndex(null);
    expect(component.hoveredIndex()).toBeNull();
    expect(component.activePointIndex()).toBe(component.selectedIndex() ?? 6);
  });

  it('should select point on click', () => {
    component.selectPoint(2);
    expect(component.selectedIndex()).toBe(2);
  });

  it('should toggle and close menu', () => {
    const mockEvent = {
      stopPropagation: () => {},
    } as unknown as MouseEvent;

    expect(component.isMenuOpen()).toBe(false);
    component.toggleMenu(mockEvent);
    expect(component.isMenuOpen()).toBe(true);
    component.closeMenu();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should reset view to default state', () => {
    component.isExpenseVisible.set(false);
    component.isIncomeVisible.set(false);
    component.selectedIndex.set(1);
    component.hoveredIndex.set(4);
    component.isMenuOpen.set(true);

    component.resetView();

    expect(component.isExpenseVisible()).toBe(true);
    expect(component.isIncomeVisible()).toBe(true);
    expect(component.selectedIndex()).toBe(6);
    expect(component.hoveredIndex()).toBeNull();
    expect(component.isMenuOpen()).toBe(false);
  });

  it('should compute valid Catmull-Rom spline paths', () => {
    expect(component.incomePath()).toContain('M 85.0,');
    expect(component.expensePath()).toContain('M 85.0,');
    expect(component.incomePath()).toContain('C ');
    expect(component.expensePath()).toContain('C ');
  });

  it('should format currency accurately in IDR', () => {
    const formatted = component.formatCurrency(460);
    expect(formatted).toContain('460');
  });

  it('should close menu on document click outside container', () => {
    component.isMenuOpen.set(true);
    const mockEvent = {
      target: document.createElement('div'),
    } as unknown as MouseEvent;
    component.onDocumentClick(mockEvent);
    expect(component.isMenuOpen()).toBe(false);
  });
});
