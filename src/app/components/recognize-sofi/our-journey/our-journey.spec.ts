import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OurJourney } from './our-journey';

describe('OurJourney', () => {
  let component: OurJourney;
  let fixture: ComponentFixture<OurJourney>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurJourney],
    }).compileComponents();

    fixture = TestBed.createComponent(OurJourney);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
