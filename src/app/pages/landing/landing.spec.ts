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

    const firstPlaceholder = fixture.nativeElement.querySelector('[data-landing-placeholder="1"]');
    expect(firstPlaceholder?.id).toBe('business-control');

    anchorService.revealUpToAnchor('pricing');
    expect(anchorService.requiredOrder()).toBe(6);

    fixture.destroy();
    expect(anchorService.requiredOrder()).toBe(0);
  });

  it('should preserve the #business-control target when the first deferred block completes', async () => {
    const blocks = await fixture.getDeferBlocks();
    await blocks[0].render(DeferBlockState.Complete);
    fixture.detectChanges();

    const target = fixture.nativeElement.querySelector('#business-control');
    expect(target?.tagName).toBe('SECTION');
    expect(target?.closest('app-business-control')).toBeTruthy();
  });
});
