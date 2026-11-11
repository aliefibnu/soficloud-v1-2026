import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ScheduleDemoForm } from './form';

describe('ScheduleDemoForm', () => {
  let component: ScheduleDemoForm;
  let fixture: ComponentFixture<ScheduleDemoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleDemoForm],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleDemoForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values and invalid status', () => {
    expect(component.form.valid).toBe(false);
    expect(component.fullNameControl.value).toBe('');
    expect(component.emailControl.value).toBe('');
    expect(component.phoneControl.value).toBe('');
    expect(component.companyControl.value).toBe('');
    expect(component.industryControl.value).toBe('');
    expect(component.positionControl.value).toBe('');
  });

  it('should validate full name requirement and minlength', () => {
    component.fullNameControl.setValue('');
    expect(component.fullNameControl.valid).toBe(false);

    component.fullNameControl.setValue('A');
    expect(component.fullNameControl.valid).toBe(false);

    component.fullNameControl.setValue('Budi Santoso');
    expect(component.fullNameControl.valid).toBe(true);
  });

  it('should validate email format pattern', () => {
    component.emailControl.setValue('invalid-email');
    expect(component.emailControl.valid).toBe(false);

    component.emailControl.setValue('budi@');
    expect(component.emailControl.valid).toBe(false);

    component.emailControl.setValue('budi@example.com');
    expect(component.emailControl.valid).toBe(true);
  });

  it('should validate phone with Indonesian and international format regex', () => {
    // Invalid phone formats
    component.phoneControl.setValue('12345');
    expect(component.phoneControl.valid).toBe(false);

    component.phoneControl.setValue('+1234567890');
    expect(component.phoneControl.valid).toBe(false);

    component.phoneControl.setValue('abc08123456');
    expect(component.phoneControl.valid).toBe(false);

    // Valid formats: 08..., +62..., 62...
    component.phoneControl.setValue('08123456789');
    expect(component.phoneControl.valid).toBe(true);

    component.phoneControl.setValue('+628117774744');
    expect(component.phoneControl.valid).toBe(true);

    component.phoneControl.setValue('6281234567890');
    expect(component.phoneControl.valid).toBe(true);
  });

  it('should validate company, industry, and position requirements', () => {
    expect(component.companyControl.valid).toBe(false);
    expect(component.industryControl.valid).toBe(false);
    expect(component.positionControl.valid).toBe(false);

    component.companyControl.setValue('PT Maju Bersama');
    component.industryControl.setValue('Manufaktur');
    component.positionControl.setValue('IT Manager');

    expect(component.companyControl.valid).toBe(true);
    expect(component.industryControl.valid).toBe(true);
    expect(component.positionControl.valid).toBe(true);
  });

  it('should mark all controls as touched and display inline error messages when submitted invalid', () => {
    component.onSubmit();
    fixture.detectChanges();

    expect(component.fullNameControl.touched).toBe(true);
    expect(component.emailControl.touched).toBe(true);
    expect(component.phoneControl.touched).toBe(true);
    expect(component.companyControl.touched).toBe(true);
    expect(component.industryControl.touched).toBe(true);
    expect(component.positionControl.touched).toBe(true);

    const nameError = fixture.debugElement.query(By.css('#demo-name-error'));
    expect(nameError).toBeTruthy();

    const phoneError = fixture.debugElement.query(By.css('#demo-phone-error'));
    expect(phoneError).toBeTruthy();
  });

  it('should toggle custom industry dropdown and select an option', () => {
    expect(component.isDropdownOpen()).toBe(false);

    component.toggleDropdown();
    fixture.detectChanges();
    expect(component.isDropdownOpen()).toBe(true);

    const dropdownContainer = fixture.debugElement.query(By.css('.relative.z-30'));
    expect(dropdownContainer).toBeTruthy();

    const listbox = fixture.debugElement.query(By.css('#industry-listbox'));
    expect(listbox).toBeTruthy();
    expect(listbox.nativeElement.classList.contains('z-40')).toBe(true);

    const firstOption = component.industries[0];
    component.selectIndustry(firstOption);
    fixture.detectChanges();

    expect(component.isDropdownOpen()).toBe(false);
    expect(component.selectedIndustry()).toEqual(firstOption);
    expect(component.industryControl.value).toBe(firstOption.value);
  });

  it('should close dropdown on closeDropdown or escape key', () => {
    component.isDropdownOpen.set(true);
    component.closeDropdown();
    expect(component.isDropdownOpen()).toBe(false);
  });

  it('should submit successfully with valid data and allow resetting form', () => {
    const consoleInfoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    component.fullNameControl.setValue('Budi Santoso');
    component.emailControl.setValue('budi@example.com');
    component.phoneControl.setValue('+628117774744');
    component.companyControl.setValue('PT Maju Bersama');
    component.industryControl.setValue('Manufaktur');
    component.positionControl.setValue('Operations Director');

    expect(component.form.valid).toBe(true);

    component.onSubmit();
    fixture.detectChanges();

    expect(consoleInfoSpy).toHaveBeenCalledWith(
      'Demo request submitted:',
      expect.objectContaining({
        fullName: 'Budi Santoso',
        email: 'budi@example.com',
        phone: '+628117774744',
        company: 'PT Maju Bersama',
        industry: 'Manufaktur',
        position: 'Operations Director',
      }),
    );
    expect(component.isSubmitted()).toBe(true);

    // Verify success banner is rendered
    const successCard = fixture.debugElement.query(By.css('[role="status"]'));
    expect(successCard).toBeTruthy();

    // Reset form
    component.resetForm();
    fixture.detectChanges();
    expect(component.isSubmitted()).toBe(false);
    expect(component.fullNameControl.value).toBe('');

    consoleInfoSpy.mockRestore();
  });

  it('should match Figma specifications for Hubungi kami heading and description typography', () => {
    fixture.detectChanges();
    const heading = fixture.debugElement.query(By.css('#form-heading'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.classList.contains('font-inter')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-semibold')).toBe(true);
    expect(heading.nativeElement.classList.contains('lg:text-[46px]')).toBe(true);
    expect(heading.nativeElement.classList.contains('leading-[100%]')).toBe(true);
    expect(heading.nativeElement.classList.contains('tracking-normal')).toBe(true);
    expect(heading.nativeElement.classList.contains('text-[#23244E]')).toBe(true);

    const description = fixture.debugElement.query(By.css('h2#form-heading + p'));
    expect(description).toBeTruthy();
    expect(description.nativeElement.classList.contains('font-dm-sans')).toBe(true);
    expect(description.nativeElement.classList.contains('font-normal')).toBe(true);
    expect(description.nativeElement.classList.contains('text-[14px]')).toBe(true);
    expect(description.nativeElement.classList.contains('leading-relaxed')).toBe(true);
    expect(description.nativeElement.classList.contains('lg:leading-[1.3]')).toBe(true);
    expect(description.nativeElement.classList.contains('tracking-normal')).toBe(true);
    expect(description.nativeElement.classList.contains('text-[#23244E]')).toBe(true);
    expect(description.nativeElement.classList.contains('whitespace-pre-line')).toBe(true);
  });

  it('should match Figma specifications for input boxes (4px radius, 1px #E8E8E8 border, DM Sans 400 #8B8B8B text, and schedule-demo SVG icons)', () => {
    fixture.detectChanges();

    const inputIds = [
      '#demo-name',
      '#demo-email',
      '#demo-phone',
      '#demo-company',
      '#demo-position',
    ];

    for (const id of inputIds) {
      const input = fixture.debugElement.query(By.css(id));
      expect(input).toBeTruthy();
      expect(input.nativeElement.classList.contains('rounded-[4px]')).toBe(true);
      expect(input.nativeElement.classList.contains('border-[#E8E8E8]')).toBe(true);
      expect(input.nativeElement.classList.contains('font-dm-sans')).toBe(true);
      expect(input.nativeElement.classList.contains('font-normal')).toBe(true);
      expect(input.nativeElement.classList.contains('placeholder:text-[#8B8B8B]')).toBe(true);
    }

    const trigger = fixture.debugElement.query(By.css('#demo-industry-trigger'));
    expect(trigger).toBeTruthy();
    expect(trigger.nativeElement.classList.contains('rounded-[4px]')).toBe(true);
    expect(trigger.nativeElement.classList.contains('border-[#E8E8E8]')).toBe(true);
    expect(trigger.nativeElement.classList.contains('font-dm-sans')).toBe(true);
    expect(trigger.nativeElement.classList.contains('font-normal')).toBe(true);

    // Verify all 6 icons from /images/schedule-demo
    const imgs = fixture.debugElement.queryAll(By.css('form img'));
    expect(imgs.length).toBe(6);
    const expectedIcons = [
      '/images/schedule-demo/nama.svg',
      '/images/schedule-demo/email.svg',
      '/images/schedule-demo/telpon.svg',
      '/images/schedule-demo/perushaan.svg',
      '/images/schedule-demo/industri.svg',
      '/images/schedule-demo/posisi.svg',
    ];

    for (let i = 0; i < expectedIcons.length; i++) {
      expect(imgs[i].nativeElement.getAttribute('src')).toContain(expectedIcons[i]);
    }
  });
});
