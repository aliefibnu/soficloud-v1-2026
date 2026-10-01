import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusinessModel } from './business-model';

describe('BusinessModel', () => {
  let component: BusinessModel;
  let fixture: ComponentFixture<BusinessModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessModel],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessModel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
