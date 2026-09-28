import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessControl } from './business-control';

describe('BusinessControl', () => {
  let component: BusinessControl;
  let fixture: ComponentFixture<BusinessControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessControl],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
