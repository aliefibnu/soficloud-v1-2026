import { DeferBlockBehavior, DeferBlockState, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { LanguageService } from './systems/lib/language.service';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideTranslateService(), LanguageService],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navbar and footer', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const blocks = await fixture.getDeferBlocks();
    for (const block of blocks) {
      await block.render(DeferBlockState.Complete);
    }
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('app-footer')).toBeTruthy();
    expect(compiled.querySelector('app-scroll-to-top')).toBeTruthy();
  });
});
