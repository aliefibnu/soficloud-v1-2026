import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { FinancialManagement1 } from './financial-management-1';

describe('FinancialManagement1', () => {
  let component: FinancialManagement1;
  let fixture: ComponentFixture<FinancialManagement1>;
  let scrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [FinancialManagement1],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FinancialManagement1);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-hero, app-section-tabs, and app-financial-control in order', () => {
    const heroEl = fixture.debugElement.query(By.css('app-hero'));
    const tabsEl = fixture.debugElement.query(By.css('app-section-tabs'));
    const financialControlEl = fixture.debugElement.query(By.css('app-financial-control'));
    expect(heroEl).toBeTruthy();
    expect(tabsEl).toBeTruthy();
    expect(financialControlEl).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#financial-control'))).toBeTruthy();

    const children = Array.from(
      (fixture.nativeElement as HTMLElement).querySelector('div')?.children ?? [],
    ).map((el) => el.tagName.toLowerCase());
    expect(children).toEqual(['app-hero', 'app-section-tabs', 'app-financial-control']);

    const tabLinks = fixture.debugElement.queryAll(By.css('app-section-tabs nav ul li a'));
    expect(tabLinks.length).toBe(5);
    expect(component.tabs.map((t) => t.id)).toEqual([
      'financial-control',
      'capabilities',
      'expense-advance',
      'reporting',
      'integration',
    ]);
  });

  it('should scroll to top (0, 0) on initialization in browser when no hash is present', () => {
    scrollToSpy.mockClear();
    component.ngOnInit();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });
});
