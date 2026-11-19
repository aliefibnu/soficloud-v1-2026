import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StrongErp } from './strong-erp';

describe('StrongErp', () => {
  let component: StrongErp;
  let fixture: ComponentFixture<StrongErp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrongErp],
    }).compileComponents();

    fixture = TestBed.createComponent(StrongErp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
