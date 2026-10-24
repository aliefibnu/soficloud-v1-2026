import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { BusinessRealtime } from './business-realtime';

describe('BusinessRealtime', () => {
  let component: BusinessRealtime;
  let fixture: ComponentFixture<BusinessRealtime>;
  let scrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [BusinessRealtime],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessRealtime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero, visibility-function, visibility sections, and subfooter components without cta', () => {
    fixture.detectChanges();
    const heroEl = fixture.debugElement.query(By.css('app-hero'));
    expect(heroEl).toBeTruthy();

    const visibilityEl = fixture.debugElement.query(By.css('app-visibility-function'));
    expect(visibilityEl).toBeTruthy();

    const salesPerformanceEl = fixture.debugElement.query(
      By.css('app-sales-performance'),
    );
    expect(salesPerformanceEl).toBeTruthy();

    const procurementControlEl = fixture.debugElement.query(
      By.css('app-procurement-control'),
    );
    expect(procurementControlEl).toBeTruthy();

    const materialReadinessEl = fixture.debugElement.query(
      By.css('app-material-readiness'),
    );
    expect(materialReadinessEl).toBeTruthy();

    const orderPipelineEl = fixture.debugElement.query(
      By.css('app-order-pipeline'),
    );
    expect(orderPipelineEl).toBeTruthy();

    const financialVisibilityEl = fixture.debugElement.query(
      By.css('app-financial-visibility'),
    );
    expect(financialVisibilityEl).toBeTruthy();

    const subfooterEl = fixture.debugElement.query(
      By.css('app-subfooter'),
    );
    expect(subfooterEl).toBeTruthy();

    const ctaEl = fixture.debugElement.query(By.css('app-cta'));
    expect(ctaEl).toBeNull();
  });

  it('should scroll to top (0, 0) on initialization when in browser environment without hash', () => {
    scrollToSpy.mockClear();
    component.ngOnInit();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });
});
