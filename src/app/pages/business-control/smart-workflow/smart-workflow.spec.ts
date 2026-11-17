import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { SmartWorkflow } from './smart-workflow';

describe('SmartWorkflow', () => {
  let component: SmartWorkflow;
  let fixture: ComponentFixture<SmartWorkflow>;
  let translateService: TranslateService;
  let scrollToSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    await TestBed.configureTestingModule({
      imports: [SmartWorkflow],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      SMART_WORKFLOW: {
        PROCESS_TABS: {
          KAPABILITAS: 'KAPABILITAS',
          JELAJAHI_TAMPILAN: 'JELAJAHI TAMPILAN',
          STATUS_DAN_ALUR: 'STATUS DAN ALUR',
        },
        CAPABILITIES: {
          TITLE: 'Setiap Kewenangan\nPunya Pengaturan Yang Jelas',
          DESCRIPTION:
            'Enam kapabilitas untuk membantu tim menjalankan\ntransaksi sesuai kebijakan perusahaan.',
          CARDS: {
            CARD_1: { TITLE: 'Hak Akses Sesuai Peran', DESCRIPTION: 'Desc 1' },
            CARD_2: { TITLE: 'Kontrol Status dan Batas Nominal', DESCRIPTION: 'Desc 2' },
            CARD_3: { TITLE: 'Approval Berjenjang', DESCRIPTION: 'Desc 3' },
            CARD_4: { TITLE: 'Pelacakan Status Approval', DESCRIPTION: 'Desc 4' },
            CARD_5: { TITLE: 'Riwayat Persetujuan', DESCRIPTION: 'Desc 5' },
            CARD_6: { TITLE: 'Notifikasi Email dan WhatsApp', DESCRIPTION: 'Desc 6' },
          },
        },
      },
    });
    translateService.setTranslation('en', {
      SMART_WORKFLOW: {
        PROCESS_TABS: {
          KAPABILITAS: 'CAPABILITIES',
          JELAJAHI_TAMPILAN: 'EXPLORE VIEWS',
          STATUS_DAN_ALUR: 'STATUS & FLOW',
        },
        CAPABILITIES: {
          TITLE: 'Every Authority Has\nClear Configuration',
          DESCRIPTION:
            'Six capabilities to help your team execute\ntransactions in line with company policies.',
          CARDS: {
            CARD_1: { TITLE: 'Role-Based Access Rights', DESCRIPTION: 'Desc 1' },
            CARD_2: { TITLE: 'Status and Amount Limit Control', DESCRIPTION: 'Desc 2' },
            CARD_3: { TITLE: 'Tiered Approval', DESCRIPTION: 'Desc 3' },
            CARD_4: { TITLE: 'Approval Status Tracking', DESCRIPTION: 'Desc 4' },
            CARD_5: { TITLE: 'Approval History', DESCRIPTION: 'Desc 5' },
            CARD_6: { TITLE: 'Email and WhatsApp Notifications', DESCRIPTION: 'Desc 6' },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(SmartWorkflow);
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

  it('should render hero, localized 3-tab process-tabs, capabilities, explore-the-look, status-and-flow, and subfooter in order without cta', async () => {
    const heroEl = fixture.debugElement.query(By.css('app-hero'));
    expect(heroEl).toBeTruthy();

    const processTabsEl = fixture.debugElement.query(By.css('app-process-tabs'));
    expect(processTabsEl).toBeTruthy();
    const tabButtons = processTabsEl.queryAll(By.css('[role="tab"]'));
    expect(tabButtons.length).toBe(3);
    expect(tabButtons.map((b) => b.nativeElement.textContent.trim())).toEqual([
      'KAPABILITAS',
      'JELAJAHI TAMPILAN',
      'STATUS DAN ALUR',
    ]);
    expect(tabButtons.map((b) => b.nativeElement.getAttribute('aria-controls'))).toEqual([
      'kapabilitas',
      'jelajahi-tampilan',
      'status-dan-alur',
    ]);

    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();
    expect(tabButtons.map((b) => b.nativeElement.textContent.trim())).toEqual([
      'CAPABILITIES',
      'EXPLORE VIEWS',
      'STATUS & FLOW',
    ]);

    expect(fixture.debugElement.query(By.css('app-capabilities'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-explore-the-look'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-status-and-flow'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('app-subfooter'))).toBeTruthy();

    const ctaEl = fixture.debugElement.query(By.css('app-cta'));
    expect(ctaEl).toBeNull();

    const mainEl = fixture.debugElement.query(By.css('main#main-content'));
    expect(mainEl).toBeTruthy();
    const children = Array.from((mainEl.nativeElement as HTMLElement).children).map(
      (el) => el.tagName.toLowerCase(),
    );
    expect(children).toEqual([
      'app-hero',
      'app-process-tabs',
      'app-capabilities',
      'app-explore-the-look',
      'app-status-and-flow',
      'app-subfooter',
    ]);
  });

  it('should scroll to top (0, 0) on initialization when in browser environment without hash', () => {
    scrollToSpy.mockClear();
    component.ngOnInit();
    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });
});
