import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { LandingAnchorService } from '../../../systems/lib/landing-anchor.service';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './footer.html',
  host: {
    class: 'block w-full',
  },
})
export class Footer {
  private readonly anchorService = inject(LandingAnchorService);

  onSectionLink(anchorId: string, event: Event): void {
    this.anchorService.navigateOrScrollToAnchor(anchorId, event);
  }
}
