import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { SmartWorkflow } from './smart-workflow';

describe('SmartWorkflow', () => {
  let component: SmartWorkflow;
  let fixture: ComponentFixture<SmartWorkflow>;
  let scrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [SmartWorkflow],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SmartWorkflow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero component without cta', () => {
    fixture.detectChanges();
    const heroEl = fixture.debugElement.query(By.css('app-hero'));
    expect(heroEl).toBeTruthy();

    const ctaEl = fixture.debugElement.query(By.css('app-cta'));
    expect(ctaEl).toBeNull();
  });

  it('should scroll to top (0, 0) on initialization when in browser environment without hash', () => {
    scrollToSpy.mockClear();
    component.ngOnInit();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });
});
