import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { BusinessRealtime } from './business-realtime';

describe('BusinessRealtime', () => {
  let component: BusinessRealtime;
  let fixture: ComponentFixture<BusinessRealtime>;

  beforeEach(async () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero, visibility-function, sales-performance, and procurement-control components', () => {
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
  });
});
