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
          fallbackLang: 'id',
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

  it('should render hero, process-tabs, satu-data, transaction-flow, accounting-impact, role-reports, full-process-map, and subfooter components', () => {
    fixture.detectChanges();
    const heroEl = fixture.debugElement.query(By.css('app-hero'));
    expect(heroEl).toBeTruthy();

    const processTabsEl = fixture.debugElement.query(By.css('app-process-tabs'));
    expect(processTabsEl).toBeTruthy();

    const satuDataEl = fixture.debugElement.query(By.css('app-satu-data'));
    expect(satuDataEl).toBeTruthy();

    const transactionFlowEl = fixture.debugElement.query(
      By.css('app-transaction-flow'),
    );
    expect(transactionFlowEl).toBeTruthy();

    const accountingImpactEl = fixture.debugElement.query(
      By.css('app-accounting-impact'),
    );
    expect(accountingImpactEl).toBeTruthy();

    const roleReportsEl = fixture.debugElement.query(By.css('app-role-reports'));
    expect(roleReportsEl).toBeTruthy();

    const fullProcessMapEl = fixture.debugElement.query(
      By.css('app-full-process-map'),
    );
    expect(fullProcessMapEl).toBeTruthy();

    const subfooterEl = fixture.debugElement.query(By.css('app-subfooter'));
    expect(subfooterEl).toBeTruthy();

    // Verify correct DOM order inside <main>
    const mainEl = fixture.debugElement.query(By.css('main'));
    const children = Array.from((mainEl.nativeElement as HTMLElement).children).map(
      (el) => el.tagName.toLowerCase(),
    );
    expect(children).toEqual([
      'app-hero',
      'app-process-tabs',
      'app-satu-data',
      'app-transaction-flow',
      'app-accounting-impact',
      'app-role-reports',
      'app-full-process-map',
      'app-subfooter',
    ]);
  });
});
