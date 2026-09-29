import { Component, output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { UiMockup } from './ui-mockup/ui-mockup';

@Component({
  selector: 'app-hero',
  imports: [TranslatePipe, UiMockup],
  templateUrl: './hero.html',
  host: {
    class: 'relative block w-full overflow-hidden',
  },
})
export class Hero {
  readonly contactClick = output<void>();
  readonly videoClick = output<void>();

  onContact(): void {
    this.contactClick.emit();
  }

  onWatchVideo(): void {
    this.videoClick.emit();
  }
}
