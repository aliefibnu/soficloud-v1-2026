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

  it('should have host classes for #0162EF background and 24px right/bottom radius', () => {
    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.classList.contains('bg-[#0162EF]')).toBe(true);
    expect(hostEl.classList.contains('lg:rounded-r-[24px]')).toBe(true);
    expect(hostEl.classList.contains('lg:rounded-br-[24px]')).toBe(true);
    expect(hostEl.classList.contains('lg:rounded-bl-none')).toBe(true);
    expect(hostEl.classList.contains('rounded-b-[24px]')).toBe(true);
  });

  it('should render the company name header without a bottom divider line', () => {
    const heading = fixture.debugElement.query(By.css('h3'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.classList.contains('font-dm-sans')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-bold')).toBe(true);

    const headerContainer = heading.parent;
    expect(headerContainer?.nativeElement.classList.contains('border-b')).toBe(false);
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
