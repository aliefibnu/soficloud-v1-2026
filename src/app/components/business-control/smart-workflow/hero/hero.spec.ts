import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { Hero } from './hero';

describe('SmartWorkflow Hero', () => {
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
      SMART_WORKFLOW: {
        HERO: {
          TITLE_LINE_1: 'Kewenangan Jelas',
          TITLE_LINE_2: 'Persetujuan Lebih',
          TITLE_LINE_3: 'Terkendali',
          DESCRIPTION:
            'SOFICloud membantu perusahaan mengatur akses pengguna dan proses persetujuan transaksi. Tentukan pihak yang berwenang, susun urutan approval, dan telusuri keputusan melalui status serta riwayat persetujuan.',
          TABLET_ALT: 'Tampilan status persetujuan SOFICloud pada tablet',
        },
      },
    });
    translateService.setTranslation('en', {
      SMART_WORKFLOW: {
        HERO: {
          TITLE_LINE_1: 'Clear Authority',
          TITLE_LINE_2: 'Better Controlled',
          TITLE_LINE_3: 'Approvals',
          DESCRIPTION:
            'SOFICloud helps companies manage user access and transaction approval workflows.',
          TABLET_ALT: 'SOFICloud approval status view on tablet',
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

  it('should render the 3-line heading with Inter extrabold font classes', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading).toBeTruthy();
    const headingText = heading.nativeElement.textContent;
    expect(headingText).toContain('Kewenangan Jelas');
    expect(headingText).toContain('Persetujuan Lebih');
    expect(headingText).toContain('Terkendali');
    expect(heading.nativeElement.classList.contains('font-inter')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-extrabold')).toBe(true);
  });

  it('should render the description paragraph with expected text and text-justify class', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.textContent).toContain(
      'SOFICloud membantu perusahaan mengatur akses pengguna dan proses persetujuan transaksi.',
    );
    expect(paragraph.nativeElement.classList.contains('text-justify')).toBe(true);
  });

  it('should render pedestal decorative layer and approval tablet mockup with localized alt', async () => {
    const images = fixture.debugElement.queryAll(By.css('img'));
    expect(images.length).toBe(2);

    const pedestalImg = images.find((img) =>
      img.nativeElement.getAttribute('src')?.includes('hero-pedestal.svg'),
    );
    expect(pedestalImg).toBeTruthy();
    expect(pedestalImg?.nativeElement.getAttribute('alt')).toBe('');
    expect(pedestalImg?.nativeElement.getAttribute('aria-hidden')).toBe('true');

    const tabletImg = images.find((img) =>
      img.nativeElement.getAttribute('src')?.includes('hero-tablet.svg'),
    );
    expect(tabletImg).toBeTruthy();
    expect(tabletImg?.nativeElement.getAttribute('alt')).toBe(
      'Tampilan status persetujuan SOFICloud pada tablet',
    );
    expect(tabletImg?.nativeElement.getAttribute('draggable')).toBe('false');

    translateService.use('en');
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.debugElement.query(By.css('h1')).nativeElement.textContent).toContain(
      'Clear Authority',
    );
    expect(tabletImg?.nativeElement.getAttribute('alt')).toBe(
      'SOFICloud approval status view on tablet',
    );
  });

  it('should render hero card container with conic gradient, shadow, rounded-[32px], and selectable typography', () => {
    const card = fixture.debugElement.query(By.css('.rounded-3xl, [class*="rounded-["]'));
    expect(card).toBeTruthy();
    expect(card.nativeElement.style.background).toContain('conic-gradient');
    expect(card.nativeElement.classList.contains('shadow-[0px_3px_15px_0px_rgba(0,0,0,0.08)]')).toBe(
      true,
    );

    const textCol = fixture.debugElement.query(By.css('.z-10'));
    expect(textCol).toBeTruthy();
    expect(textCol.nativeElement.classList.contains('select-text')).toBe(true);
    expect(textCol.nativeElement.classList.contains('select-none')).toBe(false);
  });
});
