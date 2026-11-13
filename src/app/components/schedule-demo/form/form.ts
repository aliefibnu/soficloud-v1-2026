import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

export interface IndustryOption {
  key: string;
  value: string;
}

export interface DemoLeadForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
  company: FormControl<string>;
  industry: FormControl<string>;
  position: FormControl<string>;
  message: FormControl<string>;
}

@Component({
  selector: 'app-schedule-demo-form',
  imports: [ReactiveFormsModule, TranslatePipe, NgOptimizedImage],
  templateUrl: './form.html',
  host: {
    class: 'block w-full',
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeDropdown()',
  },
})
export class ScheduleDemoForm {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly elementRef = inject(ElementRef);

  readonly isDropdownOpen = signal(false);
  readonly isSubmitted = signal(false);
  readonly selectedIndustry = signal<IndustryOption | null>(null);

  readonly industries: readonly IndustryOption[] = [
    { key: 'SCHEDULE_DEMO.FORM.INDUSTRIES.MANUFACTURING', value: 'Manufaktur' },
    { key: 'SCHEDULE_DEMO.FORM.INDUSTRIES.TRADING', value: 'Perdagangan & Industri' },
    { key: 'SCHEDULE_DEMO.FORM.INDUSTRIES.CONSTRUCTION', value: 'Konstruksi' },
    { key: 'SCHEDULE_DEMO.FORM.INDUSTRIES.SERVICES', value: 'Layanan' },
    { key: 'SCHEDULE_DEMO.FORM.INDUSTRIES.OTHERS', value: 'Lainnya' },
  ];

  // Indonesian & international phone format per PRD: ^(\+62|62|0)[0-9]{8,13}$
  private readonly phonePattern = /^(\+62|62|0)[0-9]{8,13}$/;
  // Email validation regex per PRD
  private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  readonly form: FormGroup<DemoLeadForm> = this.fb.group<DemoLeadForm>({
    fullName: this.fb.control('', [Validators.required, Validators.minLength(2)]),
    email: this.fb.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
    phone: this.fb.control('', [Validators.required, Validators.pattern(this.phonePattern)]),
    company: this.fb.control('', [Validators.required, Validators.minLength(2)]),
    industry: this.fb.control('', [Validators.required]),
    position: this.fb.control('', [Validators.required, Validators.minLength(2)]),
    message: this.fb.control(''),
  });

  get fullNameControl(): FormControl<string> {
    return this.form.controls.fullName;
  }

  get emailControl(): FormControl<string> {
    return this.form.controls.email;
  }

  get phoneControl(): FormControl<string> {
    return this.form.controls.phone;
  }

  get companyControl(): FormControl<string> {
    return this.form.controls.company;
  }

  get industryControl(): FormControl<string> {
    return this.form.controls.industry;
  }

  get positionControl(): FormControl<string> {
    return this.form.controls.position;
  }

  get messageControl(): FormControl<string> {
    return this.form.controls.message;
  }

  toggleDropdown(event?: MouseEvent): void {
    event?.stopPropagation();
    this.isDropdownOpen.update((open) => !open);
  }

  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  selectIndustry(option: IndustryOption, event?: Event): void {
    event?.stopPropagation();
    this.selectedIndustry.set(option);
    this.industryControl.setValue(option.value);
    this.industryControl.markAsDirty();
    this.industryControl.markAsTouched();
    this.closeDropdown();
  }

  onDocumentClick(event: MouseEvent): void {
    if (this.isDropdownOpen() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.closeDropdown();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    console.info('Demo request submitted:', payload);
    this.isSubmitted.set(true);
  }

  resetForm(): void {
    this.form.reset();
    this.selectedIndustry.set(null);
    this.isSubmitted.set(false);
  }
}
