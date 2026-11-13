import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';
import { StatusAndFlow } from './status-and-flow';

describe('StatusAndFlow', () => {
  let fixture: ComponentFixture<StatusAndFlow>;
  let component: StatusAndFlow;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusAndFlow],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusAndFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should wrap content inside ProcessSectionShell with id="status-dan-alur"', () => {
    const shell = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shell).toBeTruthy();

    const section = fixture.debugElement.query(By.css('section#status-dan-alur'));
    expect(section).toBeTruthy();
  });
});
