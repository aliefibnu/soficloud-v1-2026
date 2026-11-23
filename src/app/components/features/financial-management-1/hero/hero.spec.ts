import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Hero } from './hero';

describe('FinancialManagement1 Hero', () => {
  let component: Hero;
  let fixture: ComponentFixture<Hero>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hero],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      FINANCIAL_MANAGEMENT_1: {
        HERO: {
          TITLE_LINE_1: 'Kendalikan Keuangan',
          TITLE_LINE_2: 'Perusahaan dari',
          TITLE_LINE_3: 'Transaksi hingga',
          TITLE_LINE_4: 'Laporan Keuangan',
          DESCRIPTION:
            'SOFICloud menghubungkan transaksi operasional dengan proses accounting secara otomatis mulai dari jurnal, receivable, payable, cash & bank, reimbursement, advance, fixed assets, hingga analisa manajemen.',
          BADGE_NUMBER: '01',
          BADGE_LABEL: 'Financial Management & Accounting',
          ILLUSTRATION_ALT:
            'Ilustrasi papan klip laporan keuangan, kaca pembesar, dan kalkulator SOFICloud',
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(Hero);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create the hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should render a single h1 heading with all 4 lines, Inter font, and extrabold weight', () => {
    const headings = fixture.debugElement.queryAll(By.css('h1'));
    expect(headings.length).toBe(1);

    const heading = headings[0].nativeElement as HTMLHeadingElement;
    expect(heading.textContent).toContain('Kendalikan Keuangan');
    expect(heading.textContent).toContain('Perusahaan dari');
    expect(heading.textContent).toContain('Transaksi hingga');
    expect(heading.textContent).toContain('Laporan Keuangan');
    expect(heading.classList.contains('font-inter')).toBe(true);
    expect(heading.classList.contains('font-extrabold')).toBe(true);
  });

  it('should render the description paragraph with DM Sans font', () => {
    const paragraph = fixture.debugElement.query(By.css('p')).nativeElement as HTMLParagraphElement;
    expect(paragraph.textContent).toContain(
      'SOFICloud menghubungkan transaksi operasional dengan proses accounting secara otomatis',
    );
    expect(paragraph.classList.contains('font-dm-sans')).toBe(true);
  });

  it('should render the static module badge with number, label, and gradient background', () => {
    const badgeText = fixture.debugElement.nativeElement.textContent;
    expect(badgeText).toContain('01');
    expect(badgeText).toContain('Financial Management & Accounting');

    const badge = fixture.debugElement.query(By.css('.rounded-\\[8px\\]'));
    expect(badge).toBeTruthy();
    expect(badge.nativeElement.style.background).toContain('linear-gradient');
  });

  it('should apply the full-bleed linear-gradient background and rounded bottom corners', () => {
    const banner = fixture.debugElement.query(By.css('section > div'));
    expect(banner).toBeTruthy();
    expect(banner.nativeElement.style.background).toContain('linear-gradient');
    expect(banner.nativeElement.style.background).toContain('rgb(255, 239, 237)');
    expect(banner.nativeElement.style.background).toContain('rgb(251, 203, 197)');
    expect(banner.nativeElement.className).toContain('rounded-b-');
  });

  it('should render all 3 SVG illustration layers with proper accessibility and LCP attributes', () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBe(3);

    const clipboard = images.find((img) =>
      img.nativeElement.getAttribute('src')?.includes('Group 10284.svg'),
    );
    const magnifier = images.find((img) =>
      img.nativeElement.getAttribute('src')?.includes('Group 9410.svg'),
    );
    const calculator = images.find((img) =>
      img.nativeElement.getAttribute('src')?.includes('Group 9409.svg'),
    );

    expect(clipboard).toBeTruthy();
    expect(clipboard?.nativeElement.getAttribute('alt')).toBe(
      'Ilustrasi papan klip laporan keuangan, kaca pembesar, dan kalkulator SOFICloud',
    );
    expect(clipboard?.nativeElement.getAttribute('fetchpriority')).toBe('high');
    expect(clipboard?.nativeElement.getAttribute('draggable')).toBe('false');

    expect(magnifier).toBeTruthy();
    expect(magnifier?.nativeElement.getAttribute('alt')).toBe('');
    expect(magnifier?.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(magnifier?.nativeElement.getAttribute('draggable')).toBe('false');

    expect(calculator).toBeTruthy();
    expect(calculator?.nativeElement.getAttribute('alt')).toBe('');
    expect(calculator?.nativeElement.getAttribute('aria-hidden')).toBe('true');
    expect(calculator?.nativeElement.getAttribute('draggable')).toBe('false');
  });

  it('should allow text selection on the typography column', () => {
    const textCol = fixture.debugElement.query(By.css('.select-text'));
    expect(textCol).toBeTruthy();
  });

  it('should position and orient the 3 illustration layers according to the Figma hero layout', () => {
    const layers = fixture.debugElement.queryAll(By.css('.hero-illustration .hero-layer'));
    expect(layers.length).toBe(3);

    const expectedLayouts = [
      { left: 'left-[15.2%]', top: 'top-[-4%]', width: 'w-[70.4%]', imgWidth: '387', imgHeight: '539', imgRotate: false },
      { left: 'left-[-1.7%]', top: 'top-[34.1%]', width: 'w-[57.3%]', imgWidth: '315', imgHeight: '335', imgRotate: false },
      { left: 'left-[67.8%]', top: 'top-[63.6%]', width: 'w-[31.1%]', imgWidth: '174', imgHeight: '191', imgRotate: true },
    ];

    layers.forEach((layerDe, index) => {
      const layerEl = layerDe.nativeElement as HTMLElement;
      const imgEl = layerEl.querySelector('img') as HTMLImageElement;
      const expected = expectedLayouts[index];

      expect(layerEl.classList.contains(expected.left)).toBe(true);
      expect(layerEl.classList.contains(expected.top)).toBe(true);
      expect(layerEl.classList.contains(expected.width)).toBe(true);
      expect(layerEl.classList.contains('translate-0')).toBe(true);
      expect(layerEl.classList.contains('rotate-0')).toBe(true);
      expect(layerEl.classList.contains('scale-100')).toBe(true);
      expect(layerEl.className).not.toContain('rotate-[16.6deg]');
      expect(layerEl.className).not.toContain('rotate-[20deg]');

      expect(imgEl.getAttribute('width')).toBe(expected.imgWidth);
      expect(imgEl.getAttribute('height')).toBe(expected.imgHeight);
      expect(imgEl.classList.contains('-rotate-[4.3deg]')).toBe(expected.imgRotate);
    });
  });
});
