import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { VisibilitySectionShell } from './visibility-section-shell';

@Component({
  imports: [VisibilitySectionShell],
  template: `
    <app-visibility-section-shell
      [sectionId]="sectionId()"
      [title]="title()"
      [description]="description()"
      [decisionText]="decisionText()"
      [decisionLabel]="decisionLabel()"
      [stageBgClass]="stageBgClass()"
      [decisionImageSrc]="decisionImageSrc()"
      [decisionImageWidth]="decisionImageWidth()"
      [decisionImageHeight]="decisionImageHeight()"
      [decisionImagePositionClass]="decisionImagePositionClass()"
    >
      <div id="test-projected-mockup">Projected Domain Mockup</div>
    </app-visibility-section-shell>
  `,
})
class TestHostComponent {
  readonly sectionId = signal('sales-performance');
  readonly title = signal('Lihat Arah Penjualan Sejak Awal');
  readonly description = signal(
    'Nilai open sales order memperlihatkan pesanan yang masih berjalan.',
  );
  readonly decisionText = signal('Pantau perubahan pipeline secara cepat.');
  readonly decisionLabel = signal('Untuk keputusan:');
  readonly stageBgClass = signal('bg-[#F9CEC8]');
  readonly decisionImageSrc = signal<string | null>(null);
  readonly decisionImageWidth = signal(127);
  readonly decisionImageHeight = signal(108);
  readonly decisionImagePositionClass = signal('left-0 top-0');
}

describe('VisibilitySectionShell', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, VisibilitySectionShell],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    const shellEl = fixture.debugElement.query(By.directive(VisibilitySectionShell));
    expect(shellEl).toBeTruthy();
  });

  it('should render the outer section with correct id and aria-labelledby attribute', () => {
    const sectionEl = fixture.debugElement.query(By.css('section'));
    expect(sectionEl).toBeTruthy();
    expect(sectionEl.nativeElement.getAttribute('id')).toBe('sales-performance');
    expect(sectionEl.nativeElement.getAttribute('aria-labelledby')).toBe(
      'sales-performance-heading',
    );
  });

  it('should render the translated heading with correct id and styles', () => {
    const headingEl = fixture.debugElement.query(By.css('h3'));
    expect(headingEl).toBeTruthy();
    expect(headingEl.nativeElement.getAttribute('id')).toBe('sales-performance-heading');
    expect(headingEl.nativeElement.textContent.trim()).toBe(
      'Lihat Arah Penjualan Sejak Awal',
    );
    expect(headingEl.nativeElement.classList.contains('font-inter')).toBe(true);
    expect(headingEl.nativeElement.classList.contains('font-semibold')).toBe(true);
    expect(headingEl.nativeElement.classList.contains('text-[#23244E]')).toBe(true);
    expect(headingEl.nativeElement.classList.contains('max-w-3xl')).toBe(true);
    expect(headingEl.nativeElement.classList.contains('whitespace-pre-line')).toBe(true);
  });

  it('should render the blue accent divider line with wide horizontal span', () => {
    const dividerEl = fixture.debugElement.query(By.css('.bg-\\[\\#365AD2\\]'));
    expect(dividerEl).toBeTruthy();
    expect(dividerEl.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(dividerEl.nativeElement.classList.contains('w-full')).toBe(true);
    expect(dividerEl.nativeElement.classList.contains('max-w-214')).toBe(true);
    expect(dividerEl.nativeElement.classList.contains('h-0.5')).toBe(true);
  });

  it('should render the translated description paragraph with balanced width', () => {
    const descEl = fixture.debugElement.query(By.css('p.font-dm-sans'));
    expect(descEl).toBeTruthy();
    expect(descEl.nativeElement.textContent.trim()).toBe(
      'Nilai open sales order memperlihatkan pesanan yang masih berjalan.',
    );
    expect(descEl.nativeElement.classList.contains('whitespace-pre-line')).toBe(true);
    expect(descEl.nativeElement.classList.contains('max-w-214')).toBe(true);
  });

  it('should project child content into the left main column via ng-content', () => {
    const projectedEl = fixture.debugElement.query(By.css('#test-projected-mockup'));
    expect(projectedEl).toBeTruthy();
    expect(projectedEl.nativeElement.textContent.trim()).toBe(
      'Projected Domain Mockup',
    );
  });

  it('should apply the specified stage background class', () => {
    const stageContainer = fixture.debugElement.query(
      By.css('.bg-\\[\\#F9CEC8\\]'),
    );
    expect(stageContainer).toBeTruthy();

    hostComponent.stageBgClass.set('bg-[#EBF2FD]');
    fixture.detectChanges();

    const updatedStage = fixture.debugElement.query(By.css('.bg-\\[\\#EBF2FD\\]'));
    expect(updatedStage).toBeTruthy();
  });

  it('should render the decision card with label and text', () => {
    const labelEl = fixture.debugElement.query(
      By.css('span.font-bold'),
    );
    expect(labelEl).toBeTruthy();
    expect(labelEl.nativeElement.textContent.trim()).toBe('Untuk keputusan:');
    expect(labelEl.nativeElement.classList.contains('text-[#23244E]')).toBe(true);

    const decisionTexts = fixture.debugElement.queryAll(
      By.css('.font-dm-sans'),
    );
    const bodyText = decisionTexts.find((el) =>
      el.nativeElement.textContent.includes('Pantau perubahan pipeline'),
    );
    expect(bodyText).toBeTruthy();
    expect(bodyText!.nativeElement.classList.contains('font-regular')).toBe(true);
    expect(bodyText!.nativeElement.classList.contains('text-[#23244E]')).toBe(true);
  });

  it('should render the #D9D9D9 fallback rectangle by default and #CB1C29 card with illustration when decisionImageSrc is set', () => {
    const rectEl = fixture.debugElement.query(By.css('.bg-\\[\\#D9D9D9\\]'));
    expect(rectEl).toBeTruthy();
    expect(rectEl.nativeElement.classList.contains('rounded-[8px]')).toBe(true);
    expect(rectEl.nativeElement.classList.contains('w-[127px]')).toBe(true);
    expect(rectEl.nativeElement.classList.contains('h-[108px]')).toBe(true);

    expect(fixture.debugElement.query(By.css('img'))).toBeNull();

    hostComponent.decisionImageSrc.set('/images/business-realtime/decisions/procurement.svg');
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.bg-\\[\\#D9D9D9\\]'))).toBeNull();
    const redCardEl = fixture.debugElement.query(By.css('.bg-\\[\\#CB1C29\\]'));
    expect(redCardEl).toBeTruthy();
    expect(redCardEl.nativeElement.classList.contains('shadow-[0px_3px_15px_0px_rgba(0,0,0,0.08)]')).toBe(true);

    const imgEl = redCardEl.query(By.css('img'));
    expect(imgEl).toBeTruthy();
    expect(imgEl.nativeElement.getAttribute('src')).toBe(
      '/images/business-realtime/decisions/procurement.svg',
    );
  });
});
