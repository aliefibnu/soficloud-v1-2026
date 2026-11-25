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

  it('should have block display and responsive bottom padding on host', () => {
    const hostEl = fixture.nativeElement as HTMLElement;
    expect(hostEl.classList.contains('block')).toBe(true);
    expect(hostEl.classList.contains('w-full')).toBe(true);
    expect(hostEl.classList.contains('pb-6')).toBe(true);
    expect(hostEl.classList.contains('sm:pb-8')).toBe(true);
  });

  it('should render the section card with rounded-3xl and white background', () => {
    const section = fixture.debugElement.query(By.css('section'));
    expect(section).toBeTruthy();
    expect(section.nativeElement.classList.contains('rounded-3xl')).toBe(true);
    expect(section.nativeElement.classList.contains('bg-white')).toBe(true);
  });

  it('should render the H1 display headline with Inter font, extra bold weight, and Figma-aligned sizing', () => {
    const heading = fixture.debugElement.query(By.css('h1#hero-heading'));
    expect(heading).toBeTruthy();
    expect(heading.nativeElement.classList.contains('font-inter')).toBe(true);
    expect(heading.nativeElement.classList.contains('font-extrabold')).toBe(true);
    expect(heading.nativeElement.classList.contains('xl:text-[56px]')).toBe(true);
    expect(heading.nativeElement.classList.contains('2xl:text-[64px]')).toBe(true);
    expect(heading.nativeElement.classList.contains('max-w-103.75')).toBe(true);
    expect(heading.nativeElement.classList.contains('2xl:max-w-119')).toBe(true);
  });

  it('should render the 5-layer pixel-perfect hero illustration with clockwise rotating dashed ring', () => {
    const stage = fixture.debugElement.query(
      By.css('[data-testid="schedule-demo-hero-illustration"]'),
    );
    expect(stage).toBeTruthy();
    expect(stage.nativeElement.getAttribute('role')).toBe('img');
    expect(stage.nativeElement.classList.contains('xl:max-w-115')).toBe(true);
    expect(stage.nativeElement.classList.contains('2xl:max-w-129.25')).toBe(true);
    expect(stage.nativeElement.classList.contains('aspect-[517/606]')).toBe(true);

    const images = stage.queryAll(By.css('img'));
    expect(images.length).toBe(5);

    const expectedLayers = [
      { src: '/images/schedule-demo/dashed-ring.svg', width: '430', height: '430', z: 'z-0' },
      { src: '/images/schedule-demo/phone-mockup.svg', width: '350', height: '533', z: 'z-10' },
      { src: '/images/schedule-demo/chat-bubble-left.svg', width: '238', height: '76', z: 'z-20' },
      { src: '/images/schedule-demo/chat-bubble-right.svg', width: '216', height: '77', z: 'z-20' },
      { src: '/images/schedule-demo/user-badge.svg', width: '75', height: '80', z: 'z-20' },
    ];

    expectedLayers.forEach((layer, index) => {
      const el = images[index].nativeElement as HTMLImageElement;
      expect(el.getAttribute('src')).toBe(layer.src);
      expect(el.getAttribute('width')).toBe(layer.width);
      expect(el.getAttribute('height')).toBe(layer.height);
      expect(el.classList.contains(layer.z)).toBe(true);
    });

    const ringEl = images[0].nativeElement as HTMLImageElement;
    expect(ringEl.classList.contains('animate-hero-ring-spin')).toBe(true);

    const chatBubbleLeftEl = images[2].nativeElement as HTMLImageElement;
    expect(chatBubbleLeftEl.classList.contains('animate-hero-bubble-left')).toBe(true);
    expect(chatBubbleLeftEl.classList.contains('will-change-transform')).toBe(true);

    const chatBubbleRightEl = images[3].nativeElement as HTMLImageElement;
    expect(chatBubbleRightEl.classList.contains('animate-hero-bubble-right')).toBe(true);
    expect(chatBubbleRightEl.classList.contains('will-change-transform')).toBe(true);

    const bellEl = images[4].nativeElement as HTMLImageElement;
    expect(bellEl.classList.contains('animate-hero-bell-ring')).toBe(true);
    expect(bellEl.classList.contains('will-change-transform')).toBe(true);
  });

  it('should render the subheadline paragraph with readable line-height and Figma-aligned width', () => {
    const paragraph = fixture.debugElement.query(By.css('p'));
    expect(paragraph).toBeTruthy();
    expect(paragraph.nativeElement.classList.contains('leading-relaxed')).toBe(true);
    expect(paragraph.nativeElement.classList.contains('max-w-85')).toBe(true);
    expect(paragraph.nativeElement.classList.contains('2xl:max-w-93.75')).toBe(true);
    expect(paragraph.nativeElement.classList.contains('text-justify')).toBe(true);
  });
});
