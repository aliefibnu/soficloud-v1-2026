import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { RecognizeSofi } from './recognize-sofi';

describe('RecognizeSofi', () => {
  let component: RecognizeSofi;
  let fixture: ComponentFixture<RecognizeSofi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecognizeSofi],
      providers: [
        provideTranslateService({
          fallbackLang: 'id',
          lang: 'id',
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecognizeSofi);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render hero, what-is, strong-erp, and our-journey in exact order', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const container = compiled.firstElementChild as HTMLElement | null;
    expect(container).toBeTruthy();

    const childTags = Array.from(container?.children ?? []).map((el) => el.tagName.toLowerCase());
    expect(childTags).toEqual([
      'app-hero',
      'app-what-is',
      'app-strong-erp',
      'app-our-journey',
    ]);
  });
});
