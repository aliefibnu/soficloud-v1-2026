import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-visibility-section-shell',
  imports: [NgOptimizedImage],
  templateUrl: './visibility-section-shell.html',
})
export class VisibilitySectionShell {
  readonly sectionId = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly decisionText = input.required<string>();
  readonly decisionLabel = input<string>('For decisions:');
  readonly decisionReversed = input(false);
  readonly stageBgClass = input<string>('bg-[#F9CEC8]');
  readonly decisionImageSrc = input<string | null>(null);
  readonly decisionImageWidth = input<number>(127);
  readonly decisionImageHeight = input<number>(108);
  readonly decisionImagePositionClass = input<string>('left-0 top-0');
}
