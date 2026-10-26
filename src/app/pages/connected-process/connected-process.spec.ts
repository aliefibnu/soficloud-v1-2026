import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ConnectedProcess } from './connected-process';

describe('ConnectedProcess', () => {
  let component: ConnectedProcess;
  let fixture: ComponentFixture<ConnectedProcess>;
  let scrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [ConnectedProcess],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectedProcess);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  afterEach(() => {
    scrollToSpy.mockRestore();
  });

  it('should create the ConnectedProcess page component', () => {
    expect(component).toBeTruthy();
  });

  it('should scroll to top (0, 0) on initialization in browser when no hash is present', () => {
    scrollToSpy.mockClear();
    component.ngOnInit();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });

  it('should render hero and subfooter components', () => {
    fixture.detectChanges();
    const heroEl = fixture.debugElement.query(By.css('app-hero'));
    expect(heroEl).toBeTruthy();

    const subfooterEl = fixture.debugElement.query(By.css('app-subfooter'));
    expect(subfooterEl).toBeTruthy();
  });
});
