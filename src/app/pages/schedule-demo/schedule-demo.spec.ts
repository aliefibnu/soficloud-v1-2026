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
    vi.useRealTimers();
    window.location.hash = '';
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

  it('should scroll to the target element smoothly when a fragment hash is present on initialization', () => {
    vi.useFakeTimers();
    window.location.hash = '#schedule-demo-form';
    const formSection = document.getElementById('schedule-demo-form') ?? document.createElement('div');
    formSection.id = 'schedule-demo-form';
    document.body.appendChild(formSection);
    const scrollIntoViewSpy = vi.fn();
    formSection.scrollIntoView = scrollIntoViewSpy;

    try {
      component.ngOnInit();
      vi.advanceTimersByTime(100);

      expect(scrollIntoViewSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
    } finally {
      vi.useRealTimers();
      formSection.remove();
      window.location.hash = '';
    }
  });

  it('should have responsive negative margin classes on host to underlap the navbar', () => {
    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.classList.contains('-mt-[67px]')).toBe(true);
    expect(hostEl.classList.contains('sm:-mt-[73px]')).toBe(true);
    expect(hostEl.classList.contains('md:-mt-[77px]')).toBe(true);
  });

  it('should have responsive top padding classes on outer wrapper accounting for navbar height', () => {
    const wrapper = fixture.nativeElement.querySelector('.relative.w-full');
    expect(wrapper?.classList.contains('pt-[99px]')).toBe(true);
    expect(wrapper?.classList.contains('sm:pt-[121px]')).toBe(true);
    expect(wrapper?.classList.contains('md:pt-[125px]')).toBe(true);
    expect(wrapper?.classList.contains('lg:pt-[141px]')).toBe(true);
    expect(wrapper?.classList.contains('pb-8')).toBe(true);
    expect(wrapper?.classList.contains('sm:pb-12')).toBe(true);
    expect(wrapper?.classList.contains('lg:pb-16')).toBe(true);
  });
});
