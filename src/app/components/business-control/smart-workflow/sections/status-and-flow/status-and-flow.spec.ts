import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';
import { StatusAndFlow } from './status-and-flow';

describe('StatusAndFlow', () => {
  let fixture: ComponentFixture<StatusAndFlow>;
  let component: StatusAndFlow;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusAndFlow],
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
        STATUS_AND_FLOW: {
          TITLE: 'Alur Mengikuti\nKonfigurasi Transaksi',
          DESCRIPTION:
            'Status transaksi menunjukkan posisi proses dokumen. Level approval menunjukkan urutan pihak yang memberi persetujuan. Keduanya diatur sesuai kewenangan perusahaan.',
          MAIN_FLOW: {
            TITLE: 'Contoh Jalur Utama',
            CAPTION: 'Pilihan tambahan sesuai izin. Alur mengikuti konfigurasi transaksi.',
          },
          APPROVER_SEQUENCE: {
            TITLE: 'Contoh urutan approver',
            CAPTION: 'Sesuaikan approval sesuai kebutuhan perusahaan anda.',
          },
        },
      },
    });
    translateService.setTranslation('en', {
      SMART_WORKFLOW: {
        STATUS_AND_FLOW: {
          TITLE: 'Flows Follow\nTransaction Configuration',
          DESCRIPTION:
            'Transaction status shows the document stage. Approval levels define the sequence of approvers. Both are configured based on company authority.',
          MAIN_FLOW: {
            TITLE: 'Main Flow Example',
            CAPTION:
              'Additional options based on permissions. The flow follows the transaction configuration.',
          },
          APPROVER_SEQUENCE: {
            TITLE: 'Approver sequence example',
            CAPTION: 'Customize approvals to match your company needs.',
          },
        },
      },
    });

    fixture = TestBed.createComponent(StatusAndFlow);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should configure ProcessSectionShell with localized title, description, id, and teal gradient background', () => {
    const shell = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shell).toBeTruthy();

    const section = fixture.debugElement.query(By.css('section#status-dan-alur'));
    expect(section).toBeTruthy();

    const heading = section.query(By.css('h2')).nativeElement as HTMLElement;
    const description = section.query(By.css('p')).nativeElement as HTMLElement;
    expect(heading.textContent?.trim()).toBe('Alur Mengikuti\nKonfigurasi Transaksi');
    expect(description.textContent?.trim()).toContain(
      'Status transaksi menunjukkan posisi proses dokumen.'
    );

    const stage = fixture.debugElement.query(By.css('[class*="DBE9E9"]'));
    expect(stage).toBeTruthy();
    expect(stage.nativeElement.className).toContain('A1CECE');
    expect(stage.nativeElement.className).toContain('C9DEDE');
  });

  it('should render Card 1 with Contoh Jalur Utama, 3 main flow steps, 2 arrow connectors, 4 optional statuses in dashed gradient box, and caption', () => {
    const cardHeading = fixture.debugElement.query(By.css('#status-main-flow-heading'))
      .nativeElement as HTMLElement;
    expect(cardHeading.textContent?.trim()).toBe('Contoh Jalur Utama');

    const mainSteps = fixture.debugElement
      .queryAll(By.css('[data-testid="main-flow-step"]'))
      .map((el) => (el.nativeElement as HTMLElement).textContent?.trim());
    expect(mainSteps).toEqual(['Entry', 'Confirm', 'Running']);

    const arrows = fixture.debugElement.queryAll(By.css('[data-testid="main-flow-arrow"]'));
    expect(arrows.length).toBe(2);
    expect(arrows[0].attributes['aria-hidden']).toBe('true');

    const dashedBox = fixture.debugElement.query(By.css('[data-testid="optional-statuses-box"]'));
    expect(dashedBox).toBeTruthy();
    const dashedSvgRoot = fixture.debugElement.query(
      By.css('[data-testid="optional-statuses-dashed-border"]')
    );
    expect(dashedSvgRoot).toBeTruthy();
    expect(dashedSvgRoot.attributes['viewBox']).toBe('0 0 632 100');
    expect(dashedSvgRoot.nativeElement.getAttribute('class')).toContain('overflow-visible');

    const dashedSvg = dashedSvgRoot.query(By.css('rect'));
    expect(dashedSvg).toBeTruthy();
    expect(dashedSvg.attributes['y']).toBe('0');
    expect(dashedSvg.attributes['height']).toBe('100');
    expect(dashedSvg.attributes['stroke-width']).toBe('1.5');
    expect(dashedSvg.attributes['stroke-dasharray']).toBe('23.21 23.21');

    const optionalStatuses = fixture.debugElement
      .queryAll(By.css('[data-testid="optional-status-item"]'))
      .map((el) => (el.nativeElement as HTMLElement).textContent?.trim());
    expect(optionalStatuses).toEqual(['Verify', 'Revise', 'Cancel', 'Pending']);

    const caption = fixture.debugElement.queryAll(By.css('article p'))[0]
      .nativeElement as HTMLElement;
    expect(caption.textContent?.trim()).toBe(
      'Pilihan tambahan sesuai izin. Alur mengikuti konfigurasi transaksi.'
    );
  });

  it('should render Card 2 with Contoh urutan approver, 3 numbered approver pills, and caption', () => {
    const cardHeading = fixture.debugElement.query(By.css('#status-approver-sequence-heading'))
      .nativeElement as HTMLElement;
    expect(cardHeading.textContent?.trim()).toBe('Contoh urutan approver');

    const approvers = fixture.debugElement
      .queryAll(By.css('[data-testid="approver-step"]'))
      .map((el) => {
        const spans = (el.nativeElement as HTMLElement).querySelectorAll('span');
        return `${spans[0]?.textContent?.trim()} ${spans[1]?.textContent?.trim()}`;
      });
    expect(approvers).toEqual(['01 Marketing Manager', '02 Accounting & Finance', '03 Director']);

    const caption = fixture.debugElement.queryAll(By.css('article p'))[1]
      .nativeElement as HTMLElement;
    expect(caption.textContent?.trim()).toBe(
      'Sesuaikan approval sesuai kebutuhan perusahaan anda.'
    );
  });

  it('should update localized copy when language switches from id to en while keeping status/role system labels intact', async () => {
    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    const heading = fixture.debugElement.query(By.css('section#status-dan-alur h2'))
      .nativeElement as HTMLElement;
    expect(heading.textContent?.trim()).toBe('Flows Follow\nTransaction Configuration');

    const card1Heading = fixture.debugElement.query(By.css('#status-main-flow-heading'))
      .nativeElement as HTMLElement;
    const card2Heading = fixture.debugElement.query(By.css('#status-approver-sequence-heading'))
      .nativeElement as HTMLElement;
    expect(card1Heading.textContent?.trim()).toBe('Main Flow Example');
    expect(card2Heading.textContent?.trim()).toBe('Approver sequence example');

    const mainSteps = fixture.debugElement
      .queryAll(By.css('[data-testid="main-flow-step"]'))
      .map((el) => (el.nativeElement as HTMLElement).textContent?.trim());
    expect(mainSteps).toEqual(['Entry', 'Confirm', 'Running']);
  });
});
