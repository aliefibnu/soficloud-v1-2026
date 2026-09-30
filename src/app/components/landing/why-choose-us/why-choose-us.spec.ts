import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { WhyChooseUs } from './why-choose-us';
import { LanguageService } from '../../../systems/lib/language.service';

describe('WhyChooseUs', () => {
  let component: WhyChooseUs;
  let fixture: ComponentFixture<WhyChooseUs>;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhyChooseUs],
      providers: [
        provideTranslateService({
          fallbackLang: 'en',
          lang: 'id',
        }),
        LanguageService,
      ],
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    translateService.setTranslation('id', {
      WHY_CHOOSE_US: {
        HEADING: 'Mengapa Perusahaan Memilih SOFICloud?',
        SUBHEADING:
          'ERP yang matang, terintegrasi, dan siap mendukung pertumbuhan bisnis Anda.',
        ARIA: {
          PREV_BUTTON: 'Kartu sebelumnya',
          NEXT_BUTTON: 'Kartu berikutnya',
        },
        CARDS: {
          '1': {
            TITLE: 'Dikembangkan\nSejak 1998',
            DESCRIPTION:
              'Pengalaman lebih dari dua dekade membentuk SOFICloud menjadi ERP yang matang.',
          },
        },
      },
    });
    translateService.use('id');

    fixture = TestBed.createComponent(WhyChooseUs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the why-choose-us component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 9 cards configured', () => {
    expect(component.cards.length).toBe(9);
    expect(component.totalCards()).toBe(9);
  });

  it('should start at index 0', () => {
    expect(component.currentIndex()).toBe(0);
  });

  it('should advance to next card and wrap around', () => {
    component.next();
    expect(component.currentIndex()).toBe(1);

    component.goTo(8);
    expect(component.currentIndex()).toBe(8);

    component.next();
    expect(component.currentIndex()).toBe(0);
  });

  it('should go to previous card and wrap around', () => {
    component.prev();
    expect(component.currentIndex()).toBe(8);

    component.prev();
    expect(component.currentIndex()).toBe(7);
  });

  it('should compute circular offset correctly for smooth 3D display', () => {
    component.goTo(0);
    expect(component.getShortestOffset(0)).toBe(0);
    expect(component.getShortestOffset(1)).toBe(1);
    expect(component.getShortestOffset(2)).toBe(2);
    expect(component.getShortestOffset(8)).toBe(-1);
    expect(component.getShortestOffset(7)).toBe(-2);

    component.goTo(8);
    expect(component.getShortestOffset(8)).toBe(0);
    expect(component.getShortestOffset(0)).toBe(1);
    expect(component.getShortestOffset(7)).toBe(-1);
  });

  it('should update active card on card click when offset is not zero', () => {
    component.goTo(0);
    component.onCardClick(2, 2);
    expect(component.currentIndex()).toBe(2);

    // Clicking already center card shouldn't force change
    component.onCardClick(2, 0);
    expect(component.currentIndex()).toBe(2);
  });

  it('should render the heading text', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('#why-choose-us-heading');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Mengapa Perusahaan Memilih SOFICloud?');
  });
});
