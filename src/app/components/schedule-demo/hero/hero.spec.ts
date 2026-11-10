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

  it('should render the H1 display headline with DM Sans font and bold weight', () => {
    const heading = fixture.debugElement.query(By.css('h1#hero-heading'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.classList.contains('font-dm-sans')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-bold')).toBe(true);
  });

  it('should render the hero illustration with NgOptimizedImage attributes', () => {
    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl).toBeTruthy();
    expect(imgEl.nativeElement.getAttribute('src')).toContain('illustration.svg');
    expect(imgEl.nativeElement.getAttribute('width')).toBe('517');
    expect(imgEl.nativeElement.getAttribute('height')).toBe('606');
  });

  it('should render the subheadline paragraph with readable relaxed line-height', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.classList.contains('leading-relaxed')).toBe(true);
  });
});
