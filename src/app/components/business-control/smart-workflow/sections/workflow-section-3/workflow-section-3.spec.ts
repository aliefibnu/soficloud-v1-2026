import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';
import { WorkflowSection3 } from './workflow-section-3';

describe('WorkflowSection3', () => {
  let fixture: ComponentFixture<WorkflowSection3>;
  let component: WorkflowSection3;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowSection3],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowSection3);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should wrap content inside ProcessSectionShell with id="workflow-section-3"', () => {
    const shell = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shell).toBeTruthy();

    const section = fixture.debugElement.query(By.css('section#workflow-section-3'));
    expect(section).toBeTruthy();
  });
});
