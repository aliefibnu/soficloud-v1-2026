import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';
import { WorkflowSection2 } from './workflow-section-2';

describe('WorkflowSection2', () => {
  let fixture: ComponentFixture<WorkflowSection2>;
  let component: WorkflowSection2;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkflowSection2],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkflowSection2);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should wrap content inside ProcessSectionShell with id="workflow-section-2"', () => {
    const shell = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shell).toBeTruthy();

    const section = fixture.debugElement.query(By.css('section#workflow-section-2'));
    expect(section).toBeTruthy();
  });
});
