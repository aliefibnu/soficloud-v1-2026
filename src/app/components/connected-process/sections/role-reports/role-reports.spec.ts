import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { RoleReports } from './role-reports';
import { ProcessSectionShell } from '../../process-section-shell/process-section-shell';

describe('RoleReports', () => {
  let fixture: ComponentFixture<RoleReports>;
  let component: RoleReports;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleReports],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      CONNECTED_PROCESS: {
        ROLE_REPORTS: {
          TITLE: 'Laporan Untuk Setiap Tim Dalam Satu Alur Data',
          DESCRIPTION:
            'Management melihat hasil akhir sekaligus konteks operasional yang membentuknya.',
          TIERS: {
            OPERATIONAL: {
              TITLE: 'OPERASIONAL',
              SUBTITLE: 'Sedang Bergerak',
              DESCRIPTION:
                'Open order, outstanding procurement, penerimaan barang, posisi stok, kebutuhan material, progress produksi, dan status project.',
              TAGS: ['Sales', 'Procurement', 'Inventory', 'Production'],
            },
            FINANCIAL: {
              TITLE: 'KEUANGAN',
              SUBTITLE: 'Sudah Tercatat',
              DESCRIPTION:
                'Piutang, utang, kas dan bank, General Ledger, Balance, Laba Rugi, Neraca, serta laporan arus kas.',
              TAGS: ['AR', 'AP', 'Cash & Bank', 'Accounting'],
            },
            MANAGEMENT: {
              TITLE: 'MANAJEMEN',
              SUBTITLE: 'Perlu Diputuskan',
              DESCRIPTION:
                'Dashboard dan analisis membantu membaca tren penjualan, biaya produksi, budget versus actual project, serta transaksi yang membutuhkan perhatian.',
              TAGS: ['Dashboard', 'Analytics', 'Project', 'Control'],
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(RoleReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the role-reports component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the ProcessSectionShell with sectionId laporan and stageBgClass bg-[#FBCBC5]', () => {
    const shellEl = fixture.debugElement.query(
      By.directive(ProcessSectionShell),
    );
    expect(shellEl).toBeTruthy();

    const shellComponent = shellEl.componentInstance as ProcessSectionShell;
    expect(shellComponent.sectionId()).toBe('laporan');
    expect(shellComponent.stageBgClass()).toBe('bg-[#FBCBC5]');
    expect(shellComponent.title()).toBe(
      'Laporan Untuk Setiap Tim Dalam Satu Alur Data',
    );
    expect(shellComponent.description()).toContain(
      'Management melihat hasil akhir sekaligus konteks operasional yang membentuknya.',
    );
  });

  it('should render exactly 3 tier cards in a responsive grid with 16px corner radius and 314px min-height', () => {
    const gridEl = fixture.debugElement.query(By.css('.grid'));
    expect(gridEl).toBeTruthy();
    expect(gridEl.nativeElement.classList.contains('md:grid-cols-3')).toBe(true);

    const cards = fixture.debugElement.queryAll(By.css('article'));
    expect(cards.length).toBe(3);
    for (const card of cards) {
      expect(card.nativeElement.classList.contains('rounded-[16px]')).toBe(true);
      expect(card.nativeElement.classList.contains('min-h-[314px]')).toBe(true);
    }
  });

  it('should render numbers 01, 02, and 03 in the left meta column of cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    const numbers = cards.map((c) =>
      c.query(By.css('span.font-dm-sans.leading-none')).nativeElement.textContent.trim(),
    );
    expect(numbers).toEqual(['01', '02', '03']);
  });

  it('should render uppercase tier labels with font-weight 400 (regular) and subtitles with font-weight 700 (bold)', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));

    const categories = cards.map((c) => {
      const el = c.query(By.css('span.tracking-wider')).nativeElement;
      expect(el.classList.contains('font-normal')).toBe(true);
      return el.textContent.trim();
    });
    expect(categories).toEqual(['OPERASIONAL', 'KEUANGAN', 'MANAJEMEN']);

    const subtitles = cards.map((c) => {
      const el = c.query(By.css('h3')).nativeElement;
      expect(el.classList.contains('font-bold')).toBe(true);
      expect(el.classList.contains('leading-[1.2]')).toBe(true);
      return el.textContent.trim();
    });
    expect(subtitles).toEqual([
      'Sedang Bergerak',
      'Sudah Tercatat',
      'Perlu Diputuskan',
    ]);
  });

  it('should render descriptions with font-weight 400 (regular)', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    for (const card of cards) {
      const descEl = card.query(By.css('p.font-dm-sans')).nativeElement;
      expect(descEl.classList.contains('font-normal')).toBe(true);
    }
  });

  it('should render vertical gradient divider capsule pills for each tier with 8px radius and 20.83px width', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));

    const pill1 = cards[0].query(By.css('.from-\\[\\#EDF3FB\\]'));
    expect(pill1).toBeTruthy();
    expect(pill1.nativeElement.style.background).toContain('linear-gradient');
    expect(pill1.nativeElement.classList.contains('rounded-[8px]')).toBe(true);
    expect(pill1.nativeElement.classList.contains('w-[20.83px]')).toBe(true);

    const pill2 = cards[1].query(By.css('.from-\\[\\#FFEFED\\]'));
    expect(pill2).toBeTruthy();
    expect(pill2.nativeElement.style.background).toContain('linear-gradient');
    expect(pill2.nativeElement.classList.contains('rounded-[8px]')).toBe(true);
    expect(pill2.nativeElement.classList.contains('w-[20.83px]')).toBe(true);

    const pill3 = cards[2].query(By.css('.from-\\[\\#10BFC1\\]'));
    expect(pill3).toBeTruthy();
    expect(pill3.nativeElement.style.background).toContain('linear-gradient');
    expect(pill3.nativeElement.classList.contains('rounded-[8px]')).toBe(true);
    expect(pill3.nativeElement.classList.contains('w-[20.83px]')).toBe(true);
  });

  it('should render vertical bulleted department tags inside each card in #1C73E8 with font-weight 400', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    const tagList = cards[0].query(By.css('[aria-label="Department Tags"]'));
    expect(tagList.nativeElement.classList.contains('text-[#1C73E8]')).toBe(true);
    expect(tagList.nativeElement.classList.contains('font-normal')).toBe(true);
    expect(cards[0].query(By.css('[aria-label="Department Tags"] li')).nativeElement.classList.contains('leading-none')).toBe(true);

    const tags1 = cards[0]
      .queryAll(By.css('[aria-label="Department Tags"] li span:last-child'))
      .map((el) => el.nativeElement.textContent.trim());
    expect(tags1).toEqual(['Sales', 'Procurement', 'Inventory', 'Production']);

    const tags2 = cards[1]
      .queryAll(By.css('[aria-label="Department Tags"] li span:last-child'))
      .map((el) => el.nativeElement.textContent.trim());
    expect(tags2).toEqual(['AR', 'AP', 'Cash & Bank', 'Accounting']);

    const tags3 = cards[2]
      .queryAll(By.css('[aria-label="Department Tags"] li span:last-child'))
      .map((el) => el.nativeElement.textContent.trim());
    expect(tags3).toEqual(['Dashboard', 'Analytics', 'Project', 'Control']);
  });

  it('should return empty array in asArray if value is not an array', () => {
    expect(component.asArray(null)).toEqual([]);
    expect(component.asArray('not an array')).toEqual([]);
    expect(component.asArray(['item'])).toEqual(['item']);
  });
});
