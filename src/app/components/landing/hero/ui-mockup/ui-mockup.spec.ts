import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiMockup } from './ui-mockup';

describe('UiMockup', () => {
  let component: UiMockup;
  let fixture: ComponentFixture<UiMockup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMockup],
    }).compileComponents();

    fixture = TestBed.createComponent(UiMockup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the UiMockup component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand logo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('img[alt="SOFICloud Logo"]');
    expect(logo).toBeTruthy();
    expect(logo?.getAttribute('src')).toBe('/soficloud-logo.svg');
  });

  it('should render the Management Overview pill', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Management Overview');
  });

  it('should render all 8 navigation items in sidebar', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('aside button');
    expect(buttons.length).toBe(8);
    expect(compiled.textContent).toContain('Dashboard');
    expect(compiled.textContent).toContain('Finance');
    expect(compiled.textContent).toContain('Sales');
    expect(compiled.textContent).toContain('Purchasing');
    expect(compiled.textContent).toContain('Inventory');
    expect(compiled.textContent).toContain('Production');
    expect(compiled.textContent).toContain('Project');
    expect(compiled.textContent).toContain('Analytics');
  });

  it('should update active nav item when clicked', () => {
    expect(component.activeNav()).toBe('dashboard');
    component.setActiveNav('finance');
    expect(component.activeNav()).toBe('finance');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const activeBtn = compiled.querySelector('aside button.bg-\\[\\#ebf3fe\\]');
    expect(activeBtn?.textContent).toContain('Finance');
  });

  it('should render greeting and date', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Kamis, 28 Juli 2026');
    expect(compiled.textContent).toContain('Selamat datang, Atabil');
  });

  it('should render 4 KPI metric cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Revenue');
    expect(compiled.textContent).toContain('Rp15,8M');
    expect(compiled.textContent).toContain('Gross Profit');
    expect(compiled.textContent).toContain('Rp3,1M');
    expect(compiled.textContent).toContain('Inventory Value');
    expect(compiled.textContent).toContain('Rp18,6M');
    expect(compiled.textContent).toContain('AR Outstanding');
    expect(compiled.textContent).toContain('Rp4,8M');
  });

  it('should render sales performance chart section and month labels', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Sales Performance');
    expect(compiled.textContent).toContain('Revenue & gross profit');
    expect(compiled.textContent).toContain('2026');
    expect(compiled.textContent).toContain('Jan');
    expect(compiled.textContent).toContain('Jul');
  });

  it('should render health gauge score and status indicators', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('92');
    expect(compiled.textContent).toContain('/ 100');
    expect(compiled.textContent).toContain('Cash position');
    expect(compiled.textContent).toContain('sehat');
    expect(compiled.textContent).toContain('Order fulfilment');
    expect(compiled.textContent).toContain('96%');
    expect(compiled.textContent).toContain('Inventory alert');
    expect(compiled.textContent).toContain('8 item');
  });

  it('should render top-right Target Revenue floating card and bottom-left Approval card', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const targetRevenueCard = compiled.querySelector('[aria-label="Target Revenue Card"]');
    const approvalCard = compiled.querySelector('[aria-label="Approval Status Card"]');

    expect(targetRevenueCard).toBeTruthy();
    expect(targetRevenueCard?.textContent).toContain('Target Revenue');
    expect(targetRevenueCard?.textContent).toContain('92%');

    expect(approvalCard).toBeTruthy();
    expect(approvalCard?.textContent).toContain('Approval Hari ini');
    expect(approvalCard?.textContent).toContain('18 dokumen');
  });
});
