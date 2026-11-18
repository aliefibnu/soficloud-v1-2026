import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subfooter } from './subfooter';

describe('SmartWorkflow Subfooter', () => {
  let component: Subfooter;
  let fixture: ComponentFixture<Subfooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Subfooter],
    }).compileComponents();

    fixture = TestBed.createComponent(Subfooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the subfooter component', () => {
    expect(component).toBeTruthy();
  });

  it('should have proper landmark and heading accessibility attributes', () => {
    const section = fixture.debugElement.query(By.css('section#subfooter'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.getAttribute('aria-labelledby')).toBe('subfooter-heading');

    const heading = fixture.debugElement.query(By.css('h2#subfooter-heading'));
    expect(heading).toBeTruthy();
  });

  it('should display Sesuaikan Pengendalian on the first line before the line break', () => {
    const headingEl = fixture.debugElement.query(By.css('h2#subfooter-heading'))
      .nativeElement as HTMLElement;
    const br = headingEl.querySelector('br');
    expect(br).toBeTruthy();

    const parts = headingEl.innerHTML.split(/<br\s*\/?>/i).map((part) => part.trim());
    expect(parts[0]).toBe('Sesuaikan Pengendalian');
    expect(parts[1]).toBe('Dengan Kebijakan Perusahaan Anda');
  });
});
