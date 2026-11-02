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
      [showStatusPills]="showStatusPills()"
    >
      <div id="test-projected-card">Test Card Inside ERP</div>
    </app-erp-window-chrome>
  `,
})
class TestHostComponent {
  readonly activeModule = signal<ErpModuleType>('sales');
  readonly moduleTitle = signal<string>('Sales (PT INFORSYS INDONESIA )');
  readonly showStatusPills = signal<boolean>(true);
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
          fallbackLang: 'id',
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
            PROFILE: {
              ARIA: 'Avatar profil pengguna',
              NAME: 'Atabil Marove',
              ROLE: 'VP of Operations',
              STATUS: 'Online',
              BADGE: 'Admin',
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

  it('should conditionally hide status pills when showStatusPills is false', () => {
    hostComponent.showStatusPills.set(false);
    fixture.detectChanges();

    const pillsContainer = fixture.debugElement.query(
      By.css('[aria-label="System status and timestamp"]'),
    );
    expect(pillsContainer).toBeNull();
  });

  it('should toggle profile popover when avatar button is clicked', () => {
    const chromeDebug = fixture.debugElement.query(By.directive(ErpWindowChrome));
    const chrome = chromeDebug.componentInstance as ErpWindowChrome;

    expect(chrome.isProfileOpen()).toBe(false);
    expect(fixture.debugElement.query(By.css('[role="dialog"]'))).toBeNull();

    const avatarBtn = fixture.debugElement.query(
      By.css('button[aria-label="Avatar profil pengguna"]'),
    );
    expect(avatarBtn).toBeTruthy();
    expect(avatarBtn.nativeElement.getAttribute('aria-expanded')).toBe('false');

    avatarBtn.nativeElement.click();
    fixture.detectChanges();

    expect(chrome.isProfileOpen()).toBe(true);
    expect(avatarBtn.nativeElement.getAttribute('aria-expanded')).toBe('true');
    expect(fixture.debugElement.query(By.css('[role="dialog"]'))).toBeTruthy();

    avatarBtn.nativeElement.click();
    fixture.detectChanges();

    expect(chrome.isProfileOpen()).toBe(false);
    expect(avatarBtn.nativeElement.getAttribute('aria-expanded')).toBe('false');
    expect(fixture.debugElement.query(By.css('[role="dialog"]'))).toBeNull();
  });

  it('should display user profile name, role, online status, and admin badge in popover', () => {
    const chromeDebug = fixture.debugElement.query(By.directive(ErpWindowChrome));
    const chrome = chromeDebug.componentInstance as ErpWindowChrome;

    chrome.toggleProfile();
    fixture.detectChanges();

    const dialog = fixture.debugElement.query(By.css('[role="dialog"]'));
    expect(dialog).toBeTruthy();
    expect(dialog.nativeElement.textContent).toContain('Atabil Marove');
    expect(dialog.nativeElement.textContent).toContain('VP of Operations');
    expect(dialog.nativeElement.textContent).toContain('Online');
    expect(dialog.nativeElement.textContent).toContain('Admin');
  });

  it('should close profile popover when document is clicked or escape is pressed', () => {
    const chromeDebug = fixture.debugElement.query(By.directive(ErpWindowChrome));
    const chrome = chromeDebug.componentInstance as ErpWindowChrome;

    chrome.isProfileOpen.set(true);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('[role="dialog"]'))).toBeTruthy();

    chrome.onDocumentClick();
    fixture.detectChanges();
    expect(chrome.isProfileOpen()).toBe(false);
    expect(fixture.debugElement.query(By.css('[role="dialog"]'))).toBeNull();

    chrome.isProfileOpen.set(true);
    fixture.detectChanges();
    expect(chrome.isProfileOpen()).toBe(true);

    chrome.closeAllDropdowns();
    fixture.detectChanges();
    expect(chrome.isProfileOpen()).toBe(false);
  });

  it('should stop click propagation inside popover card so it remains open', () => {
    const chromeDebug = fixture.debugElement.query(By.directive(ErpWindowChrome));
    const chrome = chromeDebug.componentInstance as ErpWindowChrome;

    chrome.isProfileOpen.set(true);
    fixture.detectChanges();

    const dialog = fixture.debugElement.query(By.css('[role="dialog"]'));
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
    const spy = vi.spyOn(clickEvent, 'stopPropagation');

    dialog.nativeElement.dispatchEvent(clickEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('should rotate chevron icon when popover is open', () => {
    const chromeDebug = fixture.debugElement.query(By.directive(ErpWindowChrome));
    const chrome = chromeDebug.componentInstance as ErpWindowChrome;
    const chevron = fixture.debugElement.query(By.css('button svg'));

    expect(chevron.nativeElement.classList.contains('rotate-180')).toBe(false);

    chrome.isProfileOpen.set(true);
    fixture.detectChanges();

    expect(chevron.nativeElement.classList.contains('rotate-180')).toBe(true);
  });

  it('should close other ERP window instances when one opens', () => {
    const fixture2 = TestBed.createComponent(TestHostComponent);
    fixture2.detectChanges();

    const chrome1 = fixture.debugElement.query(By.directive(ErpWindowChrome))
      .componentInstance as ErpWindowChrome;
    const chrome2 = fixture2.debugElement.query(By.directive(ErpWindowChrome))
      .componentInstance as ErpWindowChrome;

    chrome1.toggleProfile();
    expect(chrome1.isProfileOpen()).toBe(true);
    expect(chrome2.isProfileOpen()).toBe(false);

    chrome2.toggleProfile();
    expect(chrome1.isProfileOpen()).toBe(false);
    expect(chrome2.isProfileOpen()).toBe(true);

    fixture2.destroy();
  });
});
