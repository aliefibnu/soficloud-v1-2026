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
      [decisionIconSrc]="decisionIconSrc()"
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
  readonly decisionIconSrc = signal<string | undefined>(undefined);
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
    expect(headingEl.nativeElement.classList.contains('font-bold')).toBe(true);
    expect(headingEl.nativeElement.classList.contains('text-[#23244E]')).toBe(true);
  });

  it('should render the blue accent divider line', () => {
    const dividerEl = fixture.debugElement.query(By.css('.bg-\\[\\#365AD2\\]'));
    expect(dividerEl).toBeTruthy();
    expect(dividerEl.nativeElement.getAttribute('aria-hidden')).toBe('true');
  });

  it('should render the translated description paragraph', () => {
    const descEl = fixture.debugElement.query(By.css('p.font-dm-sans'));
    expect(descEl).toBeTruthy();
    expect(descEl.nativeElement.textContent.trim()).toBe(
      'Nilai open sales order memperlihatkan pesanan yang masih berjalan.',
    );
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
      By.css('span.uppercase'),
    );
    expect(labelEl).toBeTruthy();
    expect(labelEl.nativeElement.textContent.trim()).toBe('Untuk keputusan:');

    const decisionTexts = fixture.debugElement.queryAll(
      By.css('.font-dm-sans'),
    );
    const bodyText = decisionTexts.find((el) =>
      el.nativeElement.textContent.includes('Pantau perubahan pipeline'),
    );
    expect(bodyText).toBeTruthy();
  });

  it('should render fallback SVG icon when decisionIconSrc is undefined', () => {
    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl).toBeNull();

    const svgIcon = fixture.debugElement.query(By.css('svg'));
    expect(svgIcon).toBeTruthy();
  });

  it('should render custom image icon when decisionIconSrc is provided', () => {
    hostComponent.decisionIconSrc.set('/images/icons/chart.svg');
    fixture.detectChanges();

    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl).toBeTruthy();
    expect(imgEl.nativeElement.getAttribute('src')).toBe('/images/icons/chart.svg');
  });
});
