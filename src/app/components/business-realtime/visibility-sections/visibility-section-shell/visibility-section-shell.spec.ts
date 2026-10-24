import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { VisibilitySectionShell } from './visibility-section-shell';

@Component({
  imports: [VisibilitySectionShell],
  template: `
    <app-visibility-section-shell
      [sectionId]="sectionId()"
      [titleKey]="titleKey()"
      [descriptionKey]="descriptionKey()"
      [decisionTextKey]="decisionTextKey()"
      [decisionLabelKey]="decisionLabelKey()"
      [stageBgClass]="stageBgClass()"
    >
      <div id="test-projected-mockup">Projected Domain Mockup</div>
    </app-visibility-section-shell>
  `,
})
class TestHostComponent {
  readonly sectionId = signal('sales-performance');
  readonly titleKey = signal('TEST.TITLE');
  readonly descriptionKey = signal('TEST.DESCRIPTION');
  readonly decisionTextKey = signal('TEST.DECISION_TEXT');
  readonly decisionLabelKey = signal('TEST.DECISION_LABEL');
  readonly stageBgClass = signal('bg-[#F9CEC8]');
}

describe('VisibilitySectionShell', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, VisibilitySectionShell],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      TEST: {
        TITLE: 'Lihat Arah Penjualan Sejak Awal',
        DESCRIPTION: 'Nilai open sales order memperlihatkan pesanan yang masih berjalan.',
        DECISION_TEXT: 'Pantau perubahan pipeline secara cepat.',
        DECISION_LABEL: 'Untuk keputusan:',
      },
      BUSINESS_REALTIME: {
        VISIBILITY_SECTIONS: {
          COMMON: {
            DECISION_LABEL: 'Untuk keputusan:',
          },
        },
      },
    });
    translateService.use('id');

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
    expect(headingEl.nativeElement.classList.contains('max-w-lg')).toBe(true);
  });

  it('should render the blue accent divider line with wide horizontal span', () => {
    const dividerEl = fixture.debugElement.query(By.css('.bg-\\[\\#365AD2\\]'));
    expect(dividerEl).toBeTruthy();
    expect(dividerEl.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(dividerEl.nativeElement.classList.contains('w-full')).toBe(true);
    expect(dividerEl.nativeElement.classList.contains('max-w-[856px]')).toBe(true);
    expect(dividerEl.nativeElement.classList.contains('h-0.5')).toBe(true);
  });

  it('should render the translated description paragraph with balanced width', () => {
    const descEl = fixture.debugElement.query(By.css('p.font-dm-sans'));
    expect(descEl).toBeTruthy();
    expect(descEl.nativeElement.textContent.trim()).toBe(
      'Nilai open sales order memperlihatkan pesanan yang masih berjalan.',
    );
    expect(descEl.nativeElement.classList.contains('text-balance')).toBe(true);
    expect(descEl.nativeElement.classList.contains('max-w-[856px]')).toBe(true);
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

  it('should render the #D9D9D9 placeholder rectangle with 8px radius in the decision card', () => {
    const rectEl = fixture.debugElement.query(By.css('.bg-\\[\\#D9D9D9\\]'));
    expect(rectEl).toBeTruthy();
    expect(rectEl.nativeElement.classList.contains('rounded-[8px]')).toBe(true);
    expect(rectEl.nativeElement.classList.contains('h-32')).toBe(true);

    // No images or SVGs should exist in the decision card
    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl).toBeNull();
    const svgEl = fixture.debugElement.query(By.css('.bg-\\[\\#D9D9D9\\] svg'));
    expect(svgEl).toBeNull();
  });
});
