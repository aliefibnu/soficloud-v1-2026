import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { ScheduleDemoHero } from './hero';

describe('ScheduleDemoHero', () => {
  let component: ScheduleDemoHero;
  let fixture: ComponentFixture<ScheduleDemoHero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleDemoHero],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleDemoHero);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the H1 display headline with Inter font, extra bold weight, and Figma-aligned 64px sizing', () => {
    const heading = fixture.debugElement.query(By.css('h1#hero-heading'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.classList.contains('font-inter')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-extrabold')).toBe(true);
    expect(heading.nativeElement.classList.contains('xl:text-[64px]')).toBe(true);
    expect(heading.nativeElement.classList.contains('max-w-[476px]')).toBe(true);
  });

  it('should render the hero illustration with NgOptimizedImage attributes and enlarged bottom-anchored classes', () => {
    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl).toBeTruthy();
    expect(imgEl.nativeElement.getAttribute('src')).toContain('illustration.svg');
    expect(imgEl.nativeElement.getAttribute('width')).toBe('517');
    expect(imgEl.nativeElement.getAttribute('height')).toBe('606');
    expect(imgEl.nativeElement.classList.contains('xl:max-w-[517px]')).toBe(true);
    expect(imgEl.nativeElement.classList.contains('object-bottom')).toBe(true);
  });

  it('should render the subheadline paragraph with readable line-height and Figma-aligned width', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.classList.contains('leading-relaxed')).toBe(true);
    expect(paragraph.nativeElement.classList.contains('max-w-[375px]')).toBe(true);
    expect(paragraph.nativeElement.classList.contains('text-justify')).toBe(true);
  });
});
