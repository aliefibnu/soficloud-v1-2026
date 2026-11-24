import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
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
        provideRouter([{ path: 'financial-management-1', component: FinancialManagement1 }]),
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    const router = TestBed.inject(Router);
    await router.navigateByUrl('/financial-management-1');

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

  it('should render app-hero, app-section-tabs, app-financial-control, app-ten-capabilities, gradient band (app-expense-and-advance + app-real-dashboard), app-integration, and app-subfooter in order', () => {
    const heroEl = fixture.debugElement.query(By.css('app-hero'));
    const tabsEl = fixture.debugElement.query(By.css('app-section-tabs'));
    const financialControlEl = fixture.debugElement.query(By.css('app-financial-control'));
    const tenCapabilitiesEl = fixture.debugElement.query(By.css('app-ten-capabilities'));
    const expenseAndAdvanceEl = fixture.debugElement.query(By.css('app-expense-and-advance'));
    const realDashboardEl = fixture.debugElement.query(By.css('app-real-dashboard'));
    const integrationEl = fixture.debugElement.query(By.css('app-integration'));
    const subfooterEl = fixture.debugElement.query(By.css('app-subfooter'));
    expect(heroEl).toBeTruthy();
    expect(tabsEl).toBeTruthy();
    expect(financialControlEl).toBeTruthy();
    expect(tenCapabilitiesEl).toBeTruthy();
    expect(expenseAndAdvanceEl).toBeTruthy();
    expect(realDashboardEl).toBeTruthy();
    expect(integrationEl).toBeTruthy();
    expect(subfooterEl).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#financial-control'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#capabilities'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#expense-advance'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#reporting'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#integration'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#subfooter'))).toBeTruthy();

    const children = Array.from(
      (fixture.nativeElement as HTMLElement).querySelector('div')?.children ?? [],
    ).map((el) => el.tagName.toLowerCase());
    expect(children).toEqual([
      'app-hero',
      'app-section-tabs',
      'app-financial-control',
      'app-ten-capabilities',
      'div',
      'app-integration',
      'app-subfooter',
    ]);

    const gradientBand = fixture.debugElement.query(By.css('[data-gradient-band]'));
    expect(gradientBand).toBeTruthy();
    expect(gradientBand.nativeElement.classList.contains('financial-gradient-band')).toBe(true);

    const bandChildren = Array.from(
      (gradientBand.nativeElement as HTMLElement).children,
    ).map((el) => el.tagName.toLowerCase());
    expect(bandChildren).toEqual(['app-expense-and-advance', 'app-real-dashboard', 'svg']);

    const bottomWave = gradientBand.query(By.css('svg[data-bottom-wave]'));
    expect(bottomWave).toBeTruthy();
    expect(bottomWave.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(bottomWave.query(By.css('path'))?.nativeElement.getAttribute('fill')).toBe('#ffffff');
    expect(
      fixture.debugElement
        .query(By.css('app-integration section#integration'))
        .nativeElement.classList.contains('bg-transparent'),
    ).toBe(true);

    const tabLinks = fixture.debugElement.queryAll(By.css('app-section-tabs nav ul li a'));
    expect(tabLinks.length).toBe(5);
    expect(tabLinks[0].nativeElement.getAttribute('href')).toBe(
      '/financial-management-1#financial-control',
    );
    expect(tabLinks[1].nativeElement.getAttribute('href')).toBe(
      '/financial-management-1#capabilities',
    );
    expect(tabLinks[2].nativeElement.getAttribute('href')).toBe(
      '/financial-management-1#expense-advance',
    );
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
