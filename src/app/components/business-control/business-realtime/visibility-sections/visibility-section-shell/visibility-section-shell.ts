import { Component, input } from '@angular/core';

@Component({
  selector: 'app-visibility-section-shell',
  templateUrl: './visibility-section-shell.html',
})
export class VisibilitySectionShell {
  readonly sectionId = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly decisionText = input.required<string>();
  readonly decisionLabel = input<string>('For decisions:');
  readonly stageBgClass = input<string>('bg-[#F9CEC8]');
}
