import { ComponentFixture, DeferBlockBehavior, DeferBlockState, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../systems/lib/language.service';
import { Landing } from './landing';

describe('Landing', () => {
  let component: Landing;
  let fixture: ComponentFixture<Landing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [provideRouter([]), provideTranslateService(), LanguageService],
      deferBlockBehavior: DeferBlockBehavior.Manual,
    }).compileComponents();

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
});
