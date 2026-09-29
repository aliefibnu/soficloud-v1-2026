import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Features } from './features';

describe('Features', () => {
  let component: Features;
  let fixture: ComponentFixture<Features>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Features],
    }).compileComponents();

    fixture = TestBed.createComponent(Features);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the features component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the main section heading and subtitle', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#features-heading');
    expect(heading).toBeTruthy();
    expect(heading?.textContent?.trim()).toBe('9 Fitur Utama SOFICloud');

    const subtitle = compiled.querySelector('p');
    expect(subtitle?.textContent).toContain('Kapabilitas yang saling terhubung');
  });

  it('should render exactly 9 feature cards', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const articles = compiled.querySelectorAll('article');
    expect(articles.length).toBe(9);
  });

  it('should render correct title and button on the first card', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const firstTitle = compiled.querySelector('article h3');
    expect(firstTitle?.textContent?.trim()).toBe('Financial Management & Accounting');

    const firstBtn = compiled.querySelector('article a');
    expect(firstBtn?.textContent?.trim()).toBe('Pelajari Selengkapnya');
  });

  it('should update hoveredCard state when setHoveredCard is called', () => {
    expect(component.hoveredCard()).toBeNull();
    component.setHoveredCard(1);
    expect(component.hoveredCard()).toBe(1);
    component.setHoveredCard(5);
    expect(component.hoveredCard()).toBe(5);
    component.setHoveredCard(null);
    expect(component.hoveredCard()).toBeNull();
  });
});
