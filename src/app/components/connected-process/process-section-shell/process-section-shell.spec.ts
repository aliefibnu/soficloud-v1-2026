import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProcessSectionShell } from './process-section-shell';

@Component({
  imports: [ProcessSectionShell],
  template: `
    <app-process-section-shell
      [sectionId]="sectionId()"
      [title]="title()"
      [description]="description()"
      [stageBgClass]="stageBgClass()"
      [titleMaxWidthClass]="titleMaxWidthClass()"
      [descriptionMaxWidthClass]="descriptionMaxWidthClass()"
    >
      <div id="test-shelf" shell-shelf>Shelf Test Content</div>
      <div id="test-projected-content">Projected Test Content</div>
    </app-process-section-shell>
  `,
})
class TestHostComponent {
  readonly sectionId = signal('satu-data');
  readonly title = signal('Setiap Bagian Bergerak Dengan Konteks Yang Sama.');
  readonly description = signal(
    'Dokumen bisnis membawa referensi ke tahap berikutnya.',
  );
  readonly stageBgClass = signal('bg-[#E8F0FC]');
  readonly titleMaxWidthClass = signal('max-w-3xl lg:max-w-214');
  readonly descriptionMaxWidthClass = signal('max-w-214');
}

describe('ProcessSectionShell', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ProcessSectionShell],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    const shellEl = fixture.debugElement.query(
      By.directive(ProcessSectionShell),
    );
    expect(shellEl).toBeTruthy();
  });

  it('should render the outer section with correct id and aria-labelledby attribute', () => {
    const sectionEl = fixture.debugElement.query(By.css('section'));
    expect(sectionEl).toBeTruthy();
    expect(sectionEl.nativeElement.getAttribute('id')).toBe('satu-data');
    expect(sectionEl.nativeElement.getAttribute('aria-labelledby')).toBe(
      'satu-data-heading',
    );
  });

  it('should render the h2 heading with matching id, styling, and text', () => {
    const headingEl = fixture.debugElement.query(By.css('h2'));
    expect(headingEl).toBeTruthy();
    expect(headingEl.nativeElement.getAttribute('id')).toBe('satu-data-heading');
    expect(headingEl.nativeElement.textContent.trim()).toBe(
      'Setiap Bagian Bergerak Dengan Konteks Yang Sama.',
    );
    expect(headingEl.nativeElement.classList.contains('font-inter')).toBe(true);
    expect(headingEl.nativeElement.classList.contains('font-semibold')).toBe(true);
    expect(headingEl.nativeElement.classList.contains('text-[#23244E]')).toBe(true);
    expect(headingEl.nativeElement.classList.contains('lg:max-w-214')).toBe(
      true,
    );
  });

  it('should allow custom titleMaxWidthClass on heading', () => {
    const headingEl = fixture.debugElement.query(By.css('h2'));
    expect(headingEl.nativeElement.classList.contains('lg:max-w-214')).toBe(
      true,
    );

    hostComponent.titleMaxWidthClass.set('max-w-md');
    fixture.detectChanges();

    expect(headingEl.nativeElement.classList.contains('max-w-md')).toBe(true);
  });

  it('should render the accent divider line with aria-hidden="true"', () => {
    const dividerEl = fixture.debugElement.query(By.css('.bg-\\[\\#365AD2\\]'));
    expect(dividerEl).toBeTruthy();
    expect(dividerEl.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(dividerEl.nativeElement.classList.contains('w-full')).toBe(true);
    expect(dividerEl.nativeElement.classList.contains('max-w-214')).toBe(true);
  });

  it('should render the description paragraph with correct styling and text', () => {
    const descEl = fixture.debugElement.query(By.css('p.font-dm-sans'));
    expect(descEl).toBeTruthy();
    expect(descEl.nativeElement.textContent.trim()).toBe(
      'Dokumen bisnis membawa referensi ke tahap berikutnya.',
    );
    expect(descEl.nativeElement.classList.contains('whitespace-pre-line')).toBe(true);
    expect(descEl.nativeElement.classList.contains('max-w-214')).toBe(true);
  });

  it('should allow custom descriptionMaxWidthClass on description paragraph', () => {
    const descEl = fixture.debugElement.query(By.css('p.font-dm-sans'));
    expect(descEl.nativeElement.classList.contains('max-w-214')).toBe(true);

    hostComponent.descriptionMaxWidthClass.set('max-w-md');
    fixture.detectChanges();

    expect(descEl.nativeElement.classList.contains('max-w-md')).toBe(true);
  });

  it('should project shelf content inside the shell-shelf slot', () => {
    const shelfEl = fixture.debugElement.query(By.css('#test-shelf'));
    expect(shelfEl).toBeTruthy();
    expect(shelfEl.nativeElement.textContent.trim()).toBe('Shelf Test Content');
  });

  it('should project child content inside the stage container via ng-content', () => {
    const projectedEl = fixture.debugElement.query(
      By.css('#test-projected-content'),
    );
    expect(projectedEl).toBeTruthy();
    expect(projectedEl.nativeElement.textContent.trim()).toBe(
      'Projected Test Content',
    );
  });

  it('should apply the configurable stage background class', () => {
    const stageContainer = fixture.debugElement.query(
      By.css('.bg-\\[\\#E8F0FC\\]'),
    );
    expect(stageContainer).toBeTruthy();

    hostComponent.stageBgClass.set('bg-[#D6E6E3]');
    fixture.detectChanges();

    const updatedStageContainer = fixture.debugElement.query(
      By.css('.bg-\\[\\#D6E6E3\\]'),
    );
    expect(updatedStageContainer).toBeTruthy();
  });
});
