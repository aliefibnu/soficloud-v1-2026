import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ScheduleDemoCompanyInfo } from './company-info';

describe('ScheduleDemoCompanyInfo', () => {
  let component: ScheduleDemoCompanyInfo;
  let fixture: ComponentFixture<ScheduleDemoCompanyInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleDemoCompanyInfo],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleDemoCompanyInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have host classes for #0162EF background, uniform 24px radius, and symmetric padding', () => {
    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.classList.contains('bg-[#0162EF]')).toBe(true);
    expect(hostEl.classList.contains('rounded-[24px]')).toBe(true);
    expect(hostEl.classList.contains('xl:p-14')).toBe(true);
  });

  it('should render the company name header with DM Sans and bold weight', () => {
    const heading = fixture.debugElement.query(By.css('h3'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.classList.contains('font-dm-sans')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-bold')).toBe(true);
    expect(heading.nativeElement.classList.contains('sm:text-[26px]')).toBe(true);

    const headerContainer = heading.parent;
    expect(headerContainer?.nativeElement.classList.contains('border-b')).toBe(false);
  });

  it('should render contact labels in Title Case without uppercase transform', () => {
    const labels = fixture.debugElement.queryAll(By.css('span.text-xs'));
    expect(labels.length).toBe(5);
    for (const label of labels) {
      expect(label.nativeElement.classList.contains('uppercase')).toBe(false);
    }
  });

  it('should render contact values with uniform text-base and font-bold classes', () => {
    const phoneEl = fixture.debugElement.query(By.css('a[href^="tel:"]'));
    expect(phoneEl.nativeElement.classList.contains('text-base')).toBe(true);
    expect(phoneEl.nativeElement.classList.contains('font-bold')).toBe(true);

    const waEl = fixture.debugElement.query(By.css('a[href*="wa.me"]'));
    expect(waEl.nativeElement.classList.contains('text-base')).toBe(true);
    expect(waEl.nativeElement.classList.contains('font-bold')).toBe(true);

    const emailEl = fixture.debugElement.query(By.css('a[href^="mailto:"]'));
    expect(emailEl.nativeElement.classList.contains('text-base')).toBe(true);
    expect(emailEl.nativeElement.classList.contains('font-bold')).toBe(true);

    const addressEl = fixture.debugElement.query(By.css('address'));
    expect(addressEl.nativeElement.classList.contains('text-base')).toBe(true);
    expect(addressEl.nativeElement.classList.contains('font-bold')).toBe(true);
  });

  it('should render bolder contact item divider lines with border-white/50', () => {
    const dividers = fixture.debugElement.queryAll(By.css('.border-b'));
    expect(dividers.length).toBe(4);
    for (const divider of dividers) {
      expect(divider.nativeElement.classList.contains('border-white/50')).toBe(true);
    }
  });

  it('should render the clickable phone link with tel: scheme', () => {
    const phoneLink = fixture.debugElement.query(By.css('a[href^="tel:"]'));
    expect(phoneLink).toBeTruthy();
    expect(phoneLink.nativeElement.getAttribute('href')).toBe('tel:+627784160250');
  });

  it('should render the WhatsApp link with https://wa.me target _blank and noopener', () => {
    const waLink = fixture.debugElement.query(By.css('a[href*="wa.me"]'));
    expect(waLink).toBeTruthy();
    expect(waLink.nativeElement.getAttribute('href')).toBe('https://wa.me/628117774744');
    expect(waLink.nativeElement.getAttribute('target')).toBe('_blank');
    expect(waLink.nativeElement.getAttribute('rel')).toContain('noopener');
  });

  it('should render the email link with mailto: scheme', () => {
    const emailLink = fixture.debugElement.query(By.css('a[href^="mailto:"]'));
    expect(emailLink).toBeTruthy();
    expect(emailLink.nativeElement.getAttribute('href')).toBe('mailto:hello@inforsys.co.id');
  });

  it('should render the office address in an accessible address tag', () => {
    const addressEl = fixture.debugElement.query(By.css('address'));
    expect(addressEl).toBeTruthy();
  });
});
