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

  it('should render the company name header', () => {
    const heading = fixture.debugElement.query(By.css('h3'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.classList.contains('font-dm-sans')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-bold')).toBe(true);
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
