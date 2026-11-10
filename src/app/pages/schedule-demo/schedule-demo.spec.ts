import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ScheduleDemo } from './schedule-demo';

describe('ScheduleDemo', () => {
  let component: ScheduleDemo;
  let fixture: ComponentFixture<ScheduleDemo>;
  let scrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [ScheduleDemo],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the hero section component', () => {
    fixture.detectChanges();
    const heroEl = fixture.debugElement.query(By.css('app-schedule-demo-hero'));
    expect(heroEl).toBeTruthy();
  });

  it('should render the unified contact & form section card with anchor id #schedule-demo-form', () => {
    fixture.detectChanges();
    const contactSection = fixture.debugElement.query(By.css('#schedule-demo-form'));
    expect(contactSection).toBeTruthy();
    expect(contactSection.nativeElement.classList.contains('rounded-3xl')).toBe(true);

    const companyInfoEl = fixture.debugElement.query(By.css('app-schedule-demo-company-info'));
    expect(companyInfoEl).toBeTruthy();

    const formEl = fixture.debugElement.query(By.css('app-schedule-demo-form'));
    expect(formEl).toBeTruthy();

    const formHeading = fixture.debugElement.query(By.css('h2#form-heading'));
    expect(formHeading).toBeTruthy();
    expect(formHeading.nativeElement.classList.contains('font-dm-sans')).toBe(true);
  });

  it('should render the Google Maps section component', () => {
    fixture.detectChanges();
    const mapEl = fixture.debugElement.query(By.css('app-schedule-demo-map'));
    expect(mapEl).toBeTruthy();
  });

  it('should scroll to top on initialization when no fragment hash is present', () => {
    window.location.hash = '';
    component.ngOnInit();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });

  it('should scroll to the target element smoothly when a fragment hash is present on initialization', async () => {
    vi.useFakeTimers();
    window.location.hash = '#schedule-demo-form';
    const formSection = document.getElementById('schedule-demo-form') ?? document.createElement('div');
    formSection.id = 'schedule-demo-form';
    document.body.appendChild(formSection);
    const scrollIntoViewSpy = vi.fn();
    formSection.scrollIntoView = scrollIntoViewSpy;

    component.ngOnInit();
    vi.advanceTimersByTime(100);

    expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
    vi.useRealTimers();
    formSection.remove();
    window.location.hash = '';
  });
});
