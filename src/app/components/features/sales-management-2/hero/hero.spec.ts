import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Hero } from './hero';

describe('SalesManagement2 Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an empty hero section', () => {
    const heroEl = (fixture.nativeElement as HTMLElement).querySelector('section#hero');
    expect(heroEl).toBeTruthy();
    expect(heroEl?.children.length).toBe(0);
  });
});
