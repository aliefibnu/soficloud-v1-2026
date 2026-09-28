import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OverviewFeature } from './overview-feature';

describe('OverviewFeature', () => {
  let component: OverviewFeature;
  let fixture: ComponentFixture<OverviewFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
