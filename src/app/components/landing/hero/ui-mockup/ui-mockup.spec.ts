import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMockup } from './ui-mockup';

describe('UiMockup', () => {
  let component: UiMockup;
  let fixture: ComponentFixture<UiMockup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMockup],
    }).compileComponents();

    fixture = TestBed.createComponent(UiMockup);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the UiMockup component', () => {
    expect(component).toBeTruthy();
  });
});
