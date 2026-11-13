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

  it('should render hero, process-tabs with 3 tabs, 3 workflow sections, and subfooter in order without cta', () => {
    fixture.detectChanges();
    const heroEl = fixture.debugElement.query(By.css('app-hero'));
    expect(heroEl).toBeTruthy();

    const processTabsEl = fixture.debugElement.query(By.css('app-process-tabs'));
    expect(processTabsEl).toBeTruthy();
    const tabButtons = processTabsEl.queryAll(By.css('[role="tab"]'));
    expect(tabButtons.length).toBe(3);
    expect(tabButtons.map((b) => b.nativeElement.getAttribute('aria-controls'))).toEqual([
      'workflow-section-1',
      'workflow-section-2',
      'workflow-section-3',
    ]);

    expect(fixture.debugElement.query(By.css('app-workflow-section-1'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-workflow-section-2'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-workflow-section-3'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-subfooter'))).toBeTruthy();

    const ctaEl = fixture.debugElement.query(By.css('app-cta'));
    expect(ctaEl).toBeNull();

    const mainEl = fixture.debugElement.query(By.css('main#main-content'));
    expect(mainEl).toBeTruthy();
    const children = Array.from((mainEl.nativeElement as HTMLElement).children).map(
      (el) => el.tagName.toLowerCase(),
    );
    expect(children).toEqual([
      'app-hero',
      'app-process-tabs',
      'app-workflow-section-1',
      'app-workflow-section-2',
      'app-workflow-section-3',
      'app-subfooter',
    ]);
  });

  it('should scroll to top (0, 0) on initialization when in browser environment without hash', () => {
    scrollToSpy.mockClear();
    component.ngOnInit();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });
});
