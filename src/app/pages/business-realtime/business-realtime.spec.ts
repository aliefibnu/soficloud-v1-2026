import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessRealtime } from './business-realtime';

describe('BusinessRealtime', () => {
  let component: BusinessRealtime;
  let fixture: ComponentFixture<BusinessRealtime>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessRealtime],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessRealtime);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
