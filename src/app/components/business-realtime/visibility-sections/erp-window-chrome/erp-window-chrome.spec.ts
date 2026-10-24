import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ErpWindowChrome, ErpModuleType } from './erp-window-chrome';

@Component({
  imports: [ErpWindowChrome],
  template: `
    <app-erp-window-chrome
      [activeModule]="activeModule()"
      [moduleTitle]="moduleTitle()"
    >
      <div id="test-projected-card">Test Card Inside ERP</div>
    </app-erp-window-chrome>
  `,
})
class TestHostComponent {
  readonly activeModule = signal<ErpModuleType>('sales');
  readonly moduleTitle = signal<string>('Sales (PT INFORSYS INDONESIA )');
}

describe('ErpWindowChrome', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ErpWindowChrome],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      BUSINESS_REALTIME: {
        VISIBILITY_SECTIONS: {
          COMMON: {
            DASHBOARD: 'Dashboard',
            ADMIN: 'Admin',
            SIDEBAR: {
              PROCUREMENT: 'Procurement',
              SALES: 'Sales',
              MRP: 'MRP',
              FINANCE: 'Finance',
              ORDER_PIPELINE: 'Order Pipeline',
            },
          },
          SALES_PERFORMANCE: {
            MOCKUP: {
              WINDOW_TITLE: 'Sales (PT INFORSYS INDONESIA )',
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the erp-window-chrome component', () => {
    const chromeEl = fixture.debugElement.query(By.directive(ErpWindowChrome));
    expect(chromeEl).toBeTruthy();
  });

  it('should render the window top bar with Dashboard and Module title', () => {
    const headerEl = fixture.debugElement.query(By.css('header'));
    expect(headerEl).toBeTruthy();
    expect(headerEl.nativeElement.textContent).toContain('Dashboard');
    expect(headerEl.nativeElement.textContent).toContain(
      'Sales (PT INFORSYS INDONESIA )',
    );
  });

  it('should render the avatar badge with letter A', () => {
    const avatar = fixture.debugElement.query(By.css('[aria-label="User Avatar"]'));
    expect(avatar).toBeTruthy();
    expect(avatar.nativeElement.textContent.trim()).toBe('A');
  });

  it('should render 5 sidebar navigation items', () => {
    const aside = fixture.debugElement.query(By.css('aside'));
    expect(aside).toBeTruthy();

    const items = aside.queryAll(By.css('div'));
    expect(items.length).toBe(5);
    expect(items[0].nativeElement.textContent.trim()).toBe('Procurement');
    expect(items[1].nativeElement.textContent.trim()).toBe('Sales');
    expect(items[2].nativeElement.textContent.trim()).toBe('MRP');
    expect(items[3].nativeElement.textContent.trim()).toBe('Finance');
    expect(items[4].nativeElement.textContent.trim()).toBe('Order Pipeline');
  });

  it('should highlight active module in the sidebar', () => {
    const aside = fixture.debugElement.query(By.css('aside'));
    const items = aside.queryAll(By.css('div'));

    // By default, sales (index 1) is active
    expect(items[1].nativeElement.classList.contains('bg-[#EAF1FD]')).toBe(true);
    expect(items[1].nativeElement.classList.contains('font-medium')).toBe(true);
    expect(items[0].nativeElement.classList.contains('bg-[#EAF1FD]')).toBe(false);
    expect(items[0].nativeElement.classList.contains('font-medium')).toBe(true);

    // Switch active module to procurement
    hostComponent.activeModule.set('procurement');
    fixture.detectChanges();

    expect(items[0].nativeElement.classList.contains('bg-[#EAF1FD]')).toBe(true);
    expect(items[1].nativeElement.classList.contains('bg-[#EAF1FD]')).toBe(false);
  });

  it('should render top meta status pills with Figma 6.72px radius and #FDFDFD box', () => {
    const pillsContainer = fixture.debugElement.query(
      By.css('[aria-label="System status and timestamp"]'),
    );
    expect(pillsContainer).toBeTruthy();
    expect(pillsContainer.nativeElement.textContent).toContain('Admin');
    expect(pillsContainer.nativeElement.textContent).toContain('Thursday, 28 Jul 2026');
    expect(pillsContainer.nativeElement.textContent).toContain('09:54:25 AM');

    const pills = pillsContainer.queryAll(By.css('span'));
    expect(pills.length).toBe(3);
    for (const pill of pills) {
      expect(pill.nativeElement.classList.contains('rounded-[6.72px]')).toBe(true);
      expect(pill.nativeElement.classList.contains('bg-[#FDFDFD]')).toBe(true);
      expect(pill.nativeElement.classList.contains('border-[#DDDDDD]')).toBe(true);
      expect(pill.nativeElement.classList.contains('font-semibold')).toBe(true);
    }
  });

  it('should project inner content into the canvas', () => {
    const projected = fixture.debugElement.query(By.css('#test-projected-card'));
    expect(projected).toBeTruthy();
    expect(projected.nativeElement.textContent.trim()).toBe('Test Card Inside ERP');
  });
});
