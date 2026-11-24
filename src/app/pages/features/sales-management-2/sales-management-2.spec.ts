import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { SalesManagement2 } from './sales-management-2';

describe('SalesManagement2', () => {
  let component: SalesManagement2;
  let fixture: ComponentFixture<SalesManagement2>;
  let scrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [SalesManagement2],
      providers: [provideRouter([{ path: 'sales-management-2', component: SalesManagement2 }])],
    }).compileComponents();

    const router = TestBed.inject(Router);
    await router.navigateByUrl('/sales-management-2');

    fixture = TestBed.createComponent(SalesManagement2);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-hero', () => {
    const heroEl = fixture.debugElement.query(By.css('app-hero'));
    expect(heroEl).toBeTruthy();
  });

  it('should scroll to top (0, 0) on initialization in browser when no hash is present', () => {
    scrollToSpy.mockClear();
    component.ngOnInit();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });
});
