import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';
import { Capabilities } from './capabilities';

describe('Capabilities', () => {
  let fixture: ComponentFixture<Capabilities>;
  let component: Capabilities;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Capabilities],
    }).compileComponents();

    fixture = TestBed.createComponent(Capabilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should wrap content inside ProcessSectionShell with id="kapabilitas"', () => {
    const shell = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shell).toBeTruthy();

    const section = fixture.debugElement.query(By.css('section#kapabilitas'));
    expect(section).toBeTruthy();
  });
});
