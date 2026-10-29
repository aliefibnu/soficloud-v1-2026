import { Component, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cta',
  imports: [NgOptimizedImage, TranslatePipe],
  templateUrl: './cta.html',
  host: {
    class: 'relative block w-full overflow-hidden',
  },
})
export class Cta {
  readonly scheduleDemo = output<void>();
  readonly contactUs = output<void>();

  onScheduleDemo(): void {
    this.scheduleDemo.emit();
  }

  onContactUs(): void {
    this.contactUs.emit();
  }
}
