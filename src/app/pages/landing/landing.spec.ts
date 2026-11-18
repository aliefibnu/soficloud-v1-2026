import { ComponentFixture, DeferBlockBehavior, DeferBlockState, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../systems/lib/language.service';
import { LandingAnchorService } from '../../systems/lib/landing-anchor.service';
import { Landing } from './landing';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;
  let anchorService: LandingAnchorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [provideRouter([]), provideTranslateService(), LanguageService],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    }).compileComponents();

    anchorService = TestBed.inject(LandingAnchorService);
    fixture = TestBed.createComponent(Landing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the cta component when deferred blocks enter the viewport', async () => {
    const blocks = await fixture.getDeferBlocks();
    for (const block of blocks) {
      await block.render(DeferBlockState.Complete);
    }
    fixture.detectChanges();
    const ctaEl = fixture.nativeElement.querySelector('app-cta');
    expect(ctaEl).toBeTruthy();
  });

  it('should expose placeholder order markers and reset requiredOrder on destroy', () => {
    const placeholders = fixture.nativeElement.querySelectorAll('[data-landing-placeholder]');
    expect(placeholders.length).toBe(7);

    anchorService.revealUpToAnchor('pricing');
    expect(anchorService.requiredOrder()).toBe(6);

    fixture.destroy();
    expect(anchorService.requiredOrder()).toBe(0);
  });
});
