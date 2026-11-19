import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { ProcessSectionShell } from '../../../shared/process-section-shell/process-section-shell';
import { Capabilities } from './capabilities';

describe('Capabilities', () => {
  let fixture: ComponentFixture<Capabilities>;
  let component: Capabilities;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Capabilities],
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
        CAPABILITIES: {
          TITLE: 'Setiap Kewenangan\nPunya Pengaturan Yang Jelas',
          DESCRIPTION:
            'Enam kapabilitas untuk membantu tim menjalankan\ntransaksi sesuai kebijakan perusahaan.',
          CARDS: {
            CARD_1: {
              TITLE: 'Hak Akses Sesuai Peran',
              DESCRIPTION:
                'Atur akses berdasarkan Access Group, kategori, dan item. Bedakan hak membaca, menambah, mengubah, menghapus, mencetak, dan mengekspor sesuai kewenangan pengguna.',
            },
            CARD_2: {
              TITLE: 'Kontrol Status dan Batas Nominal',
              DESCRIPTION:
                'Tentukan izin perubahan status transaksi dan rentang nilai Amount From sampai Amount To sesuai kebutuhan pengendalian perusahaan.',
            },
            CARD_3: {
              TITLE: 'Approval Berjenjang',
              DESCRIPTION:
                'Susun urutan persetujuan berdasarkan level dan pengguna yang ditetapkan. Dokumen mengikuti jalur approval yang telah dikonfigurasi.',
            },
            CARD_4: {
              TITLE: 'Pelacakan Status Approval',
              DESCRIPTION:
                'Lihat pihak yang sudah menyetujui, pihak yang sedang menunggu tindakan, dan approver berikutnya agar posisi dokumen jelas.',
            },
            CARD_5: {
              TITLE: 'Riwayat Persetujuan',
              DESCRIPTION:
                'Telusuri pemberi persetujuan, waktu, status, dan catatan keputusan dalam Approval History untuk pemeriksaan dan tindak lanjut transaksi.',
            },
            CARD_6: {
              TITLE: 'Notifikasi Email dan WhatsApp',
              DESCRIPTION:
                'Sampaikan pemberitahuan approval dan perubahan status kepada pihak terkait. Template pesan serta pengiriman otomatis mengikuti pengaturan.',
            },
          },
        },
      },
    });
    translateService.setTranslation('en', {
      SMART_WORKFLOW: {
        CAPABILITIES: {
          TITLE: 'Every Authority Has\nClear Configuration',
          DESCRIPTION:
            'Six capabilities to help your team execute\ntransactions in line with company policies.',
          CARDS: {
            CARD_1: {
              TITLE: 'Role-Based Access Rights',
              DESCRIPTION: 'Configure access by Access Group, category, and item.',
            },
            CARD_2: {
              TITLE: 'Status & Amount Limit Control',
              DESCRIPTION: 'Define transaction status permissions and amount ranges.',
            },
            CARD_3: {
              TITLE: 'Multi-Level Approval',
              DESCRIPTION: 'Set approval sequences by configured levels and users.',
            },
            CARD_4: {
              TITLE: 'Approval Status Tracking',
              DESCRIPTION: 'See who approved, who is pending, and the next approver.',
            },
            CARD_5: {
              TITLE: 'Approval History',
              DESCRIPTION: 'Trace approvers, timestamps, statuses, and decision notes.',
            },
            CARD_6: {
              TITLE: 'Email & WhatsApp Notifications',
              DESCRIPTION: 'Deliver automated approval and status alerts with templates.',
            },
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(Capabilities);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render ProcessSectionShell with id="kapabilitas", localized header, and reversed bottom-right to top-left linear gradient', () => {
    const shell = fixture.debugElement.query(By.directive(ProcessSectionShell));
    expect(shell).toBeTruthy();

    const shellComponent = shell.componentInstance as ProcessSectionShell;
    expect(shellComponent.sectionId()).toBe('kapabilitas');
    expect(shellComponent.title()).toBe('Setiap Kewenangan\nPunya Pengaturan Yang Jelas');
    expect(shellComponent.description()).toBe(
      'Enam kapabilitas untuk membantu tim menjalankan\ntransaksi sesuai kebijakan perusahaan.',
    );
    expect(shellComponent.stageBgClass()).toBe(
      'bg-[linear-gradient(315deg,#FFEFED_0%,rgba(252,190,182,0.8)_51%,#FBCBC5_100%)]',
    );

    const section = fixture.debugElement.query(By.css('section#kapabilitas'));
    expect(section).toBeTruthy();
  });

  it('should render 6 capability cards in a responsive 3-column grid', () => {
    const grid = fixture.debugElement.query(By.css('.grid'));
    expect(grid).toBeTruthy();
    expect(grid.nativeElement.classList.contains('md:grid-cols-2')).toBe(true);
    expect(grid.nativeElement.classList.contains('lg:grid-cols-3')).toBe(true);

    const cards = fixture.debugElement.queryAll(By.css('article'));
    expect(cards.length).toBe(6);
  });

  it('should render card numbers 01 through 06 in order', () => {
    const cards = fixture.debugElement.queryAll(By.css('article'));
    const numbers = cards.map((card) =>
      card.query(By.css('span')).nativeElement.textContent.trim(),
    );
    expect(numbers).toEqual(['01', '02', '03', '04', '05', '06']);
  });

  it('should render all 6 capability SVG icons with decorative alt="" and intrinsic dimensions', () => {
    const images = fixture.debugElement.queryAll(By.css('article img'));
    expect(images.length).toBe(6);

    const srcs = images.map((img) => img.nativeElement.getAttribute('src'));
    expect(srcs).toEqual([
      '/images/smart-workflow/capability/1.svg',
      '/images/smart-workflow/capability/2.svg',
      '/images/smart-workflow/capability/3.svg',
      '/images/smart-workflow/capability/4.svg',
      '/images/smart-workflow/capability/5.svg',
      '/images/smart-workflow/capability/6.svg',
    ]);

    for (const img of images) {
      expect(img.nativeElement.getAttribute('alt')).toBe('');
      expect(Number(img.nativeElement.getAttribute('width'))).toBeGreaterThan(0);
      expect(Number(img.nativeElement.getAttribute('height'))).toBeGreaterThan(0);
      expect(img.nativeElement.classList.contains('max-w-12')).toBe(false);
      expect(img.nativeElement.classList.contains('max-h-10')).toBe(false);
    }
  });

  it('should render translated card titles and descriptions and update on language change', async () => {
    const getTitles = () =>
      fixture.debugElement
        .queryAll(By.css('article h3'))
        .map((el) => el.nativeElement.textContent.trim());

    expect(getTitles()).toEqual([
      'Hak Akses Sesuai Peran',
      'Kontrol Status dan Batas Nominal',
      'Approval Berjenjang',
      'Pelacakan Status Approval',
      'Riwayat Persetujuan',
      'Notifikasi Email dan WhatsApp',
    ]);

    const firstDesc = fixture.debugElement.query(By.css('article p')).nativeElement.textContent.trim();
    expect(firstDesc).toContain('Atur akses berdasarkan Access Group, kategori, dan item.');

    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(getTitles()).toEqual([
      'Role-Based Access Rights',
      'Status & Amount Limit Control',
      'Multi-Level Approval',
      'Approval Status Tracking',
      'Approval History',
      'Email & WhatsApp Notifications',
    ]);
  });

  it('should render each icon container at 95x71 with the radial-gradient background', () => {
    const iconContainers = fixture.debugElement.queryAll(By.css('article [aria-hidden="true"]'));
    expect(iconContainers.length).toBe(6);

    for (const container of iconContainers) {
      const el = container.nativeElement as HTMLElement;
      expect(el.classList.contains('w-23.75')).toBe(true);
      expect(el.classList.contains('h-17.75')).toBe(true);
      const bg = el.style.background;
      expect(bg).toContain('radial-gradient');
      expect(bg).toContain('64.37% 118.95%');
      expect(bg).toContain('50.57% 50%');
    }
  });

  it('should apply optical centering offsets to asymmetric capability icons', () => {
    const images = fixture.debugElement.queryAll(By.css('article img'));
    expect(images[4].nativeElement.classList.contains('translate-x-[3px]')).toBe(true);
    expect(images[5].nativeElement.classList.contains('translate-x-[3px]')).toBe(true);
    expect(images[5].nativeElement.classList.contains('-translate-y-[2px]')).toBe(true);
  });
});
