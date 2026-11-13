import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';
import { ExploreViews } from './explore-views';

describe('ExploreViews', () => {
  let fixture: ComponentFixture<ExploreViews>;
  let component: ExploreViews;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreViews],
    }).compileComponents();

    fixture = TestBed.createComponent(ExploreViews);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should wrap content inside ProcessSectionShell with id="jelajahi-tampilan"', () => {
    const shell = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shell).toBeTruthy();

    const section = fixture.debugElement.query(By.css('section#jelajahi-tampilan'));
    expect(section).toBeTruthy();
  });
});
