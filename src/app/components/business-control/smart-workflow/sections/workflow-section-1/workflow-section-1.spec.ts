import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';
import { WorkflowSection1 } from './workflow-section-1';

describe('WorkflowSection1', () => {
  let fixture: ComponentFixture<WorkflowSection1>;
  let component: WorkflowSection1;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowSection1],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowSection1);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should wrap content inside ProcessSectionShell with id="workflow-section-1"', () => {
    const shell = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shell).toBeTruthy();

    const section = fixture.debugElement.query(By.css('section#workflow-section-1'));
    expect(section).toBeTruthy();
  });
});
